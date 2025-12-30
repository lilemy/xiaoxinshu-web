declare namespace API {
  type ArtArticleArchiveDetailVo = {
    /** id */
    id?: number;
    /** 文章标题 */
    title?: string;
    /** 文章封面 */
    cover?: string;
    /** 文章摘要 */
    summary?: string;
    /** 创建时间 */
    createTime?: string;
    /** 发布的月份 */
    createMonth?: {
      year?: number;
      month?:
        | "JANUARY"
        | "FEBRUARY"
        | "MARCH"
        | "APRIL"
        | "MAY"
        | "JUNE"
        | "JULY"
        | "AUGUST"
        | "SEPTEMBER"
        | "OCTOBER"
        | "NOVEMBER"
        | "DECEMBER";
      monthValue?: number;
      leapYear?: boolean;
    };
  };

  type ArtArticleArchiveVo = {
    /** 归档的月份 */
    month?: {
      year?: number;
      month?:
        | "JANUARY"
        | "FEBRUARY"
        | "MARCH"
        | "APRIL"
        | "MAY"
        | "JUNE"
        | "JULY"
        | "AUGUST"
        | "SEPTEMBER"
        | "OCTOBER"
        | "NOVEMBER"
        | "DECEMBER";
      monthValue?: number;
      leapYear?: boolean;
    };
    /** 归档的文章列表 */
    detailList?: ArtArticleArchiveDetailVo[];
  };

  type ArtArticleByCategoryQueryRequest = {
    /** 分类 id */
    categoryId: number;
  };

  type ArtArticleByCategoryVo = {
    /** id */
    id?: number;
    /** 文章标题 */
    title?: string;
    /** 文章封面 */
    cover?: string;
    /** 文章摘要 */
    summary?: string;
    /** 创建时间 */
    createTime?: string;
    /** 标签列表 */
    tagList?: ArtArticleTagVo[];
  };

  type ArtArticleByTagQueryRequest = {
    /** 标签 id */
    tagId: number;
  };

  type ArtArticleByTagVo = {
    /** id */
    id?: number;
    /** 文章标题 */
    title?: string;
    /** 文章封面 */
    cover?: string;
    /** 文章摘要 */
    summary?: string;
    /** 创建时间 */
    createTime?: string;
    /** 分类列表 */
    categoryList?: ArtArticleCategoryVo[];
  };

  type ArtArticleCategoryCreateRequest = {
    /** 分类名称 */
    name: string;
    /** 排序 */
    sort: number;
  };

  type ArtArticleCategoryQueryRequest = {
    /** 分类名称 */
    name?: string;
  };

  type ArtArticleCategoryUpdateRequest = {
    /** id */
    id: number;
    /** 分类名称 */
    name?: string;
    /** 排序 */
    sort?: number;
  };

  type ArtArticleCategoryVo = {
    /** id */
    id?: number;
    /** 分类名称 */
    name?: string;
    /** 排序 */
    sort?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ArtArticleCreateRequest = {
    /** 文章标题 */
    title: string;
    /** 文章封面 */
    cover?: string;
    /** 文章摘要 */
    summary?: string;
    /** 文章内容 */
    content: string;
    /** 文章分类 id */
    categoryIds: number[];
    /** 文章标签 */
    tags: string[];
  };

  type ArtArticleQueryRequest = {
    /** 文章标题 */
    title?: string;
    /** 文章摘要 */
    summary?: string;
    /** 分类 id 列表 */
    categoryIdList?: number[];
    /** 标签 id 列表 */
    tagIdList?: number[];
  };

  type ArtArticleTagCreateRequest = {
    /** 标签名称 */
    name: string;
  };

  type ArtArticleTagQueryRequest = {
    /** 标签名称 */
    name?: string;
  };

  type ArtArticleTagUpdateRequest = {
    /** id */
    id: number;
    /** 标签名称 */
    name: string;
  };

  type ArtArticleTagVo = {
    /** id */
    id?: number;
    /** 标签名称 */
    name?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ArtArticleUpdateRequest = {
    /** id */
    id: number;
    /** 文章标题 */
    title: string;
    /** 文章封面 */
    cover?: string;
    /** 文章摘要 */
    summary?: string;
    /** 文章内容 */
    content: string;
    /** 文章分类 id */
    categoryIds: number[];
    /** 文章标签 */
    tags: string[];
  };

  type ArtArticleVo = {
    /** id */
    id?: number;
    /** 文章标题 */
    title?: string;
    /** 文章封面 */
    cover?: string;
    /** 文章摘要 */
    summary?: string;
    /** 文章内容 */
    content?: string;
    /** 用户 id */
    userId?: number;
    /** 编辑时间 */
    editTime?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 阅读次数 */
    readNum?: number;
    /** 分类列表 */
    categoryList?: ArtArticleCategoryVo[];
    /** 分类 id 列表 */
    categoryIdList?: number[];
    /** 标签列表 */
    tagList?: ArtArticleTagVo[];
    /** 标签 id 列表 */
    tagIdList?: number[];
  };

  type BaseResponseArtArticleCategoryVo = {
    /** 响应状态码 */
    code?: number;
    data?: ArtArticleCategoryVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseArtArticleTagVo = {
    /** 响应状态码 */
    code?: number;
    data?: ArtArticleTagVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseArtArticleVo = {
    /** 响应状态码 */
    code?: number;
    data?: ArtArticleVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseBoolean = {
    /** 响应状态码 */
    code?: number;
    /** 响应数据 */
    data?: boolean;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseListArtArticleCategoryVo = {
    /** 响应状态码 */
    code?: number;
    /** 响应数据 */
    data?: ArtArticleCategoryVo[];
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseListArtArticleTagVo = {
    /** 响应状态码 */
    code?: number;
    /** 响应数据 */
    data?: ArtArticleTagVo[];
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseLong = {
    /** 响应状态码 */
    code?: number;
    /** 响应数据 */
    data?: number;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponsePageArtArticleArchiveVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageArtArticleArchiveVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponsePageArtArticleByCategoryVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageArtArticleByCategoryVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponsePageArtArticleByTagVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageArtArticleByTagVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponsePageArtArticleCategoryVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageArtArticleCategoryVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponsePageArtArticleTagVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageArtArticleTagVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponsePageArtArticleVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageArtArticleVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponsePageSysUserByAdminVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageSysUserByAdminVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseSysLoginUserVo = {
    /** 响应状态码 */
    code?: number;
    data?: SysLoginUserVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseSysUserByAdminVo = {
    /** 响应状态码 */
    code?: number;
    data?: SysUserByAdminVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseSysUserVo = {
    /** 响应状态码 */
    code?: number;
    data?: SysUserVo;
    /** 响应信息 */
    message?: string;
  };

  type deleteArticleCategoryParams = {
    id: number;
  };

  type deleteArticleParams = {
    id: number;
  };

  type deleteArticleTagParams = {
    id: number;
  };

  type deleteUserParams = {
    id: number;
  };

  type getArticleCategoryParams = {
    id: number;
  };

  type getArticleParams = {
    id: number;
  };

  type getArticleTagParams = {
    id: number;
  };

  type getUserByAdminParams = {
    id: number;
  };

  type getUserVoParams = {
    id: number;
  };

  type listArticleArchivePageParams = {
    req: ArtArticleQueryRequest;
    pageQuery: PageQuery;
  };

  type listArticleByCategoryPageParams = {
    req: ArtArticleByCategoryQueryRequest;
    pageQuery: PageQuery;
  };

  type listArticleByTagPageParams = {
    req: ArtArticleByTagQueryRequest;
    pageQuery: PageQuery;
  };

  type listArticleCategoryPageParams = {
    req: ArtArticleCategoryQueryRequest;
    pageQuery: PageQuery;
  };

  type listArticleCategoryParams = {
    req: ArtArticleCategoryQueryRequest;
  };

  type listArticlePageParams = {
    req: ArtArticleQueryRequest;
    pageQuery: PageQuery;
  };

  type listArticleTagPageParams = {
    req: ArtArticleTagQueryRequest;
    pageQuery: PageQuery;
  };

  type listArticleTagParams = {
    req: ArtArticleTagQueryRequest;
  };

  type listUserByAdminPageParams = {
    req: SysUserQueryRequest;
    pageQuery: PageQuery;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageArtArticleArchiveVo = {
    records?: ArtArticleArchiveVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageArtArticleArchiveVo;
    searchCount?: PageArtArticleArchiveVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageArtArticleByCategoryVo = {
    records?: ArtArticleByCategoryVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageArtArticleByCategoryVo;
    searchCount?: PageArtArticleByCategoryVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageArtArticleByTagVo = {
    records?: ArtArticleByTagVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageArtArticleByTagVo;
    searchCount?: PageArtArticleByTagVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageArtArticleCategoryVo = {
    records?: ArtArticleCategoryVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageArtArticleCategoryVo;
    searchCount?: PageArtArticleCategoryVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageArtArticleTagVo = {
    records?: ArtArticleTagVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageArtArticleTagVo;
    searchCount?: PageArtArticleTagVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageArtArticleVo = {
    records?: ArtArticleVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageArtArticleVo;
    searchCount?: PageArtArticleVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuery = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认降序） */
    sortOrder?: string;
  };

  type PageSysUserByAdminVo = {
    records?: SysUserByAdminVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageSysUserByAdminVo;
    searchCount?: PageSysUserByAdminVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type SysLoginUserVo = {
    /** id */
    id?: number;
    /** 账号 */
    userAccount?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户手机号 */
    userPhone?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户性别(0未知 1男 2女) */
    userGender?: number;
    /** 用户生日 */
    userBirthday?: string;
    /** 用户角色(0用户 1管理员) */
    userRole?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type SysUserByAdminVo = {
    /** id */
    id?: number;
    /** 账号 */
    userAccount?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户手机号 */
    userPhone?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户性别(0未知 1男 2女) */
    userGender?: number;
    /** 用户生日 */
    userBirthday?: string;
    /** 用户角色(0用户 1管理员) */
    userRole?: number;
    /** 备注 */
    remark?: string;
    /** 编辑时间 */
    editTime?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type SysUserCreateRequest = {
    /** 账号 */
    userAccount: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户手机号 */
    userPhone?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户性别(0未知 1男 2女) */
    userGender?: number;
    /** 用户生日 */
    userBirthday?: string;
    /** 用户角色(0用户 1管理员) */
    userRole?: number;
    /** 备注 */
    remark?: string;
  };

  type SysUserLoginRequest = {
    /** 账号 */
    userAccount: string;
    /** 密码 */
    userPassword: string;
  };

  type SysUserQueryRequest = {
    /** 账号 */
    userAccount?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户手机号 */
    userPhone?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户性别(0未知 1男 2女) */
    userGender?: number;
    /** 用户生日 */
    userBirthday?: string;
    /** 用户角色(0用户 1管理员) */
    userRole?: number;
  };

  type SysUserRegisterRequest = {
    /** 账号 */
    userAccount: string;
    /** 密码 */
    userPassword: string;
    /** 确认密码 */
    checkPassword: string;
  };

  type SysUserUpdateRequest = {
    /** id */
    id: number;
    /** 账号 */
    userAccount?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户手机号 */
    userPhone?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户性别(0未知 1男 2女) */
    userGender?: number;
    /** 用户生日 */
    userBirthday?: string;
    /** 用户角色(0用户 1管理员) */
    userRole?: number;
    /** 备注 */
    remark?: string;
  };

  type SysUserVo = {
    /** id */
    id?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户手机号 */
    userPhone?: string;
    /** 用户邮箱 */
    userEmail?: string;
    /** 用户性别(0未知 1男 2女) */
    userGender?: number;
    /** 用户生日 */
    userBirthday?: string;
    /** 用户角色(0用户 1管理员) */
    userRole?: number;
  };
}
