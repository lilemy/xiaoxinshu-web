import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, GetProp, message, Popconfirm, Space, Typography, Upload, UploadProps} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import CreateForm from "@/pages/admin/user/components/CreateForm";
import UpdateForm from "@/pages/admin/user/components/UpdateForm";
import {deleteUser, listUserByAdminPage} from "@/services/xiaoxinshu/sysUserController";
import {uploadFile} from "@/services/xiaoxinshu/sysOssController";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

/**
 * 图片上传前校验
 * @param file 图片
 */
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 文件!').then();
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('图片大小不能超过 5MB!').then();
  }
  return isJpgOrPng && isLt2M;
};


const SysUserTableList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // 新建窗口的弹窗
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  // 更新窗口的弹窗
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(null);
  // 当前选中用户
  const [currentRow, setCurrentRow] = useState<API.SysUserByAdminVo>();
  // 用于控制表单内图片的预览显示
  const [imageUrl, setImageUrl] = useState<string>();

  /**
   * @zh-CN 删除用户
   *
   * @param user
   */
  const handleDelete = async (user: API.SysUserByAdminVo) => {
    const hide = message.loading('正在删除');
    if (!user.id) return true;
    try {
      await deleteUser({
        id: user.id,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.SysUserByAdminVo>[] = [
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
      width: 80,
      renderFormItem: (_, {}, form) => {
        const value = form.getFieldValue('userAvatar');
        return (
          <Upload
            fileList={
              value
                ? [{
                  uid: '-1',
                  name: 'avatar.png',
                  status: 'done',
                  url: value,
                }]
                : []
            }
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const {file, onSuccess, onError} = options;
              try {
                setLoading(true);
                const res = await uploadFile({prefix: 'avatar'}, file as File);
                if (res.code === 0 && res.data) {
                  const url = res.data;
                  // 将结果同步到 ProForm 表单字段中
                  form.setFieldValue('userAvatar', url);
                  // 通知组件上传成功
                  onSuccess?.(res.data);
                  // 更新本地预览状态
                  setImageUrl(res.data);
                } else {
                  onError?.(new Error(res.message));
                  message.error("上传失败：" + res.message);
                }
              } catch (error) {
                onError?.(error as any);
              } finally {
                setLoading(false);
              }
            }}
          >
            {imageUrl ? (
              <img draggable={false} src={imageUrl} alt="avatar" style={{width: '100%'}}/>
            ) : (
              <button style={{border: 0, background: 'none'}} type="button">
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{marginTop: 8}}>上传头像</div>
              </button>
            )}
          </Upload>
        )
      }
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
    },
    {
      title: '手机号码',
      dataIndex: 'userPhone',
      valueType: 'text',
    },
    {
      title: '邮箱',
      dataIndex: 'userEmail',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'userGender',
      valueEnum: {
        0: {
          text: '未知',
          status: 'Default',
        },
        1: {
          text: '女',
          status: 'Success',
        },
        2: {
          text: '男',
          status: 'Warning',
        },
      },
      width: 100,
    },
    {
      title: '用户生日',
      sorter: true,
      dataIndex: 'userBirthday',
      valueType: 'date',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: {
        0: {
          text: '用户',
          status: 'Default',
        },
        1: {
          text: '管理员',
          status: 'Success',
        },
      },
      width: 100,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 150,
    },
    {
      title: '编辑时间',
      sorter: true,
      dataIndex: 'editTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 150,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key="config"
            onClick={() => {
              setCurrentRow(record);
              setImageUrl(record.userAvatar)
              handleUpdateModalOpen(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title={`是否删除用户-${record.userName}？`}
            onConfirm={async () => {
              await handleDelete(record)
              actionRef.current?.reload();
            }}
            onCancel={() => {

            }}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link
              type="danger"
            >
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SysUserByAdminVo, API.PageSysUserByAdminVo>
        headerTitle={'用户信息'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{x: 1200}}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setImageUrl('');
              handleCreateModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          // 从 ProTable 获取分页和搜索条件
          const {current, pageSize, ...searchParams} = params;
          const {data, code} = await listUserByAdminPage({
            req: {
              ...searchParams,
              ...filter,
            },
            pageQuery: {
              current: current,
              pageSize: pageSize,
              sortField,
              sortOrder,
            },
          } as API.listUserByAdminPageParams);
          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateForm
        modalVisible={createModalOpen}
        columns={columns}
        onSubmit={() => {
          handleCreateModalOpen(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          handleCreateModalOpen(false);
        }}
      />
      <UpdateForm
        modalVisible={updateModalOpen}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          handleUpdateModalOpen(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
        }}
      />
    </PageContainer>
  );
};
export default SysUserTableList;
