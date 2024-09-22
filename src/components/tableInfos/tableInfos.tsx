"use client"
import { useState } from 'react';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BeatLoader } from 'react-spinners';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationLast, PaginationFisrt } from "@/components/ui/pagination";
import ExcelJS from 'exceljs';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download } from "lucide-react";

export interface Posto {
  posto_nome: string;
  bandeira_nome: string;
  bairro: string;
  data: string;
  gasolina_comum: number;
  gasolina_aditivada: number;
  etanol: number;
  diesel: number;
}

export default function TableInfos({ 
  selectedPosto, 
  selectedStreet, 
  selectedOrder, 
  startDate, 
  endDate 
  }:{ 
    selectedPosto: string | undefined, 
    selectedStreet: string | undefined, 
    selectedOrder: string | null, 
    startDate: Date | undefined, 
    endDate: Date | undefined
  }){

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [, setExportBairro] = useState<string | null>("Todos");
  const [isOpen, setIsOpen] = useState(false);

  const { data: dadosResponse, isLoading, error } = useQuery<Posto[]>({
    queryKey: ["get-gas-station-prices"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas_station_prices`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 200));

      return data;
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full items-center justify-center">
        <BeatLoader color="#36d7b7" size={25} />
        <span className="text-slate-700">Carregando...</span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const data = dadosResponse || [];

  const filteredData = data.filter(posto => {
    const dataPosto = new Date(posto.data);
    
    // Verifica se todas as condições de filtragem são atendidas
    const isInDateRange = (startDate ? dataPosto >= startDate : true) && (endDate ? dataPosto <= endDate : true);
    const isSelectedBairro = !selectedStreet || selectedStreet === "Todos" || posto.bairro === selectedStreet;
    const isSelectedPosto = !selectedPosto || posto.posto_nome === selectedPosto;
  
    return isInDateRange && isSelectedBairro && isSelectedPosto;
  });
  
  const sortedData = filteredData.sort((a: Posto, b: Posto) => {
    if (selectedOrder === "nome_posto") {
      return a.posto_nome.localeCompare(b.posto_nome);
    }
    if (selectedOrder === "bairro") {
      return a.bairro.localeCompare(b.bairro);
    }

    if (selectedOrder === "bairro") {
      return a.bairro.localeCompare(b.bairro);
    }

    if (selectedOrder === "data") {
      return a.data.localeCompare(a.data);
    }

    return 0;
  });

  const allPrecos = sortedData.map((posto) => ({
    nome: posto.posto_nome,
    bandeira: posto.bandeira_nome,
    bairro: posto.bairro,
    data: posto.data,
    gasolina_comum: posto.gasolina_comum || "N/A",
    gasolina_aditivada: posto.gasolina_aditivada || "N/A",
    etanol: posto.etanol || "N/A",
    diesel: posto.diesel || "N/A",
  }));

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allPrecos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allPrecos.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // Função para download de dados em Excel
  const downloadDataAsExcel = async (bairro: string) => {
    const dataToExport = bairro === "Todos" ? allPrecos : allPrecos.filter((item) => item.bairro === bairro);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dados');
    // Adicionando cabeçalhos
    worksheet.columns = [
      { header: 'Posto', key: 'nome', width: 30 },
      { header: 'Bandeira', key: 'bandeira', width: 30 },
      { header: 'Bairro', key: 'bairro', width: 30 },
      { header: 'Data', key: 'data', width: 20 },
      { header: 'Gasolina Comum', key: 'gasolina_comum', width: 15 },
      { header: 'Gasolina Aditivada', key: 'gasolina_aditivada', width: 20 },
      { header: 'Etanol', key: 'etanol', width: 15 },
      { header: 'Diesel', key: 'diesel', width: 15 },
    ];

    // Adicionando dados
    dataToExport.forEach(item => {
      worksheet.addRow(item);
    });

    // Gerar arquivo Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `dados_${bairro}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  // Coletar todos os bairros disponíveis para o seletor
  const bairros = Array.from(new Set(allPrecos.map(item => item.bairro)));

  return (
    <div className='flex h-full flex-col gap-4'>
      <div className="flex sm:gap-4 items-center text-sm sm:text-base lg:absolute left-[352px]  top-[98px] relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger className='bg-slate-700 text-white hover:bg-white hover:text-slate-700 hover:border rounded-lg p-2 flex items-center gap-2'>
            <Download className='h-5 w-5 sm:h-6 sm:w-6'></Download>
            <span className='lg:hidden'>Download</span>
          </PopoverTrigger>
          <PopoverContent className='w-48'>
            <div className="flex flex-col">
              <button
                className="p-2 rounded-md hover:bg-slate-700 hover:text-white text-start"
                onClick={() => {
                  setExportBairro("Todos");
                  setIsOpen(false);
                  downloadDataAsExcel("Todos"); // Chama a função de download imediatamente
                }}
              >
                Exportar Todos
              </button>

              {bairros.map((bairro, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-md hover:bg-slate-700 hover:text-white text-start`}
                  onClick={() => {
                    setExportBairro(bairro);
                    setIsOpen(false);
                    downloadDataAsExcel(bairro); // Chama a função de download imediatamente
                  }}
                >
                  {bairro}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Table id='my-table' className='rounded-lg my-table w-full h-full'>
        <TableHeader className="text-white bg-slate-700 rounded-lg sm:text-base text-sm">
          <TableRow className='min-w-24'>
            <TableHead className='min-w-52'>Posto</TableHead>
            <TableHead className='min-w-52 text-center'>Bandeira</TableHead>
            <TableHead className='min-w-52 text-center'>Bairro</TableHead>
            <TableHead className='min-w-52 text-center'>Data</TableHead>
            <TableHead className='min-w-52 text-center'>Diesel</TableHead>
            <TableHead className='min-w-52 text-center'>Etanol</TableHead>
            <TableHead className='min-w-52 text-center'>Gasolina Aditivada</TableHead>
            <TableHead className='min-w-52 text-center'>Gasolina Comum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='h-full'>
          {currentItems.length > 0 ? (
            currentItems.map((preco, index) => (
              <TableRow
                key={index}
                className="hover:bg-slate-700 sm:text-base text-sm cursor-pointer hover:text-white text-slate-600 h-5"
              >
                <TableCell className=''>{preco.nome}</TableCell>
                <TableCell className='text-center '>{preco.bandeira}</TableCell>
                <TableCell className='text-center '>{preco.bairro}</TableCell>
                <TableCell className='text-center '>{preco.data.slice(0,10)}</TableCell>
                <TableCell className='text-center '>{`R$ ${preco.diesel}`}</TableCell>
                <TableCell className='text-center '>{`R$ ${preco.etanol}`}</TableCell>
                <TableCell className='text-center '>{`R$ ${preco.gasolina_aditivada}`}</TableCell>
                <TableCell className='text-center '>{`R$ ${preco.gasolina_comum}`}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Nenhum dado encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        </Table>

        <div className="flex w-full items-center bg-slate-700 p-4 bottom-0">
          <Pagination className="flex w-full items-center text-slate-700">
            <PaginationContent className='flex flex-col md:flex-row gap-4 w-full items-center justify-between'>
              <div className='w-fit h-full flex items-center gap-4'>
                <span className='flex sm:text-sm text-xs h-full items-center text-white'>Itens por página: {itemsPerPage}</span>
                <span className='flex sm:text-sm text-xs text-white'>Total de itens: {allPrecos.length}</span>
                <span className='flex sm:text-sm text-xs text-white'>Total de páginas: {totalPages}</span>
              </div>

            <div className='flex'>
            <PaginationItem>
                <PaginationFisrt
                href="#"
                onClick={() => setCurrentPage(1)}
                className={`${currentPage === 1 ? 'text-white read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : 'text-white'}`}
                aria-disabled={currentPage === 1}
                />
            </PaginationItem>

            <PaginationItem>
                <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)} 
                className={`${currentPage === 1 ? 'text-white read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : 'text-white'}`}
                aria-disabled={currentPage === 1}
                />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink
                    href="#"
                    className={currentPage ? "active text-white" : ""}
                >
                    {currentPage}
                </PaginationLink>
            </PaginationItem>

            <PaginationItem>
                <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${currentPage === totalPages ? 'text-white read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : 'text-white'}`}
                aria-disabled={(!totalPages || currentPage >= totalPages)}
                />
            </PaginationItem>

            <PaginationItem>
                <PaginationLast
                href="#"
                onClick={() => setCurrentPage(totalPages)}
                className={`${currentPage === totalPages ? 'text-white read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : 'text-white'}`}
                aria-disabled={(!totalPages || currentPage >= totalPages)}
                />
            </PaginationItem>
            </div>


            </PaginationContent>
        </Pagination>


        </div>

    </div>
  );
}


