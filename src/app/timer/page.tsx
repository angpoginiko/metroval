"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Howl } from "howler";
import Link from "next/link";

function TimerComponent() {
  const searchParams = useSearchParams();
  const warmupTime = Number(searchParams.get("warmup")) || 300;
  const workTime = Number(searchParams.get("work")) || 30;
  const restTime = Number(searchParams.get("rest")) || 10;
  const cooldownTime = Number(searchParams.get("cooldown")) || 300;
  const totalSets = Number(searchParams.get("sets")) || 6;
  const warmupBpm = Number(searchParams.get("warmupBpm")) || 165;
  const workBpm = Number(searchParams.get("workBpm")) || 180;
  const restBpm = Number(searchParams.get("restBpm")) || 160;
  const cooldownBpm = Number(searchParams.get("cooldownBpm")) || 165;

  const [time, setTime] = useState(warmupTime);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("Warm-up");
  const [currentSet, setCurrentSet] = useState(1);
  const [bpm, setBpm] = useState(warmupBpm);
  const phases = [
    { name: "Warm-up", duration: warmupTime, bpm: warmupBpm },
    { name: "Work", duration: workTime, bpm: workBpm },
    { name: "Rest", duration: restTime, bpm: restBpm }
  ];
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);

  const shortBeep = new Howl({ src: ["/sounds/short-beep.wav"] });
  const longBeep = new Howl({ src: ["/sounds/long-beep.wav"] });
  const metronomeTick = new Howl({ src: ["/sounds/metronome-tick.wav"] });

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 3) {
          if (phase === "Work") {
            shortBeep.play();
          } else {
            longBeep.play();
          }
        }
        if (prevTime <= 1) {
          clearInterval(interval);
          if (!isCooldown) {
            const nextPhaseIndex = currentPhaseIndex + 1;
            if (nextPhaseIndex < phases.length) {
              setCurrentPhaseIndex(nextPhaseIndex);
              setPhase(phases[nextPhaseIndex].name);
              setBpm(phases[nextPhaseIndex].bpm);
              return phases[nextPhaseIndex].duration;
            }
            if (currentSet < totalSets) {
              setCurrentSet(currentSet + 1);
              setCurrentPhaseIndex(1); // Start work phase for next set
              setPhase("Work");
              setBpm(workBpm);
              return workTime;
            }
            setIsCooldown(true);
            setPhase("Cool-down");
            setBpm(cooldownBpm);
            return cooldownTime;
          } else {
            setIsRunning(false);
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, time, currentPhaseIndex, currentSet, isCooldown]);

  useEffect(() => {
    if (!isRunning) return;
    const tickInterval = setInterval(() => {
      metronomeTick.play();
    }, 60000 / bpm);
    return () => clearInterval(tickInterval);
  }, [isRunning, bpm]);

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setCurrentSet(1);
    setCurrentPhaseIndex(0);
    setIsCooldown(false);
    setPhase("Warm-up");
    setTime(warmupTime);
    setBpm(warmupBpm);
  };

  const totalTime = (((workTime + restTime) * totalSets) + warmupTime + cooldownTime)/60
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Interval Timer</h1>
      <h2 className="text-2xl">{phase} - Set {currentSet} of {totalSets}</h2>
      <div className="text-6xl font-bold">{time}s</div>
      <h3 className="text-xl mt-2">BPM: {bpm}</h3>
      <h3 className="text-lg mt-2">Total Time: {totalTime.toFixed(2)} minutes</h3>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleStartPause}
          className="bg-blue-500 px-4 py-2 rounded-lg text-lg"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 px-4 py-2 rounded-lg text-lg"
        >
          Reset
        </button>
      </div>
      <div className="mt-6">
        <Link href="/" className="bg-gray-500 px-4 py-2 rounded-lg text-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
}



export default function TimerPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <TimerComponent />
    </Suspense>
  );
}