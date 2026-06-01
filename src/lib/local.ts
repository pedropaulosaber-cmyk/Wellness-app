"use client";

/**
 * Persistência LOCAL do Vivá (localStorage) — permite usar o app inteiro
 * sem login nem banco ("entrada direta"). Quando o login estiver ativo,
 * estes dados podem ser sincronizados com o Supabase.
 *
 * Tudo roda no navegador; as funções são no-op seguras no servidor (SSR).
 */
import { getHoje } from "@/lib/datas";
import type { NivelAtividade, Objetivo, Sexo } from "@/lib/nutrition";

export interface PerfilLocal {
  sexo: Sexo;
  idade: number;
  pesoKg: number;
  alturaCm: number;
  nivelAtividade: NivelAtividade;
  objetivo: Objetivo;
  rotinaTrabalho?: string;
  horasSono?: number;
  qualidadeSono?: number;
  lesoes?: string;
  experienciaTreino?: string;
  modalidades: string[];
  restricoes: string[];
  // snapshot do plano
  caloriasAlvo: number;
  proteinaG: number;
  carboidratoG: number;
  gorduraG: number;
  aguaMl: number;
}

export interface RefeicaoLog {
  id: string;
  dia: string;
  refeicao: string;
  nome: string;
  gramas: number;
  kcal: number;
  proteina: number;
  carbo: number;
  gordura: number;
}
export interface AguaLog {
  id: string;
  dia: string;
  ml: number;
}
export interface SerieLog {
  exercicioId: string;
  exercicioNome: string;
  serie: number;
  reps: number;
  cargaKg?: number | null;
}
export interface SessaoLog {
  id: string;
  dia: string;
  modalidade: string;
  nome: string;
  tipo: string;
  duracaoMin?: number | null;
  distanciaKm?: number | null;
  paceSeg?: number | null;
  series: SerieLog[];
}
export interface PesoLog {
  id: string;
  dia: string;
  pesoKg: number;
}

interface Estado {
  perfil: PerfilLocal | null;
  refeicoes: RefeicaoLog[];
  aguas: AguaLog[];
  sessoes: SessaoLog[];
  pesos: PesoLog[];
}

const KEY = "viva_state_v1";
const vazio: Estado = { perfil: null, refeicoes: [], aguas: [], sessoes: [], pesos: [] };

function ler(): Estado {
  if (typeof window === "undefined") return vazio;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...vazio, ...(JSON.parse(raw) as Estado) } : vazio;
  } catch {
    return vazio;
  }
}
function salvar(e: Estado) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(e));
}
const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

// ── Perfil ──────────────────────────────────────────────────
export function getPerfil(): PerfilLocal | null {
  return ler().perfil;
}
export function setPerfil(p: PerfilLocal) {
  const e = ler();
  e.perfil = p;
  salvar(e);
}

// ── Refeições ───────────────────────────────────────────────
export function addRefeicoes(
  refeicao: string,
  itens: Omit<RefeicaoLog, "id" | "dia" | "refeicao">[]
) {
  const e = ler();
  const dia = getHoje();
  itens.forEach((it) => e.refeicoes.push({ id: uid(), dia, refeicao, ...it }));
  salvar(e);
}
export function getRefeicoes(dia = getHoje()): RefeicaoLog[] {
  return ler().refeicoes.filter((r) => r.dia === dia);
}

// ── Água ────────────────────────────────────────────────────
export function addAgua(ml: number) {
  const e = ler();
  e.aguas.push({ id: uid(), dia: getHoje(), ml });
  salvar(e);
}
export function getAguaHoje(dia = getHoje()): number {
  return ler()
    .aguas.filter((a) => a.dia === dia)
    .reduce((s, a) => s + a.ml, 0);
}

// ── Treinos ─────────────────────────────────────────────────
export function addSessao(s: Omit<SessaoLog, "id" | "dia">) {
  const e = ler();
  e.sessoes.push({ id: uid(), dia: getHoje(), ...s });
  salvar(e);
}
export function getSessoes(): SessaoLog[] {
  return ler().sessoes;
}
export function ultimaCarga(exercicioId: string): number | null {
  const todas = ler()
    .sessoes.flatMap((s) => s.series)
    .filter((x) => x.exercicioId === exercicioId && x.cargaKg != null);
  return todas.length ? (todas[todas.length - 1].cargaKg as number) : null;
}

// ── Peso ────────────────────────────────────────────────────
export function addPeso(pesoKg: number) {
  const e = ler();
  e.pesos.push({ id: uid(), dia: getHoje(), pesoKg });
  if (e.perfil) e.perfil.pesoKg = pesoKg;
  salvar(e);
}
export function getPesos(): PesoLog[] {
  return ler().pesos;
}

// ── Util ────────────────────────────────────────────────────
export function diasAtivos(): Set<string> {
  const e = ler();
  return new Set<string>([
    ...e.refeicoes.map((r) => r.dia),
    ...e.aguas.map((a) => a.dia),
    ...e.sessoes.map((s) => s.dia),
    ...e.pesos.map((p) => p.dia),
  ]);
}
export function getTotais(): { refeicoes: number; sessoes: number; pesos: number } {
  const e = ler();
  return { refeicoes: e.refeicoes.length, sessoes: e.sessoes.length, pesos: e.pesos.length };
}
export function resetTudo() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
}
