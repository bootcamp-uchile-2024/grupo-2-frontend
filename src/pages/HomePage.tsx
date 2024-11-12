import { useEffect } from "react";
import { MainLayout } from "../layout/MainLayout";

export const HomePage = () => {
  const credenciales = localStorage.getItem("user");
  useEffect(() => {
    fetch("http://localhost:4500/").then((res) => console.log(res));
  }, []);

  const user = credenciales ? JSON.parse(credenciales).user : null;
  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="wrapper">
              <h1>Cervezario Nacional</h1>
              {user ? (
                <p>Bienvenido {user}</p>
              ) : (
                <>
                  <p>Hola Visitanteaaaaaaaaaaaaaaaaaaaaa!</p>
                  <p>que quiereeees</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
