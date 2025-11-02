import { useEffect, useState } from "react";
import { X } from "lucide-react"; // ✅ Import close icon from lucide-react

const PolicyPopup = ({ isOpen, onClose, data }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!data) return null;

  return (
    <>
      {isOpen && (
        <div
          className={`fixed content-font inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50 p-4 transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[70vh] scrollbar transform transition-all duration-300 ${
              visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between gap-5 items-center border-b border-gray-300 pb-3 mb-4">
              <h2 className="text-[15px] md:text-xl font-semibold text-gray-800">{data.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors duration-200"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* Content */}
            <div
              className="text-gray-600 md:text-lg text-sm leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{
                __html: data.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PolicyPopup;
