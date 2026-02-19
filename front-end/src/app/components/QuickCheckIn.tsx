import { useState } from "react";
import { X, Heart, Zap } from "lucide-react";

interface QuickCheckInProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickCheckIn({ isOpen, onClose }: QuickCheckInProps) {
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);

  const handleSave = () => {
    // Here you would typically save to a database
    console.log("Check-in saved:", { mood, energy, stress });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-purple-500" strokeWidth={2} />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Quick Check-in</h2>
          <p className="text-xl text-gray-600">How are you feeling today?</p>
        </div>

        {/* Mood Slider */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Mood (1-10)
          </label>
          <div className="flex items-center gap-4">
            <span className="text-3xl">😔</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(mood - 1) * 11.11}%, #e5e7eb ${(mood - 1) * 11.11}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <span className="text-3xl">😊</span>
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">{mood}</span>
            </div>
          </div>
        </div>

        {/* Energy Level Slider */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Energy Level (1-10)
          </label>
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔋</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(energy - 1) * 11.11}%, #e5e7eb ${(energy - 1) * 11.11}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <span className="text-3xl">⚡</span>
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">{energy}</span>
            </div>
          </div>
        </div>

        {/* Stress Level Slider */}
        <div className="mb-10">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Stress Level (1-10)
          </label>
          <div className="flex items-center gap-4">
            <span className="text-3xl">😌</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="1"
                max="10"
                value={stress}
                onChange={(e) => setStress(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(stress - 1) * 11.11}%, #e5e7eb ${(stress - 1) * 11.11}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <span className="text-3xl">😰</span>
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">{stress}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg"
          >
            Save Check-in
          </button>
        </div>
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}