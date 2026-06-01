// Gera os ícones PWA do Vivá (verde da marca + "V" branco) sem dependências.
// Uso: node scripts/generate-icons.mjs
import zlib from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";

const VERDE = [31, 107, 74]; // #1F6B4A
const BRANCO = [255, 255, 255];

// CRC32 para chunks PNG
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

// Distância de um ponto a um segmento (coords normalizadas 0–1)
function distSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax,
    dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  const cx = ax + t * dx,
    cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function gerarPng(size, { maskable = false } = {}) {
  const raw = Buffer.alloc(size * (size * 3 + 1));
  const pad = maskable ? 0.16 : 0; // safe zone para maskable
  const sw = 0.07; // meia-espessura do traço do V
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0; // filtro 0 por linha
    for (let x = 0; x < size; x++) {
      const nx = x / size;
      const ny = y / size;
      // mapeia para área interna (considerando padding do maskable)
      const ix = (nx - pad) / (1 - 2 * pad);
      const iy = (ny - pad) / (1 - 2 * pad);
      let cor = VERDE;
      if (ix >= 0 && ix <= 1 && iy >= 0 && iy <= 1) {
        const dEsq = distSeg(ix, iy, 0.28, 0.28, 0.5, 0.74);
        const dDir = distSeg(ix, iy, 0.72, 0.28, 0.5, 0.74);
        if (Math.min(dEsq, dDir) < sw) cor = BRANCO;
      }
      const off = y * (size * 3 + 1) + 1 + x * 3;
      raw[off] = cor[0];
      raw[off + 1] = cor[1];
      raw[off + 2] = cor[2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  return png;
}

mkdirSync("public/icons", { recursive: true });
writeFileSync("public/icons/icon-192.png", gerarPng(192));
writeFileSync("public/icons/icon-512.png", gerarPng(512));
writeFileSync("public/icons/maskable-512.png", gerarPng(512, { maskable: true }));
writeFileSync("public/icons/apple-touch-icon.png", gerarPng(180));

// Ícone SVG (favicon escalável)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#1F6B4A"/><path d="M143 143 L256 379 L369 143" fill="none" stroke="#fff" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
writeFileSync("public/icons/icon.svg", svg);

console.log("Ícones gerados em public/icons/");
