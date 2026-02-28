"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { SectionTitle } from "../ui/SectionTitle";
import { Container } from "../ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, X } from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [shake, setShake] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const triggerError = (msg?: string) => {
        setStatus("error");
        setShake(true);
        setToastMessage(msg || t.contact.error);
        setTimeout(() => setShake(false), 500);
    };

    const triggerSuccess = () => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setToastMessage(t.contact.success);
    };

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            triggerError("Please fill out all fields.");
            return;
        }

        setStatus("loading");

        const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
            triggerError("Email service not configured.");
            return;
        }

        try {
            await emailjs.send(
                emailJsServiceId,
                emailJsTemplateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_email: 'ysfvoiddev@gmail.com'
                },
                emailJsPublicKey
            );
            triggerSuccess();
        } catch (err) {
            console.error(err);
            triggerError();
        }

        setTimeout(() => setStatus("idle"), 5000);
    };

    return (
        <section id="contact" className="py-24 relative z-[20]">
            <Container>
                <SectionTitle title={t.contact.title} />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0c0c1d] p-8 md:p-12 rounded-2xl border border-purple-500/20 w-full max-w-2xl mx-auto relative overflow-hidden"
                >
                    {/* Top gradient accent line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                    <p className="text-gray-300 text-center mb-8 text-lg">
                        Want to order a custom game, website, app, bot, or server solution?
                        <br className="hidden md:block" /> Let&apos;s build something powerful together.
                    </p>

                    <div className="flex flex-col gap-6">
                        {/* Direct Email Button */}
                        <a
                            href="mailto:ysfvoiddev@gmail.com"
                            className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
                        >
                            <Mail className="w-5 h-5" />
                            ysfvoiddev@gmail.com
                        </a>

                        {/* Divider */}
                        <div className="flex items-center justify-center gap-4 my-2">
                            <div className="h-[1px] w-full bg-gray-700/50" />
                            <span className="text-gray-500 text-sm whitespace-nowrap">OR SEND A MESSAGE</span>
                            <div className="h-[1px] w-full bg-gray-700/50" />
                        </div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder={t.contact.formName || "Your Name"}
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-[#151525] border border-gray-800 text-white rounded-lg p-4 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder={t.contact.formEmail || "Your Email"}
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-[#151525] border border-gray-800 text-white rounded-lg p-4 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <textarea
                                name="message"
                                placeholder={t.contact.formMessage || "Project Details"}
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="bg-[#151525] border border-gray-800 text-white rounded-lg p-4 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            />
                            <button
                                type="submit"
                                disabled={
                                    status === "loading" ||
                                    status === "success" ||
                                    !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
                                    !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
                                }
                                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/80 font-semibold py-4 rounded-xl hover:bg-white/10 hover:text-white transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {(!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) ? (
                                    "Email service not configured"
                                ) : status === "loading" ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {t.contact.sending}
                                    </span>
                                ) : status === "success" ? (
                                    <span className="flex items-center gap-2 text-green-300">
                                        <CheckCircle size={18} />
                                        {t.contact.success}
                                    </span>
                                ) : status === "error" ? (
                                    <span className="flex items-center gap-2 text-red-300">
                                        <AlertCircle size={18} />
                                        {t.contact.error}
                                    </span>
                                ) : (
                                    <>
                                        {t.contact.send}
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    </div>
                </motion.div>
            </Container>

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#0c0c1d]/90 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
                    >
                        <div className={`absolute inset-0 opacity-20 pointer-events-none ${status === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`} />
                        {status === "success" ? (
                            <CheckCircle className="text-green-400 relative z-10" size={20} />
                        ) : (
                            <AlertCircle className="text-red-400 relative z-10" size={20} />
                        )}
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
