'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className="about-container"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="about-title"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Tentang Saya
      </motion.h1>

      {[...Array(3)].map((_, i) => (
        <motion.div
          className="section"
          key={i}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
        >
          {i === 0 && (
            <>
              <h2 className="section-title">🎓 Pendidikan</h2>
              <ul className="list">
                <li>Universitas Ma&apos;soem, Sistem Informasi – (2023 - Sekarang)</li>
                <li>SMA Negeri 1 Rancaekek (2019 - 2022)</li>
                <li>SMP Negeri 1 Rancaekek (2016 - 2019)</li>
              </ul>
            </>
          )}
          {i === 1 && (
            <>
              <h2 className="section-title">💼 Pengalaman</h2>
              <ul className="list">
                <li>Panitia Wisuda Universitas Ma&apos;soem Tahun 2024 </li>
                <li>Anggota Aktif Korps Protokol</li>
              </ul>
            </>
          )}
          {i === 2 && (
            <>
              <h2 className="section-title">🛠️ Skill</h2>
              <ul className="list">
                <li>HTML, CSS, JavaScript</li>
                <li>React.js, Next.js</li>
                <li>Tailwind CSS, Framer Motion</li>
                <li>Firebase, PHP & MySQL</li>
                <li>Git & GitHub</li>
              </ul>
            </>
          )}
        </motion.div>
      ))}
    </motion.section>
  );
}
