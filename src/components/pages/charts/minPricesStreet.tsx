import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";

export const description = "An interactive bar chart";

export interface StreetMin {
  nome: string;
  diesel: number;
  etanol: number;
  gasolina_aditivada: number;
  gasolina_comum: number;
}

const chartConfig = {
  diesel: {
    label: "Diesel",
    color: "hsl(var(--chart-1))",
  },
  etanol: {
    label: "Etanol",
    color: "hsl(var(--chart-2))",
  },
  gasolina_aditivada: {
    label: "Gasolina Aditivada",
    color: "hsl(var(--chart-3))",
  },
  gasolina_comum: {
    label: "Gasolina Comum",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const MinPricesStreets: React.FC = () => {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("diesel");

  const { data: dataStreet } = useQuery<StreetMin[]>({
    queryKey: ["get-street-min-price"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/gas_station_min_price`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      return data;
    },
  });

  // Filter out entries where the active chart value is 0 or missing
  const filteredData = dataStreet?.filter((post) => post[activeChart] > 0) || [];

  // Initialize minPrice with a valid numeric value
  const minPrice = filteredData.reduce<StreetMin>((min, post) => {
    const currentPrice = post[activeChart] as number;
    const minPriceValue = min[activeChart] as number;
    
    // Ensure values are treated as numbers
    if (typeof currentPrice === 'number' && (typeof minPriceValue === 'number' && currentPrice < minPriceValue)) {
      return post;
    }
    return min;
  }, { 
    nome: "Não tem dados com este posto e bairro",
    diesel: 0,
    etanol: 0,
    gasolina_aditivada: 0,
    gasolina_comum: 0,
  } as StreetMin);


  return (
    <Card className="max-w-[50%]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="w-full flex flex-col items-center sm:py-6 text-start">
          <CardTitle className="self-start w-full px-6 text-slate-700">Menores Preços </CardTitle>
          <h2 className="self-start px-6 text-slate-700">Posto de Combustível</h2>
          <CardDescription className="self-start px-6">
            22 de Ago 2024 - 13 de Set 2024
          </CardDescription>
        </div>
        <div className="flex h-36 p-0 m-0">
          {Object.keys(chartConfig).map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="w-24 relative z-30 flex justify-center border-t text-center items-center even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                {chartConfig[chart].label}
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            data={filteredData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="nome" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} interval={0}  />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px] bg-slate-100"
                  nameKey="nome"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} />
          </BarChart>
        </ChartContainer>
        <div className="mt-4">
          <span className="text-slate-700">Posto com o menor preço de {chartConfig[activeChart].label}:</span> <span className="text-slate-500">{minPrice.nome} - R${minPrice[activeChart]}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinPricesStreets;
