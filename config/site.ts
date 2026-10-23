
/**
 * SatCore Solutions — configuración central del sitio.
 * Todo el contenido del footer sale de aquí. Edita este archivo
 * y el footer se actualiza en todos los proyectos que lo usen.
 */

export type ContactIcon =
  | "mail"
  | "whatsapp"
  | "web"
  | "instagram"
  | "youtube"
  | "facebook"
  | "tiktok";

export type ContactItem = {
  id: ContactIcon;
  label: string;
  /** Texto visible */
  value: string;
  /** Si no hay href, se muestra como texto plano */
  href?: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  slogan: string;
  contactTitle: string;
  contactNote: string;
  madeWith: string;
  rights: string;
  contacts: ContactItem[];
};

export const siteConfig: SiteConfig = {
  name: "SatCore Solutions",
  tagline: "SOFTWARE AND TECHNOLOGY CORE SOLUTIONS",
  slogan:
    "Soluciones digitales seguras, accesibles y funcionales para todos.",
  contactTitle: "Contacto y autoría",
  contactNote:
    "Para consultas sobre el proyecto, autorizaciones de uso, colaboraciones o información corporativa, utiliza los canales oficiales.",
  madeWith: "Hecho con 💚 por SatCore Solutions",
  rights: "Todos los derechos reservados.",

  contacts: [
    {
      id: "mail",
      label: "Correo",
      value: "satcoresolutions@gmail.com",
      href: "mailto:satcoresolutions@gmail.com",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: "+57 302 201 6072",
      href: "https://wa.me/573022016072",
    },
    {
      id: "web",
      label: "Sitio web",
      value: "satcore.solutions",
      href: "https://satcore.solutions",
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@satcore_solutions",
      href: "https://www.instagram.com/satcore_solutions",
    },
    {
      id: "tiktok",
      label: "TikTok",
      value: "@satcore_solutions",
      href: "https://www.tiktok.com/@satcore_solutions",
    },
    {
      id: "youtube",
      label: "YouTube",
      value: "@SatCore_Solutions",
      href: "https://www.youtube.com/@SatCore_Solutions",
    },
    {
      id: "facebook",
      label: "Facebook",
      value: "SatCore Solutions",
      href: "https://www.facebook.com/SatCore.Solutions",
    },
  ],
};
