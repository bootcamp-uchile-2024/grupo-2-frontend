import { CartBtn } from "../CartStore/CartBtn";
import Navbar from "../Navbar/navbar";

const Header = () => {
  return (
    <header className="flex flex-col items-center m-4 md:m-8">
      <div className="flex w-full justify-center">
        <a href="/" className="flex-1 flex gap-x-4 justify-center w-full">
          <div>
            <img src="/imgs/isotipo.svg" alt="Cebate Uno Logo" className="w-8 md:w-32" />
          </div>
          <div>
            <h1 className='text-2xl md:text-4xl font-regular max-w-[204px] w-full'>Cervezario</h1>
            <h1 className='text-2xl md:text-5xl font-semibold max-w-[204px] w-full'>Nacional</h1>
          </div>
        </a>
        <CartBtn />
      </div>
      <div className="mt-10">
        <Navbar />
      </div>
    </header>
  )
}

export default Header
