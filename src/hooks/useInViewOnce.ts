"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useInViewOnce(margin = "-100px") {
    const ref = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInView = useInView(ref, { once: true, margin: margin as any });
    return { ref, isInView };
}
