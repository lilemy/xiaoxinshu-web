import {ProColumns, ProTable} from '@ant-design/pro-components';
import {message, Modal} from 'antd';
import React from 'react';
import {createArticleCategory} from "@/services/xiaoxinshu/artArticleCategoryController";

interface Props {
  modalVisible: boolean;
  columns: ProColumns<API.ArtArticleCategoryVo>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * @zh-CN 创建文章分类
 * @param fields
 */
const handleCreate = async (fields: API.ArtArticleCategoryCreateRequest) => {
  const hide = message.loading('正在创建');
  try {
    await createArticleCategory({
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
    <Modal title={'新建'} open={modalVisible} destroyOnHidden footer={null} onCancel={onCancel}>
      <ProTable<API.ArtArticleCategoryVo, API.PageArtArticleCategoryVo>
        columns={columns}
        type="form"
        onSubmit={async (value) => {
          const success = await handleCreate(value as API.ArtArticleCategoryCreateRequest);
          if (success) {
            onSubmit?.();
          }
        }}
      />
    </Modal>
  );
};

export default CreatForm;
