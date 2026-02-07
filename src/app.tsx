import {AvatarDropdown, Footer} from '@/components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {history} from '@umijs/max';
import {requestConfig} from './requestConfig';
import defaultSettings from "../config/defaultSettings";
import {getLoginUser} from "@/services/xiaoxinshu/sysUserController";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<InitialState> {
  const initialState: InitialState = {
    currentUser: undefined,
  }
  // 如果不是登录页面，执行
  const {location} = history;
  if (!location.pathname.startsWith(loginPath) && !location.pathname.startsWith(registerPath)) {
    // 获取当前登录用户
    try {
      const res = await getLoginUser();
      initialState.currentUser = res.data;
    } catch (e: any) {
      /*      message.error(e.message);
            history.push(loginPath);*/
    }
  }
  return initialState;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    avatarProps: {
      src: initialState?.currentUser?.userAvatar,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    footerRender: () => <Footer/>,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...defaultSettings
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
