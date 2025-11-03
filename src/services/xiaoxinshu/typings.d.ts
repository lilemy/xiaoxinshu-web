declare namespace API {
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

  type BaseResponseArtArticleCategoryVo = {
    /** 响应状态码 */
    code?: number;
    data?: ArtArticleCategoryVo;
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

  type BaseResponseLong = {
    /** 响应状态码 */
    code?: number;
    /** 响应数据 */
    data?: number;
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

  type deleteUserParams = {
    id: number;
  };

  type getArticleCategoryParams = {
    id: number;
  };

  type getUserByAdminParams = {
    id: number;
  };

  type getUserVoParams = {
    id: number;
  };

  type listArticleCategoryPageParams = {
    req: ArtArticleCategoryQueryRequest;
    pageQuery: PageQuery;
  };

  type listUserByAdminPageParams = {
    req: SysUserQueryRequest;
    pageQuery: PageQuery;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
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
