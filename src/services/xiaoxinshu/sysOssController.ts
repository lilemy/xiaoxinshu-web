// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 文件删除 DELETE /sys/oss */
export async function deleteFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFileParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseVoid>("/sys/oss", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 文件上传 POST /sys/oss/upload */
export async function uploadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileParams,
  file: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();
  formData.append("file", file);
  return request<API.BaseResponseString>("/sys/oss/upload", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    ...(options || {}),
  });
}
