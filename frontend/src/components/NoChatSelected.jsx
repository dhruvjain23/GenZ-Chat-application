import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative mb-2">
            <div
              className=" h-16 rounded-2xl flex items-center
             justify-center animate-bounce"
            >
              <img src='/zzlogo.png' className="w-[250px] h-[150px] text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="relative text-4xl font-bold text-white  tracking-wide">
            Gen-Z <span className="text-blue-400">chat-Z</span>
            <span className="absolute top-0 left-0 w-full h-full text-blue-500 blur-sm opacity-100 animate-pulse">Gen-Z chat-Z</span>
        </h1>
        <p className="text-base-content/60 text-yellow-300  bg-opacity-10 animate-pulse ">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;