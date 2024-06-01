import { LogIn, Mail, Lock, EyeOff, Eye } from "lucide-react";
import programmer from "../assets/programmer.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";

export function Login() {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const loginUserFormSchema = z.object({
    email: z.string()
      .nonempty('O campo e-mail é obrigatório')
      .email('Formato de e-mail inválido'),
    password: z.string()
      .min(8, 'Senha deve ter pelo menos 8 caracteres.')
  });

  type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema)
  });

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
            <form className="flex flex-col pt-3" onSubmit={handleSubmit(login)}>
              <label className="text-white font-medium">E-mail</label>
              <div className="relative mt-[5px] group">
                <input 
                  type="email" 
                  className={`w-[335px] h-[44px] pl-10 bg-[#2F2F2F] focus:outline-none shadow-sm ${errors.email ? 'focus:ring-1 focus:ring-red-500 focus:border-red-600' : 'focus:ring-1 focus:ring-manz-400 focus:border-manz-500'} border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]`} 
                  placeholder="Digite seu e-mail" 
                  {...register('email')}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <Mail size={20} className={`text-[#4F4F4F] ${errors.email ? 'group-focus-within:text-red-500' : 'group-focus-within:text-manz-500'}`} />
                </div>
              </div>
              {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}
              
              <label className="text-white font-medium pt-5">Senha</label>
              <div className="relative group mt-[5px]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm ${errors.password ? 'focus:ring-1 focus:ring-red-500 focus:border-red-600' : 'focus:ring-1 focus:ring-manz-400 focus:border-manz-500'} border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]`}
                  placeholder="Digite sua senha"
                  {...register('password')}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <Lock size={20} className={`text-[#4F4F4F] ${errors.password ? 'group-focus-within:text-red-500' : 'group-focus-within:text-manz-500'}`} />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} className={`text-[#4F4F4F] ${errors.password ? 'group-focus-within:text-red-500' : 'group-focus-within:text-manz-500'}`} /> : <Eye size={20} className={`text-[#4F4F4F] ${errors.password ? 'group-focus-within:text-red-500' : 'group-focus-within:text-manz-500'}`} />}
                </div>
              </div>
              {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
              
            
              <button type="submit" className="bg-gradient-to-l from-manz-500 to-manz-600 hover:from-manz-600 hover:to-manz-700 mt-6 text-manz-950 font-semibold w-[335px] h-[51px] rounded-[4px] text-lg outline-none">Entrar</button>
              <Link to="/signup" className="text-manz-600 hover:text-manz-500 w-[335px] text-center pt-4 hover:underline">Não tem uma conta? <span className="font-medium">Registre-se</span></Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
