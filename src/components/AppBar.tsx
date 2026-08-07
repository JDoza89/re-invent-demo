"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HamburgerIcon, BrandIcon } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";
import { stripLocaleFromPath } from "@/i18n/locales";

export type AppbarProps = {
  className?: string;
};

const tabs = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
  },
];

function AppBarView(props: AppbarProps) {
  const [path, setPath] = useState<string | undefined>(() => undefined);

  const [menuOpen, setMenuOpen] = useState<boolean>(() => false);

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const { locale, basePath } =
    path !== undefined
      ? stripLocaleFromPath(path)
      : { locale: undefined, basePath: undefined };

  const localizedTabs = tabs.map((tab) => ({
    ...tab,
    href: locale ? `/${locale}${tab.href === "/" ? "" : tab.href}` : tab.href,
    originalHref: tab.href,
  }));

  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch self-stretch px-4 sm:px-8 md:px-20 py-4 sm:py-0 h-auto  sm:h-25 border-b border-stone-900 justify-between overflow-hidden ${props.className}`}
    >
      <div className="flex justify-between items-center py-3 sm:py-0">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <BrandIcon />
          <div className="text-stone-900 text-lg sm:text-xl font-bold leading-6 sm:leading-7">
            BrightStart
          </div>
        </div>
        <div className="sm:hidden flex items-center gap-2">
          <Link
            href="mailto:connect@brightstart.com"
            className="self-center px-4 py-2 rounded-lg inline-flex flex-col items-end gap-2.5 overflow-hidden text-right justify-center text-white text-sm font-semibold leading-tight bg-stone-900 hover:bg-stone-800"
          >
            Get in touch
          </Link>
          <button
            aria-label="Open menu"
            onClick={(_event) => setMenuOpen(!menuOpen)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </div>
      <div className="hidden sm:flex flex-row items-stretch justify-start gap-6">
        <div className="flex flex-row items-stretch relative justify-start gap-4">
          {localizedTabs?.map((tab) => (
            <Link
              key={tab.originalHref}
              href={tab.href}
              className={`flex items-center text-stone-900 text-sm font-semibold leading-tight transition-border duration-300 ease-in-out border-y-[3px] ${
                basePath === tab.originalHref
                  ? "border-b-stone-900 border-t-transparent"
                  : " border-transparent"
              }`}
            >
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>
        <LanguageSwitcher className="self-center" />
        <Link
          href="mailto:connect@brightstart.com"
          className="self-center px-4 py-2 rounded-lg inline-flex flex-col items-end gap-2.5 overflow-hidden text-right justify-center text-white text-sm font-semibold leading-tight bg-stone-900 hover:bg-stone-800"
        >
          Get in touch
        </Link>
      </div>
      {menuOpen ? (
        <div className="flex flex-col sm:hidden mt-2 gap-2 z-50 absolute top-[72px] left-0 right-0 bg-white shadow-lg">
          {localizedTabs?.map((tab) => (
            <Link
              key={tab.originalHref}
              href={tab.href}
              onClick={(_event) => setMenuOpen(false)}
              className={`flex items-center text-stone-900 hover:text-stone-800 text-base font-semibold leading-tight px-2 py-2 rounded transition-colors duration-200 ${
                basePath === tab.originalHref ? "bg-stone-100" : ""
              }`}
            >
              <span>{tab.label}</span>
            </Link>
          ))}
          <LanguageSwitcher className="px-2 py-2" />
        </div>
      ) : null}
    </div>
  );
}

export default AppBarView;
