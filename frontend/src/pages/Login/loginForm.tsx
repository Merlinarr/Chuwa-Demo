import { Button, Form, Input } from 'antd';
import { useSignIn } from '@/store/users/userSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearUserInfoAndToken } from '@/store/users/userSlice';
import { resetCartAndItems } from '@/store/shopping';
export interface LoginFormProps {
  username: string;
  password: string;
}
export default function LoginForm() {
  const signIn = useSignIn();
  const dispatch = useAppDispatch();
  const { Cart } = useAppSelector((state) => state.shopping);
  const [form] = Form.useForm();
  const handleFinish = async () => {
    const isValid = await form.validateFields();
    if (isValid) {
      signIn({
        password: form.getFieldValue('password'),
        username: form.getFieldValue('username'),
        cart: Cart.items,
      });
    }
  };

  useEffect(() => {
    dispatch(clearUserInfoAndToken());
  }, []);
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        username: '',
        password: '',
      }}
    >
      <Form.Item name="username" rules={[{ required: true, message: 'Please enter the email' }]}>
        <div>
          <div className="pb-1 text-base font-semibold text-ft2">Email</div>
          <Input size="large" />
        </div>
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please enter the password' }]}>
        <div>
          <div className="pb-1 text-base font-semibold text-ft2">Password</div>
          <Input.Password size="large" />
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large" onClick={handleFinish}>
          <span className="text-sm font-bold text-white">Sign In</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
