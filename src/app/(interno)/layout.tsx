import BottomNav from "@/components/BottomNav";

// Layout das telas internas. Acesso DIRETO (sem login): o app funciona no
// navegador com dados locais. O login é opcional e pode sincronizar depois.
export default function InternoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh pb-16">
      {children}
      <BottomNav />
    </div>
  );
}
