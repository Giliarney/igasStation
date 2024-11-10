"use client"

import React  from 'react';
import { useState } from 'react';
import Logo from '@/assets/Logo.svg';
import { Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, ChartSpline, FileSpreadsheet, CircleHelp, House, Phone, Table2 } from 'lucide-react';
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

interface HeaderProps {
    setView: React.Dispatch<React.SetStateAction<"tabela" | "graficos" | "paginaInicial"  | "contato" | "ajuda" | "registroColeta">>;
}
  
const Header: React.FC<HeaderProps> = ({setView}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeView, setActiveView] = useState<"tabela" | "graficos" | "paginaInicial" | "contato" | "ajuda" | "registroColeta">("paginaInicial");

        const handleItemClick = (view: "tabela" | "graficos" | "paginaInicial" | "contato" | "ajuda" | "registroColeta") => {
            setActiveView(view);
        setView(view);
    };

    return (
        <div>
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-16 border-r border-slate-300 sm:flex bg-slate-50 transition-all'>
                <nav className='w-full flex flex-col items-center py-4'>
                    <div className='w-12 h-12 flex items-center justify-center my-3 cursor-pointer'>
                        <Logo viewBox="0 -25 125 125" onClick={() => handleItemClick('paginaInicial')}></Logo>
                    </div>

                    <TooltipProvider>

                        <Tooltip>
                            <TooltipTrigger asChild className='border-b'>
                                <Link href="#" onClick={() => handleItemClick('paginaInicial')} className={`flex items-center justify-center w-full h-12 rounded-none transition-all text-slate-700 hover:bg-slate-700 hover:text-white ${activeView === "paginaInicial" ? 'bg-slate-700 text-white' : ''}`}>
                                    <House className='w-5 h-5'></House>
                                    <span className='sr-only'>Página Inicial</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Página Inicial</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild  className='border-b'>
                                <Link href="#" onClick={() => handleItemClick('tabela')} className={`flex items-center justify-center w-full h-12 rounded-none transition-all text-slate-700 hover:bg-slate-700 hover:text-white ${activeView === "tabela" ? 'bg-slate-700 text-white' : ''}`}>
                                    <Table2 className='w-5 h-5'></Table2>
                                    <span className='sr-only'>Tabela de Preços</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Tabela de Preços</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild  className='border-b'>
                                <Link href="#" onClick={() => handleItemClick('graficos')} className={`flex items-center justify-center w-full h-12 rounded-none transition-all text-slate-700 hover:bg-slate-700 hover:text-white ${activeView === "graficos" ? 'bg-slate-700 text-white' : ''}`}>
                                    <ChartSpline className='w-5 h-5'></ChartSpline>
                                    <span className='sr-only'>Gráficos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Gráficos</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild  className='border-b'>
                                <Link href="#" onClick={() => handleItemClick('registroColeta')} className={`flex items-center justify-center w-full h-12 rounded-none transition-all text-slate-700 hover:bg-slate-700 hover:text-white ${activeView === "registroColeta" ? 'bg-slate-700 text-white' : ''}`}>
                                    <FileSpreadsheet className='w-5 h-5'></FileSpreadsheet>
                                    <span className='sr-only'>Cadastro de Posto</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Registro de Coleta</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild  className=''>
                                <Link href="#" onClick={() => handleItemClick('contato')} className={`flex items-center justify-center w-full h-12 rounded-none transition-all text-slate-700 hover:bg-slate-700 hover:text-white ${activeView === "contato" ? 'bg-slate-700 text-white' : ''}`}>
                                    <Phone className='w-5 h-5'></Phone>
                                    <span className='sr-only'>Contato</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Contato</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="#" onClick={() => handleItemClick('ajuda')} className='flex items-center justify-center w-10 h-12 rounded-full absolute bottom-4 transition-all text-slate-700 hover:bg-slate-700 hover:text-white'>
                                    <CircleHelp className='w-5 h-5'></CircleHelp>
                                    <span className='sr-only'>Ajuda</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Ajuda</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/*<ModeToggle></ModeToggle>*/}
                </nav>
            </aside>

            <header className="flex items-center justify-between w-screen min-h-8 bg-slate-50 p-3 sm:flex-col sm:hidden">
                <div className='w-12 h-12 flex items-center justify-center'>
                    <Logo viewBox="0 -25 125 125"></Logo>
                </div>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className='sm:hidden border-none text-slate-700 transition-all hover:bg-slate-700 hover:text-white'>
                            <Menu></Menu>
                            <span className='sr-only'>Menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className='bg-white items-center p-0 m-0 border-none'>
                        <nav className='flex flex-col gap-3 text-slate-700'>
                            <div className='w-full flex items-center justify-center px-4 py-8 text-slate-700'>
                                <h1>Menu</h1>
                            </div>

                            <Link href="" onClick={() => {handleItemClick('paginaInicial'); setIsOpen(false)}} className='flex w-96 p-4 gap-3 transition-all hover:bg-slate-700 hover:text-white'>
                                <House></House>
                                <span>Página Inicial</span>
                            </Link>

                            <Link href="" onClick={() => {handleItemClick('tabela'); setIsOpen(false)}} className='flex w-96 p-4 gap-3 transition-all hover:bg-slate-700 hover:text-white'>
                                <FileSpreadsheet></FileSpreadsheet>
                                <span>Tabela de Preços</span>
                            </Link>

                            <Link href="" onClick={() => {handleItemClick('graficos'); setIsOpen(false)}} className='flex max-w-full p-4 gap-3 transition-all hover:bg-slate-700,text-white hover:bg-slate-700 hover:text-white'>
                                <ChartSpline></ChartSpline>
                                <span>Gráficos</span>
                            </Link>

                            
                            <Link href="" onClick={() => {handleItemClick('registroColeta'); setIsOpen(false)}} className='flex w-96 p-4 gap-3 transition-all hover:bg-slate-700 hover:text-white'>
                                <FileSpreadsheet></FileSpreadsheet>
                                <span>Registro de Coletas</span>
                            </Link>

                            <Link href="" onClick={() => {setView('contato'); setIsOpen(false)}} className='flex w-96 p-4 gap-3 transition-all hover:bg-slate-700 hover:text-white'>
                                <Phone></Phone>
                                <span>Contato</span>
                            </Link>

                            <Link href="" onClick={() => {setView('ajuda'); setIsOpen(false)}} className='flex w-96 p-4 gap-3 transition-all hover:bg-slate-700 hover:text-white'>
                                <CircleHelp></CircleHelp>
                                <span>Ajuda</span>
                            </Link>
                            
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
        </div>
    );
};

export default Header;
