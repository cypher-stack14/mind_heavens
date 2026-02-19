import { Navbar } from "../components/Navbar";
import { ServiceCard } from "../components/ServiceCard";
import { TestimonialCard } from "../components/TestimonialCard";
import { StepCard } from "../components/StepCard";
import { QuickCheckIn } from "../components/QuickCheckIn";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";
import {
  Heart,
  Brain,
  Sparkles,
  Shield,
  ClipboardCheck,
  UserCheck,
  TrendingUp,
  CheckCircle,
  Award,
  Clock,
  Lock,
  BarChart3,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { apiClient } from "../../utils/apiClient";

interface DashboardData {
  wellnessScore: number;
  checkInStreak: number;
  assessmentCount: number;
  courseCount: number;
  sleepSessions: number;
  gamesPlayed: number;
}

export default function Home() {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [showQuickCheckin, setShowQuickCheckin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    wellnessScore: 0,
    checkInStreak: 0,
    assessmentCount: 0,
    courseCount: 0,
    sleepSessions: 0,
    gamesPlayed: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const user = apiClient.getUser();
        
        // Only fetch if user is logged in
        if (user) {
          const response = await apiClient.getDashboard();
          if (response.data) {
            setDashboardData({
              wellnessScore: response.data.wellnessScore || 0,
              checkInStreak: response.data.checkInStreak || 0,
              assessmentCount: response.data.assessmentCount || 0,
              courseCount: response.data.courseCount || 0,
              sleepSessions: response.data.sleepSessions || 0,
              gamesPlayed: response.data.gamesPlayed || 0,
            });
          }
        } else {
          // Show default data for non-logged-in users
          setDashboardData({
            wellnessScore: 0,
            checkInStreak: 0,
            assessmentCount: 0,
            courseCount: 0,
            sleepSessions: 0,
            gamesPlayed: 0,
          });
        }
      } catch (err: any) {
        console.error("Failed to fetch dashboard:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full text-sm font-medium text-green-700">
              <Heart className="w-4 h-4 text-green-600" fill="currentColor" />
              Welcome to Mindhaven - Your Mental Health Platform
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-green-600">Mindhaven</span>
              <span className="text-gray-900"> - Find Your Path to </span>
              <span className="text-cyan-600">Mental Wellness</span>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Mindhaven provides personalized therapy, mindful content, and AI-powered support tailored to your unique mental health journey.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 hover:shadow-lg flex items-center gap-2">
                Access Resources
                <span>→</span>
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-green-300 transition-all duration-300">
                Learn More
              </button>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 flex items-center gap-2">
                <span>💬</span>
                Communities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">
              Welcome to Your Wellness Dashboard
            </h2>
            <p className="text-gray-600 text-lg">
              Track your mental health journey with personalized insights and real-time progress monitoring
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-purple-600 animate-spin" />
              <span className="ml-3 text-gray-600">Loading your dashboard...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Stats Cards Row */}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Wellness Score Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-blue-700 font-medium mb-1">Wellness Score</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">{dashboardData.wellnessScore}</span>
                      <span className="text-gray-500">/100</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${dashboardData.wellnessScore}%` }}></div>
                </div>
              </div>

              {/* Check-in Streak Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-green-700 font-medium mb-1">Check-in Streak</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">{dashboardData.checkInStreak}</span>
                      <span className="text-gray-500">days</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Current Risk Level Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-700 font-medium mb-1">Current Risk Level</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/assessment')}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                >
                  Take Assessment
                </button>
              </div>

              {/* Today's Check-in Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <div className="mb-4">
                  <p className="text-sm text-purple-700 font-medium mb-1">Today's Check-in</p>
                </div>
                <button 
                  onClick={() => setIsCheckInOpen(true)}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Quick Check-in
                </button>
              </div>
            </div>
          )}

          {/* Mental Health Trends & AI Insights Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Mental Health Trends - Larger */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Mental Health Trends</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">No check-in data yet</p>
                <button
                  onClick={() => setIsCheckInOpen(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Start Tracking
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-600 text-center text-sm mb-4">
                  Complete assessments for personalized insights
                </p>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Take Assessment
                </button>
              </div>
            </div>
          </div>

          {/* Activity Overview & Quick Actions Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Activity Overview - Larger */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Activity Overview</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Assessments */}
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl">
                  <Brain className="w-8 h-8 text-blue-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.assessmentCount}</div>
                  <div className="text-sm text-gray-600">Assessments</div>
                </div>
                {/* Courses */}
                <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.courseCount}</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                {/* Sleep Sessions */}
                <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl">
                  <svg className="w-8 h-8 text-purple-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.sleepSessions}</div>
                  <div className="text-sm text-gray-600">Sleep Sessions</div>
                </div>
                {/* Games Played */}
                <div className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-xl">
                  <svg className="w-8 h-8 text-orange-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.gamesPlayed}</div>
                  <div className="text-sm text-gray-600">Games Played</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/assessment')}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  Mental Health Assessment
                </button>
                <button 
                  onClick={() => navigate('/courses')}
                  className="w-full bg-white text-green-600 px-4 py-3 rounded-lg font-medium border-2 border-green-200 hover:border-green-400 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Browse Courses
                </button>
                <button 
                  onClick={() => navigate('/resources')}
                  className="w-full bg-white text-purple-600 px-4 py-3 rounded-lg font-medium border-2 border-purple-200 hover:border-purple-400 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Sleep & Relaxation
                </button>
                <button 
                  onClick={() => navigate('/book-therapist')}
                  className="w-full bg-white text-orange-600 px-4 py-3 rounded-lg font-medium border-2 border-orange-200 hover:border-orange-400 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Book Therapist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey to Wellness
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <StepCard
              number="1"
              icon={ClipboardCheck}
              title="Take Assessment"
              description="Complete a brief, confidential questionnaire to help us understand your needs"
            />
            <StepCard
              number="2"
              icon={UserCheck}
              title="Match with Therapist"
              description="We'll connect you with a licensed therapist who specializes in your concerns"
            />
            <StepCard
              number="3"
              icon={TrendingUp}
              title="Start Healing"
              description="Begin your personalized therapy sessions and track your progress"
              isLast
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 rounded-3xl transform -rotate-3 opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1651218772962-51e1635c2140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdlbGxuZXNzJTIwbWVudGFsJTIwaGVhbHRofGVufDF8fHx8MTc3MTAxNzE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Woman wellness journey"
                className="relative rounded-3xl shadow-2xl w-full h-[450px] object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Why Choose Mindhaven?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Personalized Care Plans
                    </h3>
                    <p className="text-gray-600">
                      Every woman's journey is unique. Your treatment plan is tailored specifically to your needs and goals.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Licensed Therapists
                    </h3>
                    <p className="text-gray-600">
                      All our therapists are licensed professionals specializing in women's mental health.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Secure Sessions
                    </h3>
                    <p className="text-gray-600">
                      HIPAA-compliant video sessions ensure your privacy and confidentiality are protected.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Progress Tracking
                    </h3>
                    <p className="text-gray-600">
                      Monitor your growth with intuitive tools and celebrate your healing milestones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories of Healing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from women who found their path to wellness with Mindhaven
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Martinez"
              role="Marketing Professional"
              content="Mindhaven gave me the tools to manage my anxiety in a way that felt natural and empowering. My therapist truly understood my journey."
              avatar="SM"
            />
            <TestimonialCard
              name="Emily Chen"
              role="Teacher"
              content="After struggling with postpartum depression, I found compassionate support here. The personalized approach made all the difference in my recovery."
              avatar="EC"
            />
            <TestimonialCard
              name="Jessica Williams"
              role="Entrepreneur"
              content="The trauma therapy I received was life-changing. I finally feel like I'm moving forward and reclaiming my life. Forever grateful."
              avatar="JW"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your Healing Journey Today
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Take the first step towards better mental health. Your future self will thank you.
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            Join Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">About Us</a></li>
                <li><a href="#careers" className="text-gray-600 hover:text-purple-600 transition-colors">Careers</a></li>
                <li><a href="#press" className="text-gray-600 hover:text-purple-600 transition-colors">Press</a></li>
                <li><a href="#blog" className="text-gray-600 hover:text-purple-600 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#articles" className="text-gray-600 hover:text-purple-600 transition-colors">Articles</a></li>
                <li><a href="#guides" className="text-gray-600 hover:text-purple-600 transition-colors">Guides</a></li>
                <li><a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a></li>
                <li><a href="#crisis" className="text-gray-600 hover:text-purple-600 transition-colors">Crisis Support</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact Us</a></li>
                <li><a href="#help" className="text-gray-600 hover:text-purple-600 transition-colors">Help Center</a></li>
                <li><a href="#insurance" className="text-gray-600 hover:text-purple-600 transition-colors">Insurance</a></li>
                <li><a href="#privacy" className="text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Logo & Social */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Mindhaven</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">Your safe space for mental wellness</p>
              <div className="flex gap-3">
                <a href="#twitter" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors">
                  <Twitter className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#facebook" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors">
                  <Facebook className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#instagram" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors">
                  <Instagram className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#linkedin" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors">
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>&copy; 2026 Mindhaven. All rights reserved. Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>

      {/* Floating Quick Check-in Button */}
      <button
        onClick={() => setIsCheckInOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
        title="Quick Check-in"
      >
        <Heart className="w-7 h-7" fill="white" />
      </button>

      {/* Quick Check-in Modal */}
      <QuickCheckIn isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />

      {/* Quick Check-In Modal */}
      {showQuickCheckin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Check-in</h2>
              <button
                onClick={() => setShowQuickCheckin(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-red-500" />
                <p className="text-gray-700">How are you feeling today?</p>
              </div>
              <div className="flex items-center gap-4">
                <Brain className="w-6 h-6 text-blue-500" />
                <p className="text-gray-700">What's on your mind?</p>
              </div>
              <div className="flex items-center gap-4">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <p className="text-gray-700">What's one thing you're grateful for?</p>
              </div>
            </div>
            <button
              onClick={() => setShowQuickCheckin(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors mt-6"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}