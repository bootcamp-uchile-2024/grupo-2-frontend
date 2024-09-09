import { useEffect, useState } from "react";
import Listado from "../../components/Listado";
import Sidebar from "../../components/Sidebar";
import Cerveza from "../../interfaces/Cerveza";

export default function CatalogoPage() {
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  useEffect(() => {
    fetch("http://localhost:5173/cervezas/")
      .then((result) => result.json())
      .then((data) => setCervezas(data));
  }, []);
  return (
    <div className="wrapper">
      <div className="left-column">
        <Sidebar />
      </div>
      <div className="right-column">
        <Listado cervezas={cervezas} />
      </div>
    </div>
  );
}
