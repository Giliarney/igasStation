import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { useState } from "react";

export interface Posto {
  posto_nome: string;
  bairro: string;
  gasolina_comum: number;
  gasolina_aditivada: number;
  etanol: number;
  diesel: number;
  data: string;
  bandeira_nome: string;
}

const chartConfig = {
  diesel: {
    label: "Diesel",
    color: "hsl(var(--chart-3))",
  },
  etanol: {
    label: "Etanol",
    color: "hsl(var(--chart-2))",
  },
  gasolina_aditivada: {
    label: "Gasolina Aditivada",
    color: "hsl(var(--chart-1))",
  },
  gasolina_comum: {
    label: "Gasolina Comum",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const MinPricesStreets: React.FC = () => {
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("diesel");
  const [selectedStreet, setSelectedStreet] = useState<string>("Todos");
  const [selectedPosto, setSelectedPosto] = useState<string>("Todos");

  const { data: dadosResponse, isLoading, error } = useQuery<Posto[]>({
    queryKey: ["get-gas-station-prices"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas_station_prices`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 100));

      return data;
    },
    placeholderData: [],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <BeatLoader color="#36d7b7" size={15} />
        <span className="text-slate-700">Carregando...</span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const data = dadosResponse || [];

  // Extraia bairros e postos únicos
  const uniqueStreets = Array.from(new Set(data.map((posto) => posto.bairro)));
  const uniquePostos = Array.from(new Set(data.map((posto) => posto.posto_nome)));

  // Filtrar dados com base no bairro e no posto selecionados
  const filteredData = data
    .filter((posto) => selectedStreet === "Todos" || posto.bairro === selectedStreet)
    .filter((posto) => selectedPosto === "Todos" || posto.posto_nome === selectedPosto)
    .filter((posto) => posto.posto_nome !== "Cathu") // Remove o posto "Cathu"
    .map((posto) => ({
      nome: posto.posto_nome,
      diesel: posto.diesel || 0,
      etanol: posto.etanol || 0,
      gasolina_aditivada: posto.gasolina_aditivada || 0,
      gasolina_comum: posto.gasolina_comum || 0,
    }))
    .filter((posto) => posto[activeChart] > 0); // Remove valores nulos ou zero

  // Initialize minPrice with a valid numeric value
const minPrice = filteredData.reduce(
  (min, post) => {
    const currentPrice = post[activeChart] as number;
    const minPriceValue = min[activeChart] as number;

    if (currentPrice < minPriceValue) {
      return post;
    }
    return min;
  },
  {
    nome: "Não tem dados com este posto e bairro",
    diesel: 0,
    etanol: 0,
    gasolina_aditivada: 0,
    gasolina_comum: 0,
  }
);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col h-max border-b w-full p-0 pt-4 pb-0 lg:p-0 lg:flex-col">
        <div className="w-full flex flex-col lg:flex-row items-center gap-4 sm:py-6 text-center relative">
          <div className="w-full h-full flex flex-col gap-4">
            <CardTitle className=" w-full px-6 text-slate-700">Histórico dos Preços de Combustíveis</CardTitle>
            <CardDescription className=" px-6">
              22 de Ago 2024 - 13 de Set 2024
            </CardDescription>
          </div>

          <div className="flex items-center gap-4 w-full h-full pt-4 px-4 md:px-6 absolute top-[115px] sm:top-[137px] z-10">
            <select
              value={selectedStreet}
              onChange={(e) => setSelectedStreet(e.target.value)}
              className=" border w-[120px] sm:w-[140px] rounded hover:outline-none hover:bg-none hover:none focus:outline-none cursor-pointer text-sm h-8 text-slate-500"
            >
              <option value="Todos" className="text-sm rounded-md border-none outline-none hover:cursor-pointer">Todos os Bairros</option>
              {uniqueStreets.map((bairro) => (
                <option key={bairro} value={bairro} className="text-sm">
                  {bairro}
                </option>
              ))}
            </select>

            {/* Filtro por posto */}
            <select
              value={selectedPosto}
              onChange={(e) => setSelectedPosto(e.target.value)}
              className="border w-[120px]  sm:w-[180px] rounded hover:outline-none hover:bg-none hover:none focus:outline-none cursor-pointer text-sm h-8 text-slate-500"
            >
              <option value="Todos" className="text-sm">Todos os Postos</option>
              {uniquePostos.map((posto) => (
                <option key={posto} value={posto} className="text-sm">
                  {posto === "Auto Posto Esmig Shell" ? posto.slice(5,17) : posto}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full h-full p-0 m-0 text-sm lg:text-base">
          {Object.keys(chartConfig).map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="w-full h-12 relative p-1 z-30 flex justify-center border-t text-center items-center  data-[active=true]:bg-slate-700 data-[active=true]:text-white sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                {chartConfig[chart].label}
              </button>
            );
          })}
        </div>

      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[360px] sm:h-[300px] w-full">
          <AreaChart data={filteredData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="nome" tick={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px] bg-slate-100"
                  nameKey="nome"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Area
              type="monotone"
              dataKey={activeChart}
              stroke={chartConfig[activeChart].color}
              fill={chartConfig[activeChart].color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MinPricesStreets;
