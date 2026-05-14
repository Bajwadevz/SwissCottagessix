"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { lighten } from "@/lib/color";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useSiteTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useSiteTheme must be used within Providers");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function AccentSync({ accent }: { accent: string }) {
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--brass", accent);
    root.setProperty("--brass-2", lighten(accent, 0.12));
  }, [accent]);
  return null;
}
