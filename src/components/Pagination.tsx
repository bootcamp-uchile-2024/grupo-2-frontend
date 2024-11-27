interface PaginationProps {
  pagina: number; // La página actual
  setPagina: (pagina: number) => void; // Función para cambiar la página
  registros: number; // Total de registros
  cantProductos: number; // Productos por página
}
export const Pagination: React.FC<PaginationProps> = ({
  pagina,
  setPagina,
  registros,
  cantProductos,
}) => {
  const totalPaginas = Math.ceil(registros / cantProductos);
  const maxButtons = 5;

  const renderPageButtons = () => {
    const botones = [];

    const start = Math.max(1, pagina - Math.floor(maxButtons / 2));
    const end = Math.min(totalPaginas, start + maxButtons - 1);

    for (let i = start; i <= end; i++) {
      botones.push(
        <button
          key={i}
          className={`mr-2 h-[38px] w-[35px] text-purple ${
            i === pagina ? "font-bold text-purple" : ""
          }`}
          onClick={() => setPagina(i)}
        >
          {i}
        </button>
      );
    }

    return botones;
  };

  return (
    <div className="pagination flex items-center">
      {/* Botón "Previous" */}
      <button
        className="flex align-self-center border-2 p-2  disabled:opacity-50 h-[38px] w-[35px] rounded-l-[4px] mr-2"
        onClick={() => setPagina(Math.max(pagina - 1, 1))}
        disabled={pagina === 1}
      >
        <img src="assets/Chevron_big_left.svg" alt="Chevron_big_left" />
      </button>

      {/* Primera página */}
      {pagina > Math.floor(maxButtons / 2) + 1 && (
        <>
          <button
            className="mr-2 h-[38px] w-[35px] text-purple"
            onClick={() => setPagina(1)}
          >
            1
          </button>
          {pagina > maxButtons ? (
            <span className="mr-2 text-purple">...</span>
          ) : null}
        </>
      )}

      {/* Botones intermedios */}
      {renderPageButtons()}

      {/* Última página */}
      {pagina < totalPaginas - Math.floor(maxButtons / 2) &&
        pagina >= 1 &&
        totalPaginas > maxButtons && (
          <>
            <span className="h-[38px] w-[35px] text-purple">...</span>
            <button
              className="mr-2 h-[38px] w-[35px] text-purple"
              onClick={() => setPagina(totalPaginas)}
            >
              {totalPaginas}
            </button>
          </>
        )}

      {/* Botón "Next" */}
      <button
        className="flex align-self-center border-2 p-2 disabled:opacity-50 h-[38px] w-[35px] rounded-r-[4px]"
        onClick={() => setPagina(Math.min(pagina + 1, totalPaginas))}
        disabled={pagina === totalPaginas}
      >
        <img src="assets/Chevron_big_right.svg" alt="Chevron_big_left" />
      </button>
    </div>
  );
};
