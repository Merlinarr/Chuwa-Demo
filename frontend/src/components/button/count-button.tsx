import { CartItem, Product } from '#/entity';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart, setCartItemBefore } from '@/store/shopping';
import { calcCart } from '@/store/shopping';
import DemoService from '@/api/services/demoService';
const CountButton = (props: {
  customClass?: string;
  textColor?: string;
  product: Product;
  buttonName?: string;
  buttonStyle?: React.CSSProperties;
  countButtonStyle?: React.CSSProperties;
}) => {
  const dispatch = useAppDispatch();
  const { customClass, textColor, product, buttonName, buttonStyle,countButtonStyle } = props;
  const { CartItemBeforeLogin, Cart } = useAppSelector((state) => state.shopping);
  const userToken = useAppSelector((state) => state.user.userToken);

  const decrease = async () => {
    if (!userToken) {
      let item = CartItemBeforeLogin.find((i) => i.product.id == product.id);
      if (item) {
        let updatedItem: CartItem = {
          product: product,
          quantity: item.quantity - 1,
          totalPrice: (item.quantity - 1) * product.price,
        };
        let newCartItems = CartItemBeforeLogin.filter((i) => i.product.id != product.id);
        dispatch(
          setCartItemBefore(
            updatedItem.quantity == 0 ? newCartItems : [...newCartItems, updatedItem],
          ),
        );
        let newCart = calcCart(
          updatedItem.quantity == 0 ? newCartItems : [...newCartItems, updatedItem],
        );
        dispatch(setCart(newCart));
      }
    } else {
      try {
        await DemoService.deleteItemAction({ productId: product.id });
        const response = await DemoService.getCartAction();
        let newCart = response.data;
        dispatch(setCart(newCart));
      } catch (e) {}
    }
  };

  const increase = async () => {
    if (!userToken) {
      let item = CartItemBeforeLogin.find((i) => i.product.id == product.id);
      if (item) {
        let updatedItem: CartItem = {
          product: product,
          quantity: item.quantity + 1,
          totalPrice: (item.quantity + 1) * product.price,
        };
        let newCartItems = CartItemBeforeLogin.filter((i) => i.product.id != product.id);
        dispatch(setCartItemBefore([...newCartItems, updatedItem]));

        let newCart = calcCart([...newCartItems, updatedItem]);
        dispatch(setCart(newCart));
      } else {
        let newItem: CartItem = {
          product: product,
          quantity: 1,
          totalPrice: product.price,
        };
        dispatch(setCartItemBefore([...CartItemBeforeLogin, newItem]));
        let newCart = calcCart([...CartItemBeforeLogin, newItem]);
        dispatch(setCart(newCart));
      }
    } else {
      await DemoService.addItemAction({ productId: product.id });
      const response = await DemoService.getCartAction();
      let newCart = response.data;
      dispatch(setCart(newCart));
    }
  };

  const displayValue = useMemo(() => {
    const displayItem = Cart.items.find((i) => i.product.id == product.id);
    if (displayItem) {
      return displayItem.quantity;
    }
    return 0;
  }, [Cart]);
  if (displayValue == 0) {
    return (
      <div
        style={
          buttonStyle
            ? buttonStyle
            : {
                padding: '3px 0px',
              }
        }
        className="rounded bg-purple text-center text-sm font-semibold text-white cursor-pointer"
        onClick={increase}
      >
        {buttonName ? buttonName : 'Add'}
      </div>
    );
  }
  return (
    <div
      style={
        countButtonStyle
          ? countButtonStyle
          : {
              padding: '3px 0px',
            }
      }
      className={` flex content-center justify-between rounded ${
        customClass ? customClass : 'bg-purple'
      }`}
    >
      <Button
        type="text"
        block
        icon={<MinusOutlined />}
        onClick={decrease}
        style={{ color: textColor ? textColor : 'white' }}
        size="small"
      />
      <div
        className="content-center px-2 text-sm font-semibold"
        style={{
          color: textColor ? '#111827' : 'white',
          borderLeft: textColor ? '1px solid #ccc' : undefined,
          borderRight: textColor ? '1px solid #ccc' : undefined,
        }}
      >
        {displayValue}
      </div>
      <Button
        block
        type="text"
        icon={<PlusOutlined />}
        onClick={increase}
        style={{ color: textColor ? textColor : 'white' }}
        size="small"
      />
    </div>
  );
};

export default CountButton;
