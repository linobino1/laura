"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation } from "@remix-run/react";
import Gutter from "./Gutter";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const BackToTop: React.FC<Props> = ({ className, ...props }) => {
  const { t } = useTranslation();
  const onClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // on navigation, check if the page is long enough to show the button
  const [showButton, setShowButton] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const offsetHeight = document.documentElement.offsetHeight;
    const innerHeight = window.innerHeight;

    // don't show the button if the page is not long enough
    if (offsetHeight > innerHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [pathname]);

  return (
    showButton && (
      <Gutter>
        <div className="border-b-1 border-black pt-8 md:pt-12" />
        <button
          onClick={onClickHandler}
          className={twMerge("float-right pb-8 pt-2 md:pb-20")}
        >
          {t("Back to top")}
        </button>
      </Gutter>
    )
  );
};
export default BackToTop;
