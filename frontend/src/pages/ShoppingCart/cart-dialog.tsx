import React from 'react';
import { Modal } from 'antd';
import CartPage from '.';
import { useAppSelector } from '@/store/hooks';
import { useMediaQuery } from 'react-responsive';

const CartDialog: React.FC = () => {
  const { cartModal } = useAppSelector((state) => state.shopping);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <>
      <Modal
        style={
          !isMobile
            ? {
                position: 'absolute',
                right: 0,
                top: '64px',
                margin: 0,
                transform: 'none',
              }
            : {}
        }
        maskClosable={false}
        closable={false}
        className="CartDialog"
        footer={null}
        open={cartModal}
      >
        <CartPage />
      </Modal>
    </>
  );
};

export default CartDialog;
