"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, realServiceLinks, siteConfig, type NavItem } from "@/lib/nav";

const LOGO = "/images/logo.png";

function PanelLink({ item }: { item: NavItem }) {
  return (
    <Link
      className="block px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors"
      href={item.href}
    >
      {item.label}
    </Link>
  );
}

function Dropdown({
  label, width, heading, items, columns, viewAll, open, onToggle,
}: {
  label: string; width: string; heading: string; items: NavItem[]; columns: string;
  viewAll?: { label: string; href: string }; open: boolean; onToggle: () => void;
}) {
  return (
    <div className={`dd-wrap relative${open ? " is-open" : ""}`}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="flex items-center gap-1 font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors"
      >
        {label}
        <span className="material-symbols-outlined text-base dd-chev transition-transform">expand_more</span>
      </button>
      <div className="dd-panel absolute left-0 top-full pt-3 z-50">
        <div className={`bg-surface-container-lowest rounded-2xl shadow-2xl ring-1 ring-on-surface/5 p-4 ${width}`}>
          <p className="px-3 pb-2 font-label-bold text-label-bold uppercase tracking-widest text-on-surface-variant/70">
            {heading}
          </p>
          <div className={`grid ${columns} gap-1`}>
            {items.map((i) => <PanelLink key={i.href} item={i} />)}
          </div>
          {viewAll && (
            <Link
              className="mt-2 inline-flex items-center gap-1 px-3 font-label-bold text-label-bold text-action-orange hover:gap-2 transition-all"
              href={viewAll.href}
            >
              {viewAll.label}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <details className="border-b border-outline-variant/20">
      <summary className="flex items-center justify-between py-3 font-label-bold text-label-bold uppercase tracking-wider text-on-surface cursor-pointer">
        {label}
        <span className="material-symbols-outlined dd-chev transition-transform">expand_more</span>
      </summary>
      <div className="pb-2">
        {items.map((i) => (
          <Link key={i.href} className="block py-2 pl-3 text-body-md text-on-surface-variant hover:text-primary" href={i.href}>
            {i.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!(e.target as HTMLElement)?.closest(".dd-wrap")) setOpenMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (key: string) => setOpenMenu((cur) => (cur === key ? null : key));
  const svcItems = realServiceLinks;

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
        <Link className="flex items-center gap-2 shrink-0" href="/">
          <Image src={LOGO} alt={`${siteConfig.brand} logo`} width={160} height={48} priority className="h-12 w-auto object-contain" />
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          <Dropdown label="Services" width="w-[540px]" heading="Moving services" items={svcItems} columns="grid-cols-2"
            viewAll={{ label: "View all services", href: "/services" }} open={openMenu === "services"} onToggle={() => toggle("services")} />
          <Dropdown label="Areas Served" width="w-[540px]" heading="Areas served" items={nav.areas.slice(0, 12)} columns="grid-cols-3"
            viewAll={{ label: "View all areas", href: "/areas-served" }} open={openMenu === "areas"} onToggle={() => toggle("areas")} />
          <Dropdown label="Guides" width="w-80" heading="Moving guides" items={nav.guides} columns="grid-cols-1"
            open={openMenu === "guides"} onToggle={() => toggle("guides")} />
          <Dropdown label="Resources" width="w-80" heading="Resources" items={nav.resources} columns="grid-cols-1"
            open={openMenu === "resources"} onToggle={() => toggle("resources")} />
          <Link className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors duration-300" href="/about">About</Link>
          <Link className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors duration-300" href="/blog">Blog</Link>
          <Link className="bg-action-orange text-white px-6 py-3 rounded-lg font-label-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all whitespace-nowrap" href="/contact">
            Request Call Back
          </Link>
        </div>
        <button type="button" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)} className="lg:hidden text-primary">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
      <div className={`${mobileOpen ? "" : "hidden"} lg:hidden bg-surface-container-lowest border-t border-outline-variant/30 max-h-[80vh] overflow-y-auto`}>
        <div className="px-margin-mobile py-3">
          <MobileAccordion label="Services" items={[...svcItems, { label: "View all services", href: "/services" }]} />
          <MobileAccordion label="Areas Served" items={nav.areas} />
          <MobileAccordion label="Guides" items={nav.guides} />
          <MobileAccordion label="Resources" items={nav.resources} />
          <Link className="block py-3 font-label-bold text-label-bold uppercase tracking-wider text-on-surface hover:text-action-orange border-b border-outline-variant/20" href="/about">About</Link>
          <Link className="block py-3 font-label-bold text-label-bold uppercase tracking-wider text-on-surface hover:text-action-orange border-b border-outline-variant/20" href="/blog">Blog</Link>
          <Link className="block mt-3 bg-action-orange text-white text-center px-5 py-3 rounded-lg font-label-bold uppercase tracking-wider" href="/contact">Request Call Back</Link>
          <a className="block mt-2 text-center py-2 text-primary font-label-bold" href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
        </div>
      </div>
    </nav>
  );
}
