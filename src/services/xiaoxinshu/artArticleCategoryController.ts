// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取文章分类信息 GET /art/article/category/${param0} */
export async function getArticleCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleCategoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseArtArticleCategoryVo>(
    `/art/article/category/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 删除文章分类信息（仅管理员） DELETE /art/article/category/${param0} */
export async function deleteArticleCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteArticleCategoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean>(`/art/article/category/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 创建文章分类信息（仅管理员） POST /art/article/category/create */
export async function createArticleCategory(
  body: API.ArtArticleCategoryCreateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/art/article/category/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章分类信息列表 GET /art/article/category/list */
export async function listArticleCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticleCategoryParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListArtArticleCategoryVo>(
    "/art/article/category/list",
    {
      method: "GET",
      params: {
        ...params,
        req: undefined,
        ...params["req"],
      },
      ...(options || {}),
    }
  );
}

/** 分页获取文章分类信息 GET /art/article/category/page */
export async function listArticleCategoryPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticleCategoryPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArtArticleCategoryVo>(
    "/art/article/category/page",
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

/** 更新文章分类信息（仅管理员） PUT /art/article/category/update */
export async function updateArticleCategory(
  body: API.ArtArticleCategoryUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/art/article/category/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
