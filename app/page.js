'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles/homepage.css';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.section
      className="home-container"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="home-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
      >
        <motion.div
          className="profile-image-wrapper-square"
          variants={fadeInLeft}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src="/images/profile.jpg"
            alt="Foto Arumdafta Nawa Hagiaza"
            width={360}
            height={360}
            className="profile-image-square"
          />
        </motion.div>

        <motion.div
          className="profile-text"
          variants={fadeInRight}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="profile-name">Arumdafta Nawa Hagiaza</h1>
          <p className="profile-desc">
            Saya adalah mahasiswa Sistem Informasi yang memiliki minat besar dalam pengembangan web.
            Saat ini saya fokus belajar teknologi modern untuk membangun web yang responsif dan menarik.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
