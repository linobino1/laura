"use client";

import { twMerge } from "tailwind-merge";
import LanguageSelector from "./LanguageSelector";
import type {
  Navigation as NavigationType,
  Site,
} from "payload/generated-types";
import GlobalPadding from "./GlobalPadding";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  navigation: NonNullable<NavigationType>;
  site: Site;
}

const Header: React.FC<Props> = ({ site, navigation, className, ...props }) => {
  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <div
      {...props}
      className={twMerge(
        "mt-21 mb-24 flex uppercase md:grid md:grid-cols-12",
        className,
      )}
    >
      <h1 className="grow justify-self-center md:col-span-8 md:col-start-3">
        {site.meta?.title}
      </h1>
      <LanguageSelector className="col-span-2 hidden justify-self-end md:flex" />
      <label
        htmlFor="menu"
        className="col-span-1 block justify-self-end md:hidden"
      >
        {t("Menu")}
      </label>
      <input
        checked={menuOpen}
        onChange={() => setMenuOpen(!menuOpen)}
        type="checkbox"
        id="menu"
        className="peer hidden"
      />
      <div className="fixed left-0 z-50 hidden h-full w-full overflow-y-auto bg-white peer-checked:block">
        <GlobalPadding>
          <label htmlFor="menu" className="sticky top-0 block text-end">
            {t("Close Menu")}
          </label>
          <div className="flex flex-col gap-4">
            <LanguageSelector className="" />
            <Navigation navigation={navigation} />
          </div>
        </GlobalPadding>
      </div>
    </div>
  );
};
export default Header;
