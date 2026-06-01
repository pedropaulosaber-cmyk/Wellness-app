/**
 * Anel de progresso (SVG puro, sem dependência externa).
 * Usado na home para calorias, macros e água.
 */
interface ProgressRingProps {
  /** valor atual */
  valor: number;
  /** meta (100%) */
  meta: number;
  /** rótulo central (ex.: "1.480") */
  rotulo: string;
  /** legenda abaixo (ex.: "kcal") */
  legenda: string;
  /** cor do anel (default: verde da marca) */
  cor?: string;
  tamanho?: number;
}

export default function ProgressRing({
  valor,
  meta,
  rotulo,
  legenda,
  cor = "#1F6B4A",
  tamanho = 96,
}: ProgressRingProps) {
  const stroke = 8;
  const raio = (tamanho - stroke) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const fracao = meta > 0 ? Math.min(valor / meta, 1) : 0;
  const offset = circunferencia * (1 - fracao);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={tamanho}
        height={tamanho}
        viewBox={`0 0 ${tamanho} ${tamanho}`}
        role="img"
        aria-label={`${rotulo} ${legenda}, ${Math.round(fracao * 100)}% da meta`}
      >
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke="#D3EBDF"
          strokeWidth={stroke}
        />
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke={cor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${tamanho / 2} ${tamanho / 2})`}
        />
        <text
          x="50%"
          y="48%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-viva-900 font-bold"
          fontSize="16"
        >
          {rotulo}
        </text>
        <text
          x="50%"
          y="64%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-viva-400"
          fontSize="10"
        >
          {legenda}
        </text>
      </svg>
    </div>
  );
}
