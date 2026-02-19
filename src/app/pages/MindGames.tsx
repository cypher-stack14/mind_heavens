import { Link } from "react-router";
import { 
  Gamepad2, 
  Heart, 
  Sparkles, 
  ArrowLeft,
  Calendar,
  Activity
} from "lucide-react";

export default function MindGames() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">MindGames</h1>
            </div>

            {/* Back to Home Button */}
            <Link 
              to="/"
              className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
            <Heart className="w-4 h-4 text-green-600" fill="currentColor" />
            <span className="text-sm font-semibold text-green-700">Interactive Wellness Activities</span>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-green-600">MindGames</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Interactive wellness activities designed to help you manage stress, improve mood, and build emotional resilience through engaging gameplay.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {/* Sessions Completed */}
          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">0</p>
            <p className="text-gray-600 font-medium">Sessions Completed</p>
          </div>

          {/* Avg. Stress Relief */}
          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">0/10</p>
            <p className="text-gray-600 font-medium">Avg. Stress Relief</p>
          </div>

          {/* Day Streak */}
          <div className="bg-white rounded-3xl p-8 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">0</p>
            <p className="text-gray-600 font-medium">Day Streak</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
            Start Activity
          </button>
          <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold border-2 border-green-600 hover:bg-green-50 transition-all duration-300">
            View Progress
          </button>
        </div>

        {/* Games Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Available <span className="text-green-600">Wellness Games</span>
          </h3>
          <p className="text-center text-gray-600 mb-12">
            Choose from a variety of engaging activities designed to boost your mental wellness
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Breathing Exercise */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Breathing Exercise</h4>
              <p className="text-gray-600 text-sm mb-4">
                Guided breathing techniques to calm your mind and reduce anxiety
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span>5 min</span>
                <span>•</span>
                <span>Easy</span>
              </div>
            </div>

            {/* Memory Match */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Memory Match</h4>
              <p className="text-gray-600 text-sm mb-4">
                Improve focus and cognitive function with this fun memory game
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span>10 min</span>
                <span>•</span>
                <span>Medium</span>
              </div>
            </div>

            {/* Mood Tracker */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Mood Tracker</h4>
              <p className="text-gray-600 text-sm mb-4">
                Log and visualize your emotions to understand patterns better
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span>3 min</span>
                <span>•</span>
                <span>Easy</span>
              </div>
            </div>

            {/* Gratitude Journal */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Gratitude Journal</h4>
              <p className="text-gray-600 text-sm mb-4">
                Practice gratitude daily to enhance positivity and well-being
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span>5 min</span>
                <span>•</span>
                <span>Easy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-white rounded-3xl p-12 shadow-md">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Play <span className="text-green-600">MindGames?</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Reduce Stress</h4>
              <p className="text-gray-600">
                Engage in activities scientifically proven to lower stress levels
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Build Resilience</h4>
              <p className="text-gray-600">
                Develop emotional strength through consistent practice
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Improve Mood</h4>
              <p className="text-gray-600">
                Boost your emotional well-being with engaging gameplay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
