import { Row, Col, Image, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '@/store/hooks';
import DemoService from '@/api/services/demoService';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from '@/router/hooks';
import { Product } from '#/entity';
import { UserRole } from '#/enum';
import CountButton from '@/components/button/count-button';
export default function DetailPage() {
  const { userInfo } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [ProductDetail, setProductDetail] = useState<Product | null>(null);
  const params = useParams();
  const isMaxScreen = useMediaQuery({ query: '(min-width: 1323px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 992px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const imageWidth = isMaxScreen ? 660 : isDesktop ? 540 : isTablet ? 450 : 308;
  const imageHeight = isMaxScreen ? 600 : isDesktop ? 500 : isTablet ? 400 : 276;

  useEffect(() => {
    if (params?.id) {
      DemoService.getProducDetailAction(params.id).then((res) => {
        console.log(res);
        setProductDetail(res.data);
      });
    }
  }, [params?.id]);
  return (
    <div>
      <div className="pb-6">
        <div className="px-6">
          <Row className={isMobile ? 'flex justify-center' : ''}>
            <Col lg={isMobile ? 24 : 12}>
              <div className="text-3xl font-bold text-ft1">Products Detail</div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="px-6">
        <div className="bg-white pb-10 pt-6">
          <Row>
            <Col span={isMobile ? 24 : 12}>
              <div className={isMobile ? 'flex justify-center pb-4' : ''}>
                <Image
                  width={imageWidth}
                  height={imageHeight}
                  preview={false}
                  src={ProductDetail?.imageUrl}
                />
              </div>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <div className={isMobile ? 'flex justify-center px-8 ' : 'pl-24'}>
                <div className="pr-4">
                  <div className="pb-3 text-base font-medium text-ft2">
                    {ProductDetail?.category}
                  </div>
                  <div className=" text-3xl font-bold text-ft3">{ProductDetail?.name}</div>
                  <div className="flex py-6 ">
                    <div className="pr-3 text-3xl font-bold text-ft1">${ProductDetail?.price}</div>
                    {ProductDetail?.stock == 0 && (
                      <div className="my-auto w-24 rounded bg-red/[.13] px-2 py-1 text-center text-xs font-medium text-red">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="max-w-[428px] text-base font-bold text-ft2">
                    {ProductDetail?.description}
                  </div>
                  <div className="flex py-8">
                    {ProductDetail && (
                      <div className="w-full max-w-36">
                        <CountButton
                          product={ProductDetail}
                          buttonName="Add To Cart"
                          buttonStyle={{
                            padding: '10px 0px',
                            borderRadius: '8px',
                          }}
                          countButtonStyle={{
                            padding: '8px 0px',
                            borderRadius: '8px',
                          }}
                        />
                      </div>
                    )}
                    {userInfo.role == UserRole.ADMIN && (
                      <div className="w-full pl-6">
                        <Button
                          type="default"
                          block
                          className="max-w-36 text-ft3"
                          size="large"
                          onClick={() => router.push(`/product/${params?.id}`)}
                        >
                          <span className="text-sm font-semibold text-ft3">Edit</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
