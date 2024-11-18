import { SearchOrder } from '#/enum';
import { Select } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { setSortOrder, setSortBy, setPage } from '@/store/shopping';
export default function HeaderSearch() {
  const dispatch = useAppDispatch();
  const handleSearchChange = (val: any) => {
    switch (val) {
      case SearchOrder.LAST_ADD:
        dispatch(setSortOrder('desc'));
        dispatch(setSortBy('createdAt'));
        break;
      case SearchOrder.PRICE_ASC:
        dispatch(setSortOrder('asc'));
        dispatch(setSortBy('price'));
        break;
      case SearchOrder.PRICE_DESC:
        dispatch(setSortOrder('desc'));
        dispatch(setSortBy('price'));
        break;

      default:
        break;
    }
    dispatch(setPage(1));
  };
  return (
    <>
      <Select
        defaultValue="LAST_ADD"
        size="large"
        style={{ width: 180 }}
        onChange={handleSearchChange}
        options={[
          { value: SearchOrder.LAST_ADD, label: 'Last added' },
          { value: SearchOrder.PRICE_ASC, label: 'Price: low to high' },
          { value: SearchOrder.PRICE_DESC, label: 'Price: high to low' },
        ]}
      />
    </>
  );
}
