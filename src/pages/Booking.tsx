import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Video, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { format, addDays, isSameDay, isToday, isTomorrow, getDay } from 'date-fns';

interface LocationState {
  consultationType: 'video' | 'in-person';
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookedSlot {
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  consultationType: 'video' | 'in-person';
  timestamp: number;
}

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const consultationType = state?.consultationType || 'video';

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'datetime' | 'contact' | 'confirmation'>('datetime');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    reason: ''
  });
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('drPrashantBookings');
    if (savedBookings) {
      setBookedSlots(JSON.parse(savedBookings));
    }
  }, []);

  const availableDates = [];
  for (let i = 0; i < 7; i++) {
    availableDates.push(addDays(new Date(), i));
  }

  // Check if a specific date and time slot is already booked
  const isSlotBooked = (date: Date, time: string): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return bookedSlots.some(booking => 
      booking.date === dateStr && 
      booking.time === time && 
      booking.consultationType === consultationType
    );
  };

  const getAvailableSlots = (date: Date): TimeSlot[] => {
    const dayOfWeek = getDay(date);
    const isWeekend = dayOfWeek === 0;
    
    let baseSlots: TimeSlot[] = [];
    
    if (consultationType === 'video') {
      baseSlots = [
        { time: '09:00 AM', available: true },
        { time: '09:30 AM', available: true },
        { time: '10:00 AM', available: true },
        { time: '10:30 AM', available: true },
        { time: '11:00 AM', available: true },
        { time: '11:30 AM', available: true },
        { time: '02:00 PM', available: true },
        { time: '02:30 PM', available: true },
        { time: '03:00 PM', available: true },
        { time: '03:30 PM', available: true },
        { time: '04:00 PM', available: true },
        { time: '04:30 PM', available: true },
        { time: '05:00 PM', available: true },
        { time: '05:30 PM', available: true },
        { time: '06:00 PM', available: true },
        { time: '06:30 PM', available: true },
        { time: '07:00 PM', available: true },
        { time: '07:30 PM', available: true },
        { time: '08:00 PM', available: true },
        { time: '08:30 PM', available: true }
      ];
    } else {
      if (isWeekend) {
        baseSlots = [];
      } else if (dayOfWeek === 6) {
        baseSlots = [
          { time: '12:00 PM', available: true },
          { time: '12:15 PM', available: true },
          { time: '12:30 PM', available: true },
          { time: '12:45 PM', available: true },
          { time: '01:00 PM', available: true },
          { time: '01:15 PM', available: true },
          { time: '01:30 PM', available: true },
          { time: '01:45 PM', available: true }
        ];
      } else {
        baseSlots = [
          { time: '12:00 PM', available: true },
          { time: '12:15 PM', available: true },
          { time: '12:30 PM', available: true },
          { time: '12:45 PM', available: true },
          { time: '01:00 PM', available: true },
          { time: '01:15 PM', available: true },
          { time: '01:30 PM', available: true },
          { time: '01:45 PM', available: true },
          { time: '07:30 PM', available: true },
          { time: '07:45 PM', available: true },
          { time: '08:00 PM', available: true },
          { time: '08:15 PM', available: true },
          { time: '08:30 PM', available: true },
          { time: '08:45 PM', available: true }
        ];
      }
    }

    // Mark slots as unavailable if they're already booked
    return baseSlots.map(slot => ({
      ...slot,
      available: slot.available && !isSlotBooked(date, slot.time)
    }));
  };

  // Save booking and send notifications
  const saveBooking = async (bookingData: BookedSlot) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage (in production, this would be an API call)
      const updatedBookings = [...bookedSlots, bookingData];
      setBookedSlots(updatedBookings);
      localStorage.setItem('drPrashantBookings', JSON.stringify(updatedBookings));
      
      // Simulate sending notifications
      await sendNotifications(bookingData);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      console.error('Booking failed:', error);
      return false;
    }
  };

  // Simulate sending notifications to doctor and patient
  const sendNotifications = async (bookingData: BookedSlot) => {
    // For now, this creates pre-formatted messages that can be manually sent
    // In production, you could integrate with email services to notify the doctor
    
    const patientWhatsAppMessage = `✅ Video consultation confirmed with Dr. Prashant Agrawal

📅 Date: ${format(new Date(bookingData.date), 'EEEE, MMMM dd, yyyy')}
⏰ Time: ${bookingData.time}

Dr. Prashant will call you on WhatsApp video at the scheduled time. Please ensure:
- Your phone is charged
- You have a stable internet connection
- WhatsApp video calling is working

For any changes, call: +91 84009 86113

Thank you! 🏥`;

    const doctorNotificationEmail = `New WhatsApp Video Consultation Booked

Patient Details:
- Name: ${bookingData.patientName}
- Phone: ${bookingData.patientPhone}
- Date: ${format(new Date(bookingData.date), 'EEEE, MMMM dd, yyyy')}
- Time: ${bookingData.time}
- Reason: ${contactInfo.reason || 'Not specified'}

WhatsApp Link: https://wa.me/91${bookingData.patientPhone.replace(/\D/g, '')}

Please initiate WhatsApp video call at the scheduled time.`;

    // Store these messages for the admin panel to access
    const notification = {
      ...bookingData,
      patientMessage: patientWhatsAppMessage,
      doctorEmail: doctorNotificationEmail,
      whatsappLink: `https://wa.me/91${bookingData.patientPhone.replace(/\D/g, '')}`
    };

    // Save notification data
    const savedNotifications = JSON.parse(localStorage.getItem('pendingNotifications') || '[]');
    savedNotifications.push(notification);
    localStorage.setItem('pendingNotifications', JSON.stringify(savedNotifications));

    console.log('📋 Notification prepared for manual sending:', notification);
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, dd MMM');
  };

  const getSlotsCount = (date: Date) => {
    const slots = getAvailableSlots(date);
    return slots.filter(slot => slot.available).length;
  };

  const handleContinue = async () => {
    if (step === 'datetime' && selectedDate && selectedTime) {
      // Double-check slot availability before proceeding
      if (isSlotBooked(selectedDate, selectedTime)) {
        alert('Sorry, this slot has just been booked by someone else. Please select another time.');
        setSelectedTime('');
        return;
      }
      setStep('contact');
    } else if (step === 'contact') {
      // Create booking
      const bookingData: BookedSlot = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        patientName: contactInfo.name,
        patientPhone: contactInfo.phone,
        consultationType: consultationType,
        timestamp: Date.now()
      };
      
      const success = await saveBooking(bookingData);
      if (success) {
        setStep('confirmation');
      } else {
        alert('Booking failed. Please try again.');
      }
    }
  };

  const handleBack = () => {
    if (step === 'contact') {
      setStep('datetime');
    } else if (step === 'confirmation') {
      setStep('contact');
    } else {
      navigate('/');
    }
  };

  const morningSlots = getAvailableSlots(selectedDate).filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    const ampm = slot.time.includes('AM') ? 'AM' : 'PM';
    return ampm === 'AM' || (ampm === 'PM' && hour < 6);
  });

  const eveningSlots = getAvailableSlots(selectedDate).filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    const ampm = slot.time.includes('PM') ? 'PM' : 'AM';
    return ampm === 'PM' && hour >= 6;
  });

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
            <p className="text-gray-600 mb-8">Your appointment has been successfully scheduled.</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-gray-900 mb-4">Appointment Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  {consultationType === 'video' ? <Video className="w-5 h-5 text-blue-600 mr-3" /> : <MapPin className="w-5 h-5 text-green-600 mr-3" />}
                  <span className="font-medium">
                    {consultationType === 'video' ? 'WhatsApp Video Consultation' : 'In-Clinic Consultation'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 mr-3" />
                  <span>{selectedTime}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="w-5 h-5 text-gray-500 mr-3">📅</span>
                  <span>{format(selectedDate, 'EEEE, MMMM dd, yyyy')}</span>
                </div>
                
                {consultationType === 'in-person' && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <span className="text-sm">Deep Plaza, Kursi Hwy, Sector 2, Vikas Nagar, Lucknow, Uttar Pradesh 226022</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Dr. Prashant will call you on WhatsApp video at the scheduled time.
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-green-900">📱 WhatsApp Video Consultation</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <p>• Dr. Prashant will initiate the video call</p>
                  <p>• Make sure your phone is charged</p>
                  <p>• Ensure stable internet connection</p>
                  <p>• Keep WhatsApp updated</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-blue-900">What happens next:</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Appointment saved in doctor's calendar</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>You may receive a WhatsApp confirmation</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>Doctor will call you at the scheduled time</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>For any changes, call: +91 84009 86113</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-8"
            >
              Done
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'contact') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your mobile number"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">You will receive appointment confirmation on this number</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                  <textarea
                    value={contactInfo.reason}
                    onChange={(e) => setContactInfo({...contactInfo, reason: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your concern (optional)"
                  />
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <button
                onClick={handleContinue}
                disabled={!contactInfo.name || !contactInfo.phone || isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking Appointment...
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Dr. Prashant Agrawal</h2>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">Deep Plaza, Kursi Hwy, Sector 2, Vikas Nagar, Lucknow, Uttar Pradesh 226022</span>
          </div>
          <div className="flex items-center">
            {consultationType === 'video' ? (
              <>
                <Video className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-blue-600 font-medium">WhatsApp Video Consultation</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-green-600 font-medium">In-Clinic Consultation</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold text-gray-900">Select Date</h3>
          </div>
          
          <div className="flex overflow-x-auto">
            {availableDates.map((date, index) => {
              const slotsCount = getSlotsCount(date);
              const isSelected = isSameDay(date, selectedDate);
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime('');
                  }}
                  className={`flex-shrink-0 w-32 p-4 border-r border-gray-100 text-center hover:bg-gray-50 ${
                    isSelected ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className={`font-medium mb-1 ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                    {getDateLabel(date)}
                  </div>
                  <div className={`text-sm ${isSelected ? 'text-blue-600' : 'text-green-600'}`}>
                    {slotsCount} slots available
                  </div>
                  {isSelected && <div className="w-full h-1 bg-blue-600 rounded-full mt-2"></div>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold text-gray-900">Select Time</h3>
            <p className="text-sm text-gray-600 mt-1">
              Time slots are updated in real-time. Unavailable slots are already booked.
            </p>
          </div>
          
          <div className="p-6">
            {morningSlots.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Morning</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {morningSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 px-4 border rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === slot.time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : slot.available
                          ? 'border-gray-300 text-gray-900 hover:border-blue-300 hover:bg-blue-50'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {eveningSlots.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Evening</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {eveningSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 px-4 border rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === slot.time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : slot.available
                          ? 'border-gray-300 text-gray-900 hover:border-blue-300 hover:bg-blue-50'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {morningSlots.length === 0 && eveningSlots.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No slots available on this date.</p>
                <p className="text-sm mt-1">Please select another date.</p>
              </div>
            )}
          </div>
          
          {(morningSlots.length > 0 || eveningSlots.length > 0) && (
            <div className="px-6 py-4 bg-gray-50 border-t">
              <button
                onClick={handleContinue}
                disabled={!selectedTime}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Booking;