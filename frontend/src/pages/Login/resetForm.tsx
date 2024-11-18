import { LoginOptions } from '#/enum';
import { Button, Form, Input } from 'antd';

import React from 'react';

export interface ResetFormProps {
  username: string;
}
export default function ResetForm(props: { setTab: React.Dispatch<LoginOptions> }) {
  const { setTab } = props;
  const [form] = Form.useForm();
  const handleFinish = async () => {
    const isValid = await form.validateFields();
    if (isValid) {
      setTab(LoginOptions.SEND_EMAIL);
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        username: '',
      }}
    >
      <Form.Item name="username" rules={[{ required: true, message: 'Please enter the email' }]}>
        <div>
          <div className="pb-1 text-base font-semibold text-ft2">Email</div>
          <Input size="large" />
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleFinish} block size='large'>
          <span className="text-sm font-bold text-white">Update password</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
