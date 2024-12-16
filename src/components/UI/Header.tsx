import { CartBtn } from "../CartStore/CartBtn";
import Navbar from "../Navbar/navbar";

const Header = () => {
  return (
    <header className="flex flex-col items-center p-4 bg-[#FBFAFC]">
      <div>
        <div className="flex justify-center w-full">
        <a href="/" >
          <img src="/assets/logo-header.svg" alt="Cebate Uno Logo" className="w-48 md:w-52"/>
        </a>
          </div>
        <div className="absolute right-4 top-[35px]">
          <CartBtn />
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
