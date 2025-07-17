import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, Video, Calendar, Star, Award, GraduationCap, CheckCircle, Users, ExternalLink } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleBookingClick = (type: 'video' | 'in-person') => {
    if (type === 'in-person') {
      // Redirect to Healthplix booking system
      window.open('https://book.healthplix.com/dr-prashant-agrawal-consultant-pediatrician-opp--gulachin-mandir-lucknow?utm_source=gmb_cta&hl=en-GB&gei=I1p4aOaPOI-khbIPq9vA0Ao&rwg_token=ACgRB3cQgDA5S0LVEsttuvG677071OzpsiYkYOgaR4qMv2fErwZEgbNTVAA_3mdROFnk6xSSZ6FI1SSnswkYxkMhPn15A5FSgg%3D%3D', '_blank');
    } else {
      // Use our custom video consultation booking
      navigate('/booking', { state: { consultationType: type } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">Dr. Prashant Agrawal</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+91 84009 86113</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipPdg3wHP9jd8CW5HBIUpxD84i_dRKfSV-_aG-G9=s1360-w1360-h1020-rw"
                alt="Dr. Prashant Agrawal"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Dr. Prashant Agrawal</h2>
                  <p className="text-lg text-blue-600 font-medium mb-1">Consultant Pediatrician</p>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Award className="w-4 h-4 mr-1" />
                    <span>15 Years of Experience</span>
                  </div>
                </div>
                <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-700 font-medium">Available</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <GraduationCap className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Qualifications</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• MD (Pediatrics)</p>
                  <p>• Fellow Pediatric Intensive Care</p>
                  <p>• Diploma in Allergy & Asthma</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                <span>Deep Plaza, Kursi Hwy, Sector 2, Vikas Nagar, Lucknow, Uttar Pradesh 226022</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Available for In-Person Visits</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mon, Tue, Wed, Thu, Fri</span>
                    <span className="text-gray-900">12:00 PM - 2:00 PM, 7:30 PM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">12:00 PM - 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleBookingClick('video')}>
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
              <Video className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">WhatsApp Video Consultation</h3>
            <p className="text-gray-600 text-center mb-4">Connect with Dr. Agrawal via WhatsApp video call</p>
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700 text-center">Free • No app download • Easy to use</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              📱 Book WhatsApp Call
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleBookingClick('in-person')}>
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">In-Person Consultation</h3>
            <p className="text-gray-600 text-center mb-4">Visit the clinic for comprehensive examination</p>
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-700 text-center">Book through our secure Healthplix system</p>
            </div>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Book Clinic Visit →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Specialties & Services</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pediatric Care</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• General Pediatrics</li>
                <li>• Child Growth & Development</li>
                <li>• Vaccination Programs</li>
                <li>• Nutritional Counseling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Specialized Services</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pediatric Intensive Care</li>
                <li>• Allergy & Asthma Treatment</li>
                <li>• Emergency Pediatric Care</li>
                <li>• Chronic Disease Management</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 Dr. Prashant Agrawal Clinic. All rights reserved.</p>
            <p className="text-sm">For emergencies, please call +91 84009 86113 or visit the nearest hospital.</p>
            <p className="text-xs text-gray-400 mt-4">
              <a href="/booking?admin=true" className="hover:text-gray-600">Admin</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;