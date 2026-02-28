"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Smartphone, Gamepad2, MessageSquare, Server } from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import { SectionTitle } from "../ui/SectionTitle";
import { Container } from "../ui/Container";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    "Web Dev": Code2,
    "Développement Web": Code2,
    "تطوير الويب": Code2,
    "Web Development": Code2,
    "App Dev": Smartphone,
    "Développement App": Smartphone,
    "تطوير التطبيقات": Smartphone,
    "App Development": Smartphone,
    "Game Dev": Gamepad2,
    "Développement Jeu": Gamepad2,
    "تطوير الألعاب": Gamepad2,
    "Game Development": Gamepad2,
    "Discord Bot Dev": MessageSquare,
    "Bot Discord": MessageSquare,
    "بوتات ديسكورد": MessageSquare,
    "Discord Bot Development": MessageSquare,
    "Server Dev": Server,
    "Serveur": Server,
    "تطوير الخوادم": Server,
    "Server Development": Server,
};

const skillsMap: Record<string, string[]> = {
    "Game Development": ["C++", "C#", "Lua", "Unity", "Unreal", "Godot"],
    "Web Development": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    "App Development": ["Flutter", "Dart", "React Native", "Swift", "Kotlin"],
    "Discord Bot Development": ["Discord.js", "Python", "Node.js", "API Integration"],
    "Server Development": ["Node.js", "Python", "SQL", "MongoDB", "Express"],
    // French
    "Développement Jeu": ["C++", "C#", "Lua", "Unity", "Unreal", "Godot"],
    "Développement Web": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    "Développement App": ["Flutter", "Dart", "React Native", "Swift", "Kotlin"],
    "Bot Discord": ["Discord.js", "Python", "Node.js", "API Integration"],
    "Serveur": ["Node.js", "Python", "SQL", "MongoDB", "Express"],
    // Arabic
    "تطوير الألعاب": ["C++", "C#", "Lua", "Unity", "Unreal", "Godot"],
    "تطوير الويب": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    "تطوير التطبيقات": ["Flutter", "Dart", "React Native", "Swift", "Kotlin"],
    "بوتات ديسكورد": ["Discord.js", "Python", "Node.js", "API Integration"],
    "تطوير الخوادم": ["Node.js", "Python", "SQL", "MongoDB", "Express"],
};

export function WhatIDo() {
    const { t } = useLanguage();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section id="what-i-do" className="py-24 relative z-[20]">
            <Container>
                <SectionTitle title={t.whatIDo.title} />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto"
                >
                    {t.whatIDo.cards.map((item, index) => {
                        const Icon = iconMap[item.title] || Code2;
                        const skills = skillsMap[item.title] || [];

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300"
                            >
                                <div className="bg-[#0c0c1d] p-6 rounded-2xl h-full flex flex-col gap-4 hover:bg-[#151525] transition-colors relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 z-10">
                                        <Icon className="text-white w-6 h-6" size={24} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white z-10">{item.title}</h3>
                                    <p className="text-gray-400 text-sm z-10">{item.desc}</p>

                                    {skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-auto z-10">
                                            {skills.map((skill, i) => (
                                                <span key={i} className="text-xs px-3 py-1 rounded-full border border-purple-500/30 text-purple-200 bg-purple-500/10">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Container>
        </section>
    );
}
