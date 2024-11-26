import { MainLayout } from "@/layout/MainLayout"
import { CervezasGrid } from "@/components/Cervezas/CervezasGrid"
import { DescubreSection } from "@/sections/DescubreSection"

export const CervezasPage = () => {
    return (
      <MainLayout>
        <DescubreSection imageUrl="/assets/baner-descubre-top.png" />
        <section className="flex flex-col items-center my-12">
            <h2 className='font-light text-2xl uppercase text-neutral-500'>Todas nuestras cervezas</h2>
            <CervezasGrid />
        </section>
      </MainLayout>
    )
}
