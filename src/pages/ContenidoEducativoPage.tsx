import { MainLayout } from "@/layout/MainLayout"

export const ContenidoEducativoPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center justify-center p-12">
          <h1 className="text-5xl">En construcción</h1>
          <p className="mb-8">Pronto nuevos contenidos.</p>
          <img src="assets/img-sitio-en-construccion.png" alt="Sitio en Construcción"/> 
        </div>
      </div>
    </MainLayout>
  )
}