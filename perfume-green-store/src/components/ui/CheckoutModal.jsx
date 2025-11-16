import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, getCartTotal, clearCart, addGreenPoints } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (!checkoutOpen) return null;

  const total = getCartTotal() * 0.95;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete order
      const points = Math.floor(total);
      addGreenPoints(points);
      setStep(4);
      setTimeout(() => {
        clearCart();
        setCheckoutOpen(false);
        setStep(1);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setCheckoutOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {step === 4 ? (
            // Success screen
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
                className="text-8xl mb-6"
              >
                ✨
              </motion.div>
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                Order Confirmed!
              </h2>
              <p className="text-xl text-gray-200 mb-6">
                Thank you for choosing eco-friendly luxury
              </p>
              <div className="glass-effect rounded-2xl p-6 inline-block">
                <div className="text-6xl mb-2">🌱</div>
                <div className="text-2xl font-bold text-mint-green">
                  +{Math.floor(total)} Green Points
                </div>
              </div>
              {/* Confetti effect */}
              <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                    animate={{ y: window.innerHeight + 100, opacity: 0 }}
                    transition={{ duration: 2 + Math.random(), delay: Math.random() * 0.5 }}
                    className="absolute text-4xl"
                  >
                    {['🌸', '🌿', '🍃', '💚', '✨'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-display font-bold text-white">
                  Checkout
                </h2>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="text-2xl text-white hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>

              {/* Progress steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step >= s
                          ? 'bg-leaf-green text-white'
                          : 'bg-white bg-opacity-20 text-gray-400'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all ${
                          step > s ? 'bg-leaf-green' : 'bg-white bg-opacity-20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Contact Information
                    </h3>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Shipping Address
                    </h3>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                      />
                      <input
                        type="text"
                        name="zip"
                        placeholder="ZIP code"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Payment Details
                    </h3>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Order summary */}
                <div className="glass-effect rounded-2xl p-4 mt-6 mb-6">
                  <div className="flex justify-between text-white">
                    <span>Total:</span>
                    <span className="text-2xl font-bold text-mint-green">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex gap-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 bg-white bg-opacity-10 hover:bg-opacity-20 text-white py-3 rounded-xl transition-all"
                    >
                      Back
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-leaf-green to-mint-green text-white py-3 rounded-xl font-semibold"
                  >
                    {step === 3 ? 'Complete Order' : 'Continue'}
                  </motion.button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
