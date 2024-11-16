export const EventosSection = () => {
  return (
    <section className="container mx-auto flex flex-col items-center py-12">
      <h1 className="h1-font text-6xl	pb-6">Eventos</h1>
      <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center">
            <figure className="w-40 h-40 bg-cover rounded-full" style={{ backgroundImage: 'url(/assets/evento-1.png)' }}></figure>
            <h2>Evento 1</h2>
            <p>Descripción del evento 1</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <figure className="w-40 h-40 bg-cover rounded-full" style={{ backgroundImage: 'url(/assets/evento-2.png)' }}></figure>
            <h2>Evento 2</h2>
            <p>Descripción del evento 2</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <figure className="w-40 h-40 bg-cover rounded-full" style={{ backgroundImage: 'url(/assets/evento-3.png)' }}></figure>
            <h2>Evento 3</h2>
            <p>Descripción del evento 3</p>
          </div>
        </div>
    </section>
  );
}