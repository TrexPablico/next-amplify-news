import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const nameRegex = /^[A-Za-z\s]*$/; // Letters and spaces only
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Debugging logs
    console.log("Name validation:", nameRegex.test(formData.user_name));
    console.log("Email validation:", emailRegex.test(formData.user_email));

    if (!nameRegex.test(formData.user_name)) {
      toast.error("Name can only contain letters and spaces");
      return;
    }

    if (
      formData.user_name.trim().length < 2 ||
      formData.user_name.length > 30
    ) {
      toast.error("Name must be between 2-30 characters");
      return;
    }

    if (!emailRegex.test(formData.user_email)) {
      toast.error("Invalid email address");
      return;
    }

    if (
      formData.user_message.length < 10 ||
      formData.user_message.length > 500
    ) {
      toast.error("Message must be between 10-500 characters");
      return;
    }

    // Send email
    emailjs
      .send(
        "service_3i5nurf",
        "template_iosyxrb",
        formData,
        "xFX7lbU3Y_kHT7BOV"
      )
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({ user_name: "", user_email: "", user_message: "" });
      })
      .catch((error) => {
        console.error("Email error:", error);
        toast.error("Failed to send message");
      });
  };

  return (
    <div className="max-w-[90%] mx-auto mt-20 mb-20 flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Left side content (same as before) */}

      <div className="md:w-1/2 mt-8 md:mt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block font-semibold">Your Name</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={(e) =>
              setFormData({ ...formData, user_name: e.target.value })
            }
            placeholder="Enter your name"
            className="w-full bg-indigo-100 p-4 rounded focus:outline-none"
          />

          <label className="block font-semibold">Your Email</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={(e) =>
              setFormData({ ...formData, user_email: e.target.value })
            }
            placeholder="example@email.com"
            className="w-full bg-indigo-100 p-4 rounded focus:outline-none"
          />

          <label className="block font-semibold">Your Message here</label>
          <textarea
            name="user_message"
            value={formData.user_message}
            onChange={(e) =>
              setFormData({ ...formData, user_message: e.target.value })
            }
            rows={6}
            placeholder="Enter your message"
            className="w-full bg-indigo-100 p-4 rounded focus:outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-red-600 text-white py-3 px-6 rounded hover:bg-orange-700 transition duration-300"
          >
            Send Message
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default Contact;
