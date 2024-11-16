import { ContactForm } from "@/components/pages/contact/formContact"
import { Linkedin, Github, Phone, Mail } from 'lucide-react';
import Link from "next/link"

const Contact: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full">

            <main className='bg-white rounded-2xl border p-4'>
                <header className=" h-full flex flex-col align-center justify-center text-center place-items-center">
                    <img src="/assets/logo.png" alt="" />
                    <span className="xl:p-2 border-b text-xl xl:text-3xl text-slate-700">Entre em Contato</span>
                </header>

                <div className="w-full grid md:grid-cols-2 p-3 gap-8 bg-slate-50 border rounded-lg md:p-8">
                    <div className="w-full grid lg:grid-cols-1 items-center gap-4 relative">
                        <div className="w-full grid lg:grid-cols-1 xl:grid-cols-2 items-center gap-4">
                            <div className="px-20 pb-4 md:px-0 md:pb-0 lg:px-20 lg:pb-4 xl:pb-0 xl:px-0">
                                <img className="rounded-full" src="/assets/Sobre Mim.jpg" alt="" />    
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col gap-4 xl:gap-8">
                                    <h1 className="text-slate-700 text-xl xl:text-2xl border-b border-slate-200 md:pt-3">Sobre Mim</h1>

                                    <span className="text-slate-600 text-justify text-sm xl:text-base">
                                        Sou Giliarney, Desenvolvedor Fullstack, apaixonado por tecnologia e criação. 
                                        A possibilidade de solucionar problemas complexos através da programação e 
                                        dar vida a ideias inovadoras acho genial e com isso através do meu desafio acadêmico desenvolvi este site!
                                        <br />
                                        <br />
                                        <span className="text-slate-600 text-sm xl:text-base">
                                            Surgiu interesse? Entre em contato comigo! 
                                        </span>
                                        <div className="w-full flex flex-col md:flex-col lg:flex-row xl:flex-col sm:flex-row lg:gap-2">

                                            <div className="flex items-center w-full gap-2">
                                                <Mail className="text-slate-700 w-4 xl:w-max"></Mail>
                                                <span className="text-sm text-slate-600">
                                                    contato.giliarney@gmail.com
                                                </span>
                                            </div>

                                            <div className="flex  items-center w-full gap-2">
                                                <Phone className="text-slate-700 w-4 xl:w-max"></Phone>
                                                <span className="text-sm text-slate-600"> 
                                                    +55 (28) 99983-7387
                                                </span>
                                            </div>

                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-rows-2 text-white gap-2">
                                
                            <div className="grid grid-cols-2 gap-4">
                                <Link className="flex items-center justify-center h-10 bg-slate-700  hover:bg-slate-600 hover:text-white rounded-md gap-2 cursor-pointer" href='https://github.com/Giliarney' target="blank">
                                    <Github className="w-4 xl:w-max"></Github>
                                    <span className="text-sm">Perfil GitHub</span>
                                </Link>

                                <Link className="flex items-center justify-center h-10 bg-slate-700  hover:bg-slate-600 hover:text-white rounded-md gap-2 cursor-pointer" href='https://www.linkedin.com/in/giliarney' target="blank">
                                    <Linkedin className="w-4 xl:w-max"></Linkedin>
                                    <span className="text-sm">Perfil Linkedin</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <ContactForm></ContactForm>
                </div>
            </main>

        </div>

    )
}

export default Contact