import type { ComponentType } from "react";

export interface Principle {
  icon: ComponentType<{ className?: string }>;
  /** Tailwind text-colour classes for the icon. */
  color: string;
  title: string;
  body: string;
}

export default function DesignPrincipleGrid({ items }: { items: Principle[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
      {items.map(({ icon: Icon, color, title, body }) => (
        <div key={title} className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
            <Icon className={`w-4 h-4 ${color}`} />
            <h4 className="text-sm font-semibold">{title}</h4>
          </div>
          <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  );
}
