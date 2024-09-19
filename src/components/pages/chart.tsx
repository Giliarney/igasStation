"use client"

import Aditivada from '@/assets/Frame 41.svg';
import Comum from '@/assets/Frame 40.svg';
import Etanol from '@/assets/Frame 43.svg';
import Diesel from '@/assets/Frame 42.svg';
import * as React from "react"
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
} from "@/components/ui/chart"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {TotalAveragePricesStreets} from "@/components/pages/charts/totalAveragePricesStreets"
import MinPricesStreets from "@/components/pages/charts/minPricesStreet"
import { Fuel } from 'lucide-react';
import AveragePriceGas from "@/components/pages/charts/averagePricesGas"
import {Button} from "@/components/ui/button"
export const description = "An interactive bar chart"

export interface Posto {
  posto_nome: string;
  data: string;
  gasolina_comum: number;
  gasolina_aditivada: number;
  etanol: number;
  diesel: number;
}

export interface EnderecoPostos {
  nome: string
  url_endereco: string
  url_imagem: string
  diesel: number
  etanol: number
  gasolina_aditivada: number
  gasolina_comum: number
}


const chartConfig = {
  views: {
    label: "Preço R$",
  },
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
} satisfies ChartConfig

export function Charts() {
  const { data: dadosResponse } = useQuery<Posto[]>({
    queryKey: ["gets-prices"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas_station_prices`);
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
  
      return data;
    },
  });
  
  const data = dadosResponse || [];

  const findMinValue = (data: Posto[], property: keyof Posto): number | string | null => {
    if (data.length === 0) {
      return null; // Return null if the array is empty
    }
  
    let minValue = data[0][property]; // Start with the first element's property value
    for (const item of data) {

      if (item[property] < minValue && item[property] !== null) {
        minValue = item[property];
      }
    }
    return minValue;
  };
  
  const { data: enderecoPostos } = useQuery<EnderecoPostos[]>({
    queryKey: ["gets-enderecoPostos"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas_station_average_price`);
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
  
      return data;
    },
  });

  const dataEndereco = enderecoPostos || [];
  
  return (
    <div className="flex w-full justify-center items-center gap-4 flex-wrap">
      <div className="w-full h-full flex-col flex items-center justify-center">
        <span className="self-start w-full text-muted-foreground text-slate-700 text-xl">Lista dos Postos:</span>
        <Carousel
          opts={{
            align: "start",
          }}
          className="flex items-center justify-center w-full h-full px-12 py-4"
          >

        <CarouselContent className="w-full h-full">
          {dataEndereco.map((posto, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="">
                <Card>
                  <CardContent className="flex items-center justify-between gap-1">
                    <div className="h-52 w-[300px] rounded-lg ">
                      <img src={posto.url_imagem} alt="" className="h-full w-full object-cover rounded-lg" />
                    </div>
                    <div className="flex items-center flex-col px-2">
                     <h2 className="text-lg w-full font-semibold self-start flex items-center gap-2 text-slate-700"> <Fuel/>{posto.nome === "Auto Posto Esmig Shell" ? "Posto Esmig Shell" : posto.nome}</h2>
                      <div className="flex flex-col w-full h-full gap-4">
                        <span className="text-sm font-semibold text-slate-700">Média de Preços:</span>
                        <div className='flex justify-between gap-4'>
                          <div className='flex flex-col gap-3'>
                            <div className='flex gap-2 items-center'>
                              <Diesel size='width-24px' />
                              <span className="text-sm text-slate-600"> R$ {posto.diesel.toPrecision(3)}</span>
                            </div>

                            <div className='flex gap-2 items-center'>
                              <Etanol />
                              <span className="text-sm text-slate-600"> R$ { posto.etanol.toPrecision(3) === undefined  ? "N/A" : posto.etanol.toPrecision(3)}</span>
                            </div>
                          </div>

                          <div className='flex flex-col gap-3'>
                            <div className='flex gap-2 items-center'>
                              <Comum />
                              <span className="text-sm text-slate-600"> R$ {posto.gasolina_aditivada.toPrecision(3)}</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                              <Aditivada />
                              <span className="text-sm text-slate-600"> R$ {posto.gasolina_comum.toPrecision(3)}</span>
                            </div>
                          </div>
                        </div>
                        <Button className="text-[14px] self-center w-full" onClick={() => window.open(posto.url_endereco, "_blank")}>
                        Ver Localização
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="w-full flex flex-col gap-8">
       <TotalAveragePricesStreets></TotalAveragePricesStreets>
       <div className='flex gap-8'>
          <MinPricesStreets></MinPricesStreets>
          <AveragePriceGas></AveragePriceGas>
       </div>
      </div>
    </div>
  )
}


