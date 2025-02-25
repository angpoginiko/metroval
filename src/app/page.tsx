"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [warmupTime, setWarmupTime] = useState(300);
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(10);
  const [cooldownTime, setCooldownTime] = useState(300);
  const [sets, setSets] = useState(6);
  const [warmupBpm, setWarmupBpm] = useState(165);
  const [workBpm, setWorkBpm] = useState(180);
  const [restBpm, setRestBpm] = useState(160);
  const [cooldownBpm, setCooldownBpm] = useState(165);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Metroval</h1>
      <div className="mb-6">
        <Link href={{ pathname: "/timer", query: { warmup: warmupTime, work: workTime, rest: restTime, cooldown: cooldownTime, sets: sets, warmupBpm: warmupBpm, workBpm: workBpm, restBpm: restBpm, cooldownBpm: cooldownBpm } }}
          className="bg-blue-500 px-4 py-2 rounded-lg text-lg">
          Start Timer with Metronome
        </Link>
      </div>
      <div className="flex flex-col items-center w-full max-w-lg mb-6">
        <label className="mb-2 text-center w-full text-lg">Number of Sets</label>
        <input type="number" value={sets} onChange={(e) => setSets(Number(e.target.value))} className="text-black p-2 rounded w-1/2 text-center" />
      </div>
      <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
        <div className="flex flex-col items-start">
          <label className="mb-2">Warm-up Interval (seconds)</label>
          <input type="number" value={warmupTime} onChange={(e) => setWarmupTime(Number(e.target.value))} className="text-black p-2 rounded w-full" />
          <label className="mt-4 mb-2">Work Interval (seconds)</label>
          <input type="number" value={workTime} onChange={(e) => setWorkTime(Number(e.target.value))} className="text-black p-2 rounded w-full" />
          <label className="mt-4 mb-2">Rest Interval (seconds)</label>
          <input type="number" value={restTime} onChange={(e) => setRestTime(Number(e.target.value))} className="text-black p-2 rounded w-full" />
          <label className="mt-4 mb-2">Cool-down Interval (seconds)</label>
          <input type="number" value={cooldownTime} onChange={(e) => setCooldownTime(Number(e.target.value))} className="text-black p-2 rounded w-full" />
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-2">Warm-up BPM</label>
          <input type="number" value={warmupBpm} onChange={(e) => setWarmupBpm(Number(e.target.value))} className="text-black p-2 rounded w-full" />
          <label className="mt-4 mb-2">Work BPM</label>
          <input type="number" value={workBpm} onChange={(e) => setWorkBpm(Number(e.target.value))} className="text-black p-2 rounded w-full" />
          <label className="mt-4 mb-2">Rest BPM</label>
          <input type="number" value={restBpm} onChange={(e) => setRestBpm(Number(e.target.value))} className="text-black p-2 rounded w-full" />
          <label className="mt-4 mb-2">Cool-down BPM</label>
          <input type="number" value={cooldownBpm} onChange={(e) => setCooldownBpm(Number(e.target.value))} className="text-black p-2 rounded w-full" />
        </div>
      </div>
    </div>
  );
}
