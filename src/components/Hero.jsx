import { Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-900 text-white px-3 py-1 text-xs">
            <Star size={14} className="text-yellow-300" />
            New: Built‑in API Tester
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight text-gray-900">
            Build, test and ship APIs faster — beautifully.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            If your Postman flow is acting up, use the in‑app tester below. Point it at your backend and get instant, formatted responses.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#apitester" className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-5 py-3 text-sm hover:bg-gray-800">
              Open API Tester
            </a>
            <a href="#features" className="inline-flex items-center justify-center rounded-md bg-white border px-5 py-3 text-sm hover:bg-gray-50">
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
