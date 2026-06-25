import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Historia from "@/components/site/Historia";
import Colecoes from "@/components/site/Colecoes";
import Destaques from "@/components/site/Destaques";
import Diferenciais from "@/components/site/Diferenciais";
import Depoimentos from "@/components/site/Depoimentos";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import CartDrawer from "@/components/site/CartDrawer";

export default function Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <Historia />
      <Colecoes />
      <Destaques />
      <Diferenciais />
      <Depoimentos />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </div>
  );
}
