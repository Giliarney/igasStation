import { ContactForm } from "@/components/pages/contact/formContact"
import { Linkedin, Github, Phone, Mail, House } from 'lucide-react';
import Link from "next/link"

const Contact: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full ">

            <main className=''>
                <main className='bg-white rounded-2xl p-6 border'>
                    <header className=" h-full flex flex-col align-center justify-center text-center place-items-center">
                        <img src="/assets/logo.png" alt="" />
                        <span className="p-8 border-b text-3xl text-slate-700">Entre em Contato</span>
                    </header>
                    <div className="grid grid-cols-2 gap-8 bg-slate-50 border rounded-lg p-8">
                        <div className="grid grid-cols-2">
                            <div>
                                <img className="rounded-full" src="/assets/Sobre Mim.jpg" alt="" />    
                            </div>
                            <div className="flex flex-col items-center justify-center p-8">
                                <div className="flex flex-col gap-8">
                                    <h1 className="text-slate-700 text-2xl border-b border-slate-200">Sobre Mim</h1>
                                    <span className="text-slate-600 text-justify">
                                        Sou Giliarney, Desenvolvedor Fullstack, apaixonado por tecnologia e criação. 
                                        A possibilidade de solucionar problemas complexos através da programação e 
                                        dar vida a ideias inovadoras acho genial e com isso através do meu desafio acadêmico desenvolvi este site!
                                        <br />
                                        <br />
                                        <span className="text-slate-600">
                                            Surgiu interesse? Entre em contato comigo! 
                                        </span>
                                    </span>
                                </div>

                                <div className="w-full grid grid-rows-2 text-white pt-3">
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center justify-center h-10 bg-slate-700  hover:bg-slate-600 hover:text-white rounded-md gap-2 cursor-pointer">
                                            <Link href='https://github.com/Giliarney' target="blank">
                                                <Github></Github>
                                            </Link>
                                            <span className="text-sm">Perfil GitHub</span>
                                        </div>

                                        <div className="flex items-center justify-center  h-10 bg-slate-700   hover:bg-slate-600 hover:text-white rounded-md p-2 gap-2 cursor-pointer">
                                            <Link href='https://github.com/Giliarney' target="blank">
                                                <Linkedin></Linkedin>
                                            </Link>
                                            <span className="text-sm">Perfil Linkedin</span>
                                        </div>
                                    </div>
    

                                    <div className="w-full flex flex-col gap-2">

                                        <div className="flex items-center w-full gap-2">
                                            <Mail className="text-slate-700"></Mail>
                                            <span className="text-sm text-slate-600">
                                                contato.giliarney@gmail.com
                                            </span>
                                        </div>

                                        <div className="flex  items-center w-full gap-2">
                                            <Phone className="text-slate-700 "></Phone>
                                            <span className="text-sm text-slate-600"> 
                                                +55 (28) 99983-7387
                                            </span>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                        <ContactForm></ContactForm>
                    </div>
                </main>

            </main>

        </div>

    )
}

export default Contact