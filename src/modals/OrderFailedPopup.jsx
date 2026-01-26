// components/checkout/OrderFailedPopup.jsx
const OrderFailedPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-3">
          Order Failed ❌
        </h2>
        <p className="text-gray-600 mb-6">
          Something went wrong while placing your order. Please try again.
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderFailedPopup;
