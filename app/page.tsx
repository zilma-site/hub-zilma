import { Footer } from "@/components/footer";
import NewsGrid from "@/components/ui/NewsGrid";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="max-w-7xl mx-auto px-6 py-10">

        <header className="flex items-center justify-between h-20">
          <Image
            src="/logo-zilma/logo-zilma.png"
            alt="Z.Q.R. Alvarenga Advocacia Empresarial"
            width={80}
            height={40}
            className="object-contain"
            priority
          />

        </header>

        <section className="mb-10">
          <h1 className="text-4xl text-black font-bold mb-3">
            Acompanhe As Novidades
          </h1>

          <p className="text-gray-700 max-w-xl">
            Fique por dentro das principais atualizações do
            cenário jurídico brasileiro.
          </p>
        </section>
        <NewsGrid />
      </main>
      <Footer />
    </div>
  );
}