import { User, ClipboardPen, Mail, Lock, Eye, EyeOff } from "lucide-react";
import programmer from "../assets/programmer.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

const createUserFormSchema = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  email: z.string()
    .nonempty('O campo e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres.'),
  password_confirmation: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres.')
}).refine(data => data.password === data.password_confirmation, {
  message: 'As senhas não correspondem',
  path: ['password_confirmation'],
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function Signup() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });


  async function createUser(data: CreateUserFormData) {
    try {
      const response = await fetch('https://teste.reobote.tec.br/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        await response.json();
        navigate('/');
        toast.success("usuário cadastrado com sucesso!");
      } else {
        const errorData = await response.json();
        if (response.status === 422) { 
          toast.error("Este e-mail já está cadastrado. Por favor, use outro e-mail.");
        } else {
          console.log(errorData);
        }
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }
  

  return (
    <section className="w-full grid sm:grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex">
        <img src={programmer} alt="programmer" className="h-[100dvh] w-[720px]" />
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-[#212121] w-full h-screen lg:w-[572px] lg:h-[610px] rounded-[4px] flex justify-center flex-col items-center">
          <div>
            <div className="flex items-center gap-[10px]">
              <span><ClipboardPen className="text-white" size={24} /></span>
              <h2 className="text-white text-2xl font-semibold">Cadastre-se</h2>
            </div>
            <form className="flex flex-col  pt-3" onSubmit={handleSubmit(createUser)}>
             <label className="text-white font-medium">Nome</label>
              <div className="relative mt-[5px] group">
                <input
                  type="text"
                  className={errors.name ? 
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-red-500 focus:border-red-600 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]"
                  : 
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-manz-400 focus:border-manz-500 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]"}
                  placeholder="Digite seu nome"
                  {...register('name')}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <User size={20} className={errors.name ? "text-[#4F4F4F] group-focus-within:text-red-500" : "text-[#4F4F4F] group-focus-within:text-manz-500"} />
                </div>
              </div>
              {errors.name && <span className="text-red-500 italic text-sm">{errors.name.message}</span>}
              <label className="text-white font-medium pt-5">E-mail</label>
              <div className="relative mt-[5px] group">
                <input
                  type="email"
                  className={errors.email ? 
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-red-500 focus:border-red-600 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]"
                  : 
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-manz-400 focus:border-manz-500 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]"}
                  placeholder="Digite seu e-mail"
                  {...register('email')}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <Mail size={20} className={errors.email ? "text-[#4F4F4F] group-focus-within:text-red-500" : "text-[#4F4F4F] group-focus-within:text-manz-500"} />
                </div>
              </div>
              {errors.email && <span className="text-red-500 italic text-sm">{errors.email.message}</span>}
              
              <label className="text-white font-medium pt-5">Senha</label>
              <div className="relative group mt-[5px]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={errors.password ? 
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-red-500 focus:border-red-600 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]" 
                  : 
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-manz-400 focus:border-manz-500 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]"
                  }
                  placeholder="Digite sua senha"
                  {...register('password')}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <Lock size={20} className={errors.password ? 
                  "text-[#4F4F4F] group-focus-within:text-red-500" :
                  "text-[#4F4F4F] group-focus-within:text-manz-500"
                  } />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} className={errors.password ? 
                  "text-[#4F4F4F] group-focus-within:text-red-500" :
                  "text-[#4F4F4F] group-focus-within:text-manz-500"
                  } /> : <Eye size={20} className={errors.password ? 
                    "text-[#4F4F4F] group-focus-within:text-red-500" :
                    "text-[#4F4F4F] group-focus-within:text-manz-500"
                    } />}
                </div>
              </div>
              {errors.password && <span className="text-red-500 italic text-sm">{errors.password.message}</span>}
              
              <label className="text-white font-medium pt-5">Confirme a sua senha</label>
              <div className="relative group mt-[5px]">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={errors.password_confirmation ? 
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-red-500 focus:border-red-600 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]" 
                  :
                  "w-[335px] h-[44px] pl-10 pr-10 bg-[#2F2F2F] focus:outline-none shadow-sm focus:ring-1 focus:ring-manz-400 focus:border-manz-500 border-[#4E4D4D] rounded-[4px] text-white placeholder-[#ABABAB]"
                  }
                  placeholder="Digite sua senha"
                  {...register('password_confirmation')}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <Lock size={20} className={errors.password_confirmation ? 
                    "text-[#4F4F4F] group-focus-within:text-red-500"
                    : "text-[#4F4F4F] group-focus-within:text-manz-500"
                  } />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={20} className={errors.password_confirmation ? 
                    "text-[#4F4F4F] group-focus-within:text-red-500"
                    : "text-[#4F4F4F] group-focus-within:text-manz-500"
                  }  /> : <Eye size={20} className={errors.password_confirmation ? 
                    "text-[#4F4F4F] group-focus-within:text-red-500"
                    : "text-[#4F4F4F] group-focus-within:text-manz-500"
                  } />}
                </div>
              </div>
              {errors.password_confirmation && <span className="text-red-500 italic text-sm">{errors.password_confirmation.message}</span>}
              
              <button type="submit" className="bg-gradient-to-l from-manz-500 to-manz-600 hover:from-manz-600 hover:to-manz-700 text-manz-950 font-semibold w-[335px] h-[51px] rounded-[4px] mt-6 text-lg outline-none">Cadastre-se</button>
              <Link to="/" className="text-manz-600 hover:text-manz-500 w-[335px] text-center pt-4 hover:underline">Já tem uma conta? <span className="font-medium">Clique aqui</span></Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
