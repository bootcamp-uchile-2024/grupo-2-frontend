export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-dark py-8">
        <div className="container px-8 py-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex-1 text-white">
            <h1 className="mb-4 font-lato text-3xl font-normal">¿Nos quieres contactar?</h1>
            <p className="mb-2">contacto@cervezarionacional.cl</p>
            <p className="mb-2">+5620303456</p>
            <p className="mb-2">Av. Los Lúpulos 318, Quilpué</p>
            <p className="mb-2">Región de Valparaíso, <br />Chile</p>
            <div className="flex gap-4 mt-4">
              <img src="assets/icon-footer-instagram.png" alt="Icon Instragram" />
              <img src="assets/icon-footer-wasap.png" alt="Icon Whatsapp" />
            </div>
          </div>
          <div className="flex-1 text-white">
            <h1 className="font-normal mb-4 font-lato text-3xl">
              ¿Tienes alguna duda? <br /> ¡Te ayudamos!
            </h1>
            <ul className="space-y-2">
              <li>
                <a className="hover:underline" href="/como-comprar">
                  ¿Cómo comprar?
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/preguntas-frecuentes">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/despacho">
                  Despacho
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/cambios-devoluciones">
                  Cambios y devoluciones
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/politicas-reembolso">
                  Políticas de reembolso
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/rubro">
                  ¿Te dedicas al rubro?
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1 text-white flex justify-center items-center">
            <img src="/assets/logo-footer.svg" alt="Cebate Uno Logo" className="w-48"/>
          </div>
        </div>
      </footer>
    </>
  );
};
