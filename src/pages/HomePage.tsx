import { MainLayout } from "@/layout/MainLayout"
import { DescubreSection } from "@/sections/DescubreSection"
import { EventosSection } from "@/sections/EventosSection"
import { PackSection } from "@/sections/PackSection"
import { SuscripcionSection } from "@/sections/SuscripcionSection"
import { CheckAge }   from "@/components/CheckAge/CheckAge"

export const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <CheckAge />
        <DescubreSection imageUrl="/assets/baner-atrevete.png" />
        <PackSection />
        <SuscripcionSection />
        <DescubreSection imageUrl="/assets/baner-descubre.png" />
        <EventosSection />
      </MainLayout>
    </div>
  )
}