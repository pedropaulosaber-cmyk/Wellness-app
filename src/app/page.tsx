import Hero from "@/components/site/Hero";
import Historia from "@/components/site/Historia";
import Colecoes from "@/components/site/Colecoes";
import Destaques from "@/components/site/Destaques";
import AutoraisTeaser from "@/components/site/AutoraisTeaser";
import Diferenciais from "@/components/site/Diferenciais";
import Depoimentos from "@/components/site/Depoimentos";
import Newsletter from "@/components/site/Newsletter";

export default function Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <Historia />
      <Colecoes />
      <Destaques />
      <AutoraisTeaser />
      <Diferenciais />
      <Depoimentos />
      <Newsletter />
    </div>
  );
}
