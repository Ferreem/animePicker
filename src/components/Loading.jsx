import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <>
      <div className="h-full w-full bg-slate-900 z-50 inset-0 m flex flex-col items-center justify-center font-bold">
        <motion.div className="mb-12"
      style={{
        width: '75px',
        height: '75px',
        border: '2px solid white',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
        />
        <div>Loading...</div>
      </div>
    </>
  );
}
