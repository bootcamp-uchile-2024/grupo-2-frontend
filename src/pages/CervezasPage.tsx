import { MainLayout } from "@/layout/MainLayout";
import { CervezasGrid } from "@/components/Cervezas/CervezasGrid";
import { DescubreSection } from "@/sections/DescubreSection";
import { useEffect } from "react";
import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { useDispatch } from "react-redux";
import { getCervezas } from "@/state/slices/cervezaSlice";

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
      <section className="flex flex-col items-center my-12">
        <h2 className="font-light text-2xl uppercase text-neutral-500">
          Todas nuestras cervezas
        </h2>
        <CervezasGrid />
      </section>
    </MainLayout>
  );
};
