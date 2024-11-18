import { Col, Row } from 'antd';
import { FacebookFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

export default function LayoutFooter() {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });

  return (
    <div
      style={{ height: isDesktop ? '85px' : '152px' }}
      className="flex h-20 content-center bg-ft4"
    >
      <div className="my-auto w-full px-16">
        <Row>
          {isDesktop && (
            <Col lg={8}>
              <div className="my-auto text-base text-white">©2023 All Rights Reserved.</div>
            </Col>
          )}

          <Col lg={8} md={24} sm={24} xs={24}>
            <div className="flex content-center justify-center">
              <YoutubeFilled className="cursor-pointer px-2 text-2xl text-white hover:text-br" />
              <TwitterOutlined className="cursor-pointer px-2 text-2xl text-white hover:text-br" />
              <FacebookFilled className="cursor-pointer px-2 text-2xl text-white hover:text-br" />
            </div>
          </Col>
          <Col lg={8} md={24} sm={24} xs={24} className={isDesktop ? '' : 'py-2'}>
            <div
              style={{ justifyContent: isDesktop ? 'end' : 'center' }}
              className="flex content-center text-base text-white"
            >
              <span className="cursor-pointer px-2 hover:text-br">Contact us</span>
              <span className="cursor-pointer px-2 hover:text-br">Privacy Policies</span>
              <span className="cursor-pointer px-2 hover:text-br">Help</span>
            </div>
          </Col>
          {!isDesktop && (
            <Col md={24} sm={24} xs={24}>
              <div className="my-auto text-center text-base text-white">
                ©2023 All Rights Reserved.
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
