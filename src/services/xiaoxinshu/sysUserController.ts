// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取用户信息 GET /sys/user/${param0} */
export async function getUserVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSysUserVo>(`/sys/user/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除用户信息（仅管理员） DELETE /sys/user/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean>(`/sys/user/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户信息（仅管理员） GET /sys/user/byAdmin/${param0} */
export async function getUserByAdmin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByAdminParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseSysUserByAdminVo>(
    `/sys/user/byAdmin/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 分页获取用户信息（仅管理员） GET /sys/user/byAdmin/page */
export async function listUserByAdminPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserByAdminPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSysUserByAdminVo>(
    "/sys/user/byAdmin/page",
    {
      method: "GET",
      params: {
        ...params,
        req: undefined,
        ...params["req"],
        pageQuery: undefined,
        ...params["pageQuery"],
      },
      ...(options || {}),
    }
  );
}

/** 创建用户信息（仅管理员） POST /sys/user/create */
export async function createUser(
  body: API.SysUserCreateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/sys/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前登录用户 GET /sys/user/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseSysLoginUserVo>("/sys/user/login", {
    method: "GET",
    ...(options || {}),
  });
}

/** 用户登录 POST /sys/user/login */
export async function userLogin(
  body: API.SysUserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSysLoginUserVo>("/sys/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注销 POST /sys/user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/sys/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 用户注册 POST /sys/user/register */
export async function userRegister(
  body: API.SysUserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/sys/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息（仅管理员） PUT /sys/user/update */
export async function updateUser(
  body: API.SysUserUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/sys/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
