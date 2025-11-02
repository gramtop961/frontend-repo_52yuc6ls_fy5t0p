import { ShieldCheck, Zap, Wrench } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Fast by default",
    desc: "Vite + React + Tailwind deliver instant feedback as you build.",
  },
  {
    icon: Wrench,
    title: "Integrated API tools",
    desc: "Send requests, inspect responses, and debug endpoints without leaving the page.",
  },
  {
    icon: ShieldCheck,
    title: "Robust and resilient",
    desc: "Helpful errors, timeouts, and formatting so failures are easy to understand.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Designed for clarity
          </h2>
          <p className="mt-3 text-gray-600">
            A clean, focused toolkit that keeps you in the flow while you iterate on your API.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
