"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, Language } from "@/lib/i18n";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: typeof translations.en;
    dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [storedLang, setStoredLang] = useLocalStorage<Language>("ysf-lang", "en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const lang = mounted ? storedLang : "en";
    const t = translations[lang];
    const dir = lang === "ar" ? "rtl" : "ltr";

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    }, [dir, lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang: setStoredLang, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
