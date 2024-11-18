import { App, Button, Form, Input } from 'antd';
import DemoService from '@/api/services/demoService';
import { LoginOptions } from '#/enum';
export interface RegisterFormProps {
  username: string;
  password: string;
}
export default function RegisterForm(props: { setTab: React.Dispatch<LoginOptions> }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { setTab } = props;
  const handleFinish = async () => {
    const isValid = await form.validateFields();
    DemoService.regAction({
      password: isValid.password,
      username: isValid.username,
    }).then(() => {
      setTab(LoginOptions.SIGNIN);
      message.success({
        content: 'Your registration is successful! Please proceed to log in to continue.',
        duration: 3,
      });
    });
  };
  const validateConfirmPassword = (_: any, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('The two passwords do not match!');
    }
    return Promise.resolve();
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
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
          <div className="pb-1 text-base font-semibold text-ft2">New Password</div>
          <Input.Password size="large" />
        </div>
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please confirm your password' },
          { validator: validateConfirmPassword },
        ]}
      >
        <div>
          <div className="pb-1 text-base font-semibold text-ft2">Confirm Password</div>
          <Input.Password size="large" />
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleFinish} block>
          <span className="text-xs font-bold text-white">Sign Up</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
