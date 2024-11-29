import { MainLayout } from "@/layout/MainLayout"

export const PageNoFound = () => {
  return (
    <MainLayout>
      <div className="content text-center">
        <h1 className="text-4xl">404</h1>
        <p>Pagina no encontrada.</p>
      </div>
    </MainLayout>
  )
}