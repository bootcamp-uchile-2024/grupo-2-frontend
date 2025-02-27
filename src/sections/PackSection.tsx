export const PackSection = ({title = "PACKS POR OCASIÓN"}) => {
  return (
    <div className="section">
      <div className="container mx-auto text-center py-10">
        <h1 className="font-title text-6xl pb-16">
          {title}
        </h1>
        <div className="flex flex-wrap justify-center">
          <div className="w-100 md:w-1/4 flex flex-col justify-center items-center">
            <img
              className="w-3/4 rounded-full"
              src="/assets/pack-pasa-una-peli.png"
              alt="Membresía Pa eso trabajo"
            />
            <h1 className="text-2xl pt-4">Pasate una peli</h1>
          </div>
          <div className="w-100 md:w-1/4 flex flex-col justify-center items-center">
            <img
              className="w-3/4 rounded-full"
              src="/assets/pack-el-que-pierde-invita.png"
              alt="Membresía cervezas y otro gustito"
            />
            <h1 className="text-2xl pt-4">El que pierde invita</h1>
          </div>
          <div className="w-100 md:w-1/4 flex flex-col justify-center items-center">
            <img
              className="w-3/4 rounded-full"
              src="/assets/pack-somos-o-no-somos-amigos.png"
              alt="Membresía agarraste papa"
            />
            <h1 className="text-2xl pt-4">Somos o no somos amigos</h1>
          </div>
          <div className="w-100 md:w-1/4 flex flex-col justify-center items-center">
            <img
              className="w-3/4 rounded-full"
              src="/assets/pack-lo-dejaria-todo.png"
              alt="Membresía agarraste papa"
            />
            <h1 className="text-2xl pt-4">Lo dejaría todo</h1>
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <button className="hover:bg-purple hover:text-white flex items-center justify-center min-h-[48px] min-w-[132px] px-5 rounded-[8px] text-gray-dark text-custom-m font-bold border-[2px] border-purple-100">
            <img src="assets/icon-packs.svg" alt="" className="mr-2" /> Me anoto
            con uno!
          </button>
        </div>
      </div>
    </div>
  );
};
