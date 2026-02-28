"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "../providers/LanguageProvider";
import { cn } from "@/lib/utils";
import { Language } from "@/lib/i18n";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const { lang, setLang, t, dir } = useLanguage();
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState("home");

    const navLinks = React.useMemo(() => [
        { name: t.nav.hero, href: "#home" },
        { name: t.nav.whatIDo, href: "#what-i-do" },
        { name: t.nav.skills, href: "#skills" },
        { name: t.nav.languages, href: "#languages" },
        { name: t.nav.projects, href: "#projects" },
        { name: t.nav.contact, href: "#contact" },
    ], [t.nav]);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navLinks.map(link => link.href.substring(1));

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection((prev) => prev !== section ? section : prev);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <header
            dir={dir}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-[#030014]/80 backdrop-blur-xl border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] py-4"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 origin-left z-50"
                style={{ scaleX }}
            />

            <div className="mx-auto w-full px-6 sm:px-8 md:px-12 max-w-[1200px] flex items-center justify-between">
                <a href="#home" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500">
                    YSF
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center space-x-8 rtl:space-x-reverse">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className={cn(
                                        "relative text-sm font-medium transition-colors duration-300 hover:text-white group",
                                        activeSection === link.href.substring(1)
                                            ? "text-white"
                                            : "text-neutral-400"
                                    )}
                                >
                                    {link.name}
                                    <span
                                        className={cn(
                                            "absolute -bottom-2 left-0 h-[2px] bg-purple-500 transition-all duration-300 rounded-full",
                                            activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-1/2"
                                        )}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                        {(["en", "fr", "ar"] as Language[]).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={cn(
                                    "px-3 py-1 text-xs font-semibold rounded-full transition-colors",
                                    lang === l ? "bg-purple-500 text-white" : "text-neutral-400 hover:text-white"
                                )}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="md:hidden flex items-center gap-4">
                    <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                        {(["en", "fr", "ar"] as Language[]).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={cn(
                                    "px-2 py-1 text-xs font-semibold rounded-full transition-colors",
                                    lang === l ? "bg-purple-500 text-white" : "text-neutral-400 hover:text-white"
                                )}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-neutral-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#030014]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden shadow-2xl"
                    >
                        <ul className="flex flex-col py-4 px-6 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                                            setMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            "relative block text-base font-medium transition-colors duration-300 hover:text-white group",
                                            activeSection === link.href.substring(1)
                                                ? "text-white"
                                                : "text-neutral-300"
                                        )}
                                    >
                                        {link.name}
                                        <span
                                            className={cn(
                                                "absolute -bottom-1 left-0 h-[2px] bg-purple-500 transition-all duration-300 rounded-full",
                                                activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-1/2"
                                            )}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
