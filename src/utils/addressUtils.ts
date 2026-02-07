import {BACKEND_HOST_LOCAL, BACKEND_HOST_PROD, FRONTEND_HOST_LOCAL, FRONTEND_HOST_PROD} from "@/constants";

const isDev = process.env.NODE_ENV === 'development';

/**
 * 获取前端地址
 */
const getFrontendHost = () => {
  return isDev ? FRONTEND_HOST_LOCAL : FRONTEND_HOST_PROD;
};

/**
 * 获取后端地址
 */
const getBackendHost = () => {
  return isDev ? BACKEND_HOST_LOCAL : BACKEND_HOST_PROD;
};

export default {getFrontendHost, getBackendHost};
