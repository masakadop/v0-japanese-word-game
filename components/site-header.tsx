"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "入口", labelEn: "entrance" },
    { href: "/odai", label: "お題", labelEn: "prompts" },
    { href: "/submit", label: "投句", labelEn: "submit" },
    { href: "/vote", label: "選句", labelEn: "vote" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="hanko">句</span>
          <span className="font-serif text-lg font-medium tracking-tight">
            前句付け
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors",
                "hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <span className="font-medium">{item.label}</span>
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-shu" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
