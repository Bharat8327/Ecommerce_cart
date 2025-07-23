import React from 'react';
import { useState } from 'react';
import {
  FaShippingFast,
  FaHeadset,
  FaUndo,
  FaLock,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

const faqs = [
  {
    question: 'How do I track my order?',
    answer:
      'Once your order is shipped, you will receive an email with a tracking link. You can also track your order in your account dashboard.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, and secure online banking options.',
  },
  {
    question: 'How do I return a product?',
    answer:
      'You can initiate a return from your order history page. Our support team is always ready to help you with the process.',
  },
];

const features = [
  {
    icon: <FaShippingFast className="text-blue-500 text-3xl" />,
    title: 'Fast Shipping',
    desc: 'Get your products delivered quickly and reliably.',
  },
  {
    icon: <FaLock className="text-green-500 text-3xl" />,
    title: 'Secure Payments',
    desc: 'Your transactions are protected with top-grade security.',
  },
  {
    icon: <FaUndo className="text-yellow-500 text-3xl" />,
    title: 'Easy Returns',
    desc: 'Hassle-free returns and refunds for your peace of mind.',
  },
  {
    icon: <FaHeadset className="text-purple-500 text-3xl" />,
    title: '24/7 Support',
    desc: 'Our team is here to help you anytime, anywhere.',
  },
];

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="max-full min-h-screen mx-auto mt-16  p-8 bg-white rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">
        About Our Ecommerce Website
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Welcome to our Ecommerce platform! Enjoy a seamless, secure, and fun
        online shopping experience with us.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">
          Our Mission
        </h2>
        <p className="text-gray-600">
          We aim to make online shopping easy, secure, and accessible for
          everyone. High-quality products, competitive prices, and excellent
          customer service are our promises to you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="mr-4">{f.icon}</div>
              <div>
                <div className="font-bold text-lg">{f.title}</div>
                <div className="text-gray-600 text-sm">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg">
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 focus:outline-none"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.question}
                {openFaq === idx ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-3 text-gray-600 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">
          Contact Us
        </h2>
        <p className="text-gray-600">
          Have questions or need assistance? Reach out to our support team at{' '}
          <a
            href="mailto:support@ecommerce.com"
            className="text-blue-500 underline hover:text-blue-700"
          >
            online@ecommerce.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default About;
