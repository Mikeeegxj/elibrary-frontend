"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Template(props) {
	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				key={"body"}
			>
				{props.children}
			</motion.main>
		</AnimatePresence>
	);
}