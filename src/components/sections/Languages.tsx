"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../providers/LanguageProvider";
import { SectionTitle } from "../ui/SectionTitle";
import { Container } from "../ui/Container";

export function Languages() {
    const { t } = useLanguage();

    const languages = [
        { code: "AR", name: t.languages.ar, level: t.languages.arLvl, flag: "🇲🇦" },
        { code: "FR", name: t.languages.fr, level: t.languages.frLvl, flag: "🇫🇷" },
        { code: "EN", name: t.languages.en, level: t.languages.enLvl, flag: "🇬🇧" },
    ];

    return (
        <section id="languages" className="py-24 relative z-[20]">
            <Container>
                <SectionTitle title={t.languages.title} />

                <div className="flex flex-wrap gap-6 justify-center w-full max-w-4xl mx-auto">
                    {languages.map((lang, index) => (
                        <motion.div
                            key={lang.code}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-4 bg-[#0c0c1d] px-8 py-4 rounded-xl border border-purple-500/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-default"
                        >
                            <span className="text-4xl">{lang.flag}</span>
                            <div className="flex flex-col">
                                <span className="text-white text-xl font-bold">{lang.name}</span>
                                <span className="text-gray-400 text-sm">{lang.level}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
