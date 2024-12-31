import { MainLayout } from "@/layout/MainLayout";

export const ClubPage = () => {

  return (
    <MainLayout>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-[450px]">
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url('assets/club-fondo-lo-dejaria-todo.png')" }}>
        <div className="flex justify-center items-center h-full">
          <div className="p-8 bg-yellow w-4/5 shadow-lg">
            <h2 className="text-custom-lg mb-4">¡Sé parte de nuestro Club!</h2>
            <p>¿Te gustaría recibir de manera mensual una selección variada de las más ricas cervezas artesanales chilenas?
              Únete a nuestro club y recibe en tu puerta una selección exclusiva de cervezas locales. Déjate sorprender con nuevas variedades, sabores únicos y la calidad de los mejores maestros cerveceros del país.  También tenemos para ti descuentos especiales en merchandising y eventos cerveceros únicos.</p>
            <h3 className="text-2xl mt-10 float-end">Tu experiencia cervecera empieza aquí...</h3>
          </div>
        </div>
        </div>
        <div className="bg-cover bg-center h-full min-h-96" style={{ backgroundImage: "url('assets/club-mercha.png')" }}></div>
      </div>
      <div className="container mx-auto my-8 w-3/5 md:w-3/5">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <img src="assets/club-trankilein.png" alt="" className="rounded-3xl relative top-20 w-3/4"/>
            <div className="px-12 pb-8 rounded-3xl pt-36 bg-[#FBFAFC] shadow-md h-full">
              <p className="mb-4">¿Te gusta tomar algo tranki de vez en cuando y descubrir nuevos sabores de cervezas? Disfruta de esta selección que tenemos para ti:</p>
              <ul className="mb-4">
                <li>6 Cervezas de estilos diferentes</li>
                <li>5% de descuento en compras de merchandising</li>
              </ul>
              <p className="text-2xl text-center">$18.590</p>
              <button className="btn-carro mt-4">Suscribirme</button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img src="assets/club-pa-eso-trabajo.png" alt="" className="rounded-3xl relative top-20 w-3/4" />
            <div className="px-12 pb-8 rounded-3xl pt-36 bg-[#FBFAFC] shadow-md h-full">
              <p className="mb-4">Si eres de los que llegan del trabajo directo a sacar una cerveza del refri para relajarse después de una larga jornada, esta suscripción es para ti:</p>
              <ul className="mb-4">
                <li>12 Cervezas de estilos diferentes</li>
                <li>10% de descuento en compras de merchandising</li>
              </ul>
              <p className="text-2xl text-center">$32.650</p>
              <button className="btn-carro mt-4">Suscribirme</button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img src="assets/club-agarraste-papa.png" alt="" className="rounded-3xl relative top-20 w-3/4" />
            <div className="px-12 pb-8 rounded-3xl pt-36 bg-[#FBFAFC] shadow-md h-full">
              <p className="mb-4">Si llegaste hasta acá, es porque agarraste papa. Más que nadie sabes que no hay como beber una rica cerveza artesanal. Esta suscripción es tuya:</p>
              <ul className="mb-4">
                <li>18 Cervezas de estilos diferentes</li>
                <li>15% de descuento en compras de merchandising</li>
                <li>10% de descuento en eventos</li>
              </ul>
              <p className="text-2xl text-center">$45.930</p>
              <button className="btn-carro mt-4">Suscribirme</button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img src="assets/club-cervezas-y-otro-gustito.png" alt="" className="rounded-3xl relative top-20 w-3/4" />
            <div className="px-12 pb-8 rounded-3xl pt-36 bg-[#FBFAFC] shadow-md h-full">
              <p className="mb-4">¿Tu pasión por la cerveza va más allá que solo beberla? Date un gustito y disfruta de nuestro fabuloso merchandising sorpresa que tenemos para ti!</p>
              <ul className="mb-4">
                <li>12 Cervezas de estilos diferentes</li>
                <li>15% de descuento en eventos</li>
              </ul>
              <p className="text-2xl text-center">$42.350</p>
              <button className="btn-carro mt-4">Suscribirme</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}