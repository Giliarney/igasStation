import { useState } from 'react';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BeatLoader } from 'react-spinners';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationLast, PaginationFisrt } from "@/components/ui/pagination"
import * as XLSX from 'xlsx';


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

export default function TableInfos({ selectedPosto, selectedStreet, selectedOrder}: { selectedPosto: string | null, selectedStreet: string | null, selectedOrder: string | null}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: dadosResponse, isLoading, error } = useQuery<Posto[]>({
    queryKey: ["get-gas-station-prices"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas_station_prices`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      await new Promise(resolve => setTimeout(resolve, 100));

      return data;
    },
    placeholderData: keepPreviousData,
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

  const showAllData = selectedPosto === 'Todos' || selectedStreet === 'Todos' || selectedOrder === 'Todos';

  const filteredData = showAllData
  ? data
  : data.filter(posto =>
      (!selectedPosto || posto.posto_nome === selectedPosto) &&
      (!selectedStreet || posto.bairro === selectedStreet)
  );

  const sortedData = filteredData.sort((a: Posto, b: Posto) => {
    if (selectedOrder === "nome_posto") {
      return a.posto_nome.localeCompare(b.posto_nome);
    }

    if (selectedOrder === "bairro") {
      return a.bairro.localeCompare(b.bairro);
    }

    return 0; // Se não houver critério de ordenação
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

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allPrecos.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(allPrecos.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

    // Função para filtrar os dados pelo bairro selecionado
  const getFilteredDataByBairro = () => {
    if (exportBairro === "Todos") {
      return allPrecos; // Exporta todos os dados
    }
    return allPrecos.filter((item) => item.bairro === exportBairro); // Exporta somente os dados do bairro selecionado
  };
    const downloadDataAsExcel = () => {
    const dataToExport = getFilteredDataByBairro();
    const worksheet = XLSX.utils.json_to_sheet(dataToExport); // Gera a planilha a partir dos dados filtrados
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `dados_${exportBairro}.xlsx`);
  };

  // Coletar todos os bairros disponíveis para o seletor
  const bairros = Array.from(new Set(allPrecos.map(item => item.bairro)));

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-4 items-center">
        <label htmlFor="export-bairro">Exportar por bairro:</label>
        <select
          id="export-bairro"
          value={exportBairro}
          onChange={(e) => setExportBairro(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="Todos">Todos</option>
          {bairros.map((bairro, index) => (
            <option key={index} value={bairro}>
              {bairro}
            </option>
          ))}
        </select>
        <button onClick={downloadDataAsExcel} className="p-2 bg-blue-500 text-white rounded">
          Download Dados ({exportBairro})
        </button>
      </div>
      <Table id='my-table' className='rounded-lg my-table'>
        <TableHeader className="text-white bg-slate-700 rounded-lg">
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
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((preco, index) => (
              <TableRow
                key={index}
                className="hover:bg-slate-700 cursor-pointer hover:text-white text-slate-600 h-5"
              >
                <TableCell>{preco.nome}</TableCell>
                <TableCell className='text-center'>{preco.bandeira}</TableCell>
                <TableCell className='text-center'>{preco.bairro}</TableCell>
                <TableCell className='text-center'>{preco.data.slice(0,10)}</TableCell>
                <TableCell className='text-center'>{`R$ ${preco.diesel}`}</TableCell>
                <TableCell className='text-center'>{`R$ ${preco.etanol}`}</TableCell>
                <TableCell className='text-center'>{`R$ ${preco.gasolina_aditivada}`}</TableCell>
                <TableCell className='text-center'>{`R$ ${preco.gasolina_comum}`}</TableCell>
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

      <TableCaption className='w-full flex items-center justify-center'>Lista com preços dos combustíveis</TableCaption>

      <div className="flex justify-between items-center mt-4">
          <Pagination className="w-fit text-slate-700">
            <PaginationContent>

            <PaginationItem>
                <PaginationFisrt
                href="#"
                onClick={() => setCurrentPage(1)}
                className={`${currentPage === 1 ? 'read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : ''}`}
                aria-disabled={currentPage === 1}
                />
            </PaginationItem>

            <PaginationItem>
                <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)} 
                className={`${currentPage === 1 ? 'read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : ''}`}
                aria-disabled={currentPage === 1}
                />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink
                    href="#"
                    className={currentPage ? "active" : ""}
                >
                    {currentPage}
                </PaginationLink>
            </PaginationItem>

            <PaginationItem>
                <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${currentPage === totalPages ? 'read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : ''}`}
                aria-disabled={(!totalPages || currentPage >= totalPages)}
                />
            </PaginationItem>

            <PaginationItem>
                <PaginationLast
                href="#"
                onClick={() => setCurrentPage(totalPages)}
                className={`${currentPage === totalPages ? 'read-only cursor-default hover:bg-transparent hover:text-none opacity-50' : ''}`}
                aria-disabled={(!totalPages || currentPage >= totalPages)}
                />
            </PaginationItem>

            </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
