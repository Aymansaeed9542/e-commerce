"use client";

import React, { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>("system");

    useEffect(() => {
        const stored = (localStorage.getItem("theme") as Theme) || "system";
        setTheme(stored);
        applyTheme(stored);
    }, []);

    const applyTheme = (value: Theme) => {
        const root = document.documentElement;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = value === "dark" || (value === "system" && prefersDark);
        root.classList.toggle("dark", isDark);
    };

    const cycleTheme = () => {
        const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        applyTheme(next);
    };

    const icon = theme === "dark" ? "fas fa-moon" : theme === "light" ? "fas fa-sun" : "fas fa-desktop";
    const label = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

    return (
        <button
            aria-label={`Theme: ${label}`}
            title={`Theme: ${label}`}
            onClick={cycleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-gray-50"
        >
            <i className={icon}></i>
        </button>
    );
};

export default ThemeToggle;


