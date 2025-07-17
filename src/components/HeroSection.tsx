
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Building,
  Play,
  Shield,
  Zap,
  Award,
  ChevronRight,
  Lightbulb
} from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative z-40 max-w-5xl mx-auto px-6 lg:px-8 pt-44 pb-16 text-center">
      <motion.div 
        className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/50 rounded-full px-5 py-3 mb-12"
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        whileHover={{ scale: 1.05, y: -2 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Award className="w-4 h-4" style={{ color: '#216ad9' }} />
        </motion.div>
        <span className="text-sm font-semibold" style={{ color: '#216ad9' }}>Award Winning</span>
        <span className="text-sm" style={{ color: '#216ad9' }}>AI Startup Finalist 🏆</span>
        <ChevronRight className="w-4 h-4 text-blue-400" />
      </motion.div>

      <div className="mb-10">
        <motion.h1 
          className="text-7xl font-bold text-gray-900"
          style={{ lineHeight: '1.1' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Transform your{' '}
            <motion.span 
              className="inline-flex items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.span 
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-xl mx-4"
                style={{ backgroundColor: '#216ad9', transform: 'rotate(-8deg)' }}
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [-8, -3, -8],
                  boxShadow: [
                    "0 10px 30px rgba(33, 106, 217, 0.3)",
                    "0 20px 50px rgba(33, 106, 217, 0.5)",
                    "0 10px 30px rgba(33, 106, 217, 0.3)"
                  ]
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 3, repeat: Infinity }
                }}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Building className="w-10 h-10 md:w-12 md:h-12 text-white" style={{ transform: 'rotate(8deg)' }} />
              </motion.span>
            </motion.span>
            {' '}business
            <br />
            with expert solutions{' '}
            <motion.span 
              className="inline-flex items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.span 
                className="w-20 h-20 md:w-24 md:h-24 bg-green-500 rounded-2xl flex items-center justify-center shadow-xl ml-4"
                style={{ transform: 'rotate(12deg)' }}
                animate={{ 
                  rotate: [12, 25, -5, 12],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 10px 30px rgba(34, 197, 94, 0.3)",
                    "0 20px 50px rgba(34, 197, 94, 0.5)",
                    "0 10px 30px rgba(34, 197, 94, 0.3)"
                  ]
                }}
                transition={{ 
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 3, repeat: Infinity, delay: 1 }
                }}
                whileHover={{ rotate: -5, scale: 1.15 }}
              >
                <Lightbulb className="w-10 h-10 md:w-12 md:h-12 text-white" style={{ transform: 'rotate(-12deg)' }} />
              </motion.span>
            </motion.span>
          </motion.div>
        </motion.h1>
      </div>
      
      <motion.p 
        className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        We identify problems in your business and implement tailored solutions - whether operational, 
        marketing, or financial. <span className="font-bold" style={{ color: '#216ad9' }}>No fixed pricing. Every solution designed specifically for you.</span>
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.button 
          className="group text-white px-10 py-5 rounded-2xl text-xl font-bold flex items-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-300"
          style={{ backgroundColor: '#216ad9' }}
          whileHover={{ 
            scale: 1.05, 
            y: -3,
            boxShadow: "0 25px 50px rgba(33, 106, 217, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Book Free Consultation</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </motion.button>
        
        <motion.button 
          className="group flex items-center space-x-4 text-gray-700 hover:text-blue-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-200 group-hover:shadow-2xl transition-all duration-300"
            style={{ borderColor: '#216ad9' }}
            whileHover={{ rotate: 10 }}
          >
            <Play className="w-6 h-6 text-gray-700 group-hover:text-blue-600 ml-1" />
          </motion.div>
          <div className="text-left">
            <div className="text-xl font-bold">See our process</div>
            <div className="text-base text-gray-500 font-medium">2 min overview</div>
          </div>
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-center space-x-6 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05, y: -1 }}
        >
          <Shield className="w-4 h-4" style={{ color: '#216ad9' }} />
          <span>Free initial consultation</span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05, y: -1 }}
        >
          <Zap className="w-4 h-4" style={{ color: '#216ad9' }} />
          <span>Tailored solutions</span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05, y: -1 }}
        >
          <Award className="w-4 h-4" style={{ color: '#216ad9' }} />
          <span>Award-winning team</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;