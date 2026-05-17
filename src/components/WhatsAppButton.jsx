import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  // Replace with your real WhatsApp number
  const phoneNumber = "919876543210";

  const whatsappURL = `https://wa.me/${phoneNumber}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
        fixed bottom-28 right-6 z-50
        w-16 h-16
        flex items-center justify-center
        rounded-full
        bg-[#25D366]
        hover:scale-110
        transition-all duration-300
        shadow-[0_0_25px_rgba(37,211,102,0.5)]
        "
      >
        <FaWhatsapp className="text-white text-[38px]" />
      </button>

      {/* WhatsApp Popup */}
      {open && (
        <div
          className="
          fixed bottom-44 right-6 z-50
          w-[350px]
          rounded-3xl
          overflow-hidden
          shadow-2xl
          bg-white
          border border-green-200
          animate-in fade-in slide-in-from-bottom-5
          "
        >
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <FaWhatsapp className="text-[#25D366] text-2xl" />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  WhatsApp Support
                </h2>

                <p className="text-xs opacity-90">
                  Typically replies instantly
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="hover:rotate-90 transition-all"
            >
              <X />
            </button>
          </div>

          {/* Chat Preview */}
          <div className="bg-[#ece5dd] p-4">
            <div className="bg-white p-3 rounded-2xl shadow text-sm text-gray-800 leading-relaxed">
              👋 Hello! <br />
              Need help with jewelry products,
              pricing, orders, or delivery?
            </div>

            <div className="bg-white p-3 rounded-2xl shadow text-sm text-gray-800 mt-3 ml-auto w-fit">
              I want to know about your jewelry
              collection ✨
            </div>
          </div>

          {/* Footer */}
          <div className="p-4">
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="
              block
              w-full
              text-center
              bg-[#25D366]
              hover:bg-green-600
              text-white
              py-3
              rounded-xl
              font-semibold
              transition-all
              "
            >
              Continue on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}