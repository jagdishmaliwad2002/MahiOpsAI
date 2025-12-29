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

export default function Dashboard() {
  const [cpu, setCpu] = useState<number | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [ai, setAi] = useState<AIResponse | null>(null);

  const [cpuHistory, setCpuHistory] = useState<any[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cpuRes = await fetch("http://localhost:8000/metrics/cpu");
        const cpuData = await cpuRes.json();

        const memRes = await fetch("http://localhost:8000/metrics/memory");
        const memData = await memRes.json();

        const aiRes = await fetch("http://localhost:8000/ai/predict");
        const aiData = await aiRes.json();

        const time = new Date().toLocaleTimeString();

        setCpu(cpuData.cpu_usage);
        setMemory(memData.percent);
        setAi(aiData);

        setCpuHistory((prev) =>
          [...prev, { time, value: cpuData.cpu_usage }].slice(-20)
        );

        setMemoryHistory((prev) =>
          [...prev, { time, value: memData.percent }].slice(-20)
        );
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">🚀 MahiOpsAI Dashboard</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* CPU CARD */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl mb-4">CPU Usage</h2>
          <p className="text-3xl text-green-400 mb-4">
            {cpu !== null ? `${cpu.toFixed(1)}%` : "Loading..."}
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
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MEMORY CARD */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl mb-4">Memory Usage</h2>
          <p className="text-3xl text-blue-400 mb-4">
            {memory !== null ? `${memory.toFixed(1)}%` : "Loading..."}
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
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI CARD */}
      <div className="mt-10 bg-gray-900/80 backdrop-blur rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl mb-2">🤖 AI Prediction</h2>
        <p className="text-lg text-yellow-400">
          {ai ? ai.failure_prediction : "Analyzing system health..."}
        </p>

        {ai?.auto_fix_suggestions?.length > 0 && (
          <ul className="mt-3 list-disc list-inside text-sm text-gray-300">
            {ai.auto_fix_suggestions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-10 text-center text-gray-400 text-sm">
  <div className="border-t border-gray-700 pt-4">
    <p>MahiOpsAI © 2026 — All Rights Reserved</p>
    <p className="text-xs text-gray-500 mt-1">
      Built with Next.js • FastAPI • Prometheus • Docker
    </p>
  </div>
</footer>

    </main>
  );
}

