import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    setSelectedProduct(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-effect rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product visualization */}
            <div className="relative">
              <motion.div
                animate={{ rotate: isRotating ? 360 : rotation }}
                transition={{ duration: isRotating ? 3 : 0.5, repeat: isRotating ? Infinity : 0, ease: "linear" }}
                className="w-full aspect-square rounded-2xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${selectedProduct.color}40, ${selectedProduct.color}80)`,
                }}
              >
                <div className="text-9xl">💎</div>
              </motion.div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setRotation(rotation - 90)}
                  className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-xl transition-all"
                >
                  ← Rotate
                </button>
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-xl transition-all"
                >
                  {isRotating ? '⏸ Stop' : '▶ Auto'}
                </button>
                <button
                  onClick={() => setRotation(rotation + 90)}
                  className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-xl transition-all"
                >
                  Rotate →
                </button>
              </div>
            </div>

            {/* Product details */}
            <div className="text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-display font-bold mb-2">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <span className="capitalize">{selectedProduct.category}</span>
                    {selectedProduct.eco_certified && (
                      <span className="bg-leaf-green px-2 py-1 rounded-full text-xs">
                        🌿 Eco-Certified
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>

              <div className="text-4xl font-bold mb-4 text-mint-green">
                ${selectedProduct.price}
              </div>

              <p className="text-gray-200 mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Notes */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-lg">Scent Notes:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.notes.map((note, index) => (
                    <span
                      key={index}
                      className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-bold">{selectedProduct.rating}</span>
                </div>
                <span className="text-gray-300">
                  ({selectedProduct.reviews} reviews)
                </span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass-effect rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🌱</div>
                  <div className="text-xs">Plant-Based</div>
                </div>
                <div className="glass-effect rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🐰</div>
                  <div className="text-xs">Cruelty-Free</div>
                </div>
                <div className="glass-effect rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">♻️</div>
                  <div className="text-xs">Recyclable</div>
                </div>
                <div className="glass-effect rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🌍</div>
                  <div className="text-xs">Sustainable</div>
                </div>
              </div>

              {/* Add to cart button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-leaf-green to-mint-green text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Add to Cart 🛒
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
