"use client"

import { Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue, } from "@/components/ui/select"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React, { useState } from "react";
import { MapPin  } from 'lucide-react';
import { Calendar as CalendarIcon } from "lucide-react"
import {Popover,  PopoverContent,  PopoverTrigger, } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"



const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
        },
    diesel: {
        label: "Diesel",
        color: "hsl(var(--chart-2))",
    },
    etanol: {
        label: "Etanol",
        color: "hsl(var(--chart-3))",
    },
    gasolina_aditivada: {
        label: "Gasolina Aditivada",
        color: "hsl(var(--chart-4))",
    },
    gasolina_comum: {
        label: "Gasolina Comum",
        color: "hsl(var(--chart-5))",
    }
} satisfies ChartConfig
  
  export interface PrecoMedioGeral {
    preco_medio_geral: number
    tipo_combustivel: string
    bairro_considerado: string
  }
  
  export interface PrecoMedioPorTipo {
    tipo_combustivel: string
    preco_medio: number
    bairro_considerado: string
  }
  
  export interface GasPriceResponse {
    precoMedioGeral: PrecoMedioGeral[];
    precoMedioPorTipo: PrecoMedioPorTipo[];
  }

  export interface Bairros {
    bairro: string;
  }
  
  
export function TotalAveragePricesStreets() {

    const [selectedStreet, setSelectedStreet] = useState <string | undefined>(undefined);
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();
    const [placeholderBairro, setplaceholderBairro] = useState("Bairro");

    const formatDate = (date: Date | null) => {
        return date ? date.toISOString().split('T')[0] : '';
      };
      
      // Somente executa a query se shouldFetch for true
      const { data: gasPricesResponse } = useQuery<GasPriceResponse>({
        queryKey: ["get-gas-prices",selectedStreet, startDate, endDate],
        queryFn: async () => {
          const startDateFormatted = formatDate(startDate || null);
          const endDateFormatted = formatDate(endDate || null);
          const selecteStreetRight = selectedStreet === undefined ? '' : selectedStreet
      
          const url =  `https://api-igas.onrender.com/average_price?bairro=${selecteStreetRight}&data_inicio=${startDateFormatted}&data_fim=${endDateFormatted}`;

        const response = await fetch(url);
      
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          return data;
        },
      });
      
      const clearFilter = () => {
        setEndDate(undefined)
        setStartDate(undefined)
        setplaceholderBairro('Bairro')
        setSelectedStreet(undefined)
      };
    const data = gasPricesResponse

    const { data: dataStreet} = useQuery<Bairros[]>({
        queryKey: ["get-street"],
        queryFn: async () => {
          const response = await fetch(`https://api-igas.onrender.com/street`);
          if (!response.ok) throw new Error("Network response was not ok");
    
          const data = await response.json();
    
          return data;
        },
      });

    const streets = dataStreet || [];

    return (
        <Card className="flex flex-col relative">
            <div className="w-full m-4 flex gap-4 items-center">
            <Popover>
              <PopoverTrigger asChild className="text-slate-500"> 
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !startDate && "text-muted-foreground min-w-[120px]"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Data Inicio</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus 
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild disabled={startDate === undefined}>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !endDate && "text-muted-foreground min-w-[120px]"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Data Fim</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select onValueChange={(value) => setSelectedStreet(value)}>
                <SelectTrigger className="max-w-[160px] text-slate-500">
                    <SelectValue placeholder={placeholderBairro} />
                    <MapPin className="h-4 w-4 opacity-50"></MapPin>
                </SelectTrigger>
                <SelectContent className="text-slate-600 ">
                    {streets.map((item) => 
                    <SelectItem value={item.bairro}>{item.bairro}</SelectItem>
                    )}
                </SelectContent>
            </Select>

            <Button onClick={clearFilter}>{"Filtrar"}</Button>
        </div>
        <CardContent className="flex items-center pb-0 ">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
            >
                
            <RadialBarChart
                data={data?.precoMedioGeral}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel className="bg-slate-50" />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                            >
                            {data?.precoMedioGeral[0].preco_medio_geral.toPrecision(3)}
                            </tspan>
                            
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground text-sm"
                            >
                            {data?.precoMedioGeral[0].tipo_combustivel.slice(0,5)}
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>

                <RadialBar
                    dataKey="preco_medio_geral"
                    stackId="a"
                    cornerRadius={5}
                    fill="hsl(var(--chart-1))"
                    className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>
            </ChartContainer>

            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
            >
                
            <RadialBarChart
                data={[data?.precoMedioPorTipo[0]]}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel/>}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                            >
                            {data?.precoMedioPorTipo[0].preco_medio.toPrecision(3)}
                            </tspan>
                            
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground text-sm"
                            >
                            {data?.precoMedioPorTipo[0].tipo_combustivel}
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>

                <RadialBar
                    dataKey="preco_medio"
                    stackId="a"
                    cornerRadius={5}
                    fill="hsl(var(--chart-2))"
                    className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>
            </ChartContainer>
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
            >
                
            <RadialBarChart
                data={[data?.precoMedioPorTipo[1]]}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel className="bg-slate-50" />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                            >
                             {data?.precoMedioPorTipo[1].preco_medio.toPrecision(3)}
                            </tspan>
                            
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground text-sm"
                            >
                            {data?.precoMedioPorTipo[1].tipo_combustivel}
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>

                <RadialBar
                    dataKey="preco_medio"
                    stackId="a"
                    cornerRadius={5}
                    fill="hsl(var(--chart-3))"
                    className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>
            </ChartContainer>
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
            >
                
            <RadialBarChart
                data={[data?.precoMedioPorTipo[2]]}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel className="bg-slate-50"/>}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label className=""
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className=" text-2xl font-bold" 
                            >
                             {data?.precoMedioPorTipo[2].preco_medio.toPrecision(3)}
                            </tspan>
                            
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground text-sm"
                            >
                            {data?.precoMedioPorTipo[2].tipo_combustivel}
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>

                <RadialBar
                    dataKey="preco_medio"
                    stackId="a"
                    cornerRadius={5}
                    fill="hsl(var(--chart-4))"
                    className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>
            </ChartContainer>
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
            >
                
            <RadialBarChart
                data={[data?.precoMedioPorTipo[3]]}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel className="bg-slate-50"/>}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                            >
                            {data?.precoMedioPorTipo[3].preco_medio.toPrecision(3)}
                            </tspan>
                            
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground text-sm"
                            >
                            {data?.precoMedioPorTipo[3].tipo_combustivel}
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>

                <RadialBar
                    dataKey="preco_medio"
                    stackId="a"
                    cornerRadius={5}
                    fill="hsl(var(--chart-5))"
                    className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>

            </ChartContainer>

        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-center pb-0 w-full absolute bottom-6">
                <CardTitle>Média Geral de Preços</CardTitle>
                <CardDescription>22 de Agosto - 13 de Setembro 2024</CardDescription>
            </CardFooter>

        </Card> 
  )
}
