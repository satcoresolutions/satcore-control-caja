
import type { ReactElement, SVGProps } from "react";
import type { ContactIcon } from "@/config/site";

type IconProps = SVGProps<SVGSVGElement>;

function Base(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

const icons: Record<ContactIcon, (p: IconProps) => ReactElement> = {
  mail: (p) => (
    <Base {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Base>
  ),

  whatsapp: (p) => (
    <Base {...p}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </Base>
  ),

  web: (p) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </Base>
  ),

  instagram: (p) => (
    <Base {...p}>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </Base>
  ),

  tiktok: (p) => (
    <Base {...p} stroke="none" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.44v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.16-.01-.32-.04-.48V11.7a6.34 6.34 0 0 0-2.86-.68 6.34 6.34 0 1 0 6.34 6.34V10.4a8.2 8.2 0 0 0 4.8 1.54V8.5a4.85 4.85 0 0 1-1.03-.11Z" />
    </Base>
  ),

  youtube: (p) => (
    <Base {...p}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </Base>
  ),

  facebook: (p) => (
    <Base {...p}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Base>
  ),
};

export function ContactIconView({
  name,
  ...props
}: { name: ContactIcon } & IconProps) {
  return icons[name](props);
}
