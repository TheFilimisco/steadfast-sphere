// components/ContactForm.jsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        fetch("https://formspree.io/f/xqalkavk", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: new FormData(form),
        }).then(() => {
          setSent(true);
          form.reset();
        });
        setTimeout(() => {
          setSent(false);
        }, 3000);
      }}
      className="
  bg-[#E8D4B1] 
  shadow-lg 
  p-6 sm:p-10 md:p-16 lg:p-20 
  space-y-4 
  w-full 
  h-full
  mx-auto
"
    >
      {sent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-[#9B696A] text-white rounded-2xl px-4 py-2 text-center w-fit mx-auto"
        >
          Sent!
        </motion.div>
      )}

      <div className="flex flex-col">
        <input
          required
          type="text"
          name="name"
          defaultValue="Name"
          className="w-full text-sm mt-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#85282b] bg-[#c0ad8c]  text-[#414040]"
        />
      </div>

      <div className="flex flex-col">
        <input
          required
          type="email"
          name="email"
          defaultValue="Email"
          className="text-sm mt-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#85282b] bg-[#c0ad8c] text-[#414040]"
        />
      </div>

      <div className="flex flex-col">
        <textarea
          required
          name="message"
          rows="4"
          defaultValue="Request"
          className="text-base mt-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#85282b] bg-[#c0ad8c]  text-[#414040]"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="mx-auto w-full bg-[#85282b] text-white py-2 p- mt-4 text-xl"
      >
        Send
      </motion.button>
    </motion.form>
  );
}
