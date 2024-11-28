import { getCervezas } from "@/services/getCervezas";
import { CervezaInterface } from "@/types";
import { createContext, useEffect, useState } from "react";

interface CervezasContextType {
  cervezas: CervezaInterface[];
}

export const CervezasContext = createContext<CervezasContextType | undefined>(
  undefined
);

export default function CervezasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cervezas, setCervezas] = useState<CervezaInterface[]>([]);

  useEffect(() => {
    async function getInitialCervezas() {
      const cervezasData = await getCervezas();
      const mappedCervezas = cervezasData.map((cervezas: CervezaInterface) => {
        return {
          id: cervezas.id,
          nombre: cervezas.nombre,
          marca: cervezas.marca,
          tipo_cerveza: cervezas.tipo_cerveza,
          stock: cervezas.stock,
          descripcion: cervezas.descripcion,
          precio: cervezas.precio,
          /* proveedor: {
            nombre: cervezas.proveedor.nombre,
            id_comuna: cervezas.proveedor.id_comuna,
            contacto: cervezas.proveedor.contacto,
            telefono: cervezas.proveedor.telefono,
            correo_electronico: cervezas.proveedor.correo_electronico,
          }, */
          amargor: cervezas.amargor,
          graduacion: cervezas.graduacion,
          formato: cervezas.formato,
          imagen: cervezas.imagen,
        };
      });

      setCervezas(mappedCervezas);
    }

    getInitialCervezas();
  }, []);

  return (
    <CervezasContext.Provider value={{ cervezas }}>
      {children}
    </CervezasContext.Provider>
  );
}
