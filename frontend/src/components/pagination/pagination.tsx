import React from 'react';
import { Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPage } from '@/store/shopping';
interface PaginationComponentProps {
  showQuickJumper?: boolean;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ showQuickJumper }) => {
  const dispatch = useAppDispatch();
  const {
    pagination: { page, pageSize },
    total,
  } = useAppSelector((state) => state.shopping);
  const paginationChange = (currentPage: number) => {
    dispatch(setPage(currentPage));
  };

  return (
    <Pagination
      current={page}
      pageSize={pageSize}
      total={total}
      size="default"
      onChange={paginationChange}
      showQuickJumper={showQuickJumper}
      pageSizeOptions={['10']}
    />
  );
};

export default PaginationComponent;
