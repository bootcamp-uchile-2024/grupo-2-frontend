import { MainLayout } from "../layout/MainLayout";

export const HomePage = () => {
  const credenciales = localStorage.getItem("user");

  const user = credenciales ? JSON.parse(credenciales).user : null;
  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="wrapper">
              <h1>Cervezario Nacional</h1>
              {user ? <p>Bienvenido {user}</p> : <p>Hola Visitante!</p>}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
