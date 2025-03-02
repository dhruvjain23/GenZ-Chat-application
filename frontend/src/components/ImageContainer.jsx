const ImageContainer = ({ title, subtitle }) => {
    return (
      
  <div className="hidden  lg:flex items-center justify-center mt-14 p-12">
  <div className="max-w-md text-center">
    {/* ✅ Animated Glowing Grid */}
    <div className="grid grid-cols-3 gap-3 mb-8">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded-2xl ${
            i % 2 === 0 ? "bg-yellow-300/80 animate-pulse" : "bg-blue-300"
          }`}
          style={{
            animationDelay: `${i * 0.2}s`, // Adds a staggered animation effect
            animationDuration: "1.5s",
          }}
        />
      ))}
    </div>

    {/* ✅ Stylish Title with Gradient */}
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {title}
    </h2>

    {/* ✅ Subtle Subtitle */}
    <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
  </div>
</div>

    );
  };

  export default ImageContainer;

   // animated glowing grid

  // <div className="hidden lg:flex items-center justify-center mt-14 p-12">
  //     <div className="max-w-md text-center">
  //       {/* ✅ Animated Glowing Grid */}
  //       <div className="grid grid-cols-3 gap-3 mb-8">
  //         {[...Array(9)].map((_, i) => (
  //           <div
  //             key={i}
  //             className={`aspect-square rounded-2xl ${
  //               i % 2 === 0 ? "bg-primary/20 animate-pulse" : "bg-primary/10"
  //             }`}
  //             style={{
  //               animationDelay: `${i * 0.2}s`, // Adds a staggered animation effect
  //               animationDuration: "1.5s",
  //             }}
  //           />
  //         ))}
  //       </div>

  //       {/* ✅ Stylish Title with Gradient */}
  //       <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
  //         {title}
  //       </h2>

  //       {/* ✅ Subtle Subtitle */}
  //       <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
  //     </div>
  //   </div>



  // <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-600">
  //     {/* Blurred Glassmorphism Box */}
  //     <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-10 max-w-lg text-center border border-white/20">
  //       <h1 className="text-4xl font-extrabold text-white mb-4">
  //         Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Gen-Z chat-Z</span>
  //       </h1>
  //       <p className="text-white/70 text-lg mb-6">
  //         Connect, chat, and experience a new way of communication.
  //       </p>
  //       <button className="px-6 py-2 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-100 transition">
  //         Get Started
  //       </button>
  //     </div>
  //   </div>