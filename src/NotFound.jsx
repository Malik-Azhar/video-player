import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

      {/* Animated floating icon background */}
      <motion.div
        className="absolute text-[#FF5300] opacity-10 top-10 left-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <AlertTriangle size={120} />
      </motion.div>
      <motion.div
        className="absolute text-[#FF5300] opacity-10 bottom-10 right-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <AlertTriangle size={120} />
      </motion.div>

      {/* Logo */}
      <motion.img
        src="/opinionuniverse.png"
        alt="Opinion Universe Logo"
        className="w-44 h-auto mb-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />

      {/* Header */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold z-10"
        style={{ color: '#FF5300' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
      >
        404 - Page Not Found
      </motion.h1>

      {/* Message */}
      <motion.p
        className="mt-4 text-lg text-gray-700 max-w-lg z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Go Back Link */}
      <motion.div
        className="mt-8 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
          style={{
            backgroundColor: '#FF5300',
            boxShadow: '0 0 20px #FF530080',
          }}
        >
          Go back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
