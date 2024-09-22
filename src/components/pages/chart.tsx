"use client"

import Autoplay from "embla-carousel-autoplay"
 
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BeatLoader } from 'react-spinners';

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

export function Charts() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
 
  const { data: enderecoPostos, isLoading, error } = useQuery<EnderecoPostos[]>({
    queryKey: ["gets-enderecoPostos"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas_station_average_price`);
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
  
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <BeatLoader color="#36d7b7" size={25} />
        <span className="text-slate-700">Carregando...</span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const dataEndereco = enderecoPostos || [];


  
  return (
    <div className="flex w-full justify-center items-center gap-4 flex-wrap">
      <div className="w-full h-full flex-col items-center justify-center flex">
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
                <Card className="p-4 w-full">
                  <CardContent className="flex flex-col w-full md:flex-col xl:flex-row items-center justify-center xl:justify-between gap-2">
                    <div className="h-44 sm:h-52 xl:w-[300px]  rounded-lg">
                      <img src={posto.url_imagem} alt="" className="h-full w-full object-cover rounded-lg" />
                    </div>
                    <div className="flex items-center w-full flex-col px-2">
                     <h2 className="text-lg lg:text-base xl:text-base w-full font-semibold self-start flex items-center gap-2 text-slate-700"> <Fuel/>{posto.nome === "Auto Posto Esmig Shell" ? "Posto Esmig" : posto.nome}</h2>
                      <div className="flex flex-col w-full h-full gap-4">
                        <span className="text-xs lg:text-sm font-semibold text-slate-700">Média de Preços:</span>
                        <div className='flex justify-between gap-4 w-full'>
                          <div className='flex flex-col gap-3 w-full'>
                            <div className='flex gap-2 items-center'>
                              <Diesel size='width-24px' />
                              <span className="text-sm text-slate-600 flex"> R$ {posto.diesel.toPrecision(3)}</span>
                            </div>

                            <div className='flex gap-2 items-center'>
                              <Etanol />
                              <span className="text-sm text-slate-600"> R$ { posto.etanol === null  ? "N/A" : posto.etanol.toPrecision(3)}</span>
                            </div>
                          </div>

                          <div className='flex flex-col gap-3 w-full'>
                            <div className='flex gap-2 items-center'>
                              <Comum />
                              <span className="text-sm text-slate-600 flex"> R$ {posto.gasolina_aditivada.toPrecision(3)}</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                              <Aditivada />
                              <span className="text-sm text-slate-600"> R$ {posto.gasolina_comum.toPrecision(3)}</span>
                            </div>
                          </div>
                        </div>
                        <Button className="text-[14px] hover:text-slate-700 font-semibold hover:border hover:bg-slate-100 transition-all self-center w-full" onClick={() => window.open(posto.url_endereco, "_blank")}>
                        Ver Localização
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>




      <div className="w-full flex flex-col gap-8">
       <TotalAveragePricesStreets></TotalAveragePricesStreets>
       <div className='w-full flex flex-col md:flex-col lg:flex-col  gap-8 xl:flex-row '>
          <MinPricesStreets></MinPricesStreets>
          <AveragePriceGas></AveragePriceGas>
       </div>
      </div>
    </div>
  )
}


