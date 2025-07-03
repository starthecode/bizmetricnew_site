import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';

export default function YoutubeEmbedVideo({ videoId }) {
  const [isIframeVisible, setIsIframeVisible] = React.useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="relative cursor-pointer group overflow-hidden rounded-xl"
      onClick={() => setIsIframeVisible(true)}
    >
      {isIframeVisible ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          <img
            src={thumbnailUrl}
            alt="YouTube video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl bg-white/60 p-2 rounded-full flex justify-center">
              <FaPlayCircle size={30} className="fill-flamingo-600" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
