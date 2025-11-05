import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hls from "hls.js";
import { motion } from 'framer-motion';
import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaMuteButton,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import { ArrowLeft } from "lucide-react";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [videoSrc, setVideoSrc] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUrl = localStorage.getItem("videoUrl");

    if (!storedUrl) {
      setError("⚠️ No video found! Redirecting to list page...");
      setTimeout(() => navigate("/"), 2500);
      return;
    }

    // Basic validation for playable video formats
    if (!storedUrl.startsWith("http")) {
      setError("🚫 Invalid video URL! Redirecting...");
      setTimeout(() => navigate("/"), 2500);
      return;
    }

    setVideoSrc(storedUrl);
  }, [navigate]);

  useEffect(() => {
    if (!videoSrc) return;

    const video = videoRef.current;

    try {
      if (Hls.isSupported() && videoSrc.endsWith(".m3u8")) {
        const hls = new Hls({
          maxBufferSize: 10 * 1000 * 1000,
          maxBufferLength: 10,
          liveSyncDurationCount: 2,
          enableWorker: true,
          lowLatencyMode: true,
          startLevel: 0,
          capLevelOnFPSDrop: true,
        });

        hls.loadSource(videoSrc);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error("HLS error:", data);
          if (data.fatal) {
            setError("❌ Video cannot be played! Redirecting...");
            setTimeout(() => navigate("/"), 2500);
          }
        });

        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      } else {
        video.src = videoSrc;
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Unable to play this video. Redirecting...");
      setTimeout(() => navigate("/"), 2500);
    }
  }, [videoSrc, navigate]);

  // 🔸 Error Screen
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-400 text-center">
        <div className="bg-red-500/10 border border-red-600/30 p-6 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.3)] max-w-md">
          <h2 className="text-2xl font-bold mb-2">⚠ Video Error</h2>
          <p className="text-sm">{error}</p>
          <p className="mt-3 text-gray-400 text-xs">
            You’ll be redirected shortly...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all absolute top-8 left-8 z-20 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      <MediaController
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <video
          ref={videoRef}
          slot="media"
          autoPlay
          playsInline
          controls={false}
          style={{ width: "100%", height: "100%" }}
        ></video>

        <MediaControlBar>
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default VideoPlayer;
