import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Trash2, Clock } from "lucide-react";

function pretty(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function ApiTester() {
  const defaultBase = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:8000";
  const [baseUrl, setBaseUrl] = useState(defaultBase);
  const [path, setPath] = useState("/test");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{\n  \"Content-Type\": \"application/json\"\n}");
  const [body, setBody] = useState("{\n  \"hello\": \"world\"\n}");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [timeMs, setTimeMs] = useState(null);
  const [responseText, setResponseText] = useState("");
  const abortRef = useRef(null);

  const requestUrl = useMemo(() => {
    try {
      const u = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
      return new URL(u).toString();
    } catch {
      return "";
    }
  }, [baseUrl, path]);

  useEffect(() => {
    // Keep base URL input in sync if env changes on hot reload
    setBaseUrl(defaultBase);
  }, [defaultBase]);

  function parseJSONSafe(text) {
    if (!text?.trim()) return undefined;
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON provided. Fix the JSON in the editor and try again.");
    }
  }

  async function send() {
    setLoading(true);
    setStatus("");
    setTimeMs(null);
    setResponseText("");

    const controller = new AbortController();
    abortRef.current = controller;

    const init = { method, headers: undefined, body: undefined, signal: controller.signal };

    try {
      const h = parseJSONSafe(headers);
      if (h) init.headers = h;
      if (method !== "GET" && method !== "HEAD") {
        const b = parseJSONSafe(body);
        if (b !== undefined) init.body = JSON.stringify(b);
      }
    } catch (e) {
      setLoading(false);
      setStatus("Client error: invalid JSON");
      setResponseText(String(e.message || e));
      return;
    }

    const start = performance.now();

    try {
      const res = await fetch(requestUrl, init);
      const contentType = res.headers.get("content-type") || "";
      let payload;
      if (contentType.includes("application/json")) {
        payload = await res.json();
      } else {
        payload = await res.text();
      }
      setStatus(`${res.status} ${res.statusText}`);
      setTimeMs(Math.max(0, Math.round(performance.now() - start)));
      setResponseText(typeof payload === "string" ? payload : pretty(payload));
    } catch (e) {
      if (e.name === "AbortError") {
        setStatus("Request cancelled");
      } else {
        setStatus("Network error");
      }
      setTimeMs(Math.max(0, Math.round(performance.now() - start)));
      setResponseText(pretty({ error: String(e.message || e) }));
    } finally {
      setLoading(false);
    }
  }

  function cancel() {
    abortRef.current?.abort();
  }

  function reset() {
    setHeaders("{\n  \"Content-Type\": \"application/json\"\n}");
    setBody("{\n  \"hello\": \"world\"\n}");
    setStatus("");
    setTimeMs(null);
    setResponseText("");
  }

  return (
    <section id="apitester" className="py-16 sm:py-20 border-t border-black/5 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">API Tester</h2>
            <p className="mt-2 text-gray-600">Point this at your backend. Great for verifying endpoints when Postman is not cooperating.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>Latency shown after each request</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="grid sm:grid-cols-[1fr,auto] gap-3">
            <div className="grid sm:grid-cols-[auto,1fr,1fr] gap-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="rounded-md border px-3 py-2 bg-white"
              >
                {METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="Base URL"
                className="rounded-md border px-3 py-2 bg-white"
              />
              <input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/path"
                className="rounded-md border px-3 py-2 bg-white"
              />
            </div>

            <div className="flex gap-2 justify-end">
              {!loading ? (
                <button onClick={send} className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800">
                  <Play size={16} /> Send
                </button>
              ) : (
                <button onClick={cancel} className="inline-flex items-center gap-2 rounded-md bg-gray-200 text-gray-800 px-4 py-2 text-sm">
                  Cancel
                </button>
              )}
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                <Trash2 size={16} /> Reset
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <h3 className="font-medium text-gray-900">Headers</h3>
              <textarea
                className="mt-2 w-full h-32 rounded-md border p-2 font-mono text-xs"
                spellCheck={false}
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
              />

              {method !== "GET" && method !== "HEAD" && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900">JSON Body</h3>
                  <textarea
                    className="mt-2 w-full h-40 rounded-md border p-2 font-mono text-xs"
                    spellCheck={false}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="rounded-xl border border-black/5 bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Response</h3>
                <div className="text-xs text-gray-500">
                  {status && <span className="mr-2">{status}</span>}
                  {timeMs != null && <span>{timeMs} ms</span>}
                </div>
              </div>
              <pre className="mt-2 h-72 overflow-auto rounded-md bg-gray-950 text-gray-100 p-3 text-xs leading-relaxed">
{responseText || (loading ? "Sending..." : "Response will appear here")}
              </pre>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <span className="mr-2">Shortcuts:</span>
            <button
              onClick={() => { setPath("/test"); setMethod("GET"); }}
              className="rounded-md border px-2 py-1 hover:bg-gray-50"
            >
              GET /test
            </button>
            <button
              onClick={() => { setPath("/health"); setMethod("GET"); }}
              className="rounded-md border px-2 py-1 hover:bg-gray-50"
            >
              GET /health
            </button>
            <button
              onClick={() => { setPath("/echo"); setMethod("POST"); setBody("{\n  \"ping\": \"pong\"\n}"); }}
              className="rounded-md border px-2 py-1 hover:bg-gray-50"
            >
              POST /echo
            </button>
          </div>

          <p id="about" className="text-xs text-gray-500">
            Tip: If requests fail, confirm your backend URL is correct and the server allows CORS.
          </p>
        </div>
      </div>
    </section>
  );
}
