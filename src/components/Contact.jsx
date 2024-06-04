import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp, FaTelegram, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
      <motion.div
        className="min-h-screen flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="contact-container bg-white  p-8 rounded-lg shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Me</h2>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <ContactInfo
              icon={<FaPhone />}
              label="Phone"
              value="+992 401 27 04 04"
            />
            <ContactInfo
              icon={<FaWhatsapp />}
              label="WhatsApp"
              value="+992 808 10 10 06"
            />
            <ContactInfo
              icon={<FaTelegram />}
              label="Telegram"
              value="@ibnmirzorahim"
            />
            <ContactInfo
              icon={<FaEnvelope />}
              label="Email"
              value="muhammadismoil11a@gmail.com"
            />
          </div>
          <a
            href="https://github.com/webdeveloper-tj"
            className="text-blue-600 hover:underline block mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            My GitHub
          </a>
          <Link
            to="/"
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Back
          </Link>
        </div>
      </motion.div>
  );
}

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-center">
    <span className="mr-2 text-xl text-gray-900">{icon}</span>
    <div>
      <p className="text-lg">{label}:</p>
      <p className="text-lg">{value}</p>
    </div>
  </div>
);

export default Contact;
