// TODO: Change the background color based on the weather condition
// sunny - from-sky-800 to-sky-300 -> bg-sky-700/30
// partly-cloudy - from-sky-700 to-slate-300 -> bg-sky-700/30
// cloudy - from-sky-900 to-slate-300 -> bg-sky-700/30
// rainy - from-slate-700 to-slate-300 -> bg-slate-700/30
// rain-thunder - from-gray-900 to-gray-600 -> bg-slate-500/30
// snowy - from-blue-900 to-slate-300 -> bg-slate-500/30

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-slate-300">
      <div className="text-center max-w-5xl py-10 mx-auto px-5 gap-10 flex flex-col min-h-screen justify-between">{children}</div>
    </div>
  );
}
