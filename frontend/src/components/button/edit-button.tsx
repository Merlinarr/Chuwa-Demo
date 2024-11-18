import { useRouter } from '@/router/hooks';
import { Button } from 'antd';

const EditButton = (props: { id: string }) => {
  const router = useRouter();
  const { id } = props;
  return (
    <div
      style={{
        padding: '1px 0px',
      }}
      className="flex content-center justify-between rounded border border-br bg-white hover:bg-gray"
    >
      <Button type="text" block size="small" onClick={() => router.push(`/product/${id}`)}>
        <span className="text-xs font-bold text-ft3">Edit</span>
      </Button>
    </div>
  );
};
export default EditButton;
