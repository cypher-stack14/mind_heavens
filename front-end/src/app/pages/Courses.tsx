import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router";
import { 
  Search, 
  Star, 
  Users, 
  Clock, 
  BookOpen,
  Target,
  Frown,
  Wind,
  Brain,
  Heart
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  students: number;
  instructor: string;
  modules: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "Anxiety Management Fundamentals",
    description: "Learn evidence-based techniques to understand and manage anxiety in daily life.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    duration: "2.5 hours",
    rating: 4.8,
    students: 78,
    instructor: "Dr. Sarah Johnson",
    modules: 4,
    level: "beginner",
    category: ["anxiety", "wellness"]
  },
  {
    id: 2,
    title: "Mindfulness Meditation for Beginners",
    description: "Discover the power of mindfulness meditation to reduce stress and increase well-being.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    duration: "3 hours",
    rating: 4.9,
    students: 92,
    instructor: "Dr. Michael Chen",
    modules: 2,
    level: "beginner",
    category: ["mindfulness", "stress"]
  },
  {
    id: 3,
    title: "Understanding and Coping with Depression",
    description: "Learn about depression and develop healthy coping strategies.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    duration: "4 hours",
    rating: 4.7,
    students: 56,
    instructor: "Dr. Emily Rodriguez",
    modules: 1,
    level: "intermediate",
    category: ["depression", "wellness"]
  },
  {
    id: 4,
    title: "Effective Stress Management",
    description: "Master practical techniques to manage stress in work and personal life.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    duration: "2 hours",
    rating: 4.6,
    students: 73,
    instructor: "Dr. Alex Thompson",
    modules: 1,
    level: "beginner",
    category: ["stress", "wellness"]
  },
  {
    id: 5,
    title: "Sleep Hygiene & Mental Health",
    description: "Improve your sleep quality and understand its impact on mental wellness.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    duration: "1.5 hours",
    rating: 4.8,
    students: 89,
    instructor: "Dr. Lisa Park",
    modules: 2,
    level: "beginner",
    category: ["wellness", "stress"]
  },
  {
    id: 6,
    title: "Developing Emotional Intelligence",
    description: "Build emotional awareness and regulation skills for better relationships and mental health.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    duration: "3.5 hours",
    rating: 4.7,
    students: 64,
    instructor: "Dr. Maria Santos",
    modules: 2,
    level: "intermediate",
    category: ["wellness"]
  },
  {
    id: 7,
    title: "Cognitive Behavioral Techniques (CBT)",
    description: "Learn evidence-based CBT strategies to change negative thought patterns.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    duration: "4 hours",
    rating: 4.9,
    students: 107,
    instructor: "Dr. Robert Kim",
    modules: 2,
    level: "intermediate",
    category: ["depression", "anxiety", "wellness"]
  },
  {
    id: 8,
    title: "Building Self-Compassion",
    description: "Develop a kinder relationship with yourself through self-compassion practices.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    duration: "2.5 hours",
    rating: 4.8,
    students: 95,
    instructor: "Dr. Jennifer Walsh",
    modules: 2,
    level: "beginner",
    category: ["wellness", "mindfulness"]
  },
  {
    id: 9,
    title: "Advanced Mindfulness Practices",
    description: "Deepen your mindfulness practice with advanced techniques and longer meditations.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    duration: "5 hours",
    rating: 4.9,
    students: 42,
    instructor: "Dr. Michael Chen",
    modules: 2,
    level: "advanced",
    category: ["mindfulness", "wellness"]
  }
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedCourses, setSavedCourses] = useState<number[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || course.category.includes(activeFilter);
    const matchesSaved = !showSavedOnly || savedCourses.includes(course.id);
    return matchesSearch && matchesFilter && matchesSaved;
  });

  const toggleSaveCourse = (courseId: number) => {
    setSavedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mental Health <span className="text-green-600">Courses</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Develop essential skills for mental wellness with our expert-led courses. Learn at your own pace with video lessons, practical exercises, and evidence-based techniques.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "all"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            All Courses
          </button>
          <button
            onClick={() => setActiveFilter("anxiety")}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "anxiety"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Target className="w-4 h-4" />
            Anxiety
          </button>
          <button
            onClick={() => setActiveFilter("depression")}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "depression"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Frown className="w-4 h-4" />
            Depression
          </button>
          <button
            onClick={() => setActiveFilter("mindfulness")}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "mindfulness"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Wind className="w-4 h-4" />
            Mindfulness
          </button>
          <button
            onClick={() => setActiveFilter("stress")}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "stress"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Brain className="w-4 h-4" />
            Stress
          </button>
          <button
            onClick={() => setActiveFilter("wellness")}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === "wellness"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Heart className="w-4 h-4" />
            Wellness
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
            >
              {/* Save to Favorites Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleSaveCourse(course.id);
                }}
                className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md ${
                  savedCourses.includes(course.id)
                    ? "bg-red-500"
                    : "bg-white/90 backdrop-blur-sm hover:bg-white"
                }`}
                title={savedCourses.includes(course.id) ? "Remove from favorites" : "Save to favorites"}
              >
                <Heart
                  className={`w-5 h-5 ${
                    savedCourses.includes(course.id)
                      ? "fill-white text-white"
                      : "text-gray-700"
                  }`}
                />
              </button>

              <Link
                to={`/courses/${course.id}`}
                className="block cursor-pointer"
              >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{course.duration}</span>
                </div>
                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {course.title}
                </h3>

                {/* Rating and Students */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{course.students}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Instructor and Modules */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600">By {course.instructor}</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">{course.modules} modules</span>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-3">
          {/* Saved Count Badge */}
          {savedCourses.length > 0 && (
            <div className="bg-white rounded-full px-4 py-2 shadow-lg text-center">
              <p className="text-sm font-semibold text-gray-900">{savedCourses.length} Saved</p>
            </div>
          )}
          
          {/* Toggle Saved Filter */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
              showSavedOnly
                ? "bg-gradient-to-r from-red-500 to-pink-500"
                : "bg-gradient-to-r from-green-500 to-emerald-500"
            }`}
            title={showSavedOnly ? "Show all courses" : "Show saved courses only"}
          >
            <Heart className={`w-6 h-6 text-white ${showSavedOnly ? "fill-white" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}