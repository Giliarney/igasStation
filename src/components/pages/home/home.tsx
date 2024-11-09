import Logo from '@/assets/Logo.svg';
import { Menu, ChartSpline, FileSpreadsheet, CircleHelp, House, Phone, Table2 } from 'lucide-react';

const Home: React.FC = () => {

    return (
        <div className="flex flex-col justify-center align-center w-full h-full bg-slate-50 border border-slate-200 rounded-xl">
            <header className="w-full h-full flex align-center justify-center text-center place-items-center bg-slate-700 rounded-xl">
                <span className="text-5xl text-white p-8">iGasStation</span>
            </header>

            <main className='w-full h-full items-center'>
                <section className='w-full h-full flex items-center justify-between'>
                    <div className='w-full h-full gap-8 p-8 text-slate-700 text-lg'>
                        <div className='w-full h-full flex items-center border-b p-4 justify-between gap-4'>
                            <div className=''>
                                <h1 className='text-4xl'>Bem-vindo ao nosso sistema de monitoramento
                                    <br/>
                                     de preços de combustíveis!</h1>
                                <br />
                                <br />

                                <span className='text-slate-600'>
                                    Este projeto foi desenvolvido como parte 
                                    de um desafio acadêmico, com o objetivo de fornecer uma 
                                    plataforma moderna e acessível para consulta 
                                    de preços de combustíveis, oferecendo dados 
                                    atualizados e históricos sobre valores médios, 
                                    menores preços e comparações entre postos de abastecimento.
                                    <br/>

                                    Objetivo
                                    Criamos esta solução para facilitar o acesso a 
                                    informações confiáveis sobre preços de combustíveis. Com isso, buscamos 
                                    promover maior transparência e ajudar o consumidor a encontrar o posto 
                                    com o melhor custo-benefício, seja para gasolina, gasolina aditivada, etanol ou diesel.
                                </span>
                                <br/>
                                <br/>
                                <span className='text-slate-600'>
                                    Esta plataforma é uma solução completa para quem busca clareza
                                    e precisão na comparação de preços de combustíveis,
                                    tornando o processo mais prático e acessível para todos os usuários.
                                </span>
                                <br/>
                            </div>

                            <div className='w-[50rem] h-[26rem] flex items-center justify-center bg-slate-50'>
                                <Logo viewBox="-4 -23 120 120"></Logo>
                            </div>
                        </div>
                        
                        <div className='w-full h-full items-center p-10'>

                            <div className='w-full h-full gap-4 grid grid-cols-3'>
                                <div className='w-full h-full bg-slate-700 rounded-lg p-4'>
                                    <div className='flex items-center gap-4 border-b border-slate-600 p-2'>
                                        <img className='w-20 bg-slate-50 p-4 rounded-xl' src="/assets/preco-baixo (1).png" alt="" />
                                        <span className='text-white text-lg'>Menores Preços de Combustíveis</span>
                                    </div>

                                    <div className='w-full h-full text-justify p-4'>
                                        <span className='text-base font-extralight w-full text-justify text-white'>
                                            Consulta rápida e eficiente que retorna o menor preço para 
                                            cada tipo de combustível. Os usuários podem filtrar por bairro e 
                                            tipo de combustível ou visualizar os dados completos, 
                                            garantindo uma visão ampla ou personalizada.
                                        </span>
                                    </div>
                                </div>

                                <div className='w-full h-full bg-slate-700 rounded-lg p-4'>
                                    <div className='flex items-center gap-4 border-b border-slate-600 p-2'>
                                        <img className='w-20 bg-slate-50 p-4 rounded-xl' src="/assets/preco-baixo (2).png" alt="" />
                                        <span className='text-white'>Preços Médios de Combustíveis</span>
                                    </div>

                                    <div className='w-full h-full text-justify p-4'>
                                        <span className='text-base font-extralight w-full text-justify text-white'>
                                            Oferecemos relatórios de preços médios, 
                                            tanto geral quanto por bairro, com a opção 
                                            de selecionar um período específico para análise. 
                                            Essa funcionalidade possibilita uma comparação histórica, 
                                            auxiliando na compreensão das flutuações de preços ao longo do tempo.
                                        </span>
                                    </div>
                                </div>

                                <div className='w-full h-full bg-slate-700 rounded-lg p-4'>
                                    <div className='flex items-center gap-4 border-b border-slate-600 p-2'>
                                        <img className='w-20 bg-slate-50 p-4 rounded-xl' src="/assets/relatorio.png" alt="" />
                                        <span className='text-white'>Relatório por Posto</span>
                                    </div>

                                    <div className='w-full h-full text-justify p-4'>
                                        <span className='text-base font-extralight w-full text-justify text-white'>
                                            Permite que o usuário consulte detalhes de cada posto, 
                                            incluindo o nome, localização e preço médio dos 
                                            combustíveis, tudo filtrável por datas definidas. Está
                                            visão proporciona uma análise detalhada e comparativa entre os 
                                            postos, ajudando o consumidor a tomar decisões informadas.
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <br />
                    </div>
                </section>

                <section className='w-full h-full bg-slate-700 p-12 flex gap-24'>
                   <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4'>
                            <Table2 className='w-24 h-24'></Table2>
                            <h1 className='text-3xl text-slate-700'>Tabela de Preços</h1>
                        </div>

                        <span className='text-lg'>
                            No icone de tabela você encontra registros das coletas efetuadas nos postos de gasolina 
                        </span>

                   </div>

                   <div>
                        <img src="/assets/table.png" alt="" className='rounded-md'/>
                   </div>

                </section>

                <section className='w-full h-full bg-slate-700 p-12 flex gap-24'>

                    <div>
                        <img src="/assets/charts.png" alt="" className='rounded-md'/>
                   </div>

                   <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4'>
                            <ChartSpline className='w-24 h-24'></ChartSpline>
                            <h1 className='text-3xl text-slate-700'>Gráficos</h1>
                        </div>

                        <span className='text-lg'>
                            No icone de tabela você encontra registros das coletas efetuadas nos postos de gasolina 
                        </span>

                   </div>

                </section>

                <section className='w-full h-full bg-slate-700 p-12 flex gap-24'>
                   <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4'>
                            <FileSpreadsheet className='w-24 h-24'></FileSpreadsheet>
                            <h1 className='text-3xl text-slate-700'>Tabela de Preços</h1>
                        </div>

                        <span className='text-lg'>
                            No icone de tabela você encontra registros das coletas efetuadas nos postos de gasolina 
                        </span>

                   </div>

                   <div>
                        <img src="/assets/table.png" alt="" className='rounded-md'/>
                   </div>

                </section>

                <section className='w-full h-full bg-slate-700 p-12 flex gap-24'>

                    <div>
                        <img src="/assets/charts.png" alt="" className='rounded-md'/>
                    </div>

                    <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4'>
                            <Phone className='w-24 h-24'></Phone>
                            <h1 className='text-3xl text-slate-700'>Contato</h1>
                        </div>

                        <span className='text-lg'>
                            No icone de tabela você encontra registros das coletas efetuadas nos postos de gasolina 
                        </span>

                    </div>

                </section>

                <section className='w-full flex flex-col items-center rounded-xl'>
                    <h1 className='text-3xl p-4 border-b text-slate-700'>Tecnologias</h1>
                    
                    <div className='w-full flex items-center justify-center gap-12 p-8'>

                        <img className='w-20' src="/assets/sdk-react-native.svg" alt="" />
                        <img className='w-36' src="/assets/tailwind-css.svg" alt="" />
                        <img className='w-20' src="/assets/nextjs.svg" alt="" />
                        <img className='w-14' src="/assets/javascript.svg" alt="" />
                        <img className='w-16' src="/assets/file-type-typescript-official.svg" alt="" />
                        <img className='w-16' src="/assets/sql-database-sql-azure.svg" alt="" />
                        <img className='w-24' src="/assets/microsoft-azure.svg" alt="" />
                        <img className='w-20' src="/assets/nodejs.svg" alt="" />
                        <img className='w-24' src="https://global.discourse-cdn.com/flex016/uploads/render/original/2X/a/ad2cd49c57c27455f695b61f3f8a01571697b336.svg" alt="" />
                        
                        <div className='flex flex-col items-center justify-center'> 
                            <img className='w-16' src="/assets/shadcn-ui-seeklogo.svg" alt="" />
                            <span className='text-xl text-slate-700'>shadcn</span> 
                        </div>
                    </div>
                </section>

            </main>

            <footer className='w-full bg-slate-700 flex flex-col items-center justify-center'>

                <div className='flex w-[50%] justify-evenly bg-slate-100 text-slate-700 p-8 round border'>

                    <div className='flex flex-col gap-4'>
                        <div>
                            <span className='border-b border-slate-400 text-base'>Acessos</span>
                        </div>

                        <div>
                            <ul className='cursor-pointer flex flex-col gap-1'>    
                                <li className='hover:border-b border-slate-400 hover:text-slate-500'>Página Inicial</li>
                                <li className='hover:border-b border-slate-400 hover:text-slate-500'>Tabela de Preços</li>
                                <li className='hover:border-b border-slate-400 hover:text-slate-500'>Gráficos</li>
                                <li className='hover:border-b border-slate-400 hover:text-slate-500'>Cadastro de Posto</li>
                            </ul>    
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-4'>
                        <div>
                            <span className='border-b text-base border-slate-400'>Dúvidas</span>
                        </div>

                        <div>
                            <ul className='cursor-pointer flex flex-col gap-1'>
                                <li className='hover:border-b border-slate-400 hover:text-slate-500'>Contato</li>
                                <li className='hover:border-b border-slate-400 hover:text-slate-500'>Ajuda</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col text-center p-4 bg-slate-50 text-slate-700'>
                    <span>Todos os Direitos Reservados</span>
                    <span>Copyright©️</span>
                </div>

            </footer>
        </div>

    )
}

export default Home