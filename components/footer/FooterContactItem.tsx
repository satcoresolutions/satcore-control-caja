import type { ContactItem } from "@/config/site";
import { ContactIconView } from "./icons";

export function FooterContactItem({ item }: { item: ContactItem }) {
  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-secondary transition-colors duration-[250ms] group-hover:bg-secondary group-hover:text-black-soft">
        <ContactIconView name={item.id} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-gray-medium">{item.label}</span>
        <span className="block truncate text-sm font-medium text-white">
          {item.value}
        </span>
      </span>
    </>
  );

  const base = "group flex items-center gap-3 rounded-xl p-2 -m-2";

  if (!item.href) {
    return <li className={base}>{content}</li>;
  }

  const external = item.href.startsWith("http");

  return (
    <li>
      <a
        href={item.href}
        className={`${base} transition-colors hover:bg-white/5`}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label={`${item.label}: ${item.value}`}
      >
        {content}
      </a>
    </li>
  );
}
