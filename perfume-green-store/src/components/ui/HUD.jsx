import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/products';

export default function HUD() {
  const {
    selectedCategory,
    setCategory,
    searchQuery,
    setSearchQuery,
    getCartCount,
    toggleCart,
    greenPoints,
    setCustomLabOpen
  } = useStore();

  const cartCount = getCartCount();

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-effect rounded-2xl px-6 py-3 flex items-center gap-3"
          >
            <span className="text-3xl">🌿</span>
            <div>
              <h2 className="text-xl font-display font-bold text-white text-shadow">
                Perfume Green
              </h2>
              <p className="text-xs text-gray-200">Eco-Luxury Fragrances</p>
            </div>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-effect rounded-2xl px-4 py-2 flex items-center gap-2 max-w-md flex-1 mx-4"
          >
            <span className="text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-gray-300 flex-1"
            />
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            {/* Green points */}
            <div className="glass-effect rounded-2xl px-4 py-3 flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <div className="text-white">
                <div className="text-xs text-gray-200">Green Points</div>
                <div className="text-lg font-bold">{greenPoints}</div>
              </div>
            </div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="glass-effect rounded-2xl px-4 py-3 flex items-center gap-2 relative"
            >
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-leaf-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                >
                  {cartCount}
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Category filters */}
      <div className="fixed top-24 left-0 right-0 z-40 px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto glass-effect rounded-2xl p-3 flex items-center justify-center gap-2 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-leaf-green text-white shadow-lg'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCustomLabOpen(true)}
          className="glass-effect rounded-full px-8 py-4 flex items-center gap-3 text-white font-semibold shadow-xl"
        >
          <span className="text-2xl">🧪</span>
          <span>Create Custom Scent</span>
        </motion.button>
      </div>

      {/* Controls hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-40 glass-effect rounded-xl p-3 text-white text-sm"
      >
        <div className="font-semibold mb-1">Controls:</div>
        <div>WASD / Arrows - Move</div>
        <div>Mouse - Look Around</div>
        <div>Click - Interact</div>
      </motion.div>
    </>
  );
}
