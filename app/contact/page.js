'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ref, push, onValue } from 'firebase/database';
import { db } from '../firebase_config';
import '../styles/contact.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [mounted, setMounted] = useState(false);

  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [commentData, setCommentData] = useState({ name: '', comment: '' });
  const [ratingData, setRatingData] = useState({ name: '', rating: 0 });

  const [submitted, setSubmitted] = useState({ feedback: false, comment: false, rating: false });

  const [feedbackList, setFeedbackList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [ratingList, setRatingList] = useState([]);

  useEffect(() => {
    setMounted(true);

    const feedbackRef = ref(db, 'feedbacks');
    const commentRef = ref(db, 'comments');
    const ratingRef = ref(db, 'ratings');

    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setFeedbackList(list.reverse());
    });

    onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setCommentList(list.reverse());
    });

    onValue(ratingRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setRatingList(list.reverse());
    });
  }, []);

  if (!mounted) return null;

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingNameChange = (e) => {
    const { value } = e.target;
    setRatingData((prev) => ({ ...prev, name: value }));
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    await push(ref(db, 'feedbacks'), { ...feedback, timestamp: Date.now() });
    setFeedback({ name: '', email: '', message: '' });
    setSubmitted((prev) => ({ ...prev, feedback: true }));
  };

  const submitComment = async (e) => {
    e.preventDefault();
    await push(ref(db, 'comments'), { ...commentData, timestamp: Date.now() });
    setCommentData({ name: '', comment: '' });
    setSubmitted((prev) => ({ ...prev, comment: true }));
  };

  const submitRating = async (e) => {
    e.preventDefault();
    await push(ref(db, 'ratings'), { ...ratingData, timestamp: Date.now() });
    setRatingData({ name: '', rating: 0 });
    setSubmitted((prev) => ({ ...prev, rating: true }));
  };

  return React.createElement(
    motion.section,
    {
      className: 'contact-container',
      initial: 'hidden',
      animate: 'visible',
      variants: fadeInUp,
      transition: { duration: 0.6 }
    },
    [
      React.createElement(motion.h1, { className: 'contact-title', key: 'title', variants: fadeInUp }, 'Kontak Saya'),

      // Form Masukan & Kritik
      React.createElement(
        motion.form,
        {
          onSubmit: submitFeedback,
          className: 'contact-form',
          key: 'feedbackForm',
          variants: fadeInUp,
          transition: { delay: 0.2 }
        },
        [
          React.createElement('h3', { key: 'fTitle' }, 'Masukan & Kritik'),
          submitted.feedback && React.createElement('p', { className: 'success-message', key: 'fSuccess' }, 'Terima kasih atas masukannya!'),
          React.createElement('input', {
            key: 'name', name: 'name', placeholder: 'Nama kamu', value: feedback.name,
            onChange: handleFeedbackChange, required: true
          }),
          React.createElement('input', {
            key: 'email', name: 'email', type: 'email', placeholder: 'Email kamu', value: feedback.email,
            onChange: handleFeedbackChange, required: true
          }),
          React.createElement('textarea', {
            key: 'message', name: 'message', placeholder: 'Tulis masukan atau kritik kamu...',
            value: feedback.message, onChange: handleFeedbackChange, rows: 4, required: true
          }),
          React.createElement('button', { key: 'submitFeedback', type: 'submit' }, 'Kirim Masukan')
        ]
      ),

      // Form Komentar
      React.createElement(
        motion.form,
        {
          onSubmit: submitComment,
          className: 'contact-form',
          key: 'commentForm',
          variants: fadeInUp,
          transition: { delay: 0.4 }
        },
        [
          React.createElement('h3', { key: 'cTitle' }, 'Komentar'),
          submitted.comment && React.createElement('p', { className: 'success-message', key: 'cSuccess' }, 'Komentar kamu berhasil dikirim!'),
          React.createElement('input', {
            key: 'cName', name: 'name', placeholder: 'Nama kamu', value: commentData.name,
            onChange: handleCommentChange, required: true
          }),
          React.createElement('textarea', {
            key: 'comment', name: 'comment', placeholder: 'Tulis komentar kamu di sini...',
            value: commentData.comment, onChange: handleCommentChange, rows: 3, required: true
          }),
          React.createElement('button', { key: 'submitComment', type: 'submit' }, 'Kirim Komentar')
        ]
      ),

      // Form Rating
      React.createElement(
        motion.form,
        {
          onSubmit: submitRating,
          className: 'contact-form',
          key: 'ratingForm',
          variants: fadeInUp,
          transition: { delay: 0.6 }
        },
        [
          React.createElement('h3', { key: 'rTitle' }, 'Rating'),
          submitted.rating && React.createElement('p', { className: 'success-message', key: 'rSuccess' }, 'Terima kasih atas rating-nya!'),
          React.createElement('input', {
            key: 'rName', name: 'name', placeholder: 'Nama kamu', value: ratingData.name,
            onChange: handleRatingNameChange, required: true
          }),
          React.createElement(
            'div',
            { className: 'rating-stars', key: 'stars' },
            [1, 2, 3, 4, 5].map((star) =>
              React.createElement(
                'span',
                {
                  key: star,
                  onClick: () => setRatingData((prev) => ({ ...prev, rating: star })),
                  style: {
                    fontSize: '1.5rem',
                    color: star <= ratingData.rating ? '#facc15' : '#e5e7eb',
                    cursor: 'pointer',
                    marginRight: '4px'
                  }
                },
                '★'
              )
            )
          ),
          React.createElement('button', { key: 'submitRating', type: 'submit', disabled: ratingData.rating === 0 }, 'Kirim Rating')
        ]
      ),

      // Section Data
      React.createElement(
        motion.form,
        {
          onSubmit: submitComment,
          className: 'contact-form',
          key: 'dataForm',
          variants: fadeInUp,
          transition: { delay: 0.4 }
        },
      React.createElement('section', { className: 'data-tables', key: 'dataSection' }, [
        React.createElement('h2', { key: 'dataTitle' }, 'Data Masuk'),

        React.createElement('div', { className: 'data-column', key: 'feedbacks' }, [
          React.createElement('h3', { key: 'fHead' }, 'Masukan & Kritik'),
          ...feedbackList.map((item) =>
            React.createElement('div', { key: item.id, className: 'data-card' }, [
              React.createElement('strong', { key: 'name' }, item.name),
              React.createElement('p', { key: 'email' }, item.email),
              React.createElement('p', { key: 'message' }, item.message)
            ])
          )
        ]),

        React.createElement('div', { className: 'data-column', key: 'comments' }, [
          React.createElement('h3', { key: 'cHead' }, 'Komentar'),
          ...commentList.map((item) =>
            React.createElement('div', { key: item.id, className: 'data-card' }, [
              React.createElement('strong', { key: 'name' }, item.name),
              React.createElement('p', { key: 'comment' }, item.comment)
            ])
          )
        ]),

        React.createElement('div', { className: 'data-column', key: 'ratings' }, [
          React.createElement('h3', { key: 'rHead' }, 'Rating'),
          ...ratingList.map((item) =>
            React.createElement('div', { key: item.id, className: 'data-card' }, [
              React.createElement('strong', { key: 'name' }, item.name),
              React.createElement('p', { key: 'rate' }, '⭐'.repeat(item.rating || 0))
            ])
          )
        ])
      ]
      )
    )
    ]
  );
}