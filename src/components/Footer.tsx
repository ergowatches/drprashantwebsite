import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface FooterProps {
  onBookConsultation?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBookConsultation }) => {
  const handleBookConsultation = () => {
    if (onBookConsultation) {
      onBookConsultation();
    } else {
      // Fallback to external link if no modal handler provided
      window.open('https://calendly.com/amplifirm/done-with-you-program-booking', '_blank');
    }
  };

  const footerSections = [
    { 
      title: 'Services', 
      links: [
        { name: 'Business Consultancy', href: '/services/business-consultancy' },
        { name: 'Marketing Solutions', href: '/services/marketing-solutions' },
        { name: 'Website Development', href: '/services/website-development' },
        { name: 'Platform Development', href: '/services/platform-development' },
        { name: 'Custom Solutions', href: '/services/custom-solutions' }
      ]
    },
    { 
      title: 'Company', 
      links: [
        { name: 'About Us', href: '/about/our-story' },
        { name: 'Our Team', href: '/about/team' },
        { name: 'Case Studies', href: '/about/case-studies' },
        { name: 'Awards', href: '/about/awards' },
        { name: 'Careers', href: '/about/careers' }
      ]
    },
    { 
      title: 'Support', 
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Book Consultation', href: '#', action: 'modal' },
        { name: 'FAQ', href: '/support/faq' },
        { name: 'Resources', href: '/support/resources' },
        { name: 'Blog', href: '/blog' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#216ad9' }}>
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">amplifirm.</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-6">
              Award-winning business consultancy specializing in operational optimization, 
              marketing solutions, and digital transformation. Helping businesses streamline 
              operations and accelerate growth since 2021.
            </p>
            <div className="text-sm text-gray-500">
              <p>AMPLIFIRM LTD</p>
              <p>Company Number: 15426833</p>
              <p>Registered in England & Wales</p>
            </div>
          </div>
          
          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-lg mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.action === 'modal' ? (
                      <motion.button
                        onClick={handleBookConsultation}
                        className="text-gray-400 hover:text-white transition-colors text-left"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.button>
                    ) : (
                      <motion.a 
                        href={link.href} 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 amplifirm. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;