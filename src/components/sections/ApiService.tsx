import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApiService = () => {
  const [keys, setKeys] = useState<number[]>([]);

  const generateKey = () => {
    if (keys.length < 3) {
      const newKey = Math.floor(Math.random() * 1000000); // Generate a random number
      setKeys([...keys, newKey]);
    } else {
      alert("You can only create up to 3 keys.");
    }
  };

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 space-y-3 sm:space-y-0">
            {/* Logo */}
            <div className="flex items-center w-full sm:w-auto justify-between">
              <button
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                onClick={handleLogoClick}
              >
                <img
                  src="/sf.png"
                  alt="SupraScan"
                  className="h-6 sm:h-8 w-6 sm:w-8 mr-1"
                />
                <div className="flex items-baseline">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    SupraScan
                  </h1>
                  <span className="text-md sm:text-lg font-bold text-red-500">
                    .fun
                  </span>
                </div>
              </button>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Sign Up
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-center mb-4">API Service</h1>
        <p className="text-center text-gray-700 mb-6">
          Welcome to the API Service! Here you can generate keys to access our
          services.
        </p>
        <div className="text-center mb-6">
          <button
            onClick={generateKey}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Generate Key
          </button>
        </div>

        {/* Keys Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Key Number</th>
                <th className="py-2 px-4 border-b">Generated Key</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiService;
