import { MainLayout } from "@/layout/MainLayout";
import { useLocation } from "react-router-dom";

export const ConfirmarmacionCorreoPage = () => {
  const location = useLocation();
  const { email } = location.state || "";
  return (
    <MainLayout>
      <div className="flex  justify-center max-w-[840px] m-auto min-h-[188px]">
        <div className="">
          <img
            src={"assets/logo-footer.svg"}
            alt={"imagen-footer"}
            width={192}
            height={192}
          />
        </div>
        <div className="flex flex-col space-y-6 ml-5">
          <div className="flex items-center justify-center ">
            <h1 className="text-gray-dark font-riffic text-custom-lg font-normal">
              ¡Ya casi está!
            </h1>
          </div>
          <div className="">
            <p>
              Hemos enviado un correo electrónico a {email} por favor haz click
              en el enlace incluido para verificar tu dirección de correo
              electrónico.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
