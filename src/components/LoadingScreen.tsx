export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-lg font-medium text-gray-700">Loading 3D Environment...</p>
        </div>
      </div>
    </div>
  );
}