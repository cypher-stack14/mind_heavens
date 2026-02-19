import { Link, useParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Star, 
  Users, 
  Play,
  FileText,
  CheckCircle,
  ExternalLink,
  Heart,
  X
} from "lucide-react";

interface CourseModule {
  id: number;
  title: string;
  duration: string;
  type: "video" | "reading";
  completed: boolean;
}

interface CourseDetailType {
  id: number;
  title: string;
  description: string;
  level: string;
  category: string;
  duration: string;
  modules: number;
  rating: number;
  enrolled: number;
  instructor: {
    name: string;
    initials: string;
    bio: string;
  };
  moduleList: CourseModule[];
  currentModule: {
    title: string;
    duration: string;
    videoId: string;
  };
}

const courseData: { [key: string]: CourseDetailType } = {
  "1": {
    id: 1,
    title: "Anxiety Management Fundamentals",
    description: "Learn evidence-based techniques to understand and manage anxiety in daily life.",
    level: "beginner",
    category: "anxiety",
    duration: "2.5 hours",
    modules: 4,
    rating: 4.8,
    enrolled: 78,
    instructor: {
      name: "Dr. Sarah Johnson",
      initials: "DSJ",
      bio: "Mental Health Professional with expertise in anxiety management."
    },
    moduleList: [
      { id: 1, title: "Understanding Anxiety", duration: "15 min", type: "video", completed: false },
      { id: 2, title: "Breathing Techniques for Calm", duration: "12 min", type: "video", completed: false },
      { id: 3, title: "Managing Anxious Thoughts", duration: "20 min", type: "reading", completed: false },
      { id: 4, title: "Progressive Muscle Relaxation", duration: "25 min", type: "reading", completed: false }
    ],
    currentModule: {
      title: "Understanding Anxiety",
      duration: "15 min",
      videoId: "yI-zb_aP0Po"
    }
  },
  "2": {
    id: 2,
    title: "Mindfulness Meditation for Beginners",
    description: "Discover the power of mindfulness meditation to reduce stress and increase well-being.",
    level: "beginner",
    category: "mindfulness",
    duration: "3 hours",
    modules: 2,
    rating: 4.9,
    enrolled: 92,
    instructor: {
      name: "Dr. Michael Chen",
      initials: "MC",
      bio: "Mindfulness expert specializing in stress reduction and meditation practices."
    },
    moduleList: [
      { id: 1, title: "Introduction to Mindfulness", duration: "18 min", type: "video", completed: false },
      { id: 2, title: "Daily Meditation Practice", duration: "22 min", type: "video", completed: false }
    ],
    currentModule: {
      title: "Introduction to Mindfulness",
      duration: "18 min",
      videoId: "ZToicYcHIOU"
    }
  }
};

export default function CourseDetail() {
  const { id } = useParams();
  const course = courseData[id || "1"] || courseData["1"];
  
  // State management
  const [moduleList, setModuleList] = useState(course.moduleList);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  const currentModule = moduleList[currentModuleIndex];
  const completedModules = moduleList.filter(m => m.completed).length;
  const completionPercentage = Math.round((completedModules / course.modules) * 100);

  // Mark current module as complete
  const handleMarkComplete = () => {
    const updatedModules = [...moduleList];
    updatedModules[currentModuleIndex].completed = true;
    setModuleList(updatedModules);
    
    // Move to next module if available
    if (currentModuleIndex < moduleList.length - 1) {
      setTimeout(() => {
        setCurrentModuleIndex(currentModuleIndex + 1);
      }, 500);
    }
  };

  // Toggle save to favorites
  const handleToggleSave = () => {
    setIsSaved(!isSaved);
  };

  // Enroll in course
  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  // Navigate to module
  const handleModuleClick = (index: number) => {
    setCurrentModuleIndex(index);
    setShowNotes(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Back to Courses */}
        <Link 
          to="/courses"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </Link>

        {/* Course Header - Green Banner */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 mb-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Side - Course Info */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-white/90 mb-6">{course.description}</p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">{course.modules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-white" />
                  <span className="font-medium">{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{course.enrolled} enrolled</span>
                </div>
              </div>
            </div>

            {/* Right Side - Progress */}
            <div className="lg:w-80 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Your Progress</h3>
                <button
                  onClick={handleToggleSave}
                  className={`p-2 rounded-full transition-all hover:scale-110 ${
                    isSaved ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
                  }`}
                  title={isSaved ? "Remove from favorites" : "Save to favorites"}
                >
                  <Heart
                    className={`w-5 h-5 ${isSaved ? "fill-white text-white" : "text-white"}`}
                  />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Course Completion</span>
                  <span className="text-sm font-bold">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span>Completed:</span>
                <span className="font-bold">{completedModules} / {course.modules} modules</span>
              </div>

              {!isEnrolled && (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-white text-green-600 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
                >
                  Enroll Now
                </button>
              )}

              {isEnrolled && completionPercentage === 100 && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-sm font-semibold">Course Completed!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Video and Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Module */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Play className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{currentModule.title}</h2>
                </div>
                <span className="text-gray-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentModule.duration}
                </span>
              </div>

              {/* Video Player */}
              {currentModule.type === "video" ? (
                <div className="relative rounded-xl overflow-hidden mb-6 aspect-video bg-gray-900">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${course.currentModule.videoId}`}
                    title={currentModule.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden mb-6 p-8 bg-gradient-to-br from-gray-100 to-gray-200 text-center">
                  <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Reading Material</h3>
                  <p className="text-gray-600">This module contains reading material and exercises.</p>
                </div>
              )}

              {/* Video Actions */}
              <div className="flex flex-wrap gap-3 mb-6">
                {currentModule.type === "video" && (
                  <a
                    href={`https://www.youtube.com/watch?v=${course.currentModule.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                )}
                <button
                  onClick={handleMarkComplete}
                  disabled={currentModule.completed}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
                    currentModule.completed
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {currentModule.completed ? "Completed" : "Mark Complete"}
                </button>
              </div>

              {/* Module Info */}
              <div className="border-t border-gray-100 pt-6">
                <p className="text-gray-900 font-semibold mb-1">{currentModule.title}</p>
                <p className="text-gray-600 text-sm mb-4">Duration: {currentModule.duration}</p>
              </div>

              {/* Key Learning Points */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Key Learning Points</h3>
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    {showNotes ? "Hide Notes" : "Show Notes"}
                  </button>
                </div>
                {showNotes ? (
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Understanding the fundamentals of {currentModule.title.toLowerCase()}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Practical techniques you can apply immediately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Evidence-based strategies for long-term wellness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Tips for integrating these practices into daily life</span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Click "Show Notes" to view the key learning points for this module.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Modules and Instructor */}
          <div className="space-y-6">
            {/* Course Modules */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h3>
              
              <div className="space-y-2">
                {moduleList.map((module, index) => (
                  <div
                    key={module.id}
                    onClick={() => handleModuleClick(index)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentModuleIndex
                        ? 'bg-green-50 border-2 border-green-500'
                        : module.completed
                        ? 'bg-gray-50 border-2 border-gray-200'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      module.completed
                        ? 'bg-green-100'
                        : module.type === 'video'
                        ? 'bg-purple-100'
                        : 'bg-gray-100'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : module.type === 'video' ? (
                        <Play className={`w-5 h-5 ${index === currentModuleIndex ? 'text-green-600' : 'text-purple-600'}`} />
                      ) : (
                        <FileText className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${
                        index === currentModuleIndex
                          ? 'text-green-700'
                          : module.completed
                          ? 'text-gray-600'
                          : 'text-gray-900'
                      }`}>
                        {index + 1}. {module.title}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                        {module.completed && (
                          <span className="text-green-600 font-medium">• Completed</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instructor</h3>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-2xl">{course.instructor.initials}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{course.instructor.name}</h4>
                <p className="text-gray-600 text-sm">{course.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        {/* Save to Favorites */}
        <button
          onClick={handleToggleSave}
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
            isSaved
              ? "bg-gradient-to-r from-red-500 to-pink-500"
              : "bg-gradient-to-r from-green-500 to-emerald-500"
          }`}
          title={isSaved ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart className={`w-6 h-6 text-white ${isSaved ? "fill-white" : ""}`} />
        </button>
      </div>
    </div>
  );
}
