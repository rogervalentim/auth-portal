import { LogIn, Mail, Lock } from "lucide-react";
import programmer from "../assets/programmer.png";

export function Login() {
  return (
    <section className="w-full grid sm:grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex">
        <img src={programmer} alt="programmer" className="h-[100dvh] w-[720px]" />
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-[#212121] w-full h-screen lg:w-[572px] lg:h-[512px] rounded-[4px] flex justify-center flex-col items-center">
          <div>
            <div className="flex items-center gap-[10px]">
              <span><LogIn className="text-white" size={24} /></span>
              <h2 className="text-white text-2xl font-semibold">Faça seu login</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-white mt-[5px]">Entre com suas informações de cadastro.</p>
            </div>
            <form className="flex flex-col pt-3">
              <label className="text-white font-medium">E-mail</label>
              <div className="relative mt-[5px] group">
                <input 
                  type="email" 
                  className="w-[335px] h-[44px] pl-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-2 focus:ring-manz-400 focus:border-manz-500 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]" 
                  placeholder="Digite seu e-mail" 
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <Mail size={20} className="text-[#4F4F4F] group-focus-within:text-manz-500" />
                </div>
              </div>  
              <label className="text-white font-medium pt-5">Senha</label>
              <div className="relative group mt-[5px]">
                <input 
                  type="password" 
                  className="w-[335px] h-[44px] pl-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-2 focus:ring-manz-400 focus:border-manz-500 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]" 
                  placeholder="Digite sua senha" 
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <Lock size={20} className="text-[#4F4F4F] group-focus-within:text-manz-500" />
                </div>
              </div>
              <div className="flex justify-between w-[335px] pt-5">
                <div className="flex gap-[5px]">
                  <input type="checkbox" className="accent-[#2F2F2F] border-[#4E4D4D]" />
                  <p className="text-white">Lembre-me</p>
                </div>
                <a href="/" className="text-manz-600 font-semibold hover:underline">Esqueci minha senha</a>
              </div>
              <button className="bg-gradient-to-l from-manz-500 to-manz-600 hover:from-manz-600 hover:to-manz-700 mt-4 text-manz-950 font-semibold w-[335px] h-[51px] rounded-[4px] text-lg">ENTRAR</button>
              <a href="/" className="text-manz-600 w-[335px] text-center pt-4 hover:underline">Não tem uma conta? <span className="font-medium">Registre-se</span></a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
