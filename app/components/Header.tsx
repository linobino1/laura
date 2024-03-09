"use client";

import { twMerge } from "tailwind-merge";
import LanguageSelector from "./LanguageSelector";
import type {
  Navigation as NavigationType,
  Site,
} from "payload/generated-types";
import Navigation from "./Navigation";
import { Link, NavLink, useLocation } from "@remix-run/react";
import Gutter from "./Gutter";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  navigation: NonNullable<NavigationType>;
  site: Site;
}

const Header: React.FC<Props> = ({ site, navigation, className, ...props }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header {...props} className={twMerge("z-100 top-0 md:sticky", className)}>
      <Gutter className="mb-4 mt-4 bg-white pt-4 md:mt-16">
        <div className="border-b-1 flex border-black pb-2">
          <Link
            to="/"
            className="grow justify-self-center uppercase md:col-span-8 md:col-start-3"
          >
            {site.meta?.title}
          </Link>
          <LanguageSelector className="col-span-2 flex justify-self-end" />
        </div>
        <div className="py-4">
          {isHome ? (
            <Navigation navigation={navigation} />
          ) : (
            <NavLink to="/" prefetch="render">
              <div className="i-teenyicons:arrow-left-solid text-2xl" />
            </NavLink>
          )}
        </div>
      </Gutter>
      <Gutter></Gutter>
    </header>
  );
};
export default Header;
