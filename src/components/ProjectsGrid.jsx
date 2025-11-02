import React from 'react';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'Raspberry Pi K8s — Tixin on Edge',
    caption:
      'Hosted the entire Tixin platform on a tiny but mighty Raspberry Pi 5 cluster. 1000+ concurrent users, ~16k req/sec — edge is now.',
    tags: ['Kubernetes', 'Raspberry Pi', 'Edge', 'Node.js', 'Load Testing'],
    link: 'https://github.com/Adityaadpandey',
  },
  {
    title: 'Event-driven CQRS with Kafka',
    caption:
      '1.8M+ records processed in under 10 minutes. Command-side writes to Postgres, query-side projections in MongoDB. Real-time append-only logs.',
    tags: ['Kafka', 'CQRS', 'PostgreSQL', 'MongoDB', 'Node.js'],
    link: 'https://lnkd.in/dXsZMzCR',
  },
  {
    title: 'DIY Auto-Scaling Load Balancer',
    caption:
      'Built a dynamic load balancer with Bun + Express in 4 hours, complete with auto-scaling groups simulation.',
    tags: ['Bun', 'Express', 'Auto-Scaling', 'Infra'],
    link: 'https://github.com/Adityaadpandey',
  },
  {
    title: 'Solana Betting dApp',
    caption:
      'On-chain markets, bets in SOL, trustless resolution — Rust + Anchor smart contract with Next.js frontend.',
    tags: ['Solana', 'Rust', 'Anchor', 'Next.js', 'Web3'],
    link: 'https://github.com/Adityaadpandey',
  },
];

const ProjectsGrid = () => {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Featured Projects</h2>
          <p className="text-sm text-white/70">A snapshot of systems, infra, and experiments I enjoyed building.</p>
        </div>
        <a
          href="https://github.com/Adityaadpandey?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
        >
          <Github className="h-4 w-4" />
          View Repositories
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-black/60 p-5 hover:border-emerald-400/40"
          >
            <div className="mb-3 text-lg font-semibold text-white">{p.title}</div>
            <p className="mb-4 text-sm text-white/70">{p.caption}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded bg-white/5 px-2 py-1 text-[11px] text-emerald-300">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
