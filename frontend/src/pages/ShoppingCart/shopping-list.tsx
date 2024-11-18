import React from 'react';
import { Image, Row, Col } from 'antd';
import CountButton from '@/components/button/count-button';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Product } from '#/entity';
import { setCart } from '@/store/shopping';
import { calcCart } from '@/store/shopping';
import DemoService from '@/api/services/demoService';
const ShoppingList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { Cart, CartItemBeforeLogin } = useAppSelector((state) => state.shopping);
  const { userToken } = useAppSelector((state) => state.user);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const handleRemove = async (deleteProduct: Product) => {
    if (!userToken) {
      let newCartItems = CartItemBeforeLogin.filter((c) => c.product.id != deleteProduct.id);
      let newCart = calcCart(newCartItems);
      dispatch(setCart(newCart));
    } else {
      await DemoService.deleteItemAction({ productId: deleteProduct.id, isRemove: true });
      const response = await DemoService.getCartAction();
      let newCart = response.data;
      dispatch(setCart(newCart));
    }
  };

  return (
    <div className="px-8 pt-8">
      {Cart.items.map((product, i) => (
        <div key={i} className=" mb-8">
          <Row>
            <Col span={isMobile ? 8 : 6} className="h-[120px]">
              <Image
                height={120}
                width={112}
                src={product.product.imageUrl}
                alt={product.product.name}
              />
            </Col>
            {isMobile && (
              <Col span={16} className="h-[120px]">
                <div className="flex h-full flex-col justify-between px-6">
                  <div>
                    <div className="text-base font-bold text-ft1">{product.product.name}</div>
                    <div className="text-start text-base font-semibold text-purple">
                      ${product.product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="w-24">
                      <CountButton
                        product={product.product}
                        textColor={'#6B7280'}
                        customClass={'bg-white border border-br'}
                      />
                    </div>
                    <div
                      className="cursor-pointer text-end text-base font-semibold text-ft2 underline"
                      onClick={() => handleRemove(product.product)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </Col>
            )}
            {!isMobile && (
              <Col span={12} className="h-[120px]">
                <div className="flex h-full flex-col justify-between px-6">
                  <div className="text-xl font-bold text-ft1">{product.product.name}</div>
                  <div className="w-24">
                    <CountButton
                      product={product.product}
                      textColor={'#6B7280'}
                      customClass={'bg-white border border-br'}
                    />
                  </div>
                </div>
              </Col>
            )}
            {!isMobile && (
              <Col span={6} className="h-[120px]">
                <div className="flex h-full flex-col justify-between">
                  <div className="text-end text-xl font-semibold text-purple">
                    ${product.product.price.toFixed(2)}
                  </div>
                  <div
                    className="cursor-pointer text-end text-base font-semibold text-ft2 underline"
                    onClick={() => handleRemove(product.product)}
                  >
                    Remove
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
