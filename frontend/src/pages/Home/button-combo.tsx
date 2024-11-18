import { Col, Row } from 'antd';
import CountButton from '@/components/button/count-button';
import EditButton from '@/components/button/edit-button';
import { useAppSelector } from '@/store/hooks';
import { UserRole } from '#/enum';
import { Product } from '#/entity';
const ButtonCombo = (props: { product: Product }) => {
  const { product } = props;
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return (
    <Row gutter={8}>
      <Col flex="auto">
        <CountButton product={product} />
      </Col>
      {userInfo.role == UserRole.ADMIN && (
        <Col span={12}>
          <EditButton id={product.id} />
        </Col>
      )}
    </Row>
  );
};

export default ButtonCombo;
