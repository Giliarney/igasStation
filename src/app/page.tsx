"use client"
import TableInfos from "@/components/pages/tableInfos/tableInfos"
import { Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue, } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import React, { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {Popover,  PopoverContent,  PopoverTrigger, } from "@/components/ui/popover"
import Header from "@/components/header";
import { ListFilter, Fuel, MapPin  } from 'lucide-react';
import {Charts} from '@/components/pages/charts/chart'
import Home  from '@/components/pages/home/home';
import Contact  from '@/components/pages/contact/contact';

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
    const [view, setView] = useState<"tabela" | "graficos" | "paginaInicial" | "contato" | "cadastroPosto" | "ajuda"> ("paginaInicial");
    const [selectedPosto, setSelectedPosto] = useState<string | undefined>(undefined);
    const [selectedStreet, setSelectedStreet] = useState<string | undefined>("Todos");
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();
    const [placeHolderGas, setPlaceholderGas] = useState("Selecione o Posto");
    const [placeHolderStreet, setPlaceholderStreet] = useState("Selecione o Bairro");
  
  
    const { data: dataStreet} = useQuery<Bairros[]>({
      queryKey: ["get-street"],
      queryFn: async () => {
        const response = await fetch(`https://api-igas.onrender.com/street`);
        if (!response.ok) throw new Error("Network response was not ok");
  
        const data = await response.json();
  
        return data;
      },
    });
  
    const { data: dataGasStation} = useQuery<Postos[]>({
      queryKey: ["get-gas_station"],
      queryFn: async () => {
        const response = await fetch(`https://api-igas.onrender.com/gas_station`);
        if (!response.ok) throw new Error("Network response was not ok");
  
        const data = await response.json();
  
        return data;
      },
    });
  
    const streets = dataStreet || [];
    const gasStation = dataGasStation || [];

    const handleValueChangeStreet = (value: string) => {
      setSelectedPosto(value);

      if (selectedStreet === "Todos"){
        setSelectedStreet('')
      };

      if (placeHolderStreet === "Selecione o Bairro") {
        return
      } 
      
      // Toggle the selection: if it's already selected, deselect it
      
      // Toggle the selection: if it's already selected, deselect it
      setSelectedStreet((prev) => (prev === value ? undefined : value));
      setPlaceholderStreet("Selecione o Bairro")
    };

    const handleValueChangeGas = (value: string) => {
      setSelectedStreet(value);
      setSelectedPosto('')
      // Toggle the selection: if it's already selected, deselect it
      if (placeHolderGas === "Selecione o Posto") {
        return
      } else {
        setSelectedStreet((prev) => (prev === value ? undefined : value));
        setPlaceholderGas("Selecione o  Posto")
      };
    };
    
    return(
      <>
        <Header setView={setView}/>
        <main className="sm:ml-14 p-4 sm:p-12 flex items-center justify-center">
        <section className="flex flex-col justify-center w-full gap-4 h-full relative">
        <h1 className="w-full h-16 sm:h-[82px] self-center text-center text-xl sm:text-3xl text-slate-700" hidden={view === "paginaInicial" || view === "cadastroPosto" || view === "contato" || view ==="ajuda" || view === "graficos"}>Tabela de Histórico de Preços</h1>
        
        {view === 'paginaInicial' ? <Home/> : ""}
        
        {view === 'tabela' ? 
        <div className="flex flex-col sm:flex-col md:flex-row w-full justify-between items-center gap-4">
          <div className="flex w-full gap-4 text-slate-700">
            <Popover>
              <PopoverTrigger asChild className="w-full md:w-[160px]">
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd/MM/yyyy") : <span>Data Inicio</span>}
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
              <PopoverTrigger asChild className="w-full md:w-[160px]" >
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy") : <span>Data Fim</span>}
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

          <div className=" flex flex-col w-full sm:flex-row gap-4 items-center text-slate-600">
              <div className="flex w-full">
                <Select value={selectedStreet} onValueChange={handleValueChangeGas}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeHolderStreet} />
                        <MapPin className="h-4 w-4 opacity-50"></MapPin>
                    </SelectTrigger>
                      <SelectContent className="text-slate-600 ">
                        <SelectItem value="Todos">Todos Bairros</SelectItem>
                        {streets.map((item, key) => 
                          <SelectItem key={key} value={item.bairro}>{item.bairro}</SelectItem>
                        )}
                      </SelectContent>
                  </Select>
              </div>
              <div className="flex w-full">
                <Select value={selectedPosto} onValueChange={handleValueChangeStreet}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeHolderGas}/>
                    <Fuel className="h-4 w-4 opacity-50"></Fuel>
                  </SelectTrigger>
                  <SelectContent className="text-slate-600">
                    {/*<SelectItem value="Todos">Todos Postos</SelectItem>*/}
                    {gasStation.map((item, key) => 
                      <SelectItem key={key} value={item.nome}>{item.nome}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full">
                <Select onValueChange={(value) => setSelectedOrder(value)}>
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="Ordernar" />
                      <ListFilter className="h-4 w-4 opacity-50"></ListFilter>
                  </SelectTrigger>
                      <SelectContent className="text-slate-600 ">
                        <SelectItem value='bairro'>Bairro</SelectItem>
                        <SelectItem value='data'>Data</SelectItem>
                        <SelectItem value='nome_posto'>Posto</SelectItem>
                  </SelectContent>
                </Select>
              </div>         
            </div>
        </div>
        : ""}

        {view === 'tabela' ? <TableInfos
          selectedPosto={selectedPosto}
          selectedStreet={selectedStreet}
          selectedOrder={selectedOrder}
          startDate={startDate}
          endDate={endDate}
        /> : ""}

        {view === 'graficos' ? <Charts/> : ""}

        {view === 'cadastroPosto' ? <TableInfos
          selectedPosto={selectedPosto}
          selectedStreet={selectedStreet}
          selectedOrder={selectedOrder}
          startDate={startDate}
          endDate={endDate}
        /> : ""}

        {view === 'contato' ? <Contact/> : ""}

        {view === 'ajuda' ? <TableInfos
          selectedPosto={selectedPosto}
          selectedStreet={selectedStreet}
          selectedOrder={selectedOrder}
          startDate={startDate}
          endDate={endDate}
        /> : ""}
        
        </section>
        </main>
      </>
    );
}

export default Page;



      
