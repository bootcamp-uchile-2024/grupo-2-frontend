import { MainLayout } from "@/layout/MainLayout";
import { DescubreSection } from "@/sections/DescubreSection";
import { EventosSection } from "@/sections/EventosSection";
import { PackSection } from "@/sections/PackSection";
import { SuscripcionSection } from "@/sections/SuscripcionSection";
import { CheckAge } from "@/components/CheckAge/CheckAge";
import { CervezasDestacadas } from "@/sections/CervezasDestacadas";
import { CarouselSection } from "@/sections/Carousel";

export const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <CheckAge />
        <CarouselSection />
        <CervezasDestacadas />
        <PackSection />
        <SuscripcionSection />
        <DescubreSection imageUrl="/assets/baner-descubre.png" />
        <EventosSection />
      </MainLayout>
    </div>
  );
};
