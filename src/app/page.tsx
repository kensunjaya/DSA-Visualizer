"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Particle } from "@/components/particle";
import { motion } from "framer-motion"
import { AuthorProfile } from "@/components/profile";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-screen p-5 flex font-play text-secondary">
      <AuthorProfile />
      <Particle />
      <div className="relative flex flex-col items-center w-full justify-center z-10">
        <div className="text-4xl font-press mb-10">VisualBox</div>
        <div className="space-x-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-5 bg-secondary text-white text-xl w-fit h-fit"
            onClick={() => router.push("/linked-list")}
          >
            <img src="https://algofrus.wordpress.com/wp-content/uploads/2016/08/list.gif" className="w-80 h-auto" alt="Linked List" />
            <div className="mt-3">Linked List</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-5 bg-secondary text-white text-xl w-fit h-fit"
            onClick={() => router.push("/sorting")}
          >
            <img src="https://visualgo.net/img/gif/sorting.gif" className="w-80 h-auto" alt="Sorting" />
            <div className="mt-3">Sorting</div>
          </motion.button>
        </div>
      </div>
    </main>
  );
}

