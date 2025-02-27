import { MainLayout } from "@/layout/MainLayout"

export const PageNoFound = () => {
  return (
    <MainLayout>
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center justify-center p-12">
          <h1 className="text-5xl">404</h1>
          <p className="mb-8">Pagina no encontrada.</p>
          <img src="assets/img-pagina-no-encontrada.png" alt="404" /> 
        </div>
      </div>
    </MainLayout>
  )
}