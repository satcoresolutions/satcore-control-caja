
import Image from "next/image";

import { siteConfig, type SiteConfig } from "@/config/site";
import { FooterContactItem } from "./FooterContactItem";

type FooterProps = {
  /** Sobrescribe la configuración global (opcional) */
  config?: SiteConfig;
  className?: string;
};

export function Footer({
  config = siteConfig,
  className = "",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`relative bg-black-soft text-gray-light ${className}`}
      aria-labelledby="footer-title"
    >
      {/* Línea de marca */}
      <div
        className="satcore-gradient-horizontal h-1 w-full"
        aria-hidden="true"
      />

      <div className="satcore-container py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Identidad de marca */}
          <div className="max-w-md">
            {/* Logo centrado */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/satcore-negativo.jpg"
                alt={`Logo de ${config.name}`}
                width={200}
                height={80}
                priority
                className="h-auto w-40 object-contain sm:w-48"
              />
            </div>

            {/* Nombre de marca */}
            <h2
              id="footer-title"
              className="text-center text-3xl font-extrabold tracking-tight"
            >
              <span className="text-[#132a8e]">Sat</span>
              <span className="text-[#1bff3c]">Core</span>
              <span className="text-white"> Solutions</span>
            </h2>

            {/* Tagline */}
            <p className="mt-3 text-center text-sm font-semibold tracking-widest text-secondary">
              {config.tagline}
            </p>

            {/* Slogan */}
            <p className="mt-6 text-center text-body-large text-gray-light/80">
              {config.slogan}
            </p>

            {/* Hecho con */}
            <p className="mt-6 text-center text-sm font-semibold text-white">
              {config.madeWith}
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold !text-white">
              {config.contactTitle}
            </h3>

            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {config.contacts.map((item) => (
                <FooterContactItem
                  key={item.id}
                  item={item}
                />
              ))}
            </ul>

            {/* Nota de contacto */}
            <div className="mt-12 border-t border-white/10 pt-6 sm:mt-14 sm:pt-8">
              <p className="max-w-xl text-sm leading-7 text-gray-medium">
                {config.contactNote}
              </p>
            </div>
          </div>
        </div>

        {/* Cierre legal minimalista */}
        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="text-xs leading-6 text-gray-medium">
            © {year} {config.name} — {config.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
