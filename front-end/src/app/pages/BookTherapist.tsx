import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Star, Calendar, Clock, CheckCircle, ArrowLeft, Loader } from "lucide-react";
import { apiClient } from "../../utils/apiClient";

interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviews: number;
  experience: string;
  image: string;
  bio: string;
  languages: string[];
  price: string;
  acceptsInsurance: boolean;
  availability: string[];
}

interface BookingData {
  therapistId: string;
  date: string;
  time: string;
  sessionType: 'video' | 'phone' | 'in-person';
  concerns: string;
}

export default function BookTherapist() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingStep, setBookingStep] = useState<'select' | 'details' | 'confirm'>('select');
  const [bookingData, setBookingData] = useState<BookingData>({
    therapistId: '',
    date: '',
    time: '',
    sessionType: 'video',
    concerns: '',
  });
  const [bookingComplete, setBookingComplete] = useState(false);
  const navigate = useNavigate();

  const specialties = ["All", "Anxiety", "Depression", "Trauma", "Relationships", "Stress"];

  // Mock therapists data (in production, this would come from API)
  const mockTherapists: Therapist[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma"],
      rating: 4.9,
      reviews: 127,
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
      bio: "Specializing in cognitive behavioral therapy and mindfulness-based approaches to help you overcome anxiety and depression.",
      languages: ["English", "Spanish"],
      price: "$120/session",
      acceptsInsurance: true,
      availability: ["Today 2:00 PM", "Today 4:00 PM", "Tomorrow 10:00 AM", "Tomorrow 2:00 PM"],
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationships", "Stress", "Depression"],
      rating: 4.8,
      reviews: 98,
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600",
      bio: "Helping couples and families build stronger connections through evidence-based therapy techniques.",
      languages: ["English", "Mandarin"],
      price: "$110/session",
      acceptsInsurance: true,
      availability: ["Tomorrow 10:00 AM", "Tomorrow 3:00 PM", "Day after 9:00 AM"],
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      title: "Licensed Clinical Social Worker",
      specialties: ["Trauma", "Anxiety", "Stress"],
      rating: 5.0,
      reviews: 156,
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
      bio: "Trauma-informed care specialist with a compassionate approach to healing and recovery.",
      languages: ["English"],
      price: "$130/session",
      acceptsInsurance: true,
      availability: ["Today 3:00 PM", "Tomorrow 11:00 AM", "Tomorrow 5:00 PM"],
    },
  ];

  // Fetch therapists on mount
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getTherapists();
        if (response.data && Array.isArray(response.data)) {
          setTherapists(response.data);
        } else {
          // Use mock data if API doesn't return therapists
          setTherapists(mockTherapists);
        }
      } catch (err) {
        console.log('Using mock therapist data');
        setTherapists(mockTherapists);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const filteredTherapists = selectedSpecialty === "All"
    ? therapists
    : therapists.filter(t => t.specialties.includes(selectedSpecialty));

  const handleSelectTherapist = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setBookingData({ ...bookingData, therapistId: therapist.id });
    setBookingStep('details');
  };

  const handleBooking = async () => {
    if (!bookingData.date || !bookingData.time || !bookingData.concerns) {
      setError('Please fill in all fields');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const response = await apiClient.bookTherapy(selectedTherapist!.id, {
        date: bookingData.date,
        time: bookingData.time,
        sessionType: bookingData.sessionType,
        concerns: bookingData.concerns,
      });

      if (response.success || response.message) {
        setBookingStep('confirm');
        setBookingComplete(true);
      } else {
        setError(response.error || 'Failed to book therapy session');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to book therapy session');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Therapist</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12">
          Connect with licensed mental health professionals available for video, phone, or in-person sessions.
        </p>

        {!bookingComplete ? (
          <>
            {/* Specialty Filter */}
            {bookingStep === 'select' && (
              <>
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Specialty</h2>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                          selectedSpecialty === specialty
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Therapists Grid */}
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader className="w-8 h-8 text-green-600 animate-spin" />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTherapists.map((therapist) => (
                      <div key={therapist.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                        <img
                          src={therapist.image}
                          alt={therapist.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{therapist.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{therapist.title}</p>

                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(therapist.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">({therapist.reviews})</span>
                          </div>

                          <div className="space-y-2 mb-4 text-sm text-gray-700">
                            <p><strong>Experience:</strong> {therapist.experience}</p>
                            <p><strong>Languages:</strong> {therapist.languages.join(", ")}</p>
                            <p><strong>Price:</strong> {therapist.price}</p>
                            {therapist.acceptsInsurance && (
                              <p className="text-green-600 font-medium">✓ Insurance accepted</p>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{therapist.bio}</p>

                          <button
                            onClick={() => handleSelectTherapist(therapist)}
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                          >
                            Book Appointment
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Booking Details */}
            {bookingStep === 'details' && selectedTherapist && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Schedule with {selectedTherapist.name}
                  </h2>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Session Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['video', 'phone', 'in-person'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setBookingData({ ...bookingData, sessionType: type as any })}
                            className={`p-4 rounded-lg border-2 font-medium capitalize transition-all ${
                              bookingData.sessionType === type
                                ? 'bg-green-600 border-green-600 text-white'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-green-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                      <select
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium"
                      >
                        <option value="">Choose a time</option>
                        {selectedTherapist.availability.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>

                    {/* Concerns */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">What brings you to therapy?</label>
                      <textarea
                        value={bookingData.concerns}
                        onChange={(e) => setBookingData({ ...bookingData, concerns: e.target.value })}
                        placeholder="Briefly describe what you'd like to work on..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium resize-none"
                        rows={4}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => {
                          setBookingStep('select');
                          setSelectedTherapist(null);
                        }}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleBooking}
                        disabled={bookingLoading}
                        className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                      >
                        {bookingLoading && <Loader className="w-4 h-4 animate-spin" />}
                        {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation */}
            {bookingStep === 'confirm' && (
              <div className="max-w-2xl mx-auto text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Your therapy appointment with {selectedTherapist?.name} has been scheduled.
                </p>
                <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 mb-8">
                  <div className="space-y-4 text-left">
                    <p className="text-lg"><strong>Therapist:</strong> {selectedTherapist?.name}</p>
                    <p className="text-lg"><strong>Date:</strong> {bookingData.date}</p>
                    <p className="text-lg"><strong>Time:</strong> {bookingData.time}</p>
                    <p className="text-lg"><strong>Session Type:</strong> {bookingData.sessionType}</p>
                    <p className="text-lg"><strong>Price:</strong> {selectedTherapist?.price}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-8">
                  A confirmation email has been sent to your inbox. You'll receive a link to join the session 15 minutes before your appointment time.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Return Home
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
