// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取文章信息 GET /art/article/${param0} */
export async function getArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseArtArticleVo>(`/art/article/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 删除文章信息 DELETE /art/article/${param0} */
export async function deleteArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteArticleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean>(`/art/article/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取个人文章信息 GET /art/article/account/page */
export async function listArticlePageByUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticlePageByUserParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArtArticleVo>(
    "/art/article/account/page",
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

/** 分页获取文章归档信息 GET /art/article/archive/page */
export async function listArticleArchivePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticleArchivePageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArtArticleArchiveVo>(
    "/art/article/archive/page",
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

/** 根据文章分类分页获取文章信息 GET /art/article/category/page */
export async function listArticleByCategoryPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticleByCategoryPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArtArticleByCategoryVo>(
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

/** 创建文章信息 POST /art/article/create */
export async function createArticle(
  body: API.ArtArticleCreateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/art/article/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章详情信息 GET /art/article/detail/${param0} */
export async function getArticleDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleDetailParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseArtArticleDetailVo>(
    `/art/article/detail/${param0}`,
    {
      method: "GET",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取文章信息 GET /art/article/page */
export async function listArticlePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticlePageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArtArticleVo>("/art/article/page", {
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

/** 根据文章标签分页获取文章信息 GET /art/article/tag/page */
export async function listArticleByTagPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listArticleByTagPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageArtArticleByTagVo>(
    "/art/article/tag/page",
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

/** 更新文章信息 PUT /art/article/update */
export async function updateArticle(
  body: API.ArtArticleUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/art/article/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
