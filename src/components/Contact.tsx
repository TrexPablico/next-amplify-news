import React, { useState, useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const nameRegex = /^[A-Za-z\s]*$/; // Letters and spaces only
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation

    // Debugging logs
    console.log("Name validation:", nameRegex.test(formData.user_name));
    console.log("Email validation:", emailRegex.test(formData.user_email));

    if (!nameRegex.test(formData.user_name)) {
      toast.error(
        "Name can only contain letters and spaces, and should not exceed 30 characters"
      );
      return;
    }

    if (formData.user_name.length > 30) {
      toast.error("Name cannot exceed 30 characters");
      return;
    }

    if (!emailRegex.test(formData.user_email)) {
      toast.error(
        "Invalid email address. It should contain @ and follow the correct format"
      );
      return;
    }

    if (
      formData.user_message.trim().length < 10 ||
      formData.user_message.length > 500
    ) {
      toast.error("Message must be between 10-500 characters");
      return;
    }

    // Send email
    emailjs
      .send(
        "service_4h5cnhh",
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
        toast.error(`Failed to send message: ${error.text || error.message}`);
      });
  };

  return (
    <div className="max-w-[90%] mx-auto mt-20 mb-20 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="md:w-1/2 text-gray-600">
        <h3 className="text-[#000f38] font-medium text-2xl flex items-center mb-5">
          Send us a Message <FaEnvelope className="ml-2 w-9" />
        </h3>
        <p className="max-w-md leading-relaxed">
          We’re here to serve you! Whether you need assistance with property
          assessments, zoning information, or tax inquiries, our dedicated team
          is ready to help.
          <br />
          <br />
          For property owners, let us provide clarity and guidance to ensure
          your assessments are accurate and fair. Share your questions or
          concerns with us—your satisfaction is our priority.
        </p>

        <ul className="space-y-5 mt-5">
          <li className="flex items-center">
            <FaEnvelope className="w-6 mr-2" />
            assessoremailsample@gmail.com
          </li>
          <li className="flex items-center">
            <FaPhone className="w-6 mr-2" />
            0915 688 5768
          </li>
          <li className="flex items-center">
            <FaMapMarkerAlt className="w-6 mr-2" />
            Pangasinan Assessors office address
          </li>
        </ul>
      </div>

      <form
        ref={form}
        onSubmit={handleSubmit}
        className="space-y-5 lg:w-1/2 w-full"
      >
        <label className="block font-semibold">Your Name</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={(e) =>
            setFormData({ ...formData, user_name: e.target.value })
          }
          placeholder="Enter your name"
          required
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
          required
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
          required
          className="w-full bg-indigo-100 p-4 rounded focus:outline-none resize-none"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-400 transition duration-300"
        >
          Send Message
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default Contact;
