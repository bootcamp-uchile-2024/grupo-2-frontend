import { CervezaType } from "@/types";

export const CervezaDetalle = (cerveza: CervezaType) => {
  const { nombre, marca, precio } = cerveza;
  const id = Math.ceil((Math.random() * 100) / 25);
  return (
    <div className="flex flex-col border-2 space-y-2 max-w-[300px]">
      <img
        src={`/assets/cerveza-${id}.png`}
        alt={`/assets/cerveza-${id}.png`}
      />
      <div className="flex justify-end mr-6 ">
        <img src="/assets/coolicon.svg" alt="corazon" />
      </div>
      <span className="text-purple font-bold font-lato text-custom-l">
        {nombre}
      </span>
      <div>{marca}</div>
      <div>Estrellas</div>
      <div>{precio}</div>
      <div>Agregar carro</div>
    </div>
  );
};
