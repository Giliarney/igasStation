"use client"
import TableInfos from "@/components/tableInfos/tableInfos"
import { Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue, } from "@/components/ui/select"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import React, { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {Popover,  PopoverContent,  PopoverTrigger, } from "@/components/ui/popover"
import Header from "@/components/header";
import { ListFilter, Fuel, MapPin, Droplet  } from 'lucide-react';
import {Charts} from '@/components/pages/chart'

export interface Combustiveis {
  tipo: string;
}

export interface Bairros {
  bairro: string;
}

export interface Postos {
  nome: string;
}

const Page: React.FC = () => {
    const [date, setDate] = React.useState<Date>();
    const [view, setView] = useState<"tabela" | "graficos">("tabela");
    const [selectedPosto, setSelectedPosto] = useState<string | null>(null);
    const [selectedStreet, setSelectedStreet] = useState('Todos');
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();
  
  
    const { data: dataStreet} = useQuery<Bairros[]>({
      queryKey: ["get-street"],
      queryFn: async () => {
        const response = await fetch(`http://localhost:3001/street`);
        if (!response.ok) throw new Error("Network response was not ok");
  
        const data = await response.json();
  
        return data;
      },
    });
  
    const { data: dataGasStation} = useQuery<Postos[]>({
      queryKey: ["get-gas_station"],
      queryFn: async () => {
        const response = await fetch(`http://localhost:3001/gas_station`);
        if (!response.ok) throw new Error("Network response was not ok");
  
        const data = await response.json();
  
        return data;
      },
    });
  
    const streets = dataStreet || [];
    const gasStation = dataGasStation || [];

    const formatDate = (date: Date | null) => {
      return date ? date.toISOString().split('T')[0] : '';
    };
    
    const startDateFormatted = formatDate(startDate || null);
    const endDateFormatted = formatDate(endDate || null);

    return(
      <>
        <Header setView={setView}/>
        <main className="sm:ml-14 p-12">
      <section className="flex flex-col gap-6" >
        <h1 className="w-full h-16 self-center text-center text-3xl text-slate-700" hidden={view === "graficos"}>Tabela de Histórico de Preços</h1>
        {view === 'tabela' ? 
        <div className="flex w-full gap-4 justify-between items-center">
          <div className="flex gap-4 text-slate-700 w-full">
            <Popover>
              <PopoverTrigger asChild>
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
              <PopoverTrigger asChild >
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
          </div>

          <div className="flex gap-4 items-center text-slate-600 min-w-720px">
            <span>Filtros:</span>
            <div className="flex gap-4">
              <div>
                <span></span>
                <Select onValueChange={(value) => setSelectedStreet(value)} disabled={selectedPosto === 'Todos'}>
                  <SelectTrigger className="min-w-[140px] ">
                      <SelectValue placeholder="Bairro" />
                      <MapPin className="h-4 w-4 opacity-50"></MapPin>
                  </SelectTrigger>
                    <SelectContent className="text-slate-600 ">
                      <SelectItem value="Todos">Todos Bairros</SelectItem>
                      {streets.map((item) => 
                        <SelectItem value={item.bairro}>{item.bairro}</SelectItem>
                      )}
                    </SelectContent>
                </Select>
              </div>
              <div>
                <span></span>
                <Select onValueChange={(value) => setSelectedPosto(value)} disabled={selectedStreet === 'Todos'}>
                  <SelectTrigger className="min-w-[140px]">
                    <SelectValue placeholder={"Posto"}/>
                    <Fuel className="h-4 w-4 opacity-50"></Fuel>
                  </SelectTrigger>
                  <SelectContent className="text-slate-600">
                    <SelectItem value="Todos">Todos Postos</SelectItem>
                    {gasStation.map((item) => 
                      <SelectItem value={item.nome}>{item.nome}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <span></span>
                <Select onValueChange={(value) => setSelectedOrder(value)}>
                  <SelectTrigger className="min-w-[140px]">
                      <SelectValue placeholder="Ordernar" />
                      <ListFilter className="h-4 w-4 opacity-50"></ListFilter>
                  </SelectTrigger>
                      <SelectContent className="text-slate-600 ">
                        <SelectItem value='bandeira_nome'>Bandeira</SelectItem>
                        <SelectItem value='bairro'>Bairro</SelectItem>
                        <SelectItem value='nome_posto'>Posto</SelectItem>
                  </SelectContent>
                </Select>
              </div>         
            </div>
          </div>
        </div>
        : ""}
        {view === 'tabela' ? <TableInfos
          selectedPosto={selectedPosto}
          selectedStreet={selectedStreet}
          selectedOrder={selectedOrder}
        /> : <Charts/>}
        </section>
        </main>
      </>
    );
}

export default Page;



      
