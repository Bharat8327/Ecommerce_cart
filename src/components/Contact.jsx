import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can add API call to send the message
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 mt-10">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Contact & Support
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          We're here to help! Feel free to ask any questions or share your feedback. Our support team will get back to you as soon as possible.
        </p>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
            <ul className="text-gray-700 space-y-2">
              <li>
                <span className="font-medium">Email:</span> support@ecommerce.com
              </li>
              <li>
                <span className="font-medium">Phone:</span> +1 234 567 890
              </li>
              <li>
                <span className="font-medium">Live Chat:</span> Available 24/7
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">FAQs</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Order tracking & delivery</li>
              <li>Returns & refunds</li>
              <li>Payment issues</li>
              <li>Account management</li>
            </ul>
          </div>
        </div>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold">
            Thank you for contacting us! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;