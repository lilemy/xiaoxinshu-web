import {ProColumns, ProTable} from '@ant-design/pro-components';
import {message, Modal} from 'antd';
import React from 'react';
import {createArticle} from "@/services/xiaoxinshu/artArticleController";

interface Props {
  modalVisible: boolean;
  columns: ProColumns<API.ArtArticleVo>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * @zh-CN 创建文章分类
 * @param fields
 */
const handleCreate = async (fields: API.ArtArticleCreateRequest) => {
  const hide = message.loading('正在创建');
  try {
    await createArticle({
      ...fields,
    });
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败，' + error.message);
    return false;
  }
};

const CreatForm: React.FC<Props> = (props) => {
  const {columns, modalVisible, onCancel, onSubmit} = props;

  return (
    <Modal title={'更新文章'} open={modalVisible} destroyOnHidden footer={null} onCancel={onCancel}>
      <ProTable<API.ArtArticleVo, API.PageArtArticleVo>
        columns={columns}
        type="form"
        onSubmit={async (value) => {
          const success = await handleCreate(value as API.ArtArticleCreateRequest);
          if (success) {
            onSubmit?.();
          }
        }}
      />
    </Modal>
  );
};

export default CreatForm;
