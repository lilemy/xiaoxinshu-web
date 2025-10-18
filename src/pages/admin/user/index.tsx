import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {listUserByAdminPage} from "@/services/xiaoxinshu/userController";

const UserTableList: React.FC = () => {
  // 新建窗口的弹窗
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  // 更新窗口的弹窗
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(null);
  // 当前选中用户
  const [currentRow, setCurrentRow] = useState<API.UserByAdminVo>();

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
          text: '男',
          status: 'Success',
        },
        1: {
          text: '女',
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
          const { current, pageSize, ...searchParams } = params;
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
    </PageContainer>
  );
};
export default UserTableList;
