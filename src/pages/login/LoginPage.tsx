import { useMutation } from '@tanstack/react-query';
import { Divider, Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginApi, setAccessTokenCookie } from '../../+core/services/authentication.service';
import { setUser } from '../../+core/store/reducers/authentication.reducer';
import { handleError } from '../../+core/utilities/failure-handler.utitlity';
import ButtonPrimary from '../../components/ui/button';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';

type LoginInput = {
  password: string;
  email: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [form] = useForm<LoginInput>();
  const dispatch = useDispatch();

  /* Action */
  const loginMutation = useMutation({
    mutationFn: (form: LoginInput) => loginApi(form),
    onSuccess: (resp) => {
      setAccessTokenCookie(resp.data.data.accessToken);
      dispatch(setUser(resp.data.data.user));
      message.success('Đăng Nhập thành công');
      navigate('/dashboard');
    },
    onError: handleError,
  });

  const handleSubmitLogin = async (values: LoginInput) => {
    loginMutation.mutate(values);
  };

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='w-[310px] m-auto'>
        <div className='w-[264px] m-auto mb-10'>
          {/* <img src={} alt='kiwi-login' className='w-full' /> */}
        </div>

        <Form
          name='basic'
          form={form}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmitLogin}
          autoComplete='off'
          // className='flex flex-col gap-4'
        >
          <CustomTextInput<LoginInput>
            name='email'
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
            classNameInput='h-[54px] px-[15px]'
            classNameForm='mb-6'
            placeholder='email'
          />
          <CustomTextInput<LoginInput>
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
            classNameInput='h-[54px] px-[15px]'
            placeholder='password'
            type='password'
            classNameForm='mb-6'
          />

          {/* <Form.Item<LoginInput>
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder='input password'
              name='password'
              className='h-[54px] px-[15px]'
            />
          </Form.Item> */}

          <Form.Item>
            <ButtonPrimary
              //   block
              htmlType='submit'
              loading={loginMutation.isPending}
              title='Đăng nhập'
            />
          </Form.Item>
        </Form>

        <Divider />

        <div></div>
      </div>
    </div>
  );
}
