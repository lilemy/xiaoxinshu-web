import {history} from '@@/core/history';
import {ProColumns, ProTable} from '@ant-design/pro-components';
import {message, Space, Tag, Typography} from 'antd';
import React from "react";
import {listArticlePageByUser} from "@/services/xiaoxinshu/artArticleController";
import {listArticleTag} from "@/services/xiaoxinshu/artArticleTagController";
import {listArticleCategory} from "@/services/xiaoxinshu/artArticleCategoryController";

/**
 * 个人文章列表
 * @constructor
 */
const AccountArticleList = () => {

  const columns: ProColumns<API.ArtArticleVo>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '图片',
      dataIndex: 'cover',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
      width: 80,
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
          message.error("获取文章分类失败" + e.message);
          return [];
        }
      },
    },
    {
      title: '文章标签',
      dataIndex: 'tagIdList',
      render: (_, record) => (
        <Space wrap>
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
          message.error("获取文章标签失败" + e.message);
          return [];
        }
      },
    },
    {
      title: '编辑时间',
      sorter: true,
      dataIndex: 'editTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              history.push(`/update/article/${record.id}`);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              history.push(`/personal/article/${record.id}`);
            }}
          >
            查看详情
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <ProTable<API.ArtArticleVo, API.PageArtArticleVo>
        rowKey="id"
        options={false}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          // 从 ProTable 获取分页和搜索条件
          const {current, pageSize, ...searchParams} = params;
          const {data, code} = await listArticlePageByUser({
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
      />
    </div>
  );
};

export default AccountArticleList;
