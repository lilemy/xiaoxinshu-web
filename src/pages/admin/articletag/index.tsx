import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, message, Popconfirm, Space, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import CreateForm from "@/pages/admin/articletag/components/CreateForm";
import UpdateForm from "@/pages/admin/articletag/components/UpdateForm";
import {deleteArticleTag, listArticleTagPage} from "@/services/xiaoxinshu/artArticleTagController";

const ArtArticleTagTableList: React.FC = () => {
  // 新建窗口的弹窗
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  // 更新窗口的弹窗
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(null);
  // 当前选中文章标签
  const [currentRow, setCurrentRow] = useState<API.ArtArticleTagVo>();

  /**
   * @zh-CN 删除文章标签
   *
   * @param articleTag
   */
  const handleDelete = async (articleTag: API.ArtArticleTagVo) => {
    const hide = message.loading('正在删除');
    if (!articleTag.id) return true;
    try {
      await deleteArticleTag({
        id: articleTag.id,
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

  const columns: ProColumns<API.ArtArticleTagVo>[] = [
    {
      title: '标签名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
            title={`是否删除文章标签-${record.name}？`}
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
      <ProTable<API.ArtArticleTagVo, API.PageArtArticleTagVo>
        headerTitle={'文章标签信息'}
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
          const {data, code} = await listArticleTagPage({
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
          } as API.listArticleTagPageParams);
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
export default ArtArticleTagTableList;
