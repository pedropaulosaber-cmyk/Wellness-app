// Dia atual no fuso de Brasília (YYYY-MM-DD), usado para agrupar registros.
export function getHoje(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Lista os últimos N dias (do mais antigo ao mais recente) como YYYY-MM-DD.
export function ultimosDias(n: number): string[] {
  const dias: string[] = [];
  const agora = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(agora);
    d.setDate(agora.getDate() - i);
    dias.push(
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(d)
    );
  }
  return dias;
}
