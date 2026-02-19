import { Heart, LogOut, X, Phone, Loader } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import { apiClient, User } from "../../utils/apiClient";

declare global {
  interface Window {
    google: any;
  }
}

export function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devOTP, setDevOTP] = useState(""); // For development display
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = apiClient.getUser();
    setUser(storedUser);
  }, []);

  // Initialize Google Sign-In button
  useEffect(() => {
    if (showLoginModal && googleButtonRef.current && window.google) {
      try {
        window.google.accounts.id.render(googleButtonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          logo_alignment: "center",
          text: "signin_with",
          click_listener: handleGoogleSignIn,
        });
      } catch (err) {
        console.log("Google Sign-In not available yet");
      }
    }
  }, [showLoginModal]);

  const handleGoogleSignIn = async (response: any) => {
    try {
      setLoading(true);
      setError("");
      
      if (response.credential) {
        const result = await apiClient.googleAuth(response.credential);
        if (result.success) {
          const userData = result.user;
          setUser(userData);
          setShowLoginModal(false);
        } else {
          setError(result.error || "Google login failed");
        }
      }
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await apiClient.sendPhoneOTP(phoneNumber);
      if (response.success || response.message) {
        setStep("otp");
        // Show OTP in development mode
        if (response.otp) {
          setDevOTP(response.otp);
        }
      } else {
        setError(response.error || "Failed to send OTP");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await apiClient.verifyPhoneOTP(phoneNumber, otp);
      if (response.success) {
        const userData = response.user;
        setUser(userData);
        setShowLoginModal(false);
        // Reset form
        setPhoneNumber("");
        setOtp("");
        setStep("phone");
        setDevOTP("");
      } else {
        setError(response.error || "Failed to verify OTP");
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiClient.logout();
    setUser(null);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setPhoneNumber("");
    setOtp("");
    setStep("phone");
    setError("");
    setDevOTP("");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Heart
                className="w-5 h-5 text-white"
                fill="white"
              />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Mindhaven
            </span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/assessment"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Mental Health Assessment
            </Link>
            <Link
              to="/courses"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/mindgames"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Mind Games
            </Link>
            <a
              href="#mindsight"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Mind Sight
            </a>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                >
                  Sign In
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                  title="Sign Out"
                  disabled
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Heart
                    className="w-7 h-7 text-white"
                    fill="white"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to continue to Mindhaven
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Step 1: Phone Number Entry */}
            {step === "phone" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={!phoneNumber || loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 mb-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending OTP..." : "Continue with Phone"}
                </button>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {step === "otp" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-2xl letter-spacing tracking-widest disabled:bg-gray-100"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    We've sent a 6-digit code to {phoneNumber}
                  </p>
                </div>

                {/* Development Mode: Show OTP */}
                {devOTP && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-700">
                      <strong>Dev mode:</strong> OTP is <strong>{devOTP}</strong>
                    </p>
                  </div>
                )}

                <button
                  onClick={handleVerifyOTP}
                  disabled={!otp || loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setError("");
                  }}
                  className="w-full text-purple-600 py-2 font-semibold hover:text-purple-700 transition-colors"
                >
                  Back
                </button>
              </>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <div ref={googleButtonRef} className="flex justify-center mb-6"></div>

            {/* Fallback Google Button */}
            {!window.google && (
              <button
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            )}

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to Mindhaven's{" "}
              <a
                href="#"
                className="text-purple-600 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-purple-600 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}