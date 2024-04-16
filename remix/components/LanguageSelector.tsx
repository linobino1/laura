"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const languages = [
  { code: "ee", name: "EST" },
  { code: "en", name: "ENG" },
];

const LanguageSelector: React.FC<Props> = ({ className, ...props }) => {
  const { i18n } = useTranslation();
  return (
    <div {...props} className={twMerge("flex", className)}>
      {languages.map((language, index) => {
        const query = new URLSearchParams();
        query.set("lng", language.code);

        return (
          <div className="contents" key={index}>
            <Link
              className={i18n.language === language.code ? "" : "text-gray-500"}
              to={`?${query.toString()}`}
              prefetch="intent"
            >
              {language.name}
            </Link>
            <div
              className={twMerge(
                index == languages.length - 1 ? "hidden" : "",
                "mx-1 text-gray-500",
              )}
            >
              {"/"}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default LanguageSelector;
