import cartMenuStore from "@/store/cartMenuStore";
import { useNavigate } from "react-router-dom";

export const ButonElegirProductos = ({
  title = "Elegir más productos",
  outlined = false,
}) => {
  console.log(outlined);

  const navigate = useNavigate();
  const closeCartMenuStore = cartMenuStore((state) => state.closeCartMenuStore);
  return (
    <button
      className={`hover:bg-purple hover:text-white flex items-center justify-center min-h-[48px] min-w-[132px] px-5 rounded-[8px] text-gray-dark text-custom-m font-bold border-[2px] border-purple-100 ${
        outlined ? null : "bg-purple text-white"
      }`}
      type="button"
      onClick={() => {
        closeCartMenuStore();
        navigate("/cervezas");
      }}
    >
      <img src="/assets/icon-home.svg" alt="" className="mx-2" />
      {title}
    </button>
  );
};
