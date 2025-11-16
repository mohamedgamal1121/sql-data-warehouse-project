import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function WelcomePortal() {
  const { showWelcome, setShowWelcome } = useStore();

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="glass-effect rounded-3xl p-8 md:p-12 max-w-2xl mx-4 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-leaf-green to-mint-green flex items-center justify-center text-4xl"
            >
              🌿
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-shadow">
              Welcome to Perfume Green Store
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
              Step into our virtual botanical paradise, where nature meets luxury. 
              We craft eco-friendly, cruelty-free perfumes using only the finest 
              plant-based ingredients from sustainable sources.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8 text-white">
              <div className="glass-effect rounded-xl p-4">
                <div className="text-3xl mb-2">🌱</div>
                <div className="text-sm font-semibold">100% Natural</div>
              </div>
              <div className="glass-effect rounded-xl p-4">
                <div className="text-3xl mb-2">🐰</div>
                <div className="text-sm font-semibold">Cruelty-Free</div>
              </div>
              <div className="glass-effect rounded-xl p-4">
                <div className="text-3xl mb-2">♻️</div>
                <div className="text-sm font-semibold">Sustainable</div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWelcome(false)}
              className="bg-gradient-to-r from-leaf-green to-mint-green text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Enter the Garden 🌸
            </motion.button>
            
            <p className="text-sm text-gray-300 mt-6">
              Use WASD or Arrow keys to move • Mouse to look around • Click on bottles to explore
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
