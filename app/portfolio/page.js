'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import '../styles/portfolio.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const projects = [
  {
    title: "Website E-Commerce",
    desc: "Proyek toko online berbasis PHP dan Firebase Realtime Database. Sistem mencakup fitur login, register, manajemen produk, checkout, dan halaman detail pembelian.",
    img: "/images/ecommerce.jpeg",
  },
  {
    title: "Website Portofolio",
    desc: "Website portofolio pribadi yang elegan dan minimalis menggunakan Next.js, Tailwind CSS, fitur theme toggle, halaman about, contact form dengan Firebase dan EmailJS, serta chatbot AI.",
    img: "/images/portfolio.jpg",
  }
];

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.div
      className="portfolio-container"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="portfolio-title"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        Proyek Saya
      </motion.h1>

      {projects.map((project, i) => (
        <motion.div
          key={i}
          className="project"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
        >
          <div className="project-image-wrapper">
            <Image
              src={project.img}
              alt={`Gambar dari ${project.title}`}
              width={800}
              height={450}
              className="project-image"
            />
          </div>
          <h2 className="project-title">{project.title}</h2>
          <p className="project-description">{project.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};



export default Portfolio;
