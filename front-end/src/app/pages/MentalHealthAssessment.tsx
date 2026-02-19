import { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Loader, ArrowLeft, CheckCircle } from "lucide-react";
import { apiClient } from "../../utils/apiClient";

interface AssessmentQuestion {
  id: number;
  question: string;
  category: string;
  options: {
    text: string;
    value: number;
  }[];
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "How often do you feel anxious or worried?",
    category: "anxiety",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Rarely (1-2 times/month)", value: 1 },
      { text: "Sometimes (1-2 times/week)", value: 2 },
      { text: "Often (3+ times/week)", value: 3 },
    ],
  },
  {
    id: 2,
    question: "How would you rate your sleep quality?",
    category: "sleep",
    options: [
      { text: "Excellent", value: 0 },
      { text: "Good", value: 1 },
      { text: "Fair", value: 2 },
      { text: "Poor", value: 3 },
    ],
  },
  {
    id: 3,
    question: "How often do you feel sad or down?",
    category: "mood",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Rarely", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Most of the time", value: 3 },
    ],
  },
  {
    id: 4,
    question: "How satisfied are you with your relationships?",
    category: "relationships",
    options: [
      { text: "Very satisfied", value: 0 },
      { text: "Satisfied", value: 1 },
      { text: "Somewhat satisfied", value: 2 },
      { text: "Not satisfied", value: 3 },
    ],
  },
  {
    id: 5,
    question: "How often do you exercise or engage in physical activity?",
    category: "health",
    options: [
      { text: "Daily", value: 0 },
      { text: "3-4 times/week", value: 1 },
      { text: "1-2 times/week", value: 2 },
      { text: "Rarely or never", value: 3 },
    ],
  },
  {
    id: 6,
    question: "How stressed do you feel most days?",
    category: "stress",
    options: [
      { text: "Not stressed", value: 0 },
      { text: "Mildly stressed", value: 1 },
      { text: "Moderately stressed", value: 2 },
      { text: "Severely stressed", value: 3 },
    ],
  },
  {
    id: 7,
    question: "How often do you feel overwhelmed?",
    category: "overwhelm",
    options: [
      { text: "Never", value: 0 },
      { text: "Occasionally", value: 1 },
      { text: "Regularly", value: 2 },
      { text: "Always or almost always", value: 3 },
    ],
  },
  {
    id: 8,
    question: "How satisfied are you with your current life direction?",
    category: "purpose",
    options: [
      { text: "Very satisfied", value: 0 },
      { text: "Satisfied", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Dissatisfied", value: 3 },
    ],
  },
];

export default function MentalHealthAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.length < ASSESSMENT_QUESTIONS.length) {
      setError("Please answer all questions before submitting");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Calculate score (weighted by risk level)
      const totalScore = Math.min(100, (answers.reduce((a, b) => a + b, 0) / (ASSESSMENT_QUESTIONS.length * 3)) * 100);
      const invertedScore = Math.round(100 - totalScore); // Higher is better

      // Submit to backend
      const response = await apiClient.submitAssessment({
        answers: ASSESSMENT_QUESTIONS.map((q, idx) => ({
          questionId: q.id,
          question: q.question,
          category: q.category,
          answer: answers[idx],
        })),
        score: invertedScore,
        date: new Date().toISOString(),
      });

      if (response.success || response.message) {
        setScore(invertedScore);
        setSubmitted(true);
      } else {
        setError(response.error || "Failed to submit assessment");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit assessment");
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100;
  const question = ASSESSMENT_QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mental Health Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Take a few minutes to assess your current mental wellness. Your responses help us
            provide personalized care recommendations.
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}
                </span>
                <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                  {question.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option.value)}
                    className={`w-full p-4 text-left rounded-xl font-medium transition-all duration-200 ${
                      answers[currentQuestion] === option.value
                        ? "bg-blue-600 text-white border-2 border-blue-600 shadow-lg"
                        : "bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          answers[currentQuestion] === option.value
                            ? "bg-white border-white"
                            : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion] === option.value && (
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                      {option.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {currentQuestion === ASSESSMENT_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading || answers.length < ASSESSMENT_QUESTIONS.length}
                  className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Submitting..." : "Submit Assessment"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                  className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          // Results Screen
          <div className="text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Assessment Complete!</h2>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for completing the assessment. Here are your results:
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 mb-8 border border-blue-200">
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-medium mb-4">Your Wellness Score</p>
                <div className="flex items-center justify-center">
                  <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {score}
                  </span>
                  <span className="text-4xl text-gray-500 ml-3">/100</span>
                </div>
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-8 mb-6">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <p className="text-gray-700 text-lg font-medium">
                {score >= 75
                  ? "Excellent wellness status! Keep up the great work."
                  : score >= 50
                  ? "Good wellness status. Consider exploring our resources to boost your mental health."
                  : score >= 25
                  ? "Your wellness could use some attention. Connect with a therapist to get support."
                  : "Please reach out to a mental health professional for personalized support."}
              </p>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/book-therapist")}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium text-blue-700 transition-colors text-left"
                >
                  📞 Schedule a therapy session
                </button>
                <button
                  onClick={() => navigate("/courses")}
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg font-medium text-purple-700 transition-colors text-left"
                >
                  📚 Explore wellness courses
                </button>
                <button
                  onClick={() => navigate("/resources")}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-lg font-medium text-green-700 transition-colors text-left"
                >
                  🧘 Try relaxation resources
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium text-gray-700 transition-colors text-left"
                >
                  🏠 Return to home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


        {/* Women's Mental Wellness Score Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Women's Mental Wellness Score</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-5xl font-bold text-gray-900">75/100</span>
              <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">Good</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Last Assessment</p>
                <p className="text-sm text-gray-500">No assessment taken</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Trend</p>
                <p className="text-sm text-gray-500">Not assessed</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-4 mb-6">
            <p className="text-gray-700 text-center">
              Take a cycle assessment to get personalized insights. You're doing well! Keep up the good self-care.
            </p>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 font-semibold py-3 px-6 rounded-xl hover:shadow-md transition-all duration-300 border border-pink-200 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Take Cycle & Mental Health Assessment
          </button>
        </div>

        {/* Share Your Day Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sun className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-blue-600">Share Your Day</h2>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Smile className="w-5 h-5 text-gray-600" />
              <span className="text-lg font-semibold text-gray-900">Wellness Check-in</span>
              <Heart className="w-5 h-5 text-pink-500" />
            </div>

            <p className="text-gray-600 mb-6">
              Share your thoughts and emotions for personalized mental health insights.
            </p>

            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
              <Sparkles className="w-5 h-5" />
              Start Check-in
            </button>
          </div>
        </div>

        {/* Mindhaven Wellness Metrics */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-2 mb-8">
            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
            <h2 className="text-2xl font-bold text-gray-900">Mindhaven Wellness Metrics</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Mood */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Smile className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-gray-700">Mood</p>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">7.2</p>
              <p className="text-sm text-gray-600">n/o</p>
              <p className="text-sm text-green-600 font-medium">positive</p>
            </div>

            {/* Stress Level */}
            <div className="bg-red-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-red-600" />
                <p className="font-semibold text-gray-700">Stress Level</p>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">3.1</p>
              <p className="text-sm text-gray-600">n/o</p>
              <p className="text-sm text-green-600 font-medium">low</p>
            </div>

            {/* Positivity */}
            <div className="bg-yellow-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-yellow-600" />
                <p className="font-semibold text-gray-700">Positivity</p>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">7.2</p>
              <p className="text-sm text-gray-600">n/o</p>
              <p className="text-sm text-green-600 font-medium">good</p>
            </div>

            {/* Anxiety Level */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <p className="font-semibold text-gray-700">Anxiety Level</p>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">2.5</p>
              <p className="text-sm text-gray-600">n/o</p>
              <p className="text-sm text-green-600 font-medium">low</p>
            </div>

            {/* Sleep Quality */}
            <div className="bg-indigo-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-5 h-5 text-indigo-600" />
                <p className="font-semibold text-gray-700">Sleep Quality</p>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">7.5</p>
              <p className="text-sm text-gray-600">n/o</p>
              <p className="text-sm text-green-600 font-medium">good</p>
            </div>

            {/* Mindfulness */}
            <div className="bg-green-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-gray-700">Mindfulness</p>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">15</p>
              <p className="text-sm text-gray-600">min</p>
              <p className="text-sm text-green-600 font-medium">practiced</p>
            </div>
          </div>

          {/* Sample Wellness Insights */}
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-green-800 mb-4">Sample Wellness Insights</h3>
            
            <p className="font-semibold text-gray-900 mb-3">Sample Insights:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2"></span>
                <span className="text-gray-700">Complete the personalization quiz to get tailored wellness insights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                <span className="text-gray-700">These metrics will be customized based on your wellness goals</span>
              </li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <p className="font-semibold text-orange-800">Get Personalized Insights!</p>
              </div>
              <p className="text-sm text-orange-700">
                Take the personalization quiz by clicking on "Share your day" to receive customized wellness metrics and recommendations based on your unique needs.
              </p>
            </div>
          </div>
        </div>

        {/* Comprehensive Mental Health Assessments */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Comprehensive Mental Health Assessments</h2>
            </div>
            <p className="text-gray-600">
              AI-powered depression screening and lifestyle risk assessment with personalized recommendations
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 border-b border-gray-200 pb-4">
            <button className="px-4 py-2 font-semibold text-gray-900 border-b-2 border-gray-900">Overview</button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">Depression Assessment</button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">Lifestyle Assessment</button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">Results</button>
            <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">History</button>
          </div>

          {/* AI-Powered Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Brain className="w-9 h-9 text-white" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
              AI-Powered Mental Health Assessments
            </h3>
            
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
              Experience cutting-edge mental health screening powered by advanced <span className="font-semibold">machine learning</span> and <span className="font-semibold">neural networks</span>. Our AI combines clinical expertise with sophisticated pattern recognition to provide personalized insights into your mental wellness journey.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Neural Networks */}
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h4 className="font-bold text-blue-700 mb-2">Neural Networks</h4>
                <p className="text-sm text-gray-600">Deep learning models analyze complex patterns in mental health data</p>
              </div>

              {/* Pattern Recognition */}
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h4 className="font-bold text-purple-700 mb-2">Pattern Recognition</h4>
                <p className="text-sm text-gray-600">AI identifies subtle indicators and risk factors automatically</p>
              </div>

              {/* Evidence-Based */}
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h4 className="font-bold text-green-700 mb-2">Evidence-Based</h4>
                <p className="text-sm text-gray-600">Clinically validated assessments with AI enhancement</p>
              </div>

              {/* Real-Time Analysis */}
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <h4 className="font-bold text-indigo-700 mb-2">Real-Time Analysis</h4>
                <p className="text-sm text-gray-600">Instant processing and personalized recommendations</p>
              </div>
            </div>
          </div>

          {/* Assessment Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Depression Screening */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-blue-900 text-center mb-3">Depression Screening</h3>
              <p className="text-center text-blue-700 mb-6">
                PHQ-9 Clinical Assessment enhanced with AI neural network analysis
              </p>

              <div className="bg-blue-100 rounded-xl p-4">
                <p className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Features
                </p>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• TensorFlow.js neural network classification</li>
                  <li>• Pattern recognition for symptom analysis</li>
                  <li>• Personalized risk assessment</li>
                  <li>• Clinical-grade accuracy</li>
                </ul>
              </div>
            </div>

            {/* Lifestyle Assessment */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-purple-900 text-center mb-3">Lifestyle Assessment</h3>
              <p className="text-center text-purple-700 mb-6">
                Comprehensive risk factor analysis with AI-powered insights
              </p>

              <div className="bg-purple-100 rounded-xl p-4">
                <p className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  AI Analysis
                </p>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>• Predictive risk modeling</li>
                  <li>• Multi-factor correlation analysis</li>
                  <li>• Lifestyle pattern recognition</li>
                  <li>• Personalized intervention recommendations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ready to Begin */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-900">Ready to Begin?</h3>
            </div>
            
            <p className="text-center text-gray-700 mb-6">
              Take both assessments for a comprehensive AI-powered analysis of your mental health and personalized recommendations.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Start Depression Assessment
              </button>
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <User className="w-5 h-5" />
                Start Lifestyle Assessment
              </button>
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Find Professional Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
