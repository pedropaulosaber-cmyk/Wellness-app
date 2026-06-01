// Gráfico de barras simples (SVG) — ex.: treinos por dia nos últimos dias.
interface Barra {
  rotulo: string;
  valor: number;
}

export default function BarChart({ barras, altura = 120 }: { barras: Barra[]; altura?: number }) {
  const max = Math.max(1, ...barras.map((b) => b.valor));
  return (
    <div className="flex items-end gap-1" style={{ height: altura }}>
      {barras.map((b, i) => (
        <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
          <div
            className="w-full rounded-t bg-viva-300"
            style={{ height: `${(b.valor / max) * (altura - 18)}px` }}
            title={`${b.rotulo}: ${b.valor}`}
          />
          <span className="text-[9px] text-viva-400">{b.rotulo}</span>
        </div>
      ))}
    </div>
  );
}
