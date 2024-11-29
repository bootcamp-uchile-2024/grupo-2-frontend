import { addCerveza } from "@/state/slices/carritoSlice";
import { CervezaInterface } from "@/types";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export interface AgregarCarritoBotonProps {
  cerveza: CervezaInterface;
  stock: number;
  cantidad: number;
}
export const AgregarCarritoBoton: React.FC<AgregarCarritoBotonProps> = ({
  cerveza,
  stock,
  cantidad,
}) => {
  const dispatch = useDispatch();
  return (
    <button
      disabled={stock === 0 || stock < cantidad}
      onClick={() => {
        dispatch(addCerveza({ cerveza, cantidad }));
        toast.success("Cerveza agregada al carrito");
      }}
      className="flex justify-center align-center bg-yellow h-[48px] w-full max-w-[280px] mt-2 rounded-[8px] hover:bg-yellow-900 hover:text-gray-dark disabled:opacity-25 disabled:hover:bg-yellow disabled:cursor-not-allowed"
    >
      <MdAddShoppingCart className="size-4  h-full w-[20px]" />
      <span className="flex items-center justify-center px-2">
        Agregar al carrito
      </span>
    </button>
  );
};
