import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Pagination } from './pagination';
import { Link } from 'react-router-dom';
import error from "../assets/error.svg";

export interface UserProps {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface LoggedUserProps {
  id: number;
  name: string;
  email: string;
}

export function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const { data, isLoading: usersIsLoading } = useQuery<{
    users: UserProps[];
    logged_user: LoggedUserProps;
    number_users: number;
  }>({
    queryKey: ["get-users", currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await fetch(`https://teste.reobote.tec.br/api/dashboard?page=${currentPage}&perPage=${itemsPerPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      console.log(data);
      return data;
    },
    enabled: !!token,
  });

  if (usersIsLoading) {
    return null;
  }

  if(!token) {
    return <>
    <div className="h-screen flex flex-col items-center justify-center">
    <img className="w-[500px] h-[400px]" src={error} alt="imagem de erro" />
    <p className="text-manz-50">Usuário não autenticado</p>
    <Link className="text-manz-500 hover:underline hover:text-manz-600" to="/">Faça o login</Link>
    </div>
    </>
  }

  const { users, logged_user, number_users } = data || { users: [], logged_user: undefined, number_users: 0 };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(number_users / itemsPerPage);

  return (
    <>
      <div className="flex items-center justify-between px-5 bg-[#212121] h-16">
        <p className="text-manz-50">Olá <span>{logged_user?.name}</span></p>
        <button className='rounded-[4px] text-white bg-gradient-to-l from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-1 px-5' onClick={logout}>sair</button>
      </div>
      
      <div className="pt-5 w-full flex flex-col justify-center items-center">
        <Table className="w-full lg:w-[90%] max-w-full overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((user) => {
              return (
                <TableRow className="text-zinc-300 hover:text-manz-50" key={user.id}>
                  <TableCell>
                    {user.id}
                  </TableCell>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.created_at), 'dd/MM/yyyy HH:mm:ss')}                  
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} totalPages={totalPages} number_users={number_users} currentItems={currentItems} />

      </div>
    </>
  );
}
