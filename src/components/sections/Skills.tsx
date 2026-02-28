"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../providers/LanguageProvider";
import { SectionTitle } from "../ui/SectionTitle";
import { Container } from "../ui/Container";

const skillCategories = [
    {
        category: "frontend",
        title: "Frontend & Web",
        skills: [
            { name: "JavaScript", level: 95, label: "Expert" },
            { name: "TypeScript", level: 85, label: "Advanced" },
            { name: "HTML5", level: 95, label: "Expert" },
            { name: "CSS3", level: 95, label: "Expert" },
            { name: "PHP", level: 80, label: "Advanced" },
        ],
    },
    {
        category: "systems",
        title: "Systems & Game Dev",
        skills: [
            { name: "C#", level: 85, label: "Advanced" },
            { name: "C++", level: 85, label: "Advanced" },
            { name: "Lua", level: 80, label: "Advanced" },
            { name: "C", level: 70, label: "Intermediate" },
            { name: "Rust", level: 65, label: "Intermediate" },
            { name: "GDScript", level: 70, label: "Intermediate" },
        ],
    },
    {
        category: "mobile",
        title: "Mobile & Modern",
        skills: [
            { name: "Flutter", level: 85, label: "Advanced" },
            { name: "Dart", level: 85, label: "Advanced" },
            { name: "Swift", level: 70, label: "Intermediate" },
            { name: "Kotlin", level: 70, label: "Intermediate" },
            { name: "Go", level: 75, label: "Intermediate" },
        ],
    },
    {
        category: "backend",
        title: "Backend & Data",
        skills: [
            { name: "Python", level: 90, label: "Advanced" },
            { name: "SQL", level: 85, label: "Advanced" },
            { name: "Ruby", level: 70, label: "Intermediate" },
        ],
    },
];

const SkillBar = ({ name, level, label, delay }: { name: string; level: number; label: string; delay: number }) => (
    <div className="flex flex-col gap-1 mb-4">
        <div className="flex justify-between text-sm text-gray-300">
            <span>{name}</span>
            <span className="text-gray-500">{label}</span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            />
        </div>
    </div>
);

export function Skills() {
    const { t } = useLanguage();

    return (
        <section id="skills" className="py-24 relative z-[20]">
            <Container>
                <SectionTitle title={t.skills.title} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl mx-auto">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#0c0c1d] p-6 rounded-2xl border border-purple-500/10 hover:border-purple-500/30 transition-colors"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
                                {category.title}
                            </h3>
                            {category.skills.map((skill, i) => (
                                <SkillBar key={skill.name} {...skill} delay={i} />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
