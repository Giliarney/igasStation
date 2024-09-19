"use client"

import React from 'react';
import Logo from '@/assets/Logo.svg';
import { Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, ChartSpline, List, CircleHelp } from 'lucide-react';
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/toggletheme/toggletheme"

interface HeaderProps {
    setView: React.Dispatch<React.SetStateAction<"tabela" | "graficos">>;
}
  
const Header: React.FC<HeaderProps> = ({setView}) => {

    return (
        <div>
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-16 border-r border-slate-300 sm:flex bg-slate-50 transition-all'>
                <nav className='w-full flex flex-col items-center gap-2  py-4'>
                    <div className='w-12 h-12 flex items-center justify-center my-3'>
                        <Logo viewBox="0 -25 125 125"></Logo>
                    </div>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="#" onClick={() => setView('tabela')} className='flex items-center justify-center w-full h-10 rounded-none transition-all text-slate-700 hover:bg-slate-700 hover:text-white'>
                                    <List className='w-5 h-5'></List>
                                    <span className='sr-only'>Tabela de Preços</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Tabela de Preços</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="#" onClick={() => setView('graficos')} className='flex items-center justify-center w-full h-10 rounded-none transition-all text-slate-700 hover:bg-slate-700 hover:text-white'>
                                    <ChartSpline className='w-5 h-5'></ChartSpline>
                                    <span className='sr-only'>Gráficos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Gráficos</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="#" className='flex items-center justify-center w-10 h-10 rounded-full absolute bottom-4 transition-all text-slate-700 hover:bg-slate-700 hover:text-white'>
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


                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className='sm:hidden border-none text-slate-700 transition-all hover:bg-slate-700 hover:text-white'>
                            <Menu></Menu>
                            <span className='sr-only'>Menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className='w-64 sm:w-96 bg-white items-center p-0 m-0 border-none'>
                        <nav className='flex flex-col gap-3 text-slate-700'>
                            <div className='w-full flex items-center justify-center px-4 py-8 text-slate-700'>
                                <h1>Menu</h1>
                            </div>

                            <Link href="#" className='flex w-96 p-4 gap-3 transition-all hover:bg-slate-700 hover:text-white'>
                                <List></List>
                                <span>Tabela de Preços</span>
                            </Link>

                            <Link href="#" className='flex max-w-full p-4 gap-3 transition-all hover:bg-slate-700,text-white hover:bg-slate-700 hover:text-white'>
                                <ChartSpline></ChartSpline>
                                <span>Gráficos</span>
                            </Link>
                            
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
        </div>
    );
};

export default Header;
