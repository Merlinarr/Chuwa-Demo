import { Col, Row } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
import HeaderCart from './header-cart';
import { useMediaQuery } from 'react-responsive';
import { SearchProps } from 'antd/es/input';
import { useAppDispatch } from '@/store/hooks';
import { setSearch } from '@/store/shopping';
import { useRouter } from '@/router/hooks';
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
export default function LayoutHeader() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const onSearch: SearchProps['onSearch'] = (value) => {
    dispatch(setSearch(value));
  };
  const onClear = () => {
    dispatch(setSearch(''));
  };
  return (
    <div style={{ height: isMobile ? '120px' : '64px' }} className="flex content-center bg-ft4">
      <div className="my-auto w-full px-16">
        <Row>
          <Col lg={8} md={7} sm={12} xs={12}>
            {isDesktop ? (
              <div onClick={() => router.push(HOMEPAGE)} className="cursor-pointer">
                <span className="text-3xl font-bold text-white">Management</span>
                &nbsp;
                <span className="text-xs font-bold text-white">Chuwa</span>
              </div>
            ) : (
              <div onClick={() => router.push(HOMEPAGE)} className="cursor-pointer">
                <span className="text-xl font-bold text-white">Mchuwa</span>
              </div>
            )}
          </Col>
          {!isMobile && (
            <Col lg={8} md={10} className="flex justify-center px-2">
              <Search
                className="custom-placeholder-input"
                placeholder="Search"
                size="large"
                allowClear
                onSearch={onSearch}
                onClear={onClear}
              />
            </Col>
          )}

          <Col lg={8} md={7} sm={12} xs={12} className="my-auto flex justify-end">
            <HeaderCart />
          </Col>
          {isMobile && (
            <Col sm={24} xs={24} className="flex justify-center px-2 pt-6">
              <Search placeholder="Search" allowClear onClear={onClear} onSearch={onSearch} />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
