const MAX_PAGE_FOR_VIEW = 7;

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    // si total páginas es menor o igual al MAX_PAGE_FOR_VIEW:
    // mostrar todas la páginas sin puntos suspensivos
    if (totalPages <= MAX_PAGE_FOR_VIEW)
        return Array.from({ length: totalPages }, (_, i) => i + 1);

    // si página actual está entre las primeras 3 páginas:
    // mostrar las 3 primeras páginas, puntos suspensivos y las 2 últimas páginas
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages];

    // si página actual está entre las últimas 3 páginas:
    // mostrar las 2 primeras páginas, puntos suspensivos y las 3 últimas páginas
    if (currentPage >= totalPages - 2)
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];

    return [1, '...', currentPage-1, currentPage, currentPage+1, '...', totalPages]
};
