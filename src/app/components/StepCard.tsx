import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
}

export function StepCard({ number, icon: Icon, title, description, isLast }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 to-pink-200" />
      )}
      
      {/* Step Number & Icon */}
      <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Icon className="w-10 h-10 text-white" />
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm max-w-xs">
        <div className="text-sm font-semibold text-purple-600 mb-2">Step {number}</div>
        <h3 className="text-lg mb-2 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
