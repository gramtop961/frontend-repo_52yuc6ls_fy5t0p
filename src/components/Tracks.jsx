import { Server, Boxes, Brain, Code, Smartphone, Cpu } from "lucide-react";

const tracks = [
  {
    icon: Server,
    title: "Backend Engineering",
    blurb: "Design robust APIs, data layers, and services with best practices.",
    tags: ["FastAPI", "Node", "Databases", "Auth"],
    link: "#apitester",
  },
  {
    icon: Boxes,
    title: "DevOps & Cloud",
    blurb: "Ship with confidence using containers, CI/CD, and observability.",
    tags: ["Docker", "K8s", "CI/CD", "Monitoring"],
    link: "#apitester",
  },
  {
    icon: Brain,
    title: "AI / ML",
    blurb: "Prototype models, evaluate results, and deploy intelligent services.",
    tags: ["Python", "LLMs", "Vector DB", "Pipelines"],
    link: "#apitester",
  },
  {
    icon: Code,
    title: "Frontend Engineering",
    blurb: "Craft refined interfaces with modern React patterns and tooling.",
    tags: ["React", "Vite", "Tailwind", "UX"],
    link: "#features",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    blurb: "Build fluid experiences for iOS and Android with shared code.",
    tags: ["React Native", "Expo", "Animations", "Offline"],
    link: "#features",
  },
  {
    icon: Cpu,
    title: "Hardware: Pi & ESP",
    blurb: "Connect sensors, stream data, and control devices reliably.",
    tags: ["Raspberry Pi", "ESP32", "MQTT", "Edge"],
    link: "#apitester",
  },
];

export default function Tracks() {
  return (
    <section className="py-16 sm:py-20 border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Pick your track
          </h2>
          <p className="mt-3 text-gray-600">
            A focused starting point for each discipline. Use the built‑in tester to verify endpoints while you build.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map(({ icon: Icon, title, blurb, tags, link }) => (
            <a
              key={title}
              href={link}
              className="group rounded-xl border border-black/5 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-md border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-700 group-hover:border-fuchsia-200 group-hover:bg-fuchsia-50 group-hover:text-fuchsia-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
