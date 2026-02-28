"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../providers/LanguageProvider";
import { fetchRepos, getDisplayRepos, GitHubRepo } from "@/lib/github";
import { cn } from "@/lib/utils";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { SkeletonCard } from "../ui/SkeletonCard";
import { Star, GitFork, ExternalLink, Github, Search } from "lucide-react";

export function Projects() {
    const { t } = useLanguage();
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState<"all" | "starred" | "updated">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "YSFVoid";
    const pinnedRaw = process.env.NEXT_PUBLIC_PINNED_REPOS || "";
    const pinnedList = useMemo(() => pinnedRaw.split(",").filter(Boolean), [pinnedRaw]);
    const hasFetched = useRef(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        async function loadRepos() {
            try {
                setLoading(true);
                const fetched = await fetchRepos(githubUsername);
                if (!fetched || fetched.length === 0) {
                    setError(true);
                } else {
                    const displayRepos = getDisplayRepos(fetched, pinnedList);
                    setRepos(displayRepos);
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadRepos();
    }, [githubUsername, pinnedList]);

    // Apply filters and search
    let filteredRepos = [...repos];

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredRepos = filteredRepos.filter(
            (r) => r.name.toLowerCase().includes(q) || (r.description && r.description.toLowerCase().includes(q))
        );
    }

    if (filter === "starred") {
        filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (filter === "updated") {
        filteredRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }
    // "all" keeps the initial order (pinned first, then rest)

    const displayLimit = isMobile ? 6 : 8;
    const displayedRepos = filteredRepos.slice(0, displayLimit);

    return (
        <section id="projects" className="py-24 relative z-10">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <SectionTitle title={t.projects.title} alignment="left" className="mb-0" />

                    <Button variant="outline" asChild className="hidden md:flex gap-2">
                        <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
                            <Github size={18} />
                            {t.projects.openProfile}
                        </a>
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-full border border-white/10 shadow-inner">
                        {(["all", "starred", "updated"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "relative px-5 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                                    filter === f ? "text-white" : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                                )}
                            >
                                {filter === f && (
                                    <motion.div
                                        layoutId="project-filter-pill"
                                        className="absolute inset-0 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(112,66,248,0.5)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    />
                                )}
                                <span className="relative z-10">{t.projects[f]}</span>
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-purple-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={t.projects.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-light"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {Array.from({ length: displayLimit }).map((_, i) => (
                            <SkeletonCard key={i} className="h-64" />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-xl text-neutral-400 mb-6">{t.projects.error}</p>
                        <Button asChild>
                            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
                                {t.projects.openProfile}
                            </a>
                        </Button>
                    </div>
                )}

                {/* Repo Grid */}
                {!loading && !error && (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {displayedRepos.map((repo) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={repo.id}
                                    className="h-full"
                                >
                                    <Card gradientBorder className="h-full flex flex-col group relative overflow-hidden">
                                        {/* Hover overlay gradient */}
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(112,66,248,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <h3 className="text-xl font-bold text-white line-clamp-1 break-all flex-1 pr-2 group-hover:text-purple-300 transition-colors" title={repo.name}>
                                                {repo.name}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-neutral-500 shrink-0">
                                                <span className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                                                    <Star size={14} /> {repo.stargazers_count}
                                                </span>
                                                <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                                                    <GitFork size={14} /> {repo.forks_count}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-neutral-400 text-sm mb-8 flex-grow line-clamp-3 relative z-10 font-light leading-relaxed">
                                            {repo.description || "No description provided."}
                                        </p>

                                        <div className="flex justify-between items-end mt-auto relative z-10">
                                            <div className="flex flex-col gap-2.5">
                                                {repo.language && (
                                                    <Badge variant="outline" className="w-fit text-[11px] px-2.5 py-0.5 border-white/10 bg-white/5 text-neutral-300">
                                                        {repo.language}
                                                    </Badge>
                                                )}
                                                <span className="text-xs text-neutral-500 font-medium">
                                                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2.5 rounded-full bg-white/5 hover:bg-purple-600 text-neutral-300 hover:text-white transition-all duration-300 border border-white/10 hover:border-purple-500 hover:scale-110 shadow-lg hover:shadow-[0_0_15px_rgba(112,66,248,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                                                title={t.projects.viewRepo}
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Mobile Profile Button */}
                <div className="mt-8 flex justify-center md:hidden">
                    <Button variant="outline" asChild className="w-full justify-center gap-2">
                        <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
                            <Github size={18} />
                            {t.projects.openProfile}
                        </a>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
