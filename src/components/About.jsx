import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center mb-4 md:mb-0 md:mr-2">
          <span className="text-lg font-bold">K</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Karimov's Marketplace
        </h1>
        <div className="bg-gray-300 text-gray-600 rounded-full h-8 w-8 flex items-center justify-center ml-2">
          <span className="text-sm font-bold">Search</span>
        </div>
      </div>
      <br />
      <h1 className="text-3xl font-bold mb-4">
        About the Application Marketplace
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg mb-4"
      >
        Welcome to the Application Marketplace, created by Karimov
        Mohammadsmail. As the founder and developer of this platform, Karimov
        Mohammadismail has worked tirelessly to bring together a diverse range
        of applications for users to discover, explore, and enjoy.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg mb-4"
      >
        With a passion for innovation and a commitment to excellence, Karimov
        Mohammadismail has curated an exceptional collection of applications
        that cater to various interests and needs. Whether you're looking for
        productivity tools, entertainment apps, or utilities, the Application
        Marketplace offers something for everyone.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-lg mb-4"
      >
        Karimov Mohammadismail envisions the Application Marketplace as more
        than just a platform for downloading apps; it's a community-driven
        ecosystem where developers and users come together to exchange ideas,
        provide feedback, and foster collaboration. Join us on this exciting
        journey of innovation and discovery!
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-lg mb-4"
      >
        Thank you for being a part of the Application Marketplace. Together,
        we're shaping the future of app distribution and revolutionizing the way
        people experience digital technology.
      </motion.p>
      <Link
        to="/"
        className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-400"
      >
        Back
      </Link>
    </motion.div>
  );
};

export default About;
