"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type AIResponse = {
  failure_prediction: string;
  auto_fix_suggestions: string[];
};

type ContainerInfo = {
  id: string;
  name: string;
  image: string;
  status: string;
  ports: { url: string | null; host_port: string | null }[];
};

export default function Dashboard() {
  const [cpuHistory, setCpuHistory] = useState<any[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<any[]>([]);
  const [cpu, setCpu] = useState<number | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [ai, setAi] = useState<AIResponse | null>(null);
  const [containers, setContainers] = useState<ContainerInfo[]>([]);

 async function fetchData() {
  try {
    const cpuRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/metrics/cpu`
    );
    const cpuData = await cpuRes.json();

    const memRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/metrics/memory`
    );
    const memData = await memRes.json();

    const aiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ai/predict`
    );
    const aiData = await aiRes.json();

    const dockerRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/docker/containers`
    );
    const dockerData = await dockerRes.json();

    const time = new Date().toLocaleTimeString();

    setCpu(cpuData.cpu_usage);
    setMemory(memData.percent);
    setAi(aiData);
    setContainers(dockerData.containers || []);

    setCpuHistory((prev) =>
      [...prev, { time, value: cpuData.cpu_usage }].slice(-25)
    );

    setMemoryHistory((prev) =>
      [...prev, { time, value: memData.percent }].slice(-25)
    );
  } catch (e) {
    console.error(e);
  }
}


  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        🚀 MahiOpsAI — Monitoring Dashboard
      </h1>

      {/* GRID TOP */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* CPU CARD */}
        <div className="rounded-3xl p-6 bg-white/10 shadow-2xl border border-white/20 backdrop-blur-xl">
          <h2 className="text-lg mb-2 opacity-80">CPU Usage</h2>

          <p className="text-4xl font-bold text-green-400 mb-3">
            {cpu !== null ? `${cpu.toFixed(1)}%` : "—"}
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cpuHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#aaa" />
              <YAxis stroke="#aaa" domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MEMORY CARD */}
        <div className="rounded-3xl p-6 bg-white/10 shadow-2xl border border-white/20 backdrop-blur-xl">
          <h2 className="text-lg mb-2 opacity-80">Memory Usage</h2>

          <p className="text-4xl font-bold text-blue-400 mb-3">
            {memory !== null ? `${memory.toFixed(1)}%` : "—"}
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={memoryHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#aaa" />
              <YAxis stroke="#aaa" domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI + CONTAINERS */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* AI CARD */}
        <div className="rounded-3xl p-6 bg-white/10 shadow-2xl border border-white/20 backdrop-blur-xl">
          <h2 className="text-lg font-semibold mb-3">🤖 AI Health Insights</h2>

          <p className="text-xl text-yellow-400 mb-3">
            {ai?.failure_prediction || "Analyzing..."}
          </p>

          {ai?.auto_fix_suggestions?.length ? (
            <ul className="space-y-2">
              {ai.auto_fix_suggestions.map((s, i) => (
                <li
                  key={i}
                  className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
                >
                  {s}
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-60">No suggested actions.</p>
          )}
        </div>

        {/* DOCKER CONTAINERS */}
        <div className="rounded-3xl p-6 bg-white/10 shadow-2xl border border-white/20 backdrop-blur-xl">
          <h2 className="text-lg font-semibold mb-4">
            🐳 Docker Containers Status
          </h2>

          {containers.length === 0 && (
            <p className="opacity-60">No containers found.</p>
          )}

          <div className="space-y-3">
            {containers.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-2xl bg-black/30 border border-white/10"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm opacity-70">{c.image}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.status === "running"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="mt-2 text-sm opacity-80">
                  {c.ports?.map((p, i) =>
                    p.url ? (
                      <div key={i}>
                        Port {p.host_port}:{" "}
                        <a
                          href={p.url}
                          className="text-cyan-400 underline"
                          target="_blank"
                        >
                          {p.url}
                        </a>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-10 opacity-60">
        MahiOpsAI © 2026 — All Rights Reserved
      </div>
    </main>
  );
}

