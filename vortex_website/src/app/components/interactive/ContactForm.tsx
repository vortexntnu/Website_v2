"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * ContactForm — controlled contact form with basic client-side validation.
 *
 * Design rationale:
 * - A controlled form (`useState` for every field) lets us do real-time
 *   validation without a form library. We only validate on submit to avoid
 *   showing error messages before the user has finished typing.
 * - The form is a Client Component because it needs `useState` and an
 *   `onSubmit` handler. Keeping it separate from `contact/page.tsx` lets
 *   the page itself remain a Server Component for better SSR and metadata.
 * - On successful (simulated) submit we show a success message in the same
 *   space as the form — no page navigation or modal needed. This is the
 *   simplest UX that confirms the action was taken.
 * - Note: actual form submission is not wired to a backend yet. The
 *   `handleSubmit` function logs to the console. Connect to PocketBase or
 *   a service like Formspree when ready.
 */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: wire up to PocketBase or email API
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-[#262626] border border-[#374151] text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#c21c1c] transition-colors duration-150 placeholder:text-gray-600";

  if (submitted) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-8 flex flex-col items-center justify-center gap-4 text-center min-h-64">
        <span className="text-4xl">✓</span>
        <h3 className="text-xl font-semibold text-white">Message sent!</h3>
        <p className="text-gray-400 text-sm">
          Thanks for reaching out. We&apos;ll get back to you at{" "}
          <span className="text-white">{form.email}</span> as soon as possible.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="mt-2 text-sm text-[#c21c1c] hover:text-[#dc2626] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label className="block text-sm text-gray-300 mb-1.5" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-300 mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm text-gray-300 mb-1.5" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="What is your message about?"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-[#c21c1c] hover:bg-[#dc2626] text-white font-semibold py-3 px-8 transition-colors duration-200 w-fit"
      >
        Send Message
      </button>
    </form>
  );
}
