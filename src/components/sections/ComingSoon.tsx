import { AlertCircle } from "lucide-react";

const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-12 h-12 text-orange-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {title} Coming Soon
      </h2>
      <p className="text-gray-500 max-w-md mx-auto">
        We're working hard to bring you this feature. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
