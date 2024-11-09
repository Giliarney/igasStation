import { ContactForm } from "@/components/pages/contact/formContact"


const Contact: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">

            <main className='w-[50%]'>
                <main className='bg-slate-50 rounded-2xl p-8'>
                    <header className=" h-full flex flex-col align-center justify-center text-center place-items-center">
                        <img src="/assets/logo.png" alt="" />
                        <span className="p-8 border-b text-3xl text-slate-700">Entre em Contato</span>
                    </header>
                    <ContactForm></ContactForm>
                </main>

            </main>

        </div>

    )
}

export default Contact