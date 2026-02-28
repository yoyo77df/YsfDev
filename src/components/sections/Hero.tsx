"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../providers/LanguageProvider";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { AlertCircle, X } from "lucide-react";

export function Hero() {
    const { t } = useLanguage();
    const [currentRole, setCurrentRole] = useState(0);
    const [toastMessage, setToastMessage] = useState("");
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % t.hero.roles.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [t.hero.roles.length]);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleHireClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const hireUrl = process.env.NEXT_PUBLIC_HIRE_URL;
        if (!hireUrl) {
            setToastMessage("Set NEXT_PUBLIC_HIRE_URL in .env.local");
            return;
        }
        window.open(hireUrl, "_blank", "noreferrer");
    };

    return (
        <section ref={containerRef} id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[620px] h-[320px] md:h-[620px] rounded-full border-[2px] border-purple-500/10 border-t-purple-400/40 border-r-cyan-400/20 -z-10 pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 blur-[80px] -z-10 pointer-events-none mix-blend-screen"
            />

            <Container className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    style={{ y, opacity }}
                    className="space-y-8 max-w-4xl"
                >
                    <div className="inline-block relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-4"
                        >
                            {t.hero.hi} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{t.hero.name}</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-16 md:h-20 flex flex-col sm:flex-row items-center justify-center text-2xl md:text-4xl font-medium text-neutral-300 gap-2 sm:gap-4"
                    >
                        <span className="hidden sm:inline-block text-purple-400 font-light pr-4 border-r border-white/10">I am a</span>
                        <div className="relative overflow-hidden w-[280px] sm:w-[350px] h-full flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={currentRole}
                                    initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 font-bold"
                                >
                                    {t.hero.roles[currentRole]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                        className="text-lg md:text-xl text-gray-400 max-w-[600px] mx-auto leading-relaxed"
                    >
                        {t.hero.tagline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
                    >
                        <Button size="lg" asChild>
                            <a href="#contact">{t.hero.contactMe}</a>
                        </Button>
                        <Button variant="secondary" size="lg" onClick={handleHireClick}>
                            {t.hero.hireMe}
                        </Button>
                    </motion.div>
                </motion.div>
            </Container>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
                onClick={() => document.getElementById("what-i-do")?.scrollIntoView({ behavior: "smooth" })}
            >
                <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1 h-3 bg-purple-500 rounded-full"
                    />
                </div>
            </motion.div>

            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
                        className="fixed top-24 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-r from-red-500 to-rose-500" />
                        <AlertCircle className="text-red-400 relative z-10" size={20} />
                        <span className="text-white font-medium relative z-10">{toastMessage}</span>
                        <button
                            onClick={() => setToastMessage("")}
                            className="ml-4 text-neutral-400 hover:text-white transition-colors relative z-10 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full"
                            aria-label="Close notification"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
