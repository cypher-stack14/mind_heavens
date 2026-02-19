import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export function TestimonialCard({ name, role, content, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">&ldquo;{content}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center text-white font-semibold">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}
