import React from "react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-[#210f01] text-white pt-16 pb-8 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo-zilma/logo-zilma.png"
            alt="Z.Q.R. Alvarenga Advocacia Empresarial"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
          <p className="mt-4 font-sans text-base leading-relaxed text-[#e6e6e6]">
            Excelência jurídica aplicada à rotina e às decisões empresariais
          </p>
        </div>
        <div className="my-14 h-px w-full bg-white/30" />
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo-cp2/cp2-logo.png"
            alt="CP2eJr"
            width={120}
            height={42}
            className="mb-3 invert object-contain"
          />
          <span className="mb-1 text-sm text-[#bdbdbd]">
            Designed and made by CP2eJr
          </span>
          <span className="text-[13px] text-[#bdbdbd]">
            © 2025 All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
