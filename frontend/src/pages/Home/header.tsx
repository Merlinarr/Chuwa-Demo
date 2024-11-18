import { Button, Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import HeaderSearch from './header-search';
import { useAppSelector } from '@/store/hooks';
import { UserRole } from '#/enum';
import { useRouter } from '@/router/hooks';
export default function HomeHeader() {
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <div className="px-2">
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
          <div
            style={{ textAlign: isMobile ? 'center' : 'start' }}
            className="text-3xl font-bold text-ft1"
          >
            Products
          </div>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24} className={isMobile ? 'pt-6' : ''}>
          <div style={{ justifyContent: isMobile ? 'center' : 'end' }} className="flex justify-end">
            <HeaderSearch />
            {userInfo.role == UserRole.ADMIN && (
              <div className="pl-2">
                <Button
                  type="primary"
                  className="w-36 text-ft3"
                  size="large"
                  onClick={() => router.push('/product')}
                >
                  Add Product
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
