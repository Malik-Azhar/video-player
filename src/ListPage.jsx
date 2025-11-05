import { PlayCircle, Video, ArrowLeft, Link as LinkIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import videos from "./videos";

const ListPage = () => {
  const navigate = useNavigate();

  const handlePlay = (url) => {
    localStorage.setItem("videoUrl", url);
    navigate("/player");
  };

  useEffect(() => {
    localStorage.removeItem("videoUrl");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center px-5 py-10">
      {/* Header */}
      <div className="flex items-center mb-10 w-full max-w-5xl justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            🎬 Select an Episode
          </motion.h1>
        </div>

        {/* Custom URL Button */}
        <Link to={"/add"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:from-pink-400 hover:via-purple-500 hover:to-blue-500 px-6 py-3 rounded-xl text-white font-semibold shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all"
          >
            <LinkIcon className="w-5 h-5" />
            Play Custom URL
          </motion.button>
        </Link>
      </div>

      {/* Video List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl"
      >
        {videos.map((video, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative bg-gray-900/70 border border-gray-700 rounded-2xl overflow-hidden shadow-[0_0_30px_-10px_rgba(168,85,247,0.4)] group cursor-pointer transition-all"
            onClick={() => handlePlay(video.url)}
          >
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Thumbnail placeholder */}
            <div className="flex items-center justify-center h-48 bg-gradient-to-br from-gray-800 to-gray-900">
              <Video className="w-12 h-12 text-gray-500 group-hover:text-purple-400 transition-colors duration-300" />
            </div>

            {/* Title */}
            <div className="p-5 text-center">
              <h2 className="text-lg font-semibold mb-3">{video.title}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
              >
                <PlayCircle className="w-4 h-4" /> Play Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ListPage;
