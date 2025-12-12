const BarcelonaLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-900 rounded-full animate-spin"></div>
      <p className="text-gray-600">Cargando jugadores...</p>
    </div>
  );
};

export default BarcelonaLoader;