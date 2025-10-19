// components/BodyBackgroundTransition.tsx
"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function BodyBackgroundTransition() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.transition = "background-color 0.8s ";
    document.body.style.backgroundColor = theme === "dark" ? "black" : "white";
  }, [theme]);

  return null; // no visual output
}
