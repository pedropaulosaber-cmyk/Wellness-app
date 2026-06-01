"use client";

import { useEffect, useState } from "react";
import AnamneseForm, { type DadosAnamnese } from "@/components/AnamneseForm";
import { getPerfil } from "@/lib/local";

export default function AnamnesePage() {
  const [inicial, setInicial] = useState<Partial<DadosAnamnese> | undefined>();
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const p = getPerfil();
    if (p) setInicial(p as Partial<DadosAnamnese>);
    setPronto(true);
  }, []);

  if (!pronto) return null;
  return <AnamneseForm inicial={inicial} />;
}
