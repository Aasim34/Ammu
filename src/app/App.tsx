import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Gift } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';

const slideshowImages = [
  '/Phots/WhatsApp Image 2026-02-09 at 9.07.32 PM.jpeg',
  '/Phots/WhatsApp Image 2026-02-09 at 9.07.32 PM (1).jpeg',
  '/Phots/WhatsApp Image 2026-02-09 at 9.07.32 PM (2).jpeg',
  '/Phots/WhatsApp Image 2026-02-09 at 9.07.33 PM.jpeg',
  '/Phots/WhatsApp Image 2026-02-09 at 9.07.33 PM (1).jpeg',
];

function App() {
  const [currentSection, setCurrentSection] = useState<'hero' | 'slideshow' | 'message'>('hero');
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentSection === 'slideshow') {
      slideshowRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
      }, 4000);

      return () => {
        if (slideshowRef.current) {
          clearInterval(slideshowRef.current);
        }
      };
    }
  }, [currentSection]);

  const handleSurpriseClick = () => {
    setCurrentSection('slideshow');
    // Play audio when surprise is clicked
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
    }
    setTimeout(() => {
      setCurrentSection('message');
    }, 22000); // Show slideshow for ~22 seconds
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {currentSection === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #f48fb1 60%, #ec407a 100%)',
            }}
          >
            <FloatingHearts />
            
            <div className="relative z-10 text-center px-4 sm:px-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1
                  className="mb-4 sm:mb-6"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(3rem, 12vw, 7rem)',
                    color: '#fff',
                    textShadow: '0 2px 20px rgba(236, 64, 122, 0.5)',
                    lineHeight: 1.2,
                  }}
                >
                  Surprise Bava 💝
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mb-8 sm:mb-12 text-white/90 text-lg sm:text-xl"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  I have something special for you
                </motion.p>

                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSurpriseClick}
                  className="relative px-8 sm:px-12 py-4 sm:py-5 rounded-full text-white text-lg sm:text-xl font-medium transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #ec407a 0%, #d81b60 100%)',
                    boxShadow: '0 8px 30px rgba(236, 64, 122, 0.4)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(236, 64, 122, 0.4)',
                        '0 0 0 20px rgba(236, 64, 122, 0)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                  />
                  <span className="relative flex items-center gap-2 justify-center">
                    SURPRISE <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentSection === 'slideshow' && (
          <motion.div
            key="slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-black"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <img
                  src={slideshowImages[currentSlide]}
                  alt="Memory"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: currentSlide === 0 ? '50% 30%' : currentSlide === 4 ? '50% 20%' : 'center'
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2 z-10"
            >
              <h2
                className="text-white text-center px-4"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                Our Memories ❤️
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-8 right-8 z-10 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <Music className="w-4 h-4 text-white animate-pulse" />
              <span className="text-white text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                Playing
              </span>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {slideshowImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {currentSection === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center px-4 sm:px-6"
            style={{
              background: 'linear-gradient(135deg, #fff0f3 0%, #fce4ec 50%, #f8bbd0 100%)',
            }}
          >
            <FloatingHearts />

            <div className="relative z-10 text-center max-w-3xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                className="mb-8 sm:mb-12 inline-block"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                >
                  <Heart
                    className="w-20 h-20 sm:w-32 sm:h-32 fill-rose-500 text-rose-500"
                    style={{
                      filter: 'drop-shadow(0 4px 20px rgba(236, 64, 122, 0.4))',
                    }}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-6 sm:space-y-8"
              >
                <p
                  className="text-gray-800 text-xl sm:text-3xl leading-relaxed mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                  }}
                >
                  From the moment you came into my life,
                  <br />
                  everything became beautiful ❤️
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="text-rose-600 mb-6"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    textShadow: '0 2px 10px rgba(236, 64, 122, 0.2)',
                  }}
                >
                  Will you be my Valentine Bava? 💖
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="text-gray-700 text-lg sm:text-2xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                  }}
                >
                  Happy Valentine's Day 🌹
                </motion.p>
              </motion.div>
            </div>

            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 text-center"
            >
              <p
                className="text-rose-400 text-sm sm:text-base"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Made with ❤️ for you
              </p>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/Music/WhatsApp Audio 2026-02-10 at 5.15.43 PM.mpeg"
        preload="auto"
      />
    </div>
  );
}

export default App;
