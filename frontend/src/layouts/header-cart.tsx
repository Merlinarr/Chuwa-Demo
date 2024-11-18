import CartDialog from '@/pages/ShoppingCart/cart-dialog';
import { resetCartAndItems, setCartModal } from '@/store/shopping';
import { useAppDispatch } from '@/store/hooks';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from '@/router/hooks';
import { useAppSelector } from '@/store/hooks';
import { clearUserInfoAndToken } from '@/store/users/userSlice';

export default function HeaderCart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.user.userToken);
  const { Cart } = useAppSelector((state) => state.shopping);
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const handleUserIconClick = () => {
    if (userToken) {
      dispatch(clearUserInfoAndToken());
      dispatch(resetCartAndItems());
    } else {
      router.replace('/login');
    }
  };
  return (
    <div className="flex content-center justify-end">
      <div onClick={handleUserIconClick} className="flex cursor-pointer">
        <div className="my-auto">
          <svg
            width={isMobile ? 20 : 30}
            height={isMobile ? 20 : 30}
            viewBox="0 0 30 30"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.625 28.125H18.75V23.4375C18.7485 22.1948 18.2542 21.0033 17.3754 20.1246C16.4967 19.2458 15.3052 18.7515 14.0625 18.75H8.4375C7.19475 18.7515 6.00334 19.2458 5.12458 20.1246C4.24583 21.0033 3.75149 22.1948 3.75 23.4375V28.125H1.875V23.4375C1.87699 21.6976 2.56903 20.0296 3.7993 18.7993C5.02958 17.569 6.69763 16.877 8.4375 16.875H14.0625C15.8024 16.877 17.4704 17.569 18.7007 18.7993C19.931 20.0296 20.623 21.6976 20.625 23.4375V28.125Z"
              fill="white"
            />
            <path
              d="M11.25 3.75C12.1771 3.75 13.0834 4.02492 13.8542 4.53999C14.6251 5.05506 15.2259 5.78714 15.5807 6.64367C15.9355 7.5002 16.0283 8.4427 15.8474 9.35199C15.6666 10.2613 15.2201 11.0965 14.5646 11.7521C13.909 12.4076 13.0738 12.8541 12.1645 13.0349C11.2552 13.2158 10.3127 13.123 9.45618 12.7682C8.59965 12.4134 7.86756 11.8126 7.35249 11.0417C6.83742 10.2709 6.5625 9.3646 6.5625 8.4375C6.5625 7.1943 7.05636 6.00201 7.93544 5.12294C8.81452 4.24386 10.0068 3.75 11.25 3.75ZM11.25 1.875C9.95206 1.875 8.68327 2.25988 7.60407 2.98098C6.52488 3.70208 5.68374 4.727 5.18704 5.92614C4.69034 7.12528 4.56038 8.44478 4.8136 9.71778C5.06682 10.9908 5.69183 12.1601 6.60961 13.0779C7.5274 13.9957 8.69672 14.6207 9.96972 14.8739C11.2427 15.1271 12.5622 14.9972 13.7614 14.5005C14.9605 14.0038 15.9854 13.1626 16.7065 12.0834C17.4276 11.0042 17.8125 9.73544 17.8125 8.4375C17.8125 6.69702 17.1211 5.02782 15.8904 3.79711C14.6597 2.5664 12.9905 1.875 11.25 1.875Z"
              fill="white"
            />
            <path
              d="M21.75 17.375L23.9802 21.575L28.75 22.1546L25.25 25.3088L25.95 29.975L21.75 27.35L17.55 29.975L18.25 25.3088L14.75 22.1546L19.65 21.575L21.75 17.375Z"
              fill="#FCE944"
            />
          </svg>
        </div>
        {isDesktop && (
          <div className="my-auto pl-3 text-base font-semibold text-white hover:text-br">
            {userToken ? 'Sign Out' : 'Sign In'}
          </div>
        )}
      </div>
      <div onClick={() => dispatch(setCartModal(true))} className="flex cursor-pointer pl-9">
        <div className="relative my-auto py-1 pr-1">
          <svg
            width={isMobile ? 20 : 30}
            height={isMobile ? 20 : 30}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 22.5C8.32843 22.5 9 21.8284 9 21C9 20.1716 8.32843 19.5 7.5 19.5C6.67157 19.5 6 20.1716 6 21C6 21.8284 6.67157 22.5 7.5 22.5Z"
              fill="#F9FAFB"
            />
            <path
              d="M18 22.5C18.8284 22.5 19.5 21.8284 19.5 21C19.5 20.1716 18.8284 19.5 18 19.5C17.1716 19.5 16.5 20.1716 16.5 21C16.5 21.8284 17.1716 22.5 18 22.5Z"
              fill="#F9FAFB"
            />
            <path
              d="M21 5.25003H4.365L3.75 2.10003C3.71494 1.92807 3.62068 1.77386 3.48364 1.66423C3.3466 1.5546 3.17546 1.49649 3 1.50003H0V3.00003H2.385L5.25 17.4C5.28506 17.572 5.37932 17.7262 5.51636 17.8358C5.6534 17.9455 5.82454 18.0036 6 18H19.5V16.5H6.615L6 13.5H19.5C19.6734 13.5043 19.8429 13.4483 19.9796 13.3416C20.1163 13.235 20.2119 13.0842 20.25 12.915L21.75 6.16503C21.7751 6.05375 21.7745 5.9382 21.7483 5.82718C21.722 5.71616 21.6708 5.61259 21.5985 5.52436C21.5261 5.43613 21.4347 5.36556 21.3309 5.31802C21.2272 5.27048 21.114 5.24723 21 5.25003ZM18.9 12H5.715L4.665 6.75003H20.0625L18.9 12Z"
              fill="#F9FAFB"
            />
          </svg>
          {Cart.items.length != 0 && (
            <div className="absolute right-0 top-0 flex w-fit content-center justify-center rounded-full bg-red">
              <div
                style={{ padding: '0px 5px', marginBottom: '2px' }}
                className="text-xs leading-4 text-white"
              >
                {Cart.items.reduce((acc, c) => acc + c.quantity, 0)}
              </div>
            </div>
          )}
        </div>
        {isDesktop && (
          <div className="my-auto pl-3 text-base font-semibold text-white hover:text-br">
            $ {Cart.subtotal.toFixed(2)}
          </div>
        )}
      </div>
      <CartDialog />
    </div>
  );
}
