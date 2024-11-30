import { MainLayout } from "@/layout/MainLayout";
import { DescubreSection } from "@/sections/DescubreSection";
import { EventosSection } from "@/sections/EventosSection";
import { PackSection } from "@/sections/PackSection";
import { SuscripcionSection } from "@/sections/SuscripcionSection";
import { CheckAge } from "@/components/CheckAge/CheckAge";
import { CervezasDestacadas } from "@/sections/CervezasDestacadas";

export const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <CheckAge />
        <DescubreSection imageUrl="/assets/baner-atrevete.png" />
        <div className="flex w-full justify-center items-center min-h-[180px]">
          <img src="/assets/puntitos-slider.svg" alt="puntitos-sliders" />
        </div>
        <CervezasDestacadas />
        <PackSection />
        <SuscripcionSection />
        <DescubreSection imageUrl="/assets/baner-descubre.png" />
        <EventosSection />
      </MainLayout>
    </div>
  );
};
