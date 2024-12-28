export const EventosSection = ({title = "EVENTOS"}) => {
  return (
    <section>
      <div className="container mx-auto text-center py-10">
        <h1 className="font-title text-6xl pb-8">{title}</h1>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 px-2 flex flex-col items-center justify-center">
            <figure className="w-52 h-52 bg-cover rounded-full" style={{ backgroundImage: 'url(/assets/evento-1.png)' }}></figure>
            <h2 className="pt-4 text-xl">Evento 1</h2>
            <p>Descripción del evento 1</p>
          </div>
          <div className="w-full sm:w-1/3 px-2 flex flex-col items-center justify-center">
            <figure className="w-52 h-52 bg-cover rounded-full" style={{ backgroundImage: 'url(/assets/evento-2.png)' }}></figure>
            <h2 className="pt-4 text-xl">Evento 2</h2>
            <p>Descripción del evento 2</p>
          </div>
          <div className="w-full sm:w-1/3 px-2 flex flex-col items-center justify-center">
            <figure className="w-52 h-52 bg-cover rounded-full" style={{ backgroundImage: 'url(/assets/evento-3.png)' }}></figure>
            <h2 className="pt-4 text-xl">Evento 3</h2>
            <p>Descripción del evento 3</p>
          </div>
        </div>
      </div>
    </section>
  );
}