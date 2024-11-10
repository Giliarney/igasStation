import { FormGasRegister } from "@/components/pages/gasRegister/forGasRegister"


const GasRegister: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full p-12">

            <main className='w-[50%]'>
                <main className='bg-white rounded-2xl p-8 border'>
                    <header className=" h-full flex flex-col align-center justify-center text-center place-items-center">
                        <img src="/assets/logo.png" alt="" />
                        <span className="p-8 border-b text-3xl text-slate-700">Registre uma Coleta</span>
                    </header>
                    <FormGasRegister></FormGasRegister>
                </main>

            </main>

        </div>

    )
}

export default GasRegister;