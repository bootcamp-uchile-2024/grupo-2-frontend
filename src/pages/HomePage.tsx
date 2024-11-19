import { MainLayout } from "@/layout/MainLayout"
import { DescubreSection } from "@/sections/DescubreSection"
import { EventosSection } from "@/sections/EventosSection"
import { PackSection } from "@/sections/PackSection"
import { SuscripcionSection } from "@/sections/SuscripcionSection"

export const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <PackSection />
        <SuscripcionSection />
        <DescubreSection />
        <EventosSection />
      </MainLayout>
    </div>
  )
}