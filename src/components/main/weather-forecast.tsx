export default function WeatherForecast() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2  text-white">
      <div className="flex  rounded-md py-2 px-3 flex-row justify-center items-center gap-2">
        <img src="/assets/icons/sunny.svg" alt="Weather" className="w-8 h-8" />

        <span className="text-4xl">27°</span>
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm">Tomorrow</span>
          <span className="text-sm">Sunny</span>
        </div>
      </div>

      <div className="flex  ounded-md py-2 px-3 flex-row justify-center items-center gap-2">
        <img src="/assets/icons/cloudy.svg" alt="Weather" className="w-8 h-8" />

        <span className="text-4xl">20°</span>
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm">20th October</span>
          <span className="text-sm">Cloudy</span>
        </div>
      </div>

      <div className="flex rounded-md py-2 px-3 flex-row justify-center items-center gap-2">
        <img src="/assets/icons/cloudy.svg" alt="Weather" className="w-8 h-8" />

        <span className="text-4xl">20°</span>
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm">21st October</span>
          <span className="text-sm">Sunny</span>
        </div>
      </div>

      <div className="flex rounded-md py-2 px-3 flex-row justify-center items-center gap-2">
        <img src="/assets/icons/cloudy.svg" alt="Weather" className="w-8 h-8" />

        <span className="text-4xl">20°</span>
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm">22nd October</span>
          <span className="text-sm">Sunny</span>
        </div>
      </div>
    </div>
  );
}
