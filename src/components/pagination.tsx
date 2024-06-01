import React from "react";
import { Button } from "../components/ui/button";
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { UserProps } from "./dashboard";

interface PaginationProps {
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    itemsPerPage: number
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>
    totalPages: number
    number_users: number
    currentItems: UserProps[]
}

export function Pagination({currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, totalPages, number_users, currentItems}: PaginationProps) {
    return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[90%] max-w-full text-zinc-300 text-sm my-4">
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <p className="mx-2 text-md">{`Mostrando ${itemsPerPage} de ${number_users} usuários`}</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          {currentItems.length > 4 && (
            <div className="flex items-center mb-4 lg:mb-0">
              <p className="mr-2">Linhas por página</p>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-[#212121] border border-[#4E4D4D] rounded-md py-1 px-2"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          )}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <p className="text-center lg:text-left">Página {currentPage} de {totalPages} páginas</p>
            <div className="flex gap-2 lg:gap-[6px]">
              <Button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                size="icon"
              >
                <ChevronsLeft className="size-4" />
                <span className="sr-only">Primeira página</span>          
              </Button>
              <Button
                onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
                disabled={currentPage === 1}
                size="icon"
              >
                <ChevronLeft className="size-4" />
                <span className="sr-only">Página anterior</span>          
              </Button>
              <Button
                onClick={() => setCurrentPage(currentPage === Math.ceil(number_users / itemsPerPage) ? currentPage : currentPage + 1)}
                disabled={currentPage === Math.ceil(number_users / itemsPerPage)}
                size="icon"
              >
                <ChevronRight className="size-4" />
                <span className="sr-only">Próxima página</span>
              </Button>
              <Button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                size="icon"
              >
                <ChevronsRight className="size-4" />
                <span className="sr-only">Última página</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}