import { CartBtn } from "../CartStore/CartBtn";
import Navbar from "../Navbar/navbar";

const Header = () => {
  return (
    <header className="flex flex-col items-center m-4 md:m-8 md:mb-4">
      <div className="flex w-full justify-center">
        <a href="/" className="flex-1 flex gap-x-4 justify-center w-full">
          <div>
            <img
              src="/assets/logo-header.svg"
              alt="Cebate Uno Logo"
              className="w-48 md:w-52"
            />
          </div>
        </a>
        <CartBtn />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
