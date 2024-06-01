import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from "../components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface UserProps {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const { data, isLoading: usersIsLoading } = useQuery<{
    users: UserProps[];
    logged_user: LoggedUserProps;
    number_users: number;
  }>({
    queryKey: ["get-users"],
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

  const { users, logged_user, number_users } = data || { users: [], logged_user: undefined, number_users: 0 };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
      <div className="flex items-center justify-between px-5 bg-black h-16">
        <p className="text-manz-50">Olá <span>{logged_user?.name}</span></p>
        <button className='rounded-md bg-red-600 hover:bg-red-700 text-manz-50 py-2 px-4' onClick={logout}>sair</button>
      </div>
      
      <div className="pt-5">
        <Table>
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
                <TableRow key={user.id}>
                  <TableCell className="text-zinc-300">
                    {user.id}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {format(new Date(user.created_at), 'dd/MM/yyyy HH:mm:ss')}                  
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        
        <div className="flex text-sm items-center justify-between text-zinc-500 my-4 px-4">
          <Button
            onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-zinc-950"
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>          
            </Button>
          <div className="flex items-center">
          <p className="mx-2 text-md text-zinc-300">{`Página ${currentPage} de ${Math.ceil(number_users / itemsPerPage)} páginas - total de ${number_users} usuários`}</p></div>
          <Button
            onClick={() => setCurrentPage(currentPage === Math.ceil(number_users / itemsPerPage) ? currentPage : currentPage + 1)}
            disabled={currentPage === Math.ceil(number_users / itemsPerPage)}
            className="bg-zinc-950"
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>

          </Button>

        </div>
      </div>
    </>
  );
}
