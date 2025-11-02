import React from 'react';
import Spline from '@splinetool/react-spline';
import { Github, Linkedin, ChevronRight, Rocket } from 'lucide-react';

const HeroSplineCover = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white" id="home">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
          <Rocket className="h-3.5 w-3.5 text-emerald-400" />
          Backend • DevOps • Agentic AI
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
          Aditya Dutt Pandey
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">
          Building resilient backend systems, cloud-native infra, and agentic AI that ships. I live where Kubernetes clusters hum, containers dance, and automation does the night shift.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#request" className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400">
            Try the API demo
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a href="#terminal" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
            Open DevOps terminal
          </a>
          <div className="ml-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
            <a
              href="https://github.com/Adityaadpandey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              <span className="hidden text-sm md:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/adpandeyadp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-white/10"
            >
              <Linkedin className="h-4 w-4" />
              <span className="hidden text-sm md:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplineCover;
