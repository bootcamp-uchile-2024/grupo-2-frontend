import useCartContext from "@/hooks/useCartContext";
import { CervezaType } from "@/types";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import InfoMessage from "../Message/InfoMessage";
import { useCervezas } from "@/hooks/useCervezas";

export const CervezasGrid = () => {
  const { cervezas } = useCervezas();
  console.log(cervezas);

  const { addItemToCart } = useCartContext();

  function addItem(item: CervezaType) {
    addItemToCart(item);
    toast.success(`${item.nombre} ha sido agregado!`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1296px] mx-auto mt-8 gap-8">
      {cervezas.length === 0 ? (
        <InfoMessage />
      ) : (
        cervezas.map((cerveza) => (
          <div
            onClick={() => addItem(cerveza)}
            key={cerveza.id}
            className="flex flex-col mt-2 justify-center items-center my-2 border-2 "
          >
            <figure>
              <img
                src={cerveza.imagen}
                alt={cerveza.nombre}
                className="xl:w-[330px] xl:h-[300px] size-64"
              />
            </figure>
            <h3 className="font-light text-center uppercase text-lg max-w-[280px] mt-4">
              {cerveza.nombre}
            </h3>
            <aside className="flex gap-x-4 items-center justify-center mt-2">
              <span className="font-regular text-center uppercase text-lg">
                ${Number(cerveza.precio).toLocaleString()}
              </span>
              <button>
                <MdAddShoppingCart className="size-4" />
              </button>
            </aside>
          </div>
        ))
      )}
    </div>
  );
};
