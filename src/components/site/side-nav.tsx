"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/** Section navigation that highlights the section currently in view. */
export function SideNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden lg:block" aria-label="In-page">
      <ul className="mt-14 w-max">
        {items.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a href={`#${id}`} className="group flex items-center py-2.5" aria-current={isActive ? "true" : undefined}>
                <span
                  className={`mr-4 h-px transition-all motion-reduce:transition-none ${
                    isActive ? "w-16 bg-haze-100" : "w-8 bg-haze-500 group-hover:w-16 group-hover:bg-haze-100"
                  }`}
                />
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${
                    isActive ? "text-haze-100" : "text-haze-500 group-hover:text-haze-100"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
