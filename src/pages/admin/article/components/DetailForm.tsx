import {ProDescriptions} from '@ant-design/pro-components';
import {Image, Modal, Space, Tag} from 'antd';
import React from 'react';
import {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import {MdPreview} from "md-editor-rt";

interface Props {
  articleDetail?: API.ArtArticleDetailVo;
  modalVisible: boolean;
  onCancel: () => void;
}

const DetailForm: React.FC<Props> = (props) => {
  const {articleDetail, modalVisible, onCancel} = props;

  if (!articleDetail) {
    return <></>;
  }

  const columns: ProDescriptionsItemProps<API.ArtArticleDetailVo>[] = [
    {
      title: '文章标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '文章摘要',
      dataIndex: 'summary',
      valueType: 'text',
    },
    {
      title: '文章分类',
      dataIndex: 'categoryIdList',
      valueType: 'select',
      render: (_, record) => (
        <Space>
          {record.categoryList?.map((item: any) => (
            <Tag color="blue" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '文章分类',
      dataIndex: 'categoryIdList',
      valueType: 'select',
      render: (_, record) => (
        <Space>
          {record.categoryList?.map((item: any) => (
            <Tag color="blue" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '文章封面',
      dataIndex: 'cover',
      valueType: 'image',
      span: 2,
      render: (url) => (
        <Image
          src={url as string}
          width={300}
          style={{borderRadius: '8px', objectFit: 'cover'}}
          placeholder={true}
        />
      ),
    },
    {
      title: '文章内容',
      span: 2,
      render: (_, record) => (
        <div style={{
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          marginTop: '8px',
          maxHeight: '500px',
          overflowY: 'auto'
        }}>
          {/* 使用 md-editor-rt 的预览组件 */}
          <MdPreview value={record.content || ''}/>
        </div>
      ),
    },
    {
      title: '编辑时间',
      dataIndex: 'editTime',
      valueType: 'dateTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    }
  ]

  return (
    <Modal title={'文章详情'} open={modalVisible} destroyOnHidden footer={null} onCancel={onCancel} width={1200}>
      <ProDescriptions<API.ArtArticleDetailVo>
        column={2}
        columns={columns}
        dataSource={articleDetail}
      />
    </Modal>
  );
};

export default DetailForm;
