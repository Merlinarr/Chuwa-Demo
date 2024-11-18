import { useRouter } from '@/router/hooks';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function ErrorNotice() {
  const router = useRouter();
  return (
    <div className="flex min-h-[300px] w-full max-w-[600px] flex-col justify-center">
      <div className="pb-12 text-center">
        <InfoCircleOutlined className="text-8xl text-purple" />
      </div>
      <div className="flex justify-center">
        <div className="max-w-[900px] text-center text-3xl font-bold text-ft1">
          Oops, something went wrong!
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="w-full max-w-[240px] pt-8">
          <Button size="large" type="primary" block onClick={() => router.replace(HOMEPAGE)}>
            <span className="text-base text-white">Go Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="px-8 pt-16">
      <div className="mx-auto flex w-full max-w-[1300px] justify-center bg-white  py-32">
        <ErrorNotice />
      </div>
    </div>
  );
}
