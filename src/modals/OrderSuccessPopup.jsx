const OrderSuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-3">
          Order Submitted 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. Our team will contact you for
          confirmation within <strong>24 hours</strong>.
        </p>
        <button
          onClick={onClose}
          className="bg-yellow-500 cursor-pointer text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;
