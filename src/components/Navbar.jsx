import { Rocket, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#apitester", label: "API Tester" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white">
            <Rocket size={18} />
          </span>
          <span className="tracking-tight">VibeLab</span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-gray-700 hover:text-gray-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#apitester"
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-3 py-1.5 hover:bg-gray-800 transition-colors"
          >
            <span>Open Tester</span>
          </a>
        </div>

        <button
          className="md:hidden inline-flex p-2 rounded-md hover:bg-gray-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 grid gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-2 rounded-md hover:bg-gray-50"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#apitester"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 rounded-md bg-gray-900 text-white text-center"
            >
              Open Tester
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
