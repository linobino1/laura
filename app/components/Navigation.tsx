"use client";

import type {
  Category,
  Page,
  Work,
  Navigation as NavigationType,
} from "payload/generated-types";
import { twMerge } from "tailwind-merge";
import { NavLink } from "@remix-run/react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  navigation?: NavigationType;
}

const Navigation: React.FC<Props> = ({ navigation, className, ...props }) => {
  const items = navigation?.items || [];

  return (
    <nav {...props}>
      {items.map((item, index) => {
        const doc = item.doc?.value as Page | Work | Category;

        // categories do not have a page, but can appear in the navigation
        if (item.doc?.relationTo === "categories") {
          return (
            <div
              key={index}
              className={twMerge(
                "block py-1 text-sm font-light italic text-gray-900",
                index !== 0 && "mt-4",
              )}
            >
              {doc.title}
            </div>
          );
        }

        return (
          <NavLink
            to={doc.url}
            key={index}
            className={({ isActive }) =>
              twMerge(
                "block",
                isActive && "line-through decoration-solid",
                // "text-gray-400"
                // "underline"
                // item.doc?.relationTo === "works" && "pl-4",
              )
            }
            prefetch="intent"
          >
            {doc.title}
          </NavLink>
        );
      })}
    </nav>
  );
};
export default Navigation;
