"use client";
import { useEffect, useState } from "react";
import { PropertyType } from "@/models/Property";
import Spinner from "@/components/Spinner";

interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
}

interface WeatherCardProps {
  property: PropertyType;
}

const PropertyWeatherCard = ({ property }: WeatherCardProps) => {
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        if (!property?.location?.city) return;

        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${property.location.city}&units=metric&lang=en&appid=${API_KEY}`,
        );

        if (!res.ok) throw new Error("Fail to fetch weather");

        const data = await res.json();
        setForecast(data.list); // array con entradas cada 3 horas
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [property]);

  if (loading) return <Spinner loading={loading} />;
  if (!forecast.length)
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        The forecast could not be obtained
      </div>
    );

  return (
    <div className="mt-6">
      {" "}
      <h3 className="text-2xl font-bold text-center text-blue-700 mb-6 border-b pb-2">
        {" "}
        Extended Forecast for {property.location.city}{" "}
      </h3>{" "}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {" "}
        {forecast.slice(0, 5).map((item, idx) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          return (
            <div
              key={idx}
              className="border rounded-lg bg-white p-3 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {" "}
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                {" "}
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}{" "}
              </h4>{" "}
              <img
                src={iconUrl}
                alt={item.weather[0].description}
                className="mx-auto w-12 h-12 mb-2"
              />{" "}
              <p className="capitalize text-gray-600 text-xs mb-1">
                {" "}
                {item.weather[0].description}{" "}
              </p>{" "}
              <p className="text-lg font-bold text-gray-800">
                {" "}
                {Math.round(item.main.temp)}°C{" "}
              </p>{" "}
              <p className="text-xs text-gray-500">
                {" "}
                Feels like: {Math.round(item.main.feels_like)}°C{" "}
              </p>{" "}
              <p className="text-xs text-gray-500">
                {" "}
                Humidity: {item.main.humidity}%{" "}
              </p>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default PropertyWeatherCard;
