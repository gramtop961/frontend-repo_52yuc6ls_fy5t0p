import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ApiTester from "./components/ApiTester";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <ApiTester />
      </main>
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} VibeLab. All rights reserved.</p>
          <p>
            Backend URL: <span className="font-mono">{import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
