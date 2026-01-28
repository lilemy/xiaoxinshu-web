import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Image, message, Popconfirm, Space, Tag, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import CreateForm from "@/pages/admin/article/components/CreateForm";
import UpdateForm from "@/pages/admin/article/components/UpdateForm";
import {deleteArticle, getArticleDetail, listArticlePage} from "@/services/xiaoxinshu/artArticleController";
import {listArticleCategory} from "@/services/xiaoxinshu/artArticleCategoryController";
import {listArticleTag} from "@/services/xiaoxinshu/artArticleTagController";
import DetailForm from "@/pages/admin/article/components/DetailForm";
import {history} from "@@/exports";

const ArtArticleTableList: React.FC = () => {
  // 新建窗口的弹窗
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  // 更新窗口的弹窗
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  // 详情窗口的弹窗
  const [detailModalOpen, handleDetailModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(null);
  // 当前选中文章
  const [currentRow, setCurrentRow] = useState<API.ArtArticleVo>();
  // 文章详情数据
  const [articleDetail, setArticleDetail] = useState<API.ArtArticleDetailVo>();

  /**
   * @zh-CN 获取文章
   */
  const loadDetail = async (id: number) => {
    if (!id) {
      message.error('文章不存在');
      return;
    }
    try {
      const data = await getArticleDetail({id: id});
      setArticleDetail(data.data);
    } catch (error: any) {
      message.error('获取详情失败' + error.message);
    }
  };

  /**
   * @zh-CN 删除文章
   *
   * @param article
   */
  const handleDelete = async (article: API.ArtArticleVo) => {
    const hide = message.loading('正在删除');
    if (!article.id) return true;
    try {
      await deleteArticle({
        id: article.id,
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

  const columns: ProColumns<API.ArtArticleVo>[] = [
    {
      title: '文章标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '文章分类',
      dataIndex: 'categoryIdList',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },
      request: async () => {
        try {
          const res = await listArticleCategory({} as API.listArticleCategoryParams);
          if (!res.data) {
            return [];
          }
          return res.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
        } catch (e: any) {
          message.error("获取文章分类失败", e.message);
          return [];
        }
      },
    },
    {
      title: '文章标签',
      dataIndex: 'tagIdList',
      render: (_, record) => (
        <Space>
          {record.tagList?.map((item: any) => (
            <Tag color="blue" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </Space>
      ),
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },
      request: async () => {
        try {
          const res = await listArticleTag({} as API.listArticleTagParams);
          if (!res.data) {
            return [];
          }
          return res.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
        } catch (e: any) {
          message.error("获取文章标签失败", e.message);
          return [];
        }
      },
    },
    {
      title: '文章摘要',
      dataIndex: 'summary',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '文章封面',
      dataIndex: 'cover',
      valueType: 'image',
      width: 180,
      hideInSearch: true,
      render: (_, record) => (
        <div>
          {record.cover ?
            <Image
              src={record.cover}
              width={150}
              style={{borderRadius: '8px', objectFit: 'cover'}}
              placeholder={true}
            /> : <div>-</div>}
        </div>
      ),
    },
    {
      title: '编辑时间',
      sorter: true,
      dataIndex: 'editTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 160,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 160,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 160,
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
              loadDetail(record.id || 0).then(() => {
                handleDetailModalOpen(true);
              })
            }}
          >
            详情
          </Typography.Link>
          <Typography.Link
            key="config"
            type="warning"
            onClick={() => {
              setCurrentRow(record);
              handleUpdateModalOpen(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title={`是否删除文章-${record.title}？`}
            onConfirm={async () => {
              await handleDelete(record)
              actionRef.current?.reload();
            }}
            onCancel={() => {
              actionRef.current?.reload();
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
      <ProTable<API.ArtArticleVo, API.PageArtArticleVo>
        headerTitle={'文章信息'}
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
              history.push('/add/article')
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
          const {data, code} = await listArticlePage({
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
          } as API.listArticlePageParams);
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
      <DetailForm
        articleDetail={articleDetail}
        modalVisible={detailModalOpen}
        onCancel={() => {
          handleDetailModalOpen(false);
        }}
      />
    </PageContainer>
  );
};
export default ArtArticleTableList;
