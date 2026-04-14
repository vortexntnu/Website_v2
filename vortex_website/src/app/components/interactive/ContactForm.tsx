"use client";

import { useState } from "react";

/**
 * ContactForm — opens the user's default email client with the subject
 * and message pre-filled via a mailto: link. No backend required.
 */
export default function ContactForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});

  const inputClass =
    "w-full bg-[#262626] border border-[#374151] text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#c21c1c] transition-colors duration-150 placeholder:text-gray-600";

  const handleSend = () => {
    const newErrors: { subject?: string; message?: string } = {};
    if (!subject.trim()) newErrors.subject = "Subject is required.";
    if (!message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const mailto =
      `mailto:post@vortexntnu.no` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(message)}`;

    window.location.href = mailto;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Subject */}
      <div>
        <label className="block text-sm text-gray-300 mb-1.5" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="What is your message about?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
        />
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm text-gray-300 mb-1.5" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <button
        type="button"
        onClick={handleSend}
        className="bg-[#c21c1c] hover:bg-[#dc2626] text-white font-semibold py-3 px-8 transition-colors duration-200 w-fit"
      >
        Send Message
      </button>
    </div>
  );
}
