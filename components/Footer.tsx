import Image from "next/image";
import Link from "next/link";
import { nav, siteConfig, type NavItem } from "@/lib/nav";

const LOGO = "/images/logo.png";

function Column({ title, items, max = 6 }: { title: string; items: NavItem[]; max?: number }) {
  return (
    <div>
      <h4 className="font-label-bold text-label-bold uppercase tracking-widest mb-6 text-tertiary-fixed">{title}</h4>
      <ul className="space-y-3 font-body-md text-body-md">
        {items.slice(0, max).map((i) => (
          <li key={i.href}>
            <Link className="text-white/80 hover:text-tertiary-fixed transition-colors" href={i.href}>{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const s = siteConfig;
  const licenseLine =
    `FL Mover Reg. #${s.licenses.flIm}` +
    (s.licenses.usdot.startsWith("{{") ? "" : ` · USDOT ${s.licenses.usdot}`);

  return (
    <footer className="bg-primary text-on-primary w-full pt-section-gap pb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
        <div className="col-span-2 md:col-span-1 space-y-6">
          <div className="inline-block bg-white rounded-lg p-2">
            <Image src={LOGO} alt={`${s.brand} logo`} width={160} height={48} className="h-12 w-auto object-contain" />
          </div>
          <p className="font-body-md text-body-md opacity-80">
            Serving {s.serviceRegion} with precision relocation services since {s.foundedYear}.
          </p>
          <a className="block text-white/90 hover:text-tertiary-fixed font-label-bold" href={s.phoneHref}>{s.phone}</a>
        </div>
        <Column title="Moving Services" items={nav.services} />
        <Column title="Areas Served" items={nav.areas} />
        <Column title="Guides &amp; Resources" items={[...nav.guides.slice(0, 4), ...nav.resources.slice(0, 2)]} />
        <div>
          <h4 className="font-label-bold text-label-bold uppercase tracking-widest mb-6 text-tertiary-fixed">Contact Us</h4>
          <ul className="space-y-4 font-body-md text-body-md">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed">call</span>
              <a className="hover:text-tertiary-fixed" href={s.phoneHref}>{s.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed">mail</span>
              <Link className="hover:text-tertiary-fixed" href="/contact">Send a message</Link>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed">schedule</span>
              <span>{s.hoursDisplay}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-action-orange">emergency</span>
              <span className="text-action-orange font-bold">{s.emergency}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-section-gap pt-8 border-t border-white/10 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto flex flex-col md:flex-row md:justify-between gap-3 text-center md:text-left">
        <p className="font-body-md text-body-md opacity-60">
          © {new Date().getFullYear()} {s.brand}. {s.positioning}. {licenseLine}.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-body-md opacity-60">
          <Link className="hover:text-tertiary-fixed" href="/about">About</Link>
          <Link className="hover:text-tertiary-fixed" href="/blog">Blog</Link>
          <Link className="hover:text-tertiary-fixed" href="/reviews">Reviews</Link>
          <Link className="hover:text-tertiary-fixed" href="/privacy-policy">Privacy</Link>
          <Link className="hover:text-tertiary-fixed" href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
