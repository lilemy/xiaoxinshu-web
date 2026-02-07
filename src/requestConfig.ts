import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
import qs from 'qs';
import addressUtils from "@/utils/addressUtils";

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  data: any;
  message?: string;
}

/**
 * 请求响应处理
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: addressUtils.getBackendHost(),
  withCredentials: true,

  // 处理列表请求参数
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
    });
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      return config;
    },
  ],

// 响应拦截器
  responseInterceptors: [
    (response) => {
      // 请求地址
      const requestPath: string = response.config.url ?? '';

      // 响应
      const {data} = response as unknown as ResponseStructure;
      if (!data) {
        throw new Error('服务异常');
      }

      // 错误码处理
      const code: number = data.code;
      // 未登录，且不为获取用户登录信息接口
      /*      if (
              code === 40100 &&
              !requestPath.includes('user/get/login') &&
              !location.pathname.includes('/user/login')
            ) {
              // 跳转至登录页
              window.location.href = `/user/login?redirect=${window.location.href}`;
              throw new Error('请先登录');
            }*/
      if (code !== 0) {
        throw new Error(data.message ?? '服务器异常');
      }
      return response;
    },
  ],

};
