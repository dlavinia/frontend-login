import logo from "../assets/B2BitLogo.png";

export function SplashScreen() {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-screen bg-white opacity-40">
      <img src={logo} alt="Logo" className="w-30 h-auto mb-4 animate-pulse" />
      <span className="text-gray-600 text-lg">Loading...</span>
    </div>

  );
}