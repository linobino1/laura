"use client";

import { twMerge } from "tailwind-merge";
import LanguageSelector from "./LanguageSelector";
import type {
  Navigation as NavigationType,
  Site,
} from "payload/generated-types";
import Navigation from "./Navigation";
import { NavLink, useLocation } from "@remix-run/react";
import Gutter from "./Gutter";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  navigation: NonNullable<NavigationType>;
  site: Site;
}

const Header: React.FC<Props> = ({ site, navigation, className, ...props }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header
      {...props}
      className={twMerge("z-100 relative top-0 bg-white md:sticky", className)}
    >
      <Gutter size="lg" className="mb-4 mt-4 w-full pt-4 md:mt-16">
        <div className="border-b-1 flex border-gray-400 pb-2">
          <NavLink
            to="/"
            className={({ isPending }) =>
              twMerge(
                "grow justify-self-start uppercase",
                isPending && "text-gray-500",
              )
            }
          >
            {site.meta?.title}
          </NavLink>
          <LanguageSelector className="justify-self-end" />
        </div>
        <div className="mt-0 py-4 lg:absolute">
          {isHome ? (
            <Navigation navigation={navigation} />
          ) : (
            <NavLink to="/" prefetch="render">
              <div className="i-teenyicons:arrow-left-solid text-2xl" />
            </NavLink>
          )}
        </div>
      </Gutter>
    </header>
  );
};
export default Header;
