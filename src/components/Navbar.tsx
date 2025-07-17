import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown,
  Building,
  Users,
  Star,
  Award,
  FileText,
  Code,
  Megaphone,
  Smartphone,
  Lightbulb,
  Calendar,
  X,
  Menu,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentPage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = '' }) => {
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);

  useEffect(() => {
    // Load Calendly script when modal opens
    if (isModalOpen && !document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Handle escape key to close modal or mobile menu
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    if (isModalOpen || isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal or mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isMobileMenuOpen]);

  const handleBookConsultation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setExpandedMobileSection(null);
  };

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(expandedMobileSection === section ? null : section);
  };

  const handleMobileNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    window.location.href = href;
  };

  const handleNavigateToServices = (href: string) => {
    window.location.href = href;
  };

  const handleNavigateToAbout = (href: string) => {
    window.location.href = href;
  };

  const servicesMenu = [
    { name: 'Business Consultancy', href: '/services/business-consultancy', icon: Building },
    { name: 'Marketing Solutions', href: '/services/marketing-solutions', icon: Megaphone },
    { name: 'Website Development', href: '/services/website-development', icon: Code },
    { name: 'Platform Development', href: '/services/platform-development', icon: Smartphone }
  ];

  const aboutMenu = [
    { name: 'Our Story', href: '/about/our-story', icon: Star },
    { name: 'Meet the Team', href: '/about/team', icon: Users },
    { name: 'Awards & Recognition', href: '/about/awards', icon: Award },
    { name: 'Case Studies', href: '/about/case-studies', icon: FileText }
  ];

  const navigationItems = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <motion.nav 
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="bg-white/85 backdrop-blur-2xl border border-gray-200/40 rounded-3xl shadow-xl px-8 py-4 max-w-6xl w-full"
          whileHover={{ scale: 1.01, y: -1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <motion.a
                href="/"
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: '#216ad9' }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Lightbulb className="w-4 h-4 text-white" />
                </motion.div>
                <div>
                  <span className="text-xl font-bold text-gray-900">amplifirm.</span>
                </div>
              </motion.a>
              
              {/* Navigation Links */}
              <div className="hidden lg:flex items-center space-x-1">
                {/* Services Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown('services')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <motion.button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Building className="w-4 h-4" />
                    <span>Services</span>
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {hoveredDropdown === 'services' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {servicesMenu.map((item, index) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigateToServices(item.href);
                            }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-base font-medium">{item.name}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown('about')}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <motion.button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="w-4 h-4" />
                    <span>About</span>
                    <ChevronDown className="w-3 h-3" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {hoveredDropdown === 'about' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {aboutMenu.map((item, index) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigateToAbout(item.href);
                            }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-base font-medium">{item.name}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Regular Navigation Items */}
                {navigationItems.map((item, index) => (
                  <motion.a 
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50 ${
                      currentPage === item.href 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className="p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
            
            {/* CTA Button */}
            <motion.button 
              className={`text-white px-6 py-3 rounded-2xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                isMobileMenuOpen ? 'hidden' : 'block'
              }`}
              style={{ backgroundColor: '#216ad9' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 40px rgba(33, 106, 217, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookConsultation}
            >
              Book Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile Menu Content */}
            <motion.div
              className="absolute top-24 left-6 right-6 bg-white/95 backdrop-blur-xl border border-gray-200/40 rounded-3xl shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6 space-y-6">
                {/* Services Section */}
                <div>
                  <motion.button
                    onClick={() => toggleMobileSection('services')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-600" />
                      <span className="text-lg font-semibold text-gray-900">Services</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedMobileSection === 'services' ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedMobileSection === 'services' && (
                      <motion.div
                        className="mt-3 space-y-2 pl-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {servicesMenu.map((item, index) => (
                          <motion.button
                            key={item.name}
                            onClick={() => handleMobileNavigation(item.href)}
                            className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-xl transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                          >
                            <item.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-base font-medium text-gray-700">{item.name}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Section */}
                <div>
                  <motion.button
                    onClick={() => toggleMobileSection('about')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-600" />
                      <span className="text-lg font-semibold text-gray-900">About</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedMobileSection === 'about' ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedMobileSection === 'about' && (
                      <motion.div
                        className="mt-3 space-y-2 pl-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {aboutMenu.map((item, index) => (
                          <motion.button
                            key={item.name}
                            onClick={() => handleMobileNavigation(item.href)}
                            className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-xl transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                          >
                            <item.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-base font-medium text-gray-700">{item.name}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Navigation Items */}
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleMobileNavigation(item.href)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors ${
                      currentPage === item.href 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg font-semibold">{item.name}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                ))}

                {/* CTA Button */}
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleBookConsultation();
                  }}
                  className="w-full text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
                  style={{ backgroundColor: '#216ad9' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Free Consultation
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[800px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200" style={{ backgroundColor: '#216ad9' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Book Your Free Consultation</h3>
                    <p className="text-blue-100 text-sm">Get your custom quote in 24 hours</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Calendly Embed */}
              <div className="h-full pb-6 relative">
                {/* Loading state */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <motion.div 
                      className="w-8 h-8 border-4 rounded-full mx-auto mb-4"
                      style={{ borderColor: '#216ad9', borderTopColor: 'transparent' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-gray-600">Loading calendar...</p>
                  </div>
                </div>
                
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/amplifirm/done-with-you-program-booking" 
                  style={{ minWidth: '320px', height: '100%', width: '100%' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;