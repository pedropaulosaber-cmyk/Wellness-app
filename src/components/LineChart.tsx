// Gráfico de linha simples (SVG puro) para séries temporais (ex.: peso).
interface Ponto {
  rotulo: string;
  valor: number;
}

export default function LineChart({
  pontos,
  unidade = "",
  altura = 140,
}: {
  pontos: Ponto[];
  unidade?: string;
  altura?: number;
}) {
  if (pontos.length < 2) {
    return (
      <p className="py-6 text-center text-sm text-viva-400">
        Registre ao menos 2 pontos para ver o gráfico.
      </p>
    );
  }

  const largura = 320;
  const pad = 28;
  const valores = pontos.map((p) => p.valor);
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const span = max - min || 1;

  const x = (i: number) => pad + (i * (largura - 2 * pad)) / (pontos.length - 1);
  const y = (v: number) => pad + (1 - (v - min) / span) * (altura - 2 * pad);

  const d = pontos.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.valor)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${largura} ${altura}`} className="w-full" role="img" aria-label="Gráfico de evolução">
      <path d={d} fill="none" stroke="#1F6B4A" strokeWidth={2.5} strokeLinejoin="round" />
      {pontos.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.valor)} r={3} fill="#1F6B4A" />
      ))}
      <text x={pad} y={14} fontSize="11" className="fill-viva-400">
        {max.toLocaleString("pt-BR")}
        {unidade}
      </text>
      <text x={pad} y={altura - 6} fontSize="11" className="fill-viva-400">
        {min.toLocaleString("pt-BR")}
        {unidade}
      </text>
    </svg>
  );
}
