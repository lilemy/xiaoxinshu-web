// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取用户信息 GET /user/${param0} */
export async function getUserVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseUserVo>(`/user/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户信息（仅管理员） GET /user/byAdmin/${param0} */
export async function getUserByAdmin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByAdminParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseUserByAdminVo>(`/user/byAdmin/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取用户信息（仅管理员） GET /user/byAdmin/page */
export async function listUserByAdminPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserByAdminPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserByAdminVo>("/user/byAdmin/page", {
    method: "GET",
    params: {
      ...params,
      req: undefined,
      ...params["req"],
      pageQuery: undefined,
      ...params["pageQuery"],
    },
    ...(options || {}),
  });
}

/** 获取当前登录用户 GET /user/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVo>("/user/login", {
    method: "GET",
    ...(options || {}),
  });
}

/** 用户登录 POST /user/login */
export async function userLogin(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVo>("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注销 POST /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 用户注册 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
