import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        src="/videos/innin.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      ></video>

      <div className="relative z-10">
        <div className="min-h-screen bg-gradient-to-t from-transparent to-black/60 flex flex-col items-center justify-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Welcome to InningsNow
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
            Track live cricket scores and manage your matches with ease
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-green-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
