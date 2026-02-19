import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { Play, Clock, Headphones, Video, BookOpen, Gamepad2, Volume2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("all");

  // Podcasts Data
  const podcasts = [
    {
      title: "The Anxiety Coaches Podcast",
      host: "Gina Ryan",
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400"
    },
    {
      title: "Mental Illness Happy Hour",
      host: "Paul Gilmartin",
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400"
    },
    {
      title: "The Hilarious World of Depression",
      host: "John Moe",
      duration: "35 min",
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400"
    },
    {
      title: "Terrible, Thanks for Asking",
      host: "Nora McInerny",
      duration: "40 min",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400"
    }
  ];

  // Playlists Data
  const playlists = [
    {
      title: "Calm & Peaceful",
      tracks: "24 tracks",
      duration: "1h 45min",
      color: "from-blue-400 to-purple-400"
    },
    {
      title: "Morning Meditation",
      tracks: "18 tracks",
      duration: "58min",
      color: "from-green-400 to-teal-400"
    },
    {
      title: "Focus & Clarity",
      tracks: "32 tracks",
      duration: "2h 15min",
      color: "from-orange-400 to-pink-400"
    },
    {
      title: "Sleep Sounds",
      tracks: "20 tracks",
      duration: "3h 0min",
      color: "from-purple-400 to-indigo-400"
    }
  ];

  // Videos Data
  const videos = [
    {
      title: "Understanding Anxiety & Depression",
      channel: "Therapy in a Nutshell",
      duration: "12:34",
      views: "2.3M views",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
    },
    {
      title: "5 Minute Breathing Exercise",
      channel: "The Mindful Movement",
      duration: "5:24",
      views: "1.8M views",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
    },
    {
      title: "Cognitive Behavioral Therapy Basics",
      channel: "Psych Hub",
      duration: "15:42",
      views: "987K views",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600"
    }
  ];

  // Educational Lectures Data
  const lectures = [
    {
      title: "The Science of Well-Being",
      instructor: "Dr. Laurie Santos",
      university: "Yale University",
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600"
    },
    {
      title: "Stress Management Techniques",
      instructor: "Dr. Emma Chen",
      university: "Stanford University",
      duration: "38 min",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600"
    },
    {
      title: "Building Resilience",
      instructor: "Dr. Michael Johnson",
      university: "Harvard University",
      duration: "52 min",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600"
    }
  ];

  // Sleep Audio Data
  const sleepAudio = [
    {
      title: "Ocean Waves for Deep Sleep",
      duration: "8 hours",
      type: "Nature Sounds",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Rain & Thunder Ambience",
      duration: "6 hours",
      type: "Weather Sounds",
      color: "from-gray-500 to-blue-500"
    },
    {
      title: "Guided Sleep Meditation",
      duration: "30 min",
      type: "Meditation",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Forest Night Sounds",
      duration: "10 hours",
      type: "Nature Sounds",
      color: "from-green-500 to-teal-500"
    }
  ];

  // Gaming Zone Data
  const games = [
    {
      title: "Mindful Maze",
      description: "Navigate through calming puzzles",
      color: "from-green-400 to-emerald-500",
      icon: "🧩"
    },
    {
      title: "Breathing Bubbles",
      description: "Match your breath to the rhythm",
      color: "from-blue-400 to-cyan-500",
      icon: "🫧"
    },
    {
      title: "Gratitude Garden",
      description: "Grow your positivity tree",
      color: "from-pink-400 to-rose-500",
      icon: "🌸"
    },
    {
      title: "Memory Moments",
      description: "Train your mind with fun exercises",
      color: "from-purple-400 to-indigo-500",
      icon: "🧠"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Mental Health Resources</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Explore our curated collection of podcasts, playlists, videos, lectures, and relaxation tools
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-4">
            {["all", "podcasts", "playlists", "videos", "lectures", "sleep", "games"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Recommended Podcasts */}
        {(activeTab === "all" || activeTab === "podcasts") && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Recommended Podcasts</h2>
                <p className="text-gray-600">Expert conversations on mental wellness</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {podcasts.map((podcast, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative mb-4">
                    <ImageWithFallback
                      src={podcast.image}
                      alt={podcast.title}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl transition-all flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{podcast.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{podcast.host}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{podcast.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Curated Playlists */}
        {(activeTab === "all" || activeTab === "playlists") && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Curated Playlists</h2>
                <p className="text-gray-600">Music to support your mental wellness</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists.map((playlist, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${playlist.color} rounded-2xl p-8 mb-4 h-48 flex items-end group-hover:scale-105 transition-transform`}>
                    <div className="w-full">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-opacity-30 transition-all">
                        <Play className="w-6 h-6 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{playlist.title}</h3>
                  <p className="text-sm text-gray-600">{playlist.tracks} • {playlist.duration}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Videos */}
        {(activeTab === "all" || activeTab === "videos") && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Recommended Videos</h2>
                <p className="text-gray-600">Visual guides for mental health</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={video.image}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-white text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{video.channel}</p>
                    <p className="text-xs text-gray-500">{video.views}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educational Lectures */}
        {(activeTab === "all" || activeTab === "lectures") && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Educational Lectures</h2>
                <p className="text-gray-600">Learn from leading experts</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lectures.map((lecture, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <ImageWithFallback
                    src={lecture.image}
                    alt={lecture.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{lecture.title}</h3>
                    <p className="text-sm text-purple-600 font-medium mb-1">{lecture.instructor}</p>
                    <p className="text-sm text-gray-600 mb-3">{lecture.university}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{lecture.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sleep & Relaxation Audio */}
        {(activeTab === "all" || activeTab === "sleep") && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Sleep & Relaxation Audio</h2>
                <p className="text-gray-600">Soothing sounds for better rest</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sleepAudio.map((audio, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className={`bg-gradient-to-br ${audio.color} rounded-xl h-40 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{audio.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{audio.type}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{audio.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Therapeutic Gaming Zone */}
        {(activeTab === "all" || activeTab === "games") && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Therapeutic Gaming Zone</h2>
                <p className="text-gray-600">Interactive activities for mindfulness</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className={`bg-gradient-to-br ${game.color} rounded-xl h-40 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <span className="text-6xl">{game.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{game.title}</h3>
                  <p className="text-sm text-gray-600">{game.description}</p>
                  <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                    Play Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
