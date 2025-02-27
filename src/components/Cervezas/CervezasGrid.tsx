import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootType } from "@/state/store";
import { useFetch } from "@/hooks/useFetch";
import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { CervezaInterface } from "@/types";
import { Pagination } from "../Pagination";
import { CervezaCartaDetalle } from "./CervezaCartaDetalle";

export const CervezasGrid = () => {
  const [cantproductos, setCantidadProductos] = useState<number>(12);
  const [pagina, setPagina] = useState<number>(1);
  const [cervezaBuscada, setCervezaBuscada] = useState<string>("");
  const [cervezaBuscadaDebounced, setCervezaBuscadaDebounced] =
    useState<string>("");
  const [origen, setOrigen] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [grados, setGrados] = useState<string>("");
  const [categoria, setCategoria] = useState<string[]>([]);
  const [estilo, setEstilos] = useState<string[]>([]);
  const [amargor, setAmargor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { registros } = useSelector((state: RootType) => state.cerveza); //Se obtiene el estado de la cantidad de cervezas para poder paginar bien
  const queryParams = new URLSearchParams({
    pagina: pagina.toString(),
    cantproductos: cantproductos.toString(),
    buscar: cervezaBuscadaDebounced,
    origen: origen.join(","),
    color: color.join(","),
    grados,
    categoria: categoria.join(","),
    estilo: estilo.join(","),
    amargor: amargor.join(","),
  });

  const url_cervezas = `${CERVEZAS_ENDPOINT}?${queryParams.toString()}`;
  useEffect(() => {
    const handler = setTimeout(() => {
      setCervezaBuscadaDebounced(cervezaBuscada);
    }, 500);

    // Limpia el timeout si `cervezaBuscada` cambia antes de que termine el tiempo
    return () => clearTimeout(handler);
  }, [cervezaBuscada]);
  const {
    data: cervezas = [],
    loading,
    error,
  } = useFetch<CervezaInterface[]>(url_cervezas);

  const handleChangeCerveza = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCervezaBuscada(e.target.value);
  };
  const cargando = (
    <div className="flex justify-center p-16 min-w-[960px]">
      <h1 className="text-lato-2xl">Cargando...</h1>
    </div>
  );
  const opcionesFiltros = [
    {
      titulo: "Origen",
      name: "origen",
      value: origen,
      valores: origen,
      opciones: [
        { value: 1, label: "Zona Norte" },
        { value: 2, label: "Zona Centro" },
        { value: 3, label: "Zona Sur" },
      ],
      handleChange: (value: string) => {
        setOrigen(
          (prevValues) =>
            prevValues.includes(value)
              ? prevValues.filter((val) => val !== value) // Eliminar si ya está seleccionado
              : [...prevValues, value] // Agregar si no está seleccionado
        );
      },
    },
    {
      titulo: "Grados de Alcohol",
      value: grados,
      valores: [grados],
      opciones: [
        { value: 1, label: "Bajo (<5% ABV)" },
        { value: 2, label: "Medio (5-7% ABV)" },
        { value: 3, label: "Alto (>7% ABV)" },
      ],
      handleChange: (value: string) => {
        setGrados((prevValue) => (prevValue === value ? "" : value));
      },
    },
    {
      titulo: "Categorías",
      value: categoria,
      valores: categoria,
      opciones: [
        { value: 1, label: "Ales" },
        { value: 2, label: "Lagers" },
        { value: 3, label: "Trigo" },
        { value: 4, label: "Ácidas" },
        { value: 5, label: "Especiales" },
      ],
      handleChange: (value: string) => {
        setCategoria(
          (prevValues) =>
            prevValues.includes(value)
              ? prevValues.filter((val) => val !== value) // Eliminar si ya está seleccionado
              : [...prevValues, value] // Agregar si no está seleccionado
        );
      },
    },
    {
      titulo: "Estilos",
      value: estilo,
      valores: estilo,
      opciones: [
        { value: 1, label: "Amber" },
        { value: 2, label: "Pilsner" },
        { value: 3, label: "Lager Dorado" },
        { value: 4, label: "Pale" },
        { value: 5, label: "Indian Pale Ale (IPA)" },
        { value: 6, label: "Hefeweizen" },
        { value: 7, label: "Witbier" },
        { value: 8, label: "Stout" },
        { value: 9, label: "Porter" },
        { value: 10, label: "Saison" },
        { value: 11, label: "Tripel" },
      ],
      handleChange: (value: string) => {
        setEstilos(
          (prevValues) =>
            prevValues.includes(value)
              ? prevValues.filter((val) => val !== value) // Eliminar si ya está seleccionado
              : [...prevValues, value] // Agregar si no está seleccionado
        );
      },
    },
    {
      titulo: "IBU (amargor)",
      value: amargor,
      valores: amargor,
      opciones: [
        { value: "Bajo_0_20_IBU", label: "Bajo (0-20 IBU)" },
        { value: "Moderado_20_40_IBU", label: "Moderado (20-40 IBU)" },
        { value: "Notable_40_60_IBU", label: "Notable (40-60 IBU)" },
        { value: "Alto_60_IBU", label: "Alto (60+ IBU)" },
      ],
      handleChange: (value: string) => {
        setAmargor(
          (prevValues) =>
            prevValues.includes(value)
              ? prevValues.filter((val) => val !== value) // Eliminar si ya está seleccionado
              : [...prevValues, value] // Agregar si no está seleccionado
        );
      },
    },
    {
      titulo: "SMR (coloración)",
      opciones: [
        { value: 1, label: "Amarillo pálido (2-5)" },
        { value: 2, label: "Ámbar rojizo (6-12)" },
        { value: 3, label: "Cobrizo oscuro (13-25)" },
        { value: 4, label: "Marrón oscuro/negro (26-40+)" },
      ],
      valores: color,
      value: color,
      handleChange: (value: string) => {
        setColor(
          (prevValues) =>
            prevValues.includes(value)
              ? prevValues.filter((val) => val !== value) // Eliminar si ya está seleccionado
              : [...prevValues, value] // Agregar si no está seleccionado
        );
      },
    },
  ];
  const getLabelFromValue = (titulo: string, value: string) => {
    // Busca el filtro que tiene el título correspondiente
    const filtro = opcionesFiltros.find((f) => f.titulo === titulo);

    // Si se encuentra el filtro, busca la opción con el valor correspondiente
    if (filtro) {
      const opcion = filtro.opciones.find(
        (option) => option.value.toString() === value
      );
      if (opcion) {
        return opcion.label;
      }
    }

    return ""; // Si no se encuentra el filtro o la opción, retorna una cadena vacía
  };
  const handleRemoveFilter = (clave: { tipo: string; valor: string }) => {
    switch (clave.tipo) {
      case "estilo":
        setEstilos((prev) => prev.filter((val) => val !== clave.valor));
        break;
      case "origen":
        setOrigen((prev) => prev.filter((val) => val !== clave.valor));
        break;
      case "categoria":
        setCategoria((prev) => prev.filter((val) => val !== clave.valor));
        break;
      case "amargor":
        setAmargor((prev) => prev.filter((val) => val !== clave.valor));
        break;
      case "color":
        setColor((prev) => prev.filter((val) => val !== clave.valor));
        break;
      case "grados":
        setGrados("");
        break;
      default:
        break;
    }
  };

  if (error) return <div>Error al cargar las cervezas: {error}</div>;
  const cervezasSeccion =
    cervezas?.length === 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-w-[1296px] mx-auto mt-8 gap-8 ">
        <div className="flex justify-center col-start-1 md:col-start-1 lg:col-start-2 min-w-[300px] text-center mt-16 px-5">
          <h1>No hay cervezas disponibles</h1>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-w-[1296px] mx-3 mt-8 gap-8 ">
        {cervezas?.map((cerveza) => (
          <CervezaCartaDetalle {...cerveza} key={cerveza.id} />
        ))}
      </div>
    );
  let filtros_aplicados = [
    ...estilo.map((a) => ({
      texto: `Estilo: ${getLabelFromValue("Estilos", a)}`,
      clave: { tipo: "estilo", valor: a },
    })),
    ...origen.map((a) => ({
      texto: `Origen: ${getLabelFromValue("Origen", a)}`,
      clave: { tipo: "origen", valor: a },
    })),
    ...categoria.map((a) => ({
      texto: `Categoria: ${getLabelFromValue("Categorías", a)}`,
      clave: { tipo: "categoria", valor: a },
    })),
    ...amargor.map((a) => ({
      texto: `IBU: ${getLabelFromValue("IBU (amargor)", a)}`,
      clave: { tipo: "amargor", valor: a },
    })),
    ...color.map((a) => ({
      texto: `SMR: ${getLabelFromValue("SMR (coloración)", a)}`,
      clave: { tipo: "color", valor: a },
    })),
  ];

  return (
    <div>
      <div className="flex flex-col align-center justify-end font-lato text-custom-s text-gray-dark ">
        <div className="flex justify-center w-full ">
          <button
            className="lg:hidden btn-secondary w-[280px] flex justify-center items-center gap-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img className="ml-4" src="/assets/icon-cervezas.svg" width={18} />
            {isOpen ? "Cerrar Filtros" : "Abrir Filtros"}
          </button>
        </div>
        <div className="flex md:flex-row flex-col min-h-[80px] ">
          <div className="flex justify-center  md:justify-start md:w-2/3 max-w-[980px] flex-wrap gap-[10px] p-4 ">
            {filtros_aplicados.map((filtro, index) => (
              <button
                key={index}
                onClick={() => handleRemoveFilter(filtro.clave)}
                className="flex items-center bg-purple-100 px-[16px] py-[8px] rounded-[12px] text-lato-s-white "
              >
                {filtro.texto}
                <img className="ml-4" src="/assets/close.svg" width={18} />
              </button>
            ))}
            {grados != "" && (
              <button
                onClick={() => setGrados("")}
                className="flex items-center  bg-purple-100 px-[16px] py-[8px] rounded-[12px] text-lato-s-white "
              >
                Grados: {getLabelFromValue("Grados de Alcohol", grados)}
                <img className="ml-4" src="/assets/close.svg" width={18} />
              </button>
            )}
          </div>
          <div className="flex md:w-1/3 justify-center md:justify-end  items-center my-3 ">
            <span className="mr-2">Mostrar</span>
            {[6, 12, 18, 24].map((cant) => (
              <button
                key={cant}
                onClick={() => setCantidadProductos(cant)}
                className={`h-[35px] w-[38px] text-purple ${
                  cantproductos == cant
                    ? "bg-purple-100 text-white font-bold rounded-md"
                    : ""
                }`}
              >
                {cant}
              </button>
            ))}
            <span className="mx-2">productos</span>
          </div>
        </div>
      </div>

      <div className={`flex flex-col items-center md:flex-row md:items-start`}>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:block flex flex-col mt-8 mr-2 `}
        >
          <input
            className="mt-1 block w-90% border rounded-md shadow-sm focus:border-purple focus:ring focus:ring-purple focus:ring-opacity-50 p-3 mx-3"
            name="cerveza"
            type="text"
            placeholder="Buscar cerveza"
            onChange={handleChangeCerveza}
            value={cervezaBuscada}
          />

          <div className="">
            {opcionesFiltros.map((filtro, index) => {
              const { titulo, opciones, name, handleChange, valores } = filtro;
              return (
                <div className="mx-2 px-2 min-w-[300px]" key={index}>
                  <p className="text-lato-m font-bold my-2">{titulo}</p>
                  {opciones.map((estilo) => (
                    <div key={estilo.value} className="form-check">
                      <input
                        className="checkbox-custom"
                        type="checkbox"
                        style={{ border: "2px solid red" }}
                        name={name}
                        value={estilo.value}
                        checked={valores.includes(estilo.value.toString())}
                        onChange={() => handleChange(estilo.value.toString())}
                      />
                      <label className="form-check-label mx-2 text-menu">
                        {estilo.label}
                      </label>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {loading ? cargando : cervezasSeccion}
          <div className="flex flex-col items-center mt-6">
            <span className="font-lato text-custom-s text-gray-dark">
              Mostrando{" "}
              {cantproductos < (cervezas?.length || 0)
                ? cantproductos
                : cervezas?.length}{" "}
              artículos{" "}
            </span>
            <Pagination
              pagina={pagina}
              setPagina={setPagina}
              registros={registros}
              cantProductos={cantproductos}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
