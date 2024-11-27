import useCartContext from '@/hooks/useCartContext';
import cartMenuStore from '@/store/cartMenuStore'
import { FaCartShopping } from 'react-icons/fa6'
import { TopNav } from '../UI/TopNav';

export const CartBtn = () => {
    const { openCartMenuStore } = cartMenuStore();
    const { totalItems } = useCartContext();
    return (
        <div className='flex'>
        <TopNav />
          <div className='relative ms-4'>
            <button onClick={openCartMenuStore}>
                <FaCartShopping className="size-5 mr-2" />
            <span className='absolute bottom-16 -right-2 bg-yellow rounded-full text-black w-5 h-5 flex items-center justify-center text-xs'>
              {totalItems}
            </span>
            </button>
          </div>
        </div>
    )
}
