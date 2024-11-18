import { Row, Col } from 'antd';
import { useParams } from '@/router/hooks';
import ProductForm from '@/components/form';
import { useMediaQuery } from 'react-responsive';
export default function ProductPage() {
  const param = useParams();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <div className="mx-auto max-w-[660px]">
      <div className="pb-6">
        <div className="px-8">
          <Row>
            <Col lg={24}>
              <div
                style={{ textAlign: isMobile ? 'center' : 'start' }}
                className="text-3xl font-bold text-ft1"
              >
                {param?.id ? 'Edit Product' : 'Create Product'}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="px-6 pb-6 pt-6">
        <div className='bg-white'> <ProductForm /></div>
      </div>
    </div>
  );
}
