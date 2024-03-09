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
    <nav {...props} className={twMerge("sm:columns-2 md:columns-3", className)}>
      {items.map((item, index) => {
        const doc = item.doc?.value as Page | Work | Category;

        // categories do not have a page, but can appear in the navigation
        if (item.doc?.relationTo === "categories") {
          return (
            <div key={index} className="mt-1 block pl-6 italic">
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
                // item.doc?.relationTo === "works" && "pl-6",
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
