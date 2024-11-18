import { CloseOutlined } from '@ant-design/icons';
import { App, Button, Col, Divider, Input, Row } from 'antd';
import { setCartModal } from '@/store/shopping';
import ShoppingList from './shopping-list';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import DemoService from '@/api/services/demoService';
import { calcCart } from '@/store/shopping';
import { setCart } from '@/store/shopping';
import { useRouter } from '@/router/hooks';
export default function CartPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const [Code, setCode] = useState<string>('');
  const [CodeVerified, setCodeVerified] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { Cart } = useAppSelector((state) => state.shopping);
  const { userToken } = useAppSelector((state) => state.user);
  const currentItemsNumber = Cart.items.reduce((acc, c) => acc + c.quantity, 0);

  const handlePromptCode = () => {
    if (Code) {
      DemoService.verifyCodeAction({ code: Code })
        .then((res) => {
          const code = res.data;
          let newCart = calcCart(Cart.items, code);
          dispatch(setCart(newCart));
          setCodeVerified(true);
        })
        .catch(() => {
          setCodeVerified(false);
        });
    }
  };
  const handelCheckout = async () => {
    if (!userToken) {
      dispatch(setCartModal(false));
      return router.push('/login');
    }
    await DemoService.checkout();
    const response = await DemoService.getCartAction();
    let newCart = response.data;
    dispatch(setCart(newCart));
    message.success({
      content: 'Checkout completed successfully!',
      duration: 3,
    });
  };
  const promotCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setCodeVerified(false);
    let newCart = calcCart(Cart.items);
    dispatch(setCart(newCart));
  };
  const promotCodeClear = () => {
    setCode('');
    setCodeVerified(false);
    let newCart = calcCart(Cart.items);
    dispatch(setCart(newCart));
  };
  useEffect(() => {
    setCodeVerified(false);
  }, [Cart.subtotal]);
  return (
    <div>
      <div className="flex h-[81px] justify-between bg-purple px-8">
        <div className="flex h-full text-white">
          <div className="my-auto text-3xl font-medium">Cart</div>
          &nbsp;
          <div className="my-auto text-base font-semibold">&nbsp;(3)</div>
        </div>
        <div className="my-auto">
          <Button type="text" size="large" onClick={() => dispatch(setCartModal(false))}>
            <CloseOutlined className="text-xl font-semibold text-white" />
          </Button>
        </div>
      </div>
      {currentItemsNumber ? (
        <div>
          <div>
            <ShoppingList />
          </div>
          <div className="px-8">
            <div className="pb-2 text-sm font-semibold text-ft2">Apply Discount Code</div>
            <div>
              <Row gutter={[24, 0]}>
                <Col span={16}>
                  <Input
                    placeholder="20% OFF"
                    allowClear
                    onClear={promotCodeClear}
                    onChange={promotCodeChange}
                    style={{ color: CodeVerified ? '#92d050' : 'red' }}
                  />
                </Col>
                <Col span={8}>
                  <Button type="primary" block onClick={handlePromptCode}>
                    <span className="text-sm font-bold text-white">Apply</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <Divider />
          </div>
          <div className="flex justify-between px-8 text-base font-semibold text-ft1">
            <div>
              <div className="pb-2">Subtotal</div>
              <div className="pb-2">Tax</div>
              {Cart.discountAmount > 0 && CodeVerified && <div className="pb-2">Discount</div>}
              <div className="pb-2">Estimated total</div>
            </div>
            <div>
              <div className="pb-2">&nbsp;${Cart.subtotal.toFixed(2)}</div>
              <div className="pb-2">&nbsp;${Cart.tax.toFixed(2)}</div>
              {Cart.discountAmount > 0 && CodeVerified && (
                <div className="pb-2">-${Cart.discountAmount.toFixed(2)}</div>
              )}
              <div className="pb-2">&nbsp;${Cart.total.toFixed(2)}</div>
            </div>
          </div>
          <div className="px-8 pb-8 pt-4">
            <Button type="primary" block size="large" onClick={handelCheckout}>
              <span className="text-base font-semibold text-white">Continue to checkout</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="empty-card-bg" style={{ height: '600px' }}></div>
      )}
    </div>
  );
}
