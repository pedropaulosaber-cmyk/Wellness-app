import { requireAcesso } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

// Layout das telas internas: exige acesso vitalício pago (senão redireciona
// para /comprar) e adiciona a navegação inferior.
export const dynamic = "force-dynamic";

export default async function InternoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAcesso();

  return (
    <div className="min-h-dvh pb-16">
      {children}
      <BottomNav />
    </div>
  );
}
