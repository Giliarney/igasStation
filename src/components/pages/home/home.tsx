import Logo from '@/assets/Logo.svg';
import { ChartSpline, FileSpreadsheet, Phone, Table2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface HomeProps {
    setView: React.Dispatch<React.SetStateAction<"tabela" | "graficos" | "paginaInicial"  | "contato" | "ajuda" | "registroColeta">>;
}

const Home: React.FC<HomeProps> = ({setView}) => {

    const handleItemClick = (view: "tabela" | "graficos" | "paginaInicial" | "contato" | "ajuda" | "registroColeta") => {
        setView(view);
    };

    return (
        <div className="flex flex-col justify-center align-center w-full h-full bg-slate-50 border border-slate-200 rounded-xl">
            <header className="w-full h-full flex align-center justify-center text-center place-items-center bg-slate-700 rounded-xl">
                <span className="text-xl md:text-3xl lg:text-5xl text-white p-4 md:p-8">iGasStation</span>
            </header>

            <main className='w-full h-full items-center'>
                <section className='w-full h-full flex items-center justify-between'>
                    <div className='w-full h-full gap-8 p-2 lg:p-8 text-slate-700 text-lg'>
                        <div className='w-full h-full flex items-center border-b p-4 justify-between gap-4'>
                            <div className=''>
                                <h1 className='w-full text-center lg:text-left md:text-2xl lg:text-4xl'>
                                    Bem-vindo ao nosso sistema de monitoramento
                                    <br/>
                                    de preços de combustíveis!</h1>
                                <br />
                                <br />
                            
                                <span className='text-slate-600 text-sm sm:text-lg'>
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
                                <span className='text-slate-600  text-sm sm:text-lg'>
                                    Esta plataforma é uma solução completa para quem busca clareza
                                    e precisão na comparação de preços de combustíveis,
                                    tornando o processo mais prático e acessível para todos os usuários.
                                </span>
                                <br/>
                            </div>

                            <div className='w-[50rem] h-[26rem] items-center justify-center bg-slate-50 hidden lg:flex'>
                                <Logo viewBox="-4 -23 120 120"></Logo>
                            </div>
                        </div>
                        
                        <div className='w-full h-full items-center p-10'>

                            <div className='w-full h-full gap-4 grid xl:grid-cols-3'>
                                <div className='w-full h-full bg-slate-700 rounded-lg p-4'>
                                    <div className='flex items-center gap-4 border-b border-slate-600 p-2'>
                                        <img className='w-20 bg-slate-50 p-4 rounded-xl' src="/assets/preco-baixo (1).png" alt="" />
                                        <span className='text-white text-lg'>Menores Preços de Combustíveis</span>
                                    </div>

                                    <div className='w-full h-full text-justify p-4'>
                                        <span className='text-sm md:text-base font-extralight w-full text-justify text-white'>
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

                                    <div className='w-full h-full p-4'>
                                        <span className='text-sm md:text-base font-extralight w-full text-justify text-white'>
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
                                        <span className='text-sm md:text-base font-extralight w-full text-justify text-white'>
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

                <section className='w-full h-full bg-slate-700 p-12 flex flex-col xl:flex-row gap-4 xl:gap-24 border-b border-slate-600'>
                   <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4 border-b border-slate-600 pb-4'>
                            <Table2 className='w-10 h-10 md:w-20 md:h-20 bg-slate-50 text-slate-700 rounded-xl p-2 md:p-4'></Table2>
                            <h1 className='text-xl md:text-2xl text-white'>Tabela de Preços</h1>
                        </div>

                        <span className='text-sm md:text-lg'>
                            A Tabela de Preços oferece uma visão completa e atualizada dos preços de combustíveis em diferentes postos da região. 
                            Consulte facilmente os valores praticados e compare para economizar. 
                            Essa tabela é ideal para quem busca transparência e quer fazer escolhas conscientes. 
                        </span>

                        <div className='w-full xl:h-36 flex items-center justify-center'>
                            <Button onClick={() => handleItemClick('tabela')} className='flex items-center justify-center bg-white hover:bg-slate-200'>
                                <span className='text-slate-700 md:text-base text-sm'>Clique aqui e confera os preços</span>
                            </Button>
                        </div>

                   </div>

                   <div className='w-fit h-fit p-4 bg-slate-50 rounded-md'>
                        <img src="/assets/table.png" alt="" className='rounded-md'/>
                   </div>

                </section>

                <section className='w-full h-full bg-slate-700 p-12 flex flex-col-reverse xl:flex-row gap-4 xl:gap-24 border-b border-slate-600'>

                    <div className='w-fit h-fit p-4 bg-slate-50 rounded-md'>
                        <img src="/assets/charts.png" alt="" className='rounded-md'/>
                   </div>

                   <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4 border-b border-slate-600 pb-4'>
                            <ChartSpline className='w-10 h-10 md:w-20 md:h-20 bg-slate-50 text-slate-700 rounded-xl p-2 md:p-4'></ChartSpline>
                            <h1 className='text-xl md:text-2xl text-white'>Gráficos</h1>
                        </div>

                        <span className='text-sm md:text-lg'>
                            A seção de Gráficos traz uma análise visual dos dados de preços de combustíveis, facilitando a compreensão das tendências ao longo do tempo. 
                            Ideal para acompanhar a evolução de preços e identificar padrões de mercado. 
                            Com gráficos interativos e personalizados, é possível ver a flutuação dos preços e tomar decisões estratégicas com base nos dados.
                        </span>

                        <div className='w-full xl:h-36 flex items-center justify-center'>
                            <Button onClick={() => handleItemClick('graficos')} className='flex items-center justify-between gap-2 bg-white hover:bg-slate-200'>
                                <span className='text-slate-700 md:text-base text-sm'>Clique aqui para ver os gráficos</span>
                            </Button>
                        </div>

                   </div>

                </section>

                <section className='w-full h-full bg-slate-700 p-12 flex flex-col xl:flex-row gap-4 xl:gap-24 border-b border-slate-600'>
                   <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4 border-b border-slate-600 pb-4'>
                            <FileSpreadsheet className='w-10 h-10 md:w-20 md:h-20 bg-slate-50 text-slate-700 rounded-xl p-2 md:p-4'></FileSpreadsheet>
                            <h1 className='text-xl md:text-2xl text-white'>Registro de Coletas</h1>
                        </div>

                        <span className='text-sm md:text-lg'>
                            Aqui, donos de postos ou os próprios usuários podem registrar coletas referentes ao estabelecimento
                            adicionando mais informações ao site sobre preços e serviços. 
                            O registro permite maior visibilidade para os clientes e facilita o acesso a dados precisos. 
                            <br />
                            Com essa ferramenta, os donos de postos têm a oportunidade de se destacar e fornecer informações detalhadas diretamente aos consumidores.
                        </span>

                        
                        <div className='w-full xl:h-36 flex items-center justify-center'>
                            <Button onClick={() => handleItemClick('registroColeta')} className='flex items-center justify-between gap-2 bg-white hover:bg-slate-200'>
                                <span className='text-slate-700 md:text-base text-sm'>Clique aqui e registre uma coleta</span>
                            </Button>
                        </div>

                   </div>

                   <div >
                        <img src="/assets/Coleta.png" alt="" className='rounded-md'/>
                   </div>

                </section>

                <section className='w-full h-full bg-slate-700 p-12 flex flex-col-reverse xl:flex-row gap-4 xl:gap-24 border-b border-slate-600'>

                    <div>
                        <img src="/assets/Contato.png" alt="" className='rounded-md'/>
                    </div>

                    <div className='w-full h-full flex flex-col gap-4'>
                        <div className='w-full flex items-center gap-4 border-b border-slate-600 pb-4'>
                            <Phone className='w-10 h-10 md:w-20 md:h-20 bg-slate-50 text-slate-700 rounded-xl p-2 md:p-4'></Phone>
                            <h1 className='text-2xl text-white'>Contato</h1>
                        </div>

                        <span className='text-sm md:text-lg'>
                        Entre em contato conosco para dúvidas, sugestões ou suporte técnico. 
                        Estamos prontos para ajudá-lo a ter a melhor experiência com o iGasStation. 
                        Nossa equipe está disponível para resolver qualquer problema e ouvir seu feedback para melhorar continuamente nossos serviços.
                        </span>

                        <div className='w-full xl:h-36 flex items-center justify-center'>
                            <Button onClick={() => handleItemClick('contato')} className='flex items-center justify-between gap-2 bg-white hover:bg-slate-200'>
                                <span className='text-slate-700 md:text-base text-sm'>Clique aqui e entre em contato</span>
                            </Button>
                        </div>

                    </div>

                </section>

                <section className='w-full flex flex-col items-center rounded-xl'>
                    <h1 className='text-xl md:text-3xl p-4 border-b text-slate-700'>Tecnologias</h1>
                    
                    <div className='w-full grid grid-cols-10 items-center place-items-center p-8 gap-4 lg:gap-0'>

                        <img className='w-10 lg:w-20' src="/assets/sdk-react-native.svg" alt="" />
                        <img className='w-18 lg:w-36' src="/assets/tailwind-css.svg" alt="" />
                        <img className='w-10 lg:w-20' src="/assets/nextjs.svg" alt="" />
                        <img className='w-6 lg:w-14' src="/assets/javascript.svg" alt="" />
                        <img className='w-8 lg:w-16' src="/assets/file-type-typescript-official.svg" alt="" />
                        <img className='w-8 lg:w-16' src="/assets/sql-database-sql-azure.svg" alt="" />
                        <img className='w-12 lg:w-24' src="/assets/microsoft-azure.svg" alt="" />
                        <img className='w-10 lg:w-20' src="/assets/nodejs.svg" alt="" />
                        <img className='w-14 lg:w-24' src="https://global.discourse-cdn.com/flex016/uploads/render/original/2X/a/ad2cd49c57c27455f695b61f3f8a01571697b336.svg" alt="" />
                        
                        <div className='flex flex-col items-center justify-center'> 
                            <img className='w-8 lg:w-16' src="/assets/shadcn-ui-seeklogo.svg" alt="" />
                            <span className='text-sm lg:text-xl text-slate-800'>shadcn</span> 
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
                            <ul className='cursor-pointer flex flex-col gap-1 text-sm md:text-base'>    
                                <li onClick={() => handleItemClick('paginaInicial')} className='hover:border-b border-slate-400 hover:text-slate-500'>Página Inicial</li>
                                <li onClick={() => handleItemClick('tabela')} className='hover:border-b border-slate-400 hover:text-slate-500'>Tabela de Preços</li>
                                <li onClick={() => handleItemClick('graficos')} className='hover:border-b border-slate-400 hover:text-slate-500'>Gráficos</li>
                                <li onClick={() => handleItemClick('registroColeta')} className='hover:border-b border-slate-400 hover:text-slate-500'>Registro de Coletas</li>
                            </ul>    
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-4'>
                        <div>
                            <span className='border-b text-base border-slate-400'>Dúvidas</span>
                        </div>

                        <div>
                            <ul className='cursor-pointer flex flex-col gap-1 text-sm md:text-base'>
                                <li onClick={() => handleItemClick('contato')} className='hover:border-b border-slate-400 hover:text-slate-500'>Contato</li>
                                <li onClick={() => handleItemClick('ajuda')} className='hover:border-b border-slate-400 hover:text-slate-500'>Ajuda</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col text-center p-4 bg-slate-50 text-slate-700'>
                    <p className='text-sm lg:text-base'>&copy; 2024 iGasStation. Todos os direitos reservados.</p>
                </div>

            </footer>
        </div>

    )
}

export default Home