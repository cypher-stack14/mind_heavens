import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { Star, Video, Phone, MessageCircle, Calendar, Award, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function BookTherapist() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);

  const specialties = ["All", "Anxiety", "Depression", "Trauma", "Relationships", "Stress"];

  const therapists = [
    {
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma"],
      rating: 4.9,
      reviews: 127,
      experience: "12 years",
      availability: "Available Today",
      nextSlot: "2:00 PM - 3:00 PM",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
      bio: "Specializing in cognitive behavioral therapy and mindfulness-based approaches.",
      languages: ["English", "Spanish"],
      price: "$120/session",
      acceptsInsurance: true
    },
    {
      name: "Dr. Michael Chen",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationships", "Stress", "Depression"],
      rating: 4.8,
      reviews: 98,
      experience: "10 years",
      availability: "Available Tomorrow",
      nextSlot: "10:00 AM - 11:00 AM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600",
      bio: "Helping couples and families build stronger connections and communication.",
      languages: ["English", "Mandarin"],
      price: "$110/session",
      acceptsInsurance: true
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Licensed Clinical Social Worker",
      specialties: ["Trauma", "Anxiety", "Stress"],
      rating: 5.0,
      reviews: 156,
      experience: "15 years",
      availability: "Available Today",
      nextSlot: "4:30 PM - 5:30 PM",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600",
      bio: "Expert in trauma-informed care and EMDR therapy for healing past wounds.",
      languages: ["English", "Spanish", "Portuguese"],
      price: "$130/session",
      acceptsInsurance: true
    },
    {
      name: "Dr. James Williams",
      title: "Psychiatrist & Therapist",
      specialties: ["Depression", "Anxiety", "Medication Management"],
      rating: 4.7,
      reviews: 84,
      experience: "8 years",
      availability: "Available This Week",
      nextSlot: "Monday 9:00 AM",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600",
      bio: "Combining therapy with medication management for comprehensive care.",
      languages: ["English"],
      price: "$150/session",
      acceptsInsurance: true
    },
    {
      name: "Dr. Aisha Patel",
      title: "Licensed Professional Counselor",
      specialties: ["Stress", "Relationships", "Self-Esteem"],
      rating: 4.9,
      reviews: 112,
      experience: "11 years",
      availability: "Available Today",
      nextSlot: "6:00 PM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600",
      bio: "Empowering women to navigate life transitions and build resilience.",
      languages: ["English", "Hindi", "Gujarati"],
      price: "$115/session",
      acceptsInsurance: false
    },
    {
      name: "Dr. Lisa Thompson",
      title: "Clinical Psychologist",
      specialties: ["Anxiety", "OCD", "Phobias"],
      rating: 4.8,
      reviews: 91,
      experience: "9 years",
      availability: "Available Tomorrow",
      nextSlot: "1:00 PM - 2:00 PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600",
      bio: "Specialized in exposure therapy and anxiety management techniques.",
      languages: ["English", "French"],
      price: "$125/session",
      acceptsInsurance: true
    }
  ];

  const handleBookSession = (therapist: any) => {
    setSelectedTherapist(therapist);
    setShowBookingModal(true);
  };

  const filteredTherapists = selectedSpecialty === "all" 
    ? therapists 
    : therapists.filter(t => t.specialties.some(s => s.toLowerCase() === selectedSpecialty.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Therapist</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Connect with licensed mental health professionals who understand your unique needs
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-semibold text-gray-700">Filter by Specialty:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty.toLowerCase())}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedSpecialty === specialty.toLowerCase()
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Therapists Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTherapists.map((therapist, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Therapist Image */}
              <div className="relative">
                <ImageWithFallback
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-full h-64 object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  therapist.availability.includes("Today") 
                    ? "bg-green-500 text-white" 
                    : "bg-blue-500 text-white"
                }`}>
                  {therapist.availability}
                </div>
              </div>

              {/* Therapist Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{therapist.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{therapist.title}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    <span className="font-bold text-gray-900">{therapist.rating}</span>
                  </div>
                  <span className="text-gray-600 text-sm">({therapist.reviews} reviews)</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Specializes in:</p>
                  <div className="flex flex-wrap gap-2">
                    {therapist.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4">{therapist.bio}</p>

                {/* Experience & Languages */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span>{therapist.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>Next: {therapist.nextSlot}</span>
                  </div>
                </div>

                {/* Price & Insurance */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <span className="font-bold text-gray-900 text-lg">{therapist.price}</span>
                  {therapist.acceptsInsurance && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Accepts Insurance</span>
                    </div>
                  )}
                </div>

                {/* Contact Options */}
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <Video className="w-4 h-4" />
                    <span className="text-sm font-medium">Video</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Phone</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Chat</span>
                  </button>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => handleBookSession(therapist)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && selectedTherapist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={selectedTherapist.image}
                  alt={selectedTherapist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Book with {selectedTherapist.name}</h2>
              <p className="text-purple-600 font-medium">{selectedTherapist.title}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Session Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Video Call</option>
                  <option>Phone Call</option>
                  <option>In-Person</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What would you like to focus on?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Share what brings you to therapy today..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  alert("Session booked successfully!");
                }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
