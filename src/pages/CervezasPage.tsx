import { MainLayout } from "@/layout/MainLayout"
import { CervezasGrid } from "@/components/Cervezas/CervezasGrid"

export const CervezasPage = () => {
    return (
      <MainLayout>
        <section className="flex flex-col items-center my-12">
            <h2 className='font-light text-2xl uppercase text-neutral-500'>Todas nuestras cervezas</h2>
            {/* <BombillasFilter /> */}
            <CervezasGrid />
        </section>
      </MainLayout>
    )
}
