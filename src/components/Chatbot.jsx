import { useState, useRef, useEffect } from "react";
import { Bot, Send, X } from "lucide-react";
import API from "../services/api";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome to our Jewellery Store ✨ How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto Scroll Ref
  const bottomRef = useRef(null);

  // Auto Scroll Effect
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Send Message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentMessage = input;

    // User Message
    const userMessage = {
      role: "user",
      text: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const { data } = await API.post("/ai/chat", {
        message: currentMessage,
      });

      const botMessage = {
        role: "bot",
        text:
          data.reply ||
          "Sorry, I couldn't understand.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "AI assistant is temporarily unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
     <button
  onClick={() => setOpen(!open)}
  className="
  fixed bottom-6 right-6 z-50
  flex items-center gap-3
  bg-gradient-to-r from-yellow-500 to-yellow-300
  hover:scale-105
  transition-all duration-300
  px-5 py-4
  rounded-full
  shadow-2xl
  animate-pulse
  "
>
  <div className="bg-black/10 p-2 rounded-full">
    <Bot className="text-black w-6 h-6" />
  </div>

  <p className="text-black font-semibold text-sm">
    Customer Support
  </p>
</button>
      {/* Chat Window */}
      {open && (
        <div
          className="
          fixed bottom-24 right-6 z-50
          w-[95%] sm:w-[380px]
          h-[600px]
          bg-black/95
          backdrop-blur-xl
          border border-yellow-500/20
          rounded-3xl
          shadow-[0_0_40px_rgba(255,215,0,0.15)]
          overflow-hidden
          flex flex-col
          "
        >
          {/* Header */}
          <div
            className="
            bg-gradient-to-r from-yellow-500 to-yellow-300
            p-4 flex items-center justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div className="bg-black p-2 rounded-full">
                <Bot className="text-yellow-400" />
              </div>

              <div>
                <h2 className="font-bold text-black">
                  Jewellery AI Assistant
                </h2>

                <p className="text-xs text-black/70">
                  Online Support
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="hover:rotate-90 transition-all"
            >
              <X className="text-black" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                  max-w-[80%]
                  px-4 py-3
                  rounded-2xl
                  text-sm
                  leading-relaxed
                  break-words
                  ${
                    msg.role === "user"
                      ? "bg-yellow-500 text-black"
                      : "bg-zinc-800 text-white"
                  }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="text-yellow-400 text-sm animate-pulse">
                AI is typing...
              </div>
            )}

            {/* Auto Scroll Target */}
            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="border-t border-zinc-700 p-4 flex gap-2">
            <input
              type="text"
              placeholder="Ask about jewelry..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              className="
              flex-1
              bg-zinc-900
              text-white
              px-4 py-3
              rounded-xl
              outline-none
              border border-zinc-700
              focus:border-yellow-500
              "
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              p-3
              rounded-xl
              transition-all
              disabled:opacity-50
              "
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}