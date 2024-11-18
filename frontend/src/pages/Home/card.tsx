import ButtonCombo from './button-combo';
import { Card, Image } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Product } from '#/entity';
import { useRouter } from '@/router/hooks';
export default function CardView(props: { product: Product }) {
  const router = useRouter();
  const { product } = props;
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 992px)' });
  const imageWidth = isDesktop ? 218 : isTablet ? 140 : 280;
  const imageHeight = isTablet ? 130 : 198;
  return (
    <Card
      className="w-fit"
      hoverable
      style={{
        border: '1px solid #ccc',
      }}
    >
      <Image
        width={imageWidth}
        height={imageHeight}
        preview={false}
        src={product.imageUrl}
        onClick={() => router.push(`/detail/${product.id}`)}
      />

      <div className="py-1 text-sm text-ft2">{product.name}</div>
      <div className="text-base font-semibold text-ft1">${product.price.toFixed(2)}</div>
      <div className="pt-3">
        <ButtonCombo product={product} />
      </div>
    </Card>
  );
}
