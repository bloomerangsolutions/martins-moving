import Image from "next/image";
import Link from "next/link";
import { quoteForm } from "@/lib/templates/slots.mjs";

export type Crumb = { name: string; href: string };
export type HeroProps = {
  badge?: string;
  h1: string;
  sub?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  crumbs?: Crumb[];
  big?: boolean;
  pageName?: string;
  showForm?: boolean;
  bgImage?: string;
  bgAlt?: string;
};

export default function Hero({
  badge, h1, sub, primaryCta, secondaryCta, crumbs, big = false, pageName = "",
  showForm = true,
  bgImage = "/images/hero",
  bgAlt = "Moving crew loading cardboard boxes into a moving van",
}: HeroProps) {
  const pCta = primaryCta ?? { label: "Get a free estimate", href: "/contact" };
  const sCta = secondaryCta ?? { label: "Our services", href: "/services" };

  return (
    <header className={`relative pt-20 ${big ? "min-h-[90vh]" : "min-h-[60vh]"} flex items-center overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={`${bgImage}.jpg`}
          alt={bgAlt}
          width={1920}
          height={1256}
          priority
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto grid md:grid-cols-[2fr_1fr] gap-12 items-center py-16 md:py-20 w-full">
        <div className="text-white space-y-6">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="text-caption text-white/70 mb-4">
              <ol className="flex flex-wrap items-center gap-1">
                {crumbs.map((c, i) =>
                  i < crumbs.length - 1 ? (
                    <li key={c.href} className="flex items-center gap-1">
                      <Link className="hover:text-tertiary-fixed" href={c.href}>{c.name}</Link>
                      <span className="mx-1 text-white/40">/</span>
                    </li>
                  ) : (
                    <li key={c.href} className="text-white">{c.name}</li>
                  )
                )}
              </ol>
            </nav>
          )}
          {badge && (
            <span className="inline-block px-4 py-1 bg-tertiary text-on-tertiary rounded-full font-label-bold text-caption uppercase tracking-[0.2em]">
              {badge}
            </span>
          )}
          <h1 className={`font-display-lg text-headline-lg-mobile ${big ? "md:text-display-lg" : "md:text-headline-lg"} leading-tight`}>
            {h1}
          </h1>
          {sub && <p className="font-body-lg text-body-lg text-surface-variant opacity-90 max-w-lg">{sub}</p>}
          <div className="flex flex-wrap gap-4">
            <Link className="bg-action-orange hover:brightness-110 text-white px-8 py-4 rounded-xl font-headline-md text-body-lg transition-all shadow-lg hover:-translate-y-1" href={pCta.href}>
              {pCta.label}
            </Link>
            <Link className="border-2 border-tertiary-fixed text-tertiary-fixed backdrop-blur-sm px-8 py-4 rounded-xl font-headline-md text-body-lg hover:bg-tertiary-fixed/10 transition-all" href={sCta.href}>
              {sCta.label}
            </Link>
          </div>
        </div>
        <div className={`${showForm ? "" : "hidden"} md:block`}>
          {showForm && <div dangerouslySetInnerHTML={{ __html: quoteForm({ pageName }) }} />}
        </div>
      </div>
    </header>
  );
}
