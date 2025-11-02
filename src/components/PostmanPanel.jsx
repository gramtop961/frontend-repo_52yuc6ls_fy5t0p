import React, { useState } from 'react';
import { Send, Server } from 'lucide-react';

const pretty = (obj) => JSON.stringify(obj, null, 2);

const mockResponse = {
  name: 'Aditya Dutt Pandey',
  title: 'Backend • DevOps • Agentic AI',
  location: 'India',
  stack: [
    'Kubernetes',
    'Docker',
    'Kafka',
    'PostgreSQL',
    'MongoDB',
    'Node.js',
    'Python',
    'Rust',
    'Solana/Anchor',
  ],
  links: {
    github: 'https://github.com/Adityaadpandey',
    linkedin: 'https://www.linkedin.com/in/adpandeyadp',
  },
  highlights: [
    'Hosted the Tixin platform on a Raspberry Pi 5 K8s cluster handling 1000+ concurrent users (~16k req/sec).',
    'Built event-driven CQRS with Kafka (1.8M+ records in <10 minutes).',
    'Dynamic load balancer with auto-scaling (Bun + Express).',
    'Solana betting dApp with Anchor and Rust.',
  ],
};

const PostmanPanel = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const onSend = async () => {
    setLoading(true);
    // Simulate a network roundtrip so the interaction feels real
    await new Promise((r) => setTimeout(r, 700));
    setData(mockResponse);
    setLoading(false);
  };

  return (
    <section id="request" className="relative mx-auto -mt-24 max-w-6xl px-6 pb-16">
      <div className="rounded-xl border border-white/10 bg-zinc-900/70 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm text-white/80">
          <Server className="h-4 w-4 text-emerald-400" />
          Postman-style API Demo
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          {/* Request */}
          <div className="space-y-3 border-b border-white/10 p-4 md:border-b-0 md:border-r">
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-600/20 px-2 py-1 text-xs font-semibold text-emerald-400">GET</span>
              <input
                value="/api/me"
                readOnly
                className="w-full rounded bg-zinc-800/70 px-3 py-2 text-sm outline-none ring-1 ring-inset ring-white/10"
              />
              <button
                onClick={onSend}
                className="inline-flex items-center gap-2 rounded bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400"
              >
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
            <div className="rounded-lg border border-white/10 bg-zinc-950/40 p-3 text-xs text-white/70">
              Click Send to fetch my profile payload. The response mimics a real endpoint, including stack, links, and highlights.
            </div>
          </div>

          {/* Response */}
          <div className="p-4">
            <div className="rounded-lg border border-white/10 bg-black/50 p-3">
              {loading && (
                <div className="animate-pulse text-sm text-white/70">Waiting for response…</div>
              )}
              {!loading && !data && (
                <div className="text-sm text-white/50">Response will appear here.</div>
              )}
              {!loading && data && (
                <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap break-words text-emerald-200">
{pretty(data)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostmanPanel;
