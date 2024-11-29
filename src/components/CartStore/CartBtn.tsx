import cartMenuStore from "@/store/cartMenuStore";
import { FaCartShopping } from "react-icons/fa6";
import { TopNav } from "../UI/TopNav";
import { useSelector } from "react-redux";
import { RootType } from "@/state/store";

export const CartBtn = () => {
  const { openCartMenuStore } = cartMenuStore();
  const { cervezas } = useSelector((state: RootType) => state.carrito);
  const articulosTotales = cervezas.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );
  return (
    <div className="flex">
      <TopNav />
      <div className="relative ms-4">
        <button onClick={openCartMenuStore}>
          <FaCartShopping className="size-5 mr-2" />
          {articulosTotales > 0 ? (
            <span className="absolute bottom-16 -right-2 bg-yellow rounded-full text-black w-5 h-5 flex items-center justify-center text-xs">
              {articulosTotales}
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
};
