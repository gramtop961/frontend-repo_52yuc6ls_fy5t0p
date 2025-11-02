import React, { useMemo, useRef, useState } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

const COMMANDS = {
  help: {
    description: 'List available commands',
    run: () => `Available commands:\n- docker ps\n- kubectl get pods\n- k3s kubectl get nodes\n- ansible --version\n- uname -a\n- clear`,
  },
  'docker ps': {
    description: 'List running containers',
    run: () => (
      `CONTAINER ID   IMAGE                COMMAND                  STATUS      PORTS                NAMES\n` +
      `a1b2c3d4e5f6   ghcr.io/tixin/api    \"node server.js\"        Up 5 hours  0.0.0.0:8080->8080  api-1\n` +
      `f6e5d4c3b2a1   redis:7-alpine       \"docker-entrypoint\"     Up 5 hours  6379/tcp            cache-redis`)
    ,
  },
  'kubectl get pods': {
    description: 'Show pods in the current namespace',
    run: () => (
      `NAME                          READY   STATUS    RESTARTS   AGE\n` +
      `api-deployment-6b7f9d4c8f     3/3     Running   0          2d\n` +
      `web-frontend-6c8d7f9b4d       2/2     Running   1          2d\n` +
      `kafka-0                       1/1     Running   0          2d`)
    ,
  },
  'k3s kubectl get nodes': {
    description: 'List k3s nodes (Raspberry Pi cluster)',
    run: () => (
      `NAME       STATUS   ROLES                  AGE   VERSION\n` +
      `pi-master  Ready    control-plane,master  14d   v1.29.0+k3s1\n` +
      `pi-worker1 Ready    <none>                 14d   v1.29.0+k3s1`)
    ,
  },
  'ansible --version': {
    description: 'Show Ansible version',
    run: () => (
      `ansible [core 2.16.4]\n  config file = /etc/ansible/ansible.cfg\n  python version = 3.11.6 (CPython)`)
    ,
  },
  'uname -a': {
    description: 'Kernel and system info',
    run: () => `Linux aditya-dev 6.5.0-28-generic #29-Ubuntu SMP x86_64 GNU/Linux`,
  },
  clear: {
    description: 'Clear the terminal',
    run: () => '__CLEAR__',
  },
};

const TerminalPlayground = () => {
  const [history, setHistory] = useState([`Type 'help' to get started.`]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  const sidebar = useMemo(() => Object.entries(COMMANDS).map(([key, value]) => ({ key, description: value.description })), []);

  const execute = (cmd) => {
    const command = cmd.trim();
    if (!command) return;

    const entry = COMMANDS[command];
    if (!entry) {
      setHistory((h) => [...h, `> ${command}`, `Command not found: ${command}`]);
    } else {
      const out = entry.run();
      if (out === '__CLEAR__') setHistory([]);
      else setHistory((h) => [...h, `> ${command}`, out]);
    }
    setInput('');

    setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, 0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      execute(input);
    }
  };

  return (
    <section id="terminal" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-sm text-white/70">
              <Terminal className="h-4 w-4 text-emerald-400" />
              DevOps Playground
            </div>
            <div ref={listRef} className="h-80 overflow-auto p-4 text-sm text-emerald-200">
              {history.map((line, idx) => (
                <pre key={idx} className="whitespace-pre-wrap leading-relaxed">{line}</pre>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-white/10 bg-black/40 p-3">
              <ChevronRight className="h-4 w-4 text-emerald-400" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Try: kubectl get pods"
                className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-1 ring-inset ring-white/10"
              />
              <button
                onClick={() => execute(input)}
                className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400"
              >
                Run
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Available commands</h3>
            <ul className="space-y-2 text-xs text-white/70">
              {sidebar.map((s) => (
                <li key={s.key} className="flex items-start gap-2">
                  <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-emerald-300">{s.key}</span>
                  <span className="leading-5">{s.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 text-xs text-white/70">
            <p className="mb-2">
              This terminal is simulated for the portfolio. Outputs mirror real tooling you use across Kubernetes, containers, and automation.
            </p>
            <p>
              Tip: use <span className="rounded bg-white/5 px-1 font-mono text-[10px] text-emerald-300">help</span> to discover commands.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default TerminalPlayground;
