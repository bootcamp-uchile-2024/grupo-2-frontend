export const CervezasDestacadas = ({ title = "Destacadas" }) => {
  return (
    <div className="section">
      <div className="container mx-auto text-center py-10">
        <h1 className="text-riffic-4xl my-5">{title}</h1>
        <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap">
          <div className="w-100 md:w-1/3 flex flex-col shadow-lg">
            <img
              className="w-100"
              src="/assets/cerveza-1.png"
              alt="Nombre de la cerveza"
            />
            <div className="p-4 flex flex-col items-start">
              <p className="text-purple text-xl">Línea 1 | Amber Ale</p>
              <p>Alameda Beer Co - Santiago</p>
              <div>Estrellas</div>
              <p className="font-semibold text-2xl mb-4">$4.500</p>
              <button className="btn-carro">
                <i className="fas fa-cart-plus"></i> Agregar al carrito
              </button>
            </div>
          </div>
          <div className="w-100 md:w-1/3 flex flex-col shadow-lg">
            <img
              className="w-100"
              src="/assets/cerveza-2.png"
              alt="Nombre de la cerveza"
            />
            <div className="p-4 flex flex-col items-start">
              <p className="text-purple text-xl">Línea 1 | Amber Ale</p>
              <p>Alameda Beer Co - Santiago</p>
              <div>Estrellas</div>
              <p className="font-semibold text-2xl mb-4">$4.500</p>
              <button className="btn-carro">
                <i className="fas fa-cart-plus"></i> Agregar al carrito
              </button>
            </div>
          </div>
          <div className="w-100 md:w-1/3 flex flex-col shadow-lg">
            <img
              className="w-100"
              src="/assets/cerveza-3.png"
              alt="Nombre de la cerveza"
            />
            <div className="p-4 flex flex-col items-start">
              <p className="text-purple text-xl">Línea 1 | Amber Ale</p>
              <p>Alameda Beer Co - Santiago</p>
              <div>Estrellas</div>
              <p className="font-semibold text-2xl mb-4">$4.500</p>
              <button className="btn-carro">
                <i className="fas fa-cart-plus"></i> Agregar al carrito
              </button>
            </div>
          </div>
          <div className="w-100 md:w-1/3 flex flex-col shadow-lg">
            <img
              className="w-100"
              src="/assets/cerveza-4.png"
              alt="Nombre de la cerveza"
            />
            <div className="p-4 flex flex-col items-start">
              <p className="text-purple text-xl">Línea 1 | Amber Ale</p>
              <p>Alameda Beer Co - Santiago</p>
              <div>Estrellas</div>
              <p className="font-semibold text-2xl mb-4">$4.500</p>
              <button className="btn-carro">
                <i className="fas fa-cart-plus"></i> Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        {/* <div className="pt-8">
          <button className="">Quiero ver más!</button>
        </div> */}
      </div>
    </div>
  );
};
