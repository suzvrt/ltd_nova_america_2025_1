import { Metadata } from "next";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

function InputField({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className={twMerge(className, "w-full text-md px-5 py-3 bg-[#D9D9D9] text-[#888888] rounded-0")} {...props} />
}

export const metadata: Metadata = {
    title: "Login",
    description: "Login Page",
};

export default function LoginPage() {

    const onLogin = async (form: FormData) => {
        "use server";//obrigatorio 
        console.log('oi mundo');
        console.log(form);
        
        // TODO: Implement login to backend
        void form;
    }
    
    const outroBotao = async (form: FormData) => {
        "use server";//obrigatorio 
        console.log('oi mundo 2 -sem dados direciionar para uma url ');
        // TODO: Implement login to backend
        throw redirect('https://www.uol.com.br');
        void form;
    }

    return (
        <main className="w-full flex items-center justify-center mt-50">
            <form
                action={onLogin}
                className="flex flex-col w-full h-full max-w-md gap-y-5 items-center justify-center"
            >
                
                <InputField type="text" name="login" id="login" placeholder="Login" />
                <InputField type="password" name="senha" id="senha" placeholder="Senha" />
                <button className="bg-[#333333] text-white px-12 py-2">
                    Login
                </button>
                
            </form>
            <form action={outroBotao}>
            <button className="bg-[#333333] text-white px-12 py-2">
                    botao 2
                </button>
            </form>
        </main>
    );
}