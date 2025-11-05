import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { ArrowLeft } from "lucide-react";

function AddNewUrl() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePlay = () => {
    setError("");

    if (!url.trim()) {
      setError("⚠️ Please enter a video URL first.");
      return;
    }

    const video = document.createElement("video");

    // Directly playable HLS stream (.m3u8)
    if (url.endsWith(".m3u8")) {
      localStorage.setItem("videoUrl", url);
      navigate("/player");
      return;
    }

    // Check other playable formats
    const canPlay =
      video.canPlayType("video/mp4") ||
      video.canPlayType("application/vnd.apple.mpegurl");

    if (canPlay) {
      localStorage.setItem("videoUrl", url);
      navigate("/player");
    } else {
      setError("🚫 This video format is not supported by your browser.");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <div className="flex items-center mb-10 w-full max-w-5xl justify-center">
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
            className="text-3xl max-sm:text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" 
          >
            🎬 Add Video Url
          </motion.h1>
        </div>

      </div>

      <div className="relative bg-gray-900/80 backdrop-blur-2xl border border-gray-700/60 rounded-3xl p-10 w-full max-w-xl shadow-[0_0_40px_-10px_rgba(109,40,217,0.5)] text-center max-sm:max-w-[90%] max-sm:p-4">
        <h1 className="text-4xl max-sm:text-lg font-extrabold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🎬 Enter Your Video URL
        </h1>

        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/video.m3u8"
          className="w-full p-3 rounded-lg bg-gray-800/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 outline-none placeholder-gray-500 transition-all"
        />

        {error && (
          <div className="mt-5 text-sm text-red-400 bg-red-500/10 p-2 rounded-lg border border-red-500/30">
            {error}
          </div>
        )}

        <button
          onClick={handlePlay}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-500 hover:via-purple-500 hover:to-pink-400 transition-all duration-500 py-3 rounded-xl font-semibold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transform hover:-translate-y-[2px] max-sm:rounded-md max-sm:py-2"
        >
          ▶ Play Video
        </button>
      </div>
    </div>
  );
}

export default AddNewUrl;
