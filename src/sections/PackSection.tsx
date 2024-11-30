export const PackSection = () => {
  return (
    <div className="section">
      <div className="container mx-auto text-center py-10">
        <h1 className="font-title text-riffic-4xl text-6xl pb-8">
          PACKS POR OCASIÓN
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
        <div className="pt-8">
          <button className="btn">Me anoto con uno!</button>
        </div>
      </div>
    </div>
  );
};
