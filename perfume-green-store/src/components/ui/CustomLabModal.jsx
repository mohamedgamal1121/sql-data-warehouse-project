import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

const baseNotes = [
  { id: 'jasmine', name: 'Jasmine', icon: '🌸', color: '#f8f4e3' },
  { id: 'sandalwood', name: 'Sandalwood', icon: '🌲', color: '#c19a6b' },
  { id: 'vanilla', name: 'Vanilla', icon: '🍦', color: '#f3e5ab' },
  { id: 'citrus', name: 'Citrus', icon: '🍊', color: '#ffa500' },
  { id: 'rose', name: 'Rose', icon: '🌹', color: '#ff6b9d' },
  { id: 'mint', name: 'Mint', icon: '🌿', color: '#98ff98' },
  { id: 'lavender', name: 'Lavender', icon: '💜', color: '#9b7fb8' },
  { id: 'amber', name: 'Amber', icon: '✨', color: '#d4a574' },
];

export default function CustomLabModal() {
  const { customLabOpen, setCustomLabOpen, addToCart } = useStore();
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [customName, setCustomName] = useState('');
  const [isBlending, setIsBlending] = useState(false);

  if (!customLabOpen) return null;

  const toggleNote = (note) => {
    if (selectedNotes.find(n => n.id === note.id)) {
      setSelectedNotes(selectedNotes.filter(n => n.id !== note.id));
    } else if (selectedNotes.length < 3) {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const handleCreate = () => {
    if (selectedNotes.length === 0 || !customName) return;

    setIsBlending(true);
    
    setTimeout(() => {
      const customProduct = {
        id: Date.now(),
        name: customName || 'My Custom Blend',
        price: 120.00,
        category: 'custom',
        description: `A unique blend of ${selectedNotes.map(n => n.name).join(', ')}`,
        notes: selectedNotes.map(n => n.name),
        eco_certified: true,
        rating: 5.0,
        reviews: 1,
        color: selectedNotes[0].color,
      };

      addToCart(customProduct);
      setIsBlending(false);
      setCustomLabOpen(false);
      setSelectedNotes([]);
      setCustomName('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isBlending && setCustomLabOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-effect rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {isBlending ? (
            // Blending animation
            <motion.div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🧪
              </motion.div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                Blending Your Custom Scent...
              </h3>
              <p className="text-gray-300">
                Mixing {selectedNotes.map(n => n.name).join(', ')}
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {selectedNotes.map((note, i) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-4xl"
                  >
                    {note.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-2">
                    Custom Scent Lab 🧪
                  </h2>
                  <p className="text-gray-300">
                    Create your unique fragrance blend
                  </p>
                </div>
                <button
                  onClick={() => setCustomLabOpen(false)}
                  className="text-2xl text-white hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>

              {/* Name input */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Name Your Creation:
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g., Midnight Garden"
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-mint-green"
                />
              </div>

              {/* Selected notes display */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold">
                    Selected Notes ({selectedNotes.length}/3):
                  </label>
                  {selectedNotes.length > 0 && (
                    <button
                      onClick={() => setSelectedNotes([])}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="glass-effect rounded-2xl p-4 min-h-[100px] flex items-center justify-center gap-4">
                  {selectedNotes.length === 0 ? (
                    <p className="text-gray-400">Select up to 3 notes to blend</p>
                  ) : (
                    selectedNotes.map((note) => (
                      <motion.div
                        key={note.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="glass-effect rounded-xl p-4 text-center"
                        style={{ borderColor: note.color, borderWidth: 2 }}
                      >
                        <div className="text-4xl mb-2">{note.icon}</div>
                        <div className="text-white font-semibold">{note.name}</div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Note selection grid */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Choose Your Notes:
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {baseNotes.map((note) => {
                    const isSelected = selectedNotes.find(n => n.id === note.id);
                    const isDisabled = !isSelected && selectedNotes.length >= 3;

                    return (
                      <motion.button
                        key={note.id}
                        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                        onClick={() => !isDisabled && toggleNote(note)}
                        disabled={isDisabled}
                        className={`glass-effect rounded-xl p-4 text-center transition-all ${
                          isSelected
                            ? 'ring-2 ring-mint-green'
                            : isDisabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-white hover:bg-opacity-10'
                        }`}
                      >
                        <div className="text-3xl mb-2">{note.icon}</div>
                        <div className="text-white text-sm font-semibold">
                          {note.name}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Blend preview */}
              {selectedNotes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-effect rounded-2xl p-6 mb-6"
                >
                  <h3 className="text-white font-semibold mb-3">Blend Preview:</h3>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-24 h-24 rounded-xl flex items-center justify-center text-4xl"
                      style={{
                        background: `linear-gradient(135deg, ${selectedNotes[0]?.color}40, ${selectedNotes[selectedNotes.length - 1]?.color}80)`,
                      }}
                    >
                      💎
                    </div>
                    <div className="flex-1 text-white">
                      <div className="font-bold text-xl mb-1">
                        {customName || 'My Custom Blend'}
                      </div>
                      <div className="text-gray-300 text-sm">
                        A unique blend of {selectedNotes.map(n => n.name).join(', ')}
                      </div>
                      <div className="text-mint-green font-bold text-2xl mt-2">
                        $120.00
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Create button */}
              <motion.button
                whileHover={{ scale: selectedNotes.length > 0 && customName ? 1.02 : 1 }}
                whileTap={{ scale: selectedNotes.length > 0 && customName ? 0.98 : 1 }}
                onClick={handleCreate}
                disabled={selectedNotes.length === 0 || !customName}
                className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all ${
                  selectedNotes.length > 0 && customName
                    ? 'bg-gradient-to-r from-leaf-green to-mint-green text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Create & Add to Cart 🧪
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
