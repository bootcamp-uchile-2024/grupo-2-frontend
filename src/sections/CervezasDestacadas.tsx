import { ButonElegirProductos } from "@/components/ButtonElegirProductos";
import { CervezaCartaDetalle } from "@/components/Cervezas/CervezaCartaDetalle";
import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { useFetch } from "@/hooks/useFetch";
import { CervezaInterface } from "@/types";

export const CervezasDestacadas = ({ title = "DESTACADAS" }) => {
  const url_cervezas = `${CERVEZAS_ENDPOINT}?pagina=${1}&cantproductos=${4}`;

  const {
    data: cervezas,
    loading,
    error,
  } = useFetch<CervezaInterface[]>(url_cervezas);
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las cervezas: {error}</div>;
  <div></div>;
  return (
    <div className="section">
      <div className="container mx-auto text-center mt-24 py-5 pb-10">
        <h1 className="text-riffic-4xl mb-5">{title}</h1>
        <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap">
          {cervezas?.map((cerveza) => (
            <CervezaCartaDetalle {...cerveza} key={cerveza.id} />
          ))}
        </div>
        <div className="flex justify-center items-center p-5 mt-8 ">
          <ButonElegirProductos title={"Quiero ver más"} outlined={true} />
        </div>
      </div>
    </div>
  );
};
