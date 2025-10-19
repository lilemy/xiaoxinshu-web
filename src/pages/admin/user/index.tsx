import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, message, Popconfirm, Space, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {deleteUser, listUserByAdminPage} from "@/services/xiaoxinshu/userController";
import CreateForm from "@/pages/admin/user/components/CreateForm";
import UpdateForm from "@/pages/admin/user/components/UpdateForm";

const UserTableList: React.FC = () => {
  // 新建窗口的弹窗
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  // 更新窗口的弹窗
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(null);
  // 当前选中用户
  const [currentRow, setCurrentRow] = useState<API.UserByAdminVo>();

  /**
   * @zh-CN 删除用户
   *
   * @param user
   */
  const handleDelete = async (user: API.UserByAdminVo) => {
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

  const columns: ProColumns<API.UserByAdminVo>[] = [
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
              handleUpdateModalOpen(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title={`是否删除用户${record.userName}？`}
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
      <ProTable<API.UserByAdminVo, API.PageUserByAdminVo>
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
export default UserTableList;
