// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取文章标签信息 GET /art/article/tag/${param0} */
export async function getArticleTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleTagParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseArtArticleTagVo>(
    `/art/article/tag/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 删除文章标签信息（仅管理员） DELETE /art/article/tag/${param0} */
export async function deleteArticleTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteArticleTagParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean>(`/art/article/tag/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 创建文章标签信息（仅管理员） POST /art/article/tag/create */
export async function createArticleTag(
  body: API.ArtArticleTagCreateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/art/article/tag/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章标签信息列表 GET /art/article/tag/list */
export async function listArticleTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticleTagParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListArtArticleTagVo>("/art/article/tag/list", {
    method: "GET",
    params: {
      ...params,
      req: undefined,
      ...params["req"],
    },
    ...(options || {}),
  });
}

/** 分页获取文章标签信息 GET /art/article/tag/page */
export async function listArticleTagPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticleTagPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArtArticleTagVo>("/art/article/tag/page", {
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

/** 更新文章标签信息（仅管理员） PUT /art/article/tag/update */
export async function updateArticleTag(
  body: API.ArtArticleTagUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/art/article/tag/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
