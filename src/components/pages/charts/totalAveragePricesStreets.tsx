"use client"

import { Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue, } from "@/components/ui/select"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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

    const [selectedStreet, setSelectedStreet] = useState <string | null>("Todos");
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

    const formatDate = (date: Date | null) => {
        return date ? date.toISOString().split('T')[0] : '';
      };
      
      // Somente executa a query se shouldFetch for true
      const { data: gasPricesResponse } = useQuery<GasPriceResponse>({
        queryKey: ["get-gas-prices",selectedStreet, startDate, endDate],
        queryFn: async () => {
          const startDateFormatted = formatDate(startDate || null);
          const endDateFormatted = formatDate(endDate || null);
          const selecteStreetRight =  selectedStreet
      
          const url = selectedStreet === "Todos" ? "https://api-igas.onrender.com/average_price" : `https://api-igas.onrender.com/average_price?bairro=${selecteStreetRight}&data_inicio=${startDateFormatted}&data_fim=${endDateFormatted}`;

        const response = await fetch(url);
      
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          return data;
        },
      });
      
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
    <>
      <Card className="hidden sm:flex sm:flex-col relative gap-4">
        <div className="grid grid-rows-2 w-full p-4 md:flex gap-4 items-center md:justify-between">
          <div className="flex gap-4 w-full">
            <Popover>
              <PopoverTrigger asChild className="text-slate-500 w-full"> 
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !startDate && "text-muted-foreground w-full min-w-[120px]"
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
              <PopoverTrigger asChild disabled={startDate === undefined} className="">
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !endDate && "text-muted-foreground w-full min-w-[120px]"
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
          </div>

          <Select onValueChange={(value) => setSelectedStreet(value)}>
              <SelectTrigger className=" text-slate-500">
                <SelectValue placeholder={"Bairro"} />
                <MapPin className="h-4 w-4 opacity-50"></MapPin>
              </SelectTrigger>

              <SelectContent className="">
                <SelectItem value={"Todos"}>Todos</SelectItem>
                {streets.map((item, key) => 
                <SelectItem key={key} value={item.bairro}>{item.bairro}</SelectItem>
              )}
              </SelectContent>
          </Select>
        </div>

        <CardContent className="flex sm:flex-row sm:justify-center sm:pb-0">

          <div className="flex flex-wrap justify-center gap-4 w-full">
            <CardHeader className="flex flex-col gap-4 items-center pb-0 w-full">
              <CardTitle>Média Geral de Preços</CardTitle>
              <CardDescription>22 de Agosto - 13 de Setembro 2024</CardDescription>
            </CardHeader>
            <ChartContainer
              config={chartConfig}
              className="flex w-full aspect-square sm:max-w-[250px] p-0 m-0"
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
                             R$ {data?.precoMedioGeral[0].preco_medio_geral.toPrecision(3)}
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
              className="w-full aspect-square sm:max-w-[250px] p-0 m-0
              flex items-center justify-center"
            >
                
              <RadialBarChart
                data={[data?.precoMedioPorTipo[0]]}
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
                              R$ {data?.precoMedioPorTipo[0].preco_medio.toPrecision(3)}
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
                  className="stroke-transparent stroke-2 w-16 h-16"
                  />
                </RadialBarChart>
            </ChartContainer>

            <ChartContainer
              config={chartConfig}
              className="aspect-square w-full sm:max-w-[250px]"
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
                               R$ {data?.precoMedioPorTipo[1].preco_medio.toPrecision(3)}
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
              className="aspect-square w-full sm:max-w-[250px]"
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
                               R$ {data?.precoMedioPorTipo[2].preco_medio.toPrecision(3)}
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
              className="aspect-square w-full sm:max-w-[250px]"
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
                             R$ {data?.precoMedioPorTipo[3].preco_medio.toPrecision(3)}
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
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col relative sm:hidden">
        <div className="grid grid-rows-2 items-center gap-4 p-4">
          <div className="flex gap-4 w-full">
            <Popover >
              <PopoverTrigger asChild className="text-slate-500 w-full"> 
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !startDate && "text-muted-foreground w-full min-w-[120px]"
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
              <PopoverTrigger asChild disabled={startDate === undefined} className="">
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !endDate && "text-muted-foreground w-full min-w-[120px]"
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
          </div>

          <Select onValueChange={(value) => setSelectedStreet(value)}>
              <SelectTrigger className=" text-slate-500">
                  <SelectValue placeholder={"Bairro"} />
                  <MapPin className="h-4 w-4 opacity-50"></MapPin>
              </SelectTrigger>
              <SelectContent className="">
                  <SelectItem value={"Todos"}>Todos</SelectItem>
                  {streets.map((item, key) => 
                  <SelectItem key={key} value={item.bairro}>{item.bairro}</SelectItem>
                  )}
              </SelectContent>
          </Select>
          </div>

          <CardContent className="flex flex-col sm:flex-row sm:justify-center sm:pb-0">
              <CardFooter className="flex flex-col gap-4 pb-0 w-full items-center">
                <CardTitle>Média Geral de Preços</CardTitle>
                <CardDescription>22 de Agosto - 13 de Setembro 2024</CardDescription>
              </CardFooter>
            <div className="grid grid-cols-2 justify-center w-full">
              <ChartContainer
                config={chartConfig}
                className="flex items-center justify-center aspect-square sm:max-w-[250px] p-0 m-0"
              >
                  
                <RadialBarChart
                  data={data?.precoMedioGeral}
                  innerRadius={55}
                  outerRadius={85}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel className="bg-slate-50" />}
                  />

                  <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                      className="flex items-center justify-center text-center"
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy )}
                                className="fill-foreground text-xl font-bold"
                              >
                                 R$ {data?.precoMedioGeral[0].preco_medio_geral.toPrecision(3)}
                              </tspan>
                                  
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) +20}
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
                    className="stroke-transparent stroke-2 flex"
                  />
                  </RadialBarChart>
              </ChartContainer>

              <ChartContainer
                config={chartConfig}
                className=" w-full sm:max-w-[250px] aspect-square p-0 m-0
                flex items-center justify-center"
              >
                  
                <RadialBarChart
                  data={[data?.precoMedioPorTipo[0]]}
                  innerRadius={55}
                  outerRadius={85}
                  className="flex justify-center"
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
                              y={(viewBox.cy)}
                              className="fill-foreground text-xl font-bold"
                            >
                               R$ {data?.precoMedioPorTipo[0].preco_medio.toPrecision(3)}
                            </tspan>
                                
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0 ) + 20}
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
                  className="stroke-transparent stroke-2 w-16 h-16"
                />
                </RadialBarChart>
              </ChartContainer>

              <ChartContainer
                config={chartConfig}
                className=" w-full sm:max-w-[250px] aspect-square"
              >
      
                <RadialBarChart
                  data={[data?.precoMedioPorTipo[1]]}
                  innerRadius={55}
                  outerRadius={85}
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
                                y={(viewBox.cy)}
                                className="fill-foreground text-xl font-bold"
                              >
                                 R$ {data?.precoMedioPorTipo[1].preco_medio.toPrecision(3)}
                              </tspan>
                              
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0 ) + 20}
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
                className=" w-full sm:max-w-[250px] aspect-square"
              >
                  
              <RadialBarChart
                data={[data?.precoMedioPorTipo[2]]}
                innerRadius={55}
                outerRadius={85} 
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
                              y={(viewBox.cy)}
                              className=" text-xl font-bold" 
                            >
                               R$ {data?.precoMedioPorTipo[2].preco_medio.toPrecision(3)}
                            </tspan>
                              
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0 ) + 20}
                              className="fill-muted-foreground text-sm"
                            >
                              {data?.precoMedioPorTipo[2].tipo_combustivel.slice(9)}
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
                className=" w-full sm:max-w-[250px] aspect-square"
              >
              
              <RadialBarChart
                data={[data?.precoMedioPorTipo[3]]}
                innerRadius={55}
                outerRadius={85} 
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
                              y={(viewBox.cy)}
                              className="fill-foreground text-xl font-bold"
                            >
                               R$ {data?.precoMedioPorTipo[3].preco_medio.toPrecision(3)}
                            </tspan>
                              
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0 ) + 20}
                              className="fill-muted-foreground text-sm"
                            >
                              {data?.precoMedioPorTipo[3].tipo_combustivel.slice(9)}
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
            </div>
        </CardContent>
      </Card> 
    </>
  )
}
