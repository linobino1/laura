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
    <nav
      {...props}
      className={twMerge("flex flex-col gap-2 uppercase", className)}
    >
      {items.map((item, index) => {
        const doc = item.doc?.value as Page | Work | Category;

        // categories do not have a page, but can appear in the navigation
        if (item.doc?.relationTo === "categories") {
          return (
            <div key={index} className="mt-1 pl-6">
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
                isActive && "line-through decoration-solid",
                // "text-gray-400"
                // "underline"
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
