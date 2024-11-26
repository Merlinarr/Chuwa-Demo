import { useEffect, useState } from 'react';
import CardView from './card';
import { Row, Col } from 'antd';
import HomeHeader from './header';
import PaginationComponent from '@/components/pagination/pagination';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Product } from '#/entity';
import DemoService from '@/api/services/demoService';
import { GetProductListParams } from '#/api';
import { setCart, setTotal } from '@/store/shopping';
import { clearUserInfoAndToken } from '@/store/users/userSlice';
export default function HomePage() {
  const dispatch = useAppDispatch();
  const [Products, setProducts] = useState<Product[]>([]);
  const searchParams = useAppSelector((state) => state.shopping.pagination);
  const userToken = useAppSelector((state) => state.user.userToken);
  const isMaxScreen = useMediaQuery({ query: '(min-width: 1323px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const fetchProducts = (params: GetProductListParams) => {
    DemoService.getProducListAction(params).then((res) => {
      const products = res.data.data;
      const total = res.data.total;
      dispatch(setTotal(total));
      setProducts(products);
    });
  };
  useEffect(() => {
    fetchProducts(searchParams);
  }, [searchParams]);
  useEffect(() => {
    if (userToken) {
      DemoService.getCartAction()
        .then((res) => {
          let newCart = res.data;
          dispatch(setCart(newCart));
        })
        .catch((error) => {
          error.status == 403 && dispatch(clearUserInfoAndToken());
        });
    }
  }, [userToken]);
  return (
    <div className="px-4">
      <div className="pb-6">
        <HomeHeader />
      </div>
      <div className="bg-white px-3 py-6">
        <Row justify="start" gutter={[15, 20]}>
          {Products.map((x, i) => {
            return isMaxScreen ? (
              <Col
                key={i}
                className="flex h-full justify-center"
                style={{ flexBasis: '20%', maxWidth: '20%' }}
              >
                <CardView product={x} />
              </Col>
            ) : (
              <Col key={i} xl={6} lg={8} md={6} sm={24} xs={24}>
                <div className="flex justify-center">
                  <CardView product={x} />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <div style={{ justifyContent: isMobile ? 'center' : 'end' }} className="flex pt-6">
        <PaginationComponent />
      </div>
    </div>
  );
}
