import { MainLayout } from "@/layout/MainLayout";
import { CervezasGrid } from "@/components/Cervezas/CervezasGrid";
import { DescubreSection } from "@/sections/DescubreSection";
import { useEffect } from "react";
import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { useDispatch } from "react-redux";
import { getCervezas } from "@/state/slices/cervezaSlice";
import { FiltrosCervezas } from "@/components/FiltrosCervezas";

export const CervezasPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCervezas = async () => {
      try {
        const response = await fetch(
          `${CERVEZAS_ENDPOINT}?pagina=&cantproductos=`
        );
        if (!response.ok)
          throw new Error(`Error at fetching ${CERVEZAS_ENDPOINT}`);
        const data = await response.json();
        dispatch(getCervezas(data));
      } catch (error) {
        console.error(`Error at fetching ${CERVEZAS_ENDPOINT}`);
      }
    };
    fetchCervezas();
  }, []);
  return (
    <MainLayout>
      <DescubreSection imageUrl="/assets/baner-descubre-top.png" />
      <section className="flex flex-col items-center my-12 ">
        <div className="flex w-full xl:flex-row sm:flex-col sm:items-center justify-center flex-wrap space-x-2">
          <div className="flex ">
            <img src="/assets/copas-1.svg" alt="" width={210} />
            <img src="/assets/copas-4.svg" alt="" width={210} />
          </div>
          <div className="flex items-center">
            <img src="/assets/rectangle-4067.svg" alt="" width={84} />
            <h2 className="text-gray-dark text-custom-r-6xl font-riffic font-normal  mx-6">
              CERVEZAS
            </h2>
            <img src="/assets/rectangle-4067.svg" alt="" width={84} />
          </div>
          <div className="flex flex-g">
            <img src="/assets/copas-2.svg" alt="" width={210} />
            <img src="/assets/copas-3.svg" alt="" width={210} />
          </div>
        </div>
        <div className="flex ">
          <FiltrosCervezas />
          <CervezasGrid />
        </div>
      </section>
      <DescubreSection imageUrl="/assets/48ae585a9e6a88eb0f00b865f7cb480f.png" />
    </MainLayout>
  );
};
