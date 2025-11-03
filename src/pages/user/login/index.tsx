import {Footer} from '@/components';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Helmet, Link, useModel} from '@umijs/max';
import {App, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import Settings from '../../../../config/defaultSettings';
import {userLogin} from "@/services/xiaoxinshu/sysUserController";

const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const {message} = App.useApp();
  const handleSubmit = async (values: API.SysUserLoginRequest) => {
    try {
      // 登录
      const res = await userLogin({
        ...values,
      });
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // 保存已登录用户信息
        setInitialState({
          ...initialState,
          currentUser: res?.data
        })
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get('redirect') || '/';
        return;
      }
      // 如果失败去设置用户错误信息
    } catch (error: any) {
      const defaultLoginFailureMessage = `登录失败，${error.message}！`;
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="小新书"
          subTitle={'一个分享和探索编程知识的地方'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.SysUserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号密码登录',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'账号:'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'密码:'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <Link to='/user/register'>新用户注册</Link>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
