import { Card, Button } from 'antd';
import LoginForm from './loginForm';
import { useState } from 'react';
import { LoginOptions } from '#/enum';
import RegisterForm from './registerForm';
import ResetForm from './resetForm';
import { CloseOutlined } from '@ant-design/icons';
import MailNotice from './mail';
import { useMediaQuery } from 'react-responsive';
export default function LoginPage() {
  const [tab, setTab] = useState<LoginOptions>(LoginOptions.SIGNIN);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <div className="mx-auto w-full max-w-[600px] px-6 pt-16">
      <Card className="relative shadow-lg">
        {tab !== LoginOptions.SIGNIN && (
          <div className="absolute right-2 top-1">
            <Button
              onClick={() => setTab(LoginOptions.SIGNIN)}
              type="text"
              icon={<CloseOutlined />}
            ></Button>
          </div>
        )}
        {tab !== LoginOptions.SEND_EMAIL && (
          <div className="px-6">
            <div className="pb-8 pt-6 text-center text-3xl font-bold text-ft1">
              {tab === LoginOptions.SIGNIN && 'Sign in to your account'}
              {tab === LoginOptions.SIGNUP && 'Sign up an account'}
              {tab === LoginOptions.RESET_PASSWORD && 'Update your password'}
            </div>
            {tab === LoginOptions.RESET_PASSWORD && (
              <div className="pb-8 text-center text-base text-ft2">
                Enter your email link, we will send you the recovery link.
              </div>
            )}

            {tab === LoginOptions.SIGNIN && <LoginForm />}
            {tab === LoginOptions.SIGNUP && <RegisterForm setTab={setTab}/>}
            {tab === LoginOptions.RESET_PASSWORD && <ResetForm setTab={setTab} />}
          </div>
        )}

        {tab === LoginOptions.SIGNIN && (
          <div className={isMobile ? 'px-6 text-base' : 'flex justify-between px-6 text-base'}>
            <div style={{ textAlign: isMobile ? 'center' : 'start' }}>
              <span className="text-ft2">Don't have an account? </span>
              <span
                onClick={() => setTab(LoginOptions.SIGNUP)}
                className="cursor-pointer font-medium text-purple underline"
              >
                Sign up
              </span>
            </div>
            <div
              style={{ textAlign: isMobile ? 'center' : 'start' }}
              onClick={() => setTab(LoginOptions.RESET_PASSWORD)}
              className="cursor-pointer py-2 font-medium text-purple underline sm:py-0 md:py-0"
            >
              <span>Forgot password?</span>
            </div>
          </div>
        )}
        {tab === LoginOptions.SIGNUP && (
          <div className="px-6 text-base">
            <div className="text-center md:text-start ">
              <span className="text-ft2">Already have an account? </span>
              <span
                onClick={() => setTab(LoginOptions.SIGNIN)}
                className="cursor-pointer font-medium text-purple underline"
              >
                Sign In
              </span>
            </div>
          </div>
        )}
        {tab === LoginOptions.SEND_EMAIL && <MailNotice />}
      </Card>
    </div>
  );
}
