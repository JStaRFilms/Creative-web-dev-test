"use client";

import dynamic from "next/dynamic";

const ForestScene = dynamic(() => import("@/components/ForestScene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-[#0a0f0a] flex items-center justify-center">
      <div className="text-[#8aa898] font-serif text-lg tracking-widest animate-pulse">
        Entering the forest...
      </div>
    </div>
  ),
});

const ScrollExperience = dynamic(() => import("@/components/ScrollExperience"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative">
      <ForestScene />
      <ScrollExperience />
    </main>
  );
}
