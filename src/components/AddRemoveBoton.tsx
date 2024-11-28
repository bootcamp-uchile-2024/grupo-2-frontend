import {
  addCerveza,
  discountCerveza,
  removeCerveza,
} from "@/state/slices/carritoSlice";
import { CervezaInterface } from "@/types";
import { useDispatch } from "react-redux";

export interface AddRemoveCervezaProps {
  cerveza: CervezaInterface;
  cantidad: number;
}
export const AddRemoveCerveza: React.FC<AddRemoveCervezaProps> = ({
  cerveza,
  cantidad,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex">
      <button
        disabled={cantidad === 1}
        className="btn-detalle-carrito"
        onClick={() => dispatch(discountCerveza(cerveza))}
      >
        -
      </button>
      <div className="flex justify-center w-[30px] font-lato text-dark-gray text-custom-s">
        {cantidad}
      </div>
      <button
        className="btn-detalle-carrito"
        onClick={() => dispatch(addCerveza({ cerveza, cantidad: 1 }))}
      >
        +
      </button>
      <button
        className="flex justify-center items-center h-[24px] ml-3 hover:bg-red-300 rounded-[6px] "
        onClick={() => dispatch(removeCerveza(cerveza))}
      >
        <img
          src={"/assets/Trash_full.svg"}
          alt={"trash"}
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};
