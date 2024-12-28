export const SuscripcionSection = ({ title = "SUSCRIPCIÓN CLUB"}) => {
  return (
    <section>
      <div className="container mx-auto text-center py-10">
        <h1 className="font-title text-6xl pb-16">{title}</h1>
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
        <div className="flex justify-center pt-8">
          <button className="hover:bg-purple hover:text-white flex items-center justify-center min-h-[48px] min-w-[132px] px-5 rounded-[8px] text-gray-dark text-custom-m font-bold border-[2px] border-purple-100">
            <img src="assets/icon-club.svg" alt="" className="mr-2"/>Me anoto en el CLUB!
          </button>
        </div>
      </div>
    </section>
  );
};
