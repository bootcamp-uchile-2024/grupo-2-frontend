export const SuscripcionSection = () => {
  return (
    <section>
      <div className="container mx-auto text-center py-10">
        <h1 className="font-title text-6xl pb-8">Packs</h1>
        <div className="flex flex-wrap justify-center">
          <div className="w-100 md:w-1/3 flex justify-center items-center">
            <img
              className="w-3/4"
              src="/assets/membresias-pa-eso-trabajo.png"
              alt="Membresía Pa eso trabajo"
            />
          </div>
          <div className="w-100 md:w-1/3 flex justify-center items-center">
            <img
              className="w-3/4"
              src="/assets/membresias-cervezas-y-otro-gustito.png"
              alt="Membresía cervezas y otro gustito"
            />
          </div>
          <div className="w-100 md:w-1/3 flex justify-center items-center">
            <img
              className="w-3/4"
              src="/assets/membresias-agarraste-papa.png"
              alt="Membresía agarraste papa"
            />
          </div>
        </div>
        <div className="pt-8">
          <button className="border-2 border-gray-500 text-gray-500 px-4 py-2 rounded hover:bg-yellow transition duration-300">
            Me anoto en el CLUB!
          </button>
        </div>
      </div>
    </section>
  );
};
