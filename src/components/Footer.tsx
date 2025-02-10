import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-black py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between text-gray-500">
        {/* Links Section */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/media-gallery" className="hover:underline">
                Gallery
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details Section */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <p>Phone: +63 0917... / 0917....</p>
          <p>Email: example@gmail.com</p>
          <p>Address: Sample Address</p>
        </div>

        {/* Location Map Section */}
        <div className="w-full md:w-1/3">
          <h3 className="font-semibold text-lg mb-4">Our Location</h3>
          <div className="w-full h-40 bg-gray-400 rounded">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d959.3438502114159!2d120.23818663452509!3d15.889392074556723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339157586b700001%3A0x7534da447115759d!2sAguilar%20Town%20Hall!5e0!3m2!1sen!2sph!4v1736992021455!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
