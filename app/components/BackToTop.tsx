"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import GlobalPadding from "./GlobalPadding";
import { useLocation } from "@remix-run/react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const BackToTop: React.FC<Props> = ({ className, ...props }) => {
  const { t } = useTranslation();
  const onClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const ref = useRef<HTMLButtonElement>(null);

  // on navigation, check if the page is long enough to show the button
  const { pathname } = useLocation();
  useEffect(() => {
    const offsetHeight = document.documentElement.offsetHeight;
    const innerHeight = window.innerHeight;

    // don't show the button if the page is not long enough
    if (offsetHeight > innerHeight) {
      ref.current?.classList.remove("invisible");
    } else {
      ref.current?.classList.add("invisible");
    }
  }, [pathname]);

  return (
    <GlobalPadding>
      <button
        ref={ref}
        onClick={onClickHandler}
        className={twMerge("p-24 pr-0 float-right invisible")}
      >
        {t("Back to top")}
      </button>
    </GlobalPadding>
  );
};
export default BackToTop;
