import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function ShoppingCart() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    setCheckoutOpen,
  } = useStore();

  if (!cartOpen) return null;

  const total = getCartTotal();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-effect h-full w-full max-w-md p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-white">
              Shopping Cart 🛒
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-2xl text-white hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>

          {/* Cart items */}
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-gray-300 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">
                Explore our botanical collection
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="glass-effect rounded-2xl p-4"
                  >
                    <div className="flex gap-4">
                      {/* Product image placeholder */}
                      <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}40, ${item.color}80)`,
                        }}
                      >
                        💎
                      </div>

                      {/* Product details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-300 mb-2">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold transition-all"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-white font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold transition-all"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      {/* Item total */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-mint-green">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="glass-effect rounded-2xl p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Subtotal:</span>
                  <span className="text-white font-semibold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Eco Discount:</span>
                  <span className="text-mint-green font-semibold">
                    -${(total * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-white border-opacity-20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-2xl font-bold text-mint-green">
                      ${(total * 0.95).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                }}
                className="w-full bg-gradient-to-r from-leaf-green to-mint-green text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Proceed to Checkout ✨
              </motion.button>

              {/* Green points earned */}
              <div className="mt-4 text-center text-sm text-gray-300">
                🌱 Earn {Math.floor(total)} green points with this purchase!
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
