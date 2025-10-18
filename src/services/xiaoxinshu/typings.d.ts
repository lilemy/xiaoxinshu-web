declare namespace API {
  type BaseResponseBoolean = {
    /** 响应状态码 */
    code?: number;
    /** 响应数据 */
    data?: boolean;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseLoginUserVo = {
    /** 响应状态码 */
    code?: number;
    data?: LoginUserVo;
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

  type BaseResponsePageUserByAdminVo = {
    /** 响应状态码 */
    code?: number;
    data?: PageUserByAdminVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseUserByAdminVo = {
    /** 响应状态码 */
    code?: number;
    data?: UserByAdminVo;
    /** 响应信息 */
    message?: string;
  };

  type BaseResponseUserVo = {
    /** 响应状态码 */
    code?: number;
    data?: UserVo;
    /** 响应信息 */
    message?: string;
  };

  type getUserByAdminParams = {
    id: number;
  };

  type getUserVoParams = {
    id: number;
  };

  type listUserByAdminPageParams = {
    req: UserQueryRequest;
    pageQuery: PageQuery;
  };

  type LoginUserVo = {
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

  type OrderItem = {
    column?: string;
    asc?: boolean;
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

  type PageUserByAdminVo = {
    records?: UserByAdminVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserByAdminVo;
    searchCount?: PageUserByAdminVo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type UserByAdminVo = {
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

  type UserLoginRequest = {
    /** 账号 */
    userAccount: string;
    /** 密码 */
    userPassword: string;
  };

  type UserQueryRequest = {
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

  type UserRegisterRequest = {
    /** 账号 */
    userAccount: string;
    /** 密码 */
    userPassword: string;
    /** 确认密码 */
    checkPassword: string;
  };

  type UserVo = {
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
