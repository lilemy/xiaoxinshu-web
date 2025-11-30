import {ProColumns, ProTable} from '@ant-design/pro-components';
import {message, Modal} from 'antd';
import React from 'react';
import {createArticleTag} from "@/services/xiaoxinshu/artArticleTagController";

interface Props {
  modalVisible: boolean;
  columns: ProColumns<API.ArtArticleTagVo>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * @zh-CN 创建标签分类
 * @param fields
 */
const handleCreate = async (fields: API.ArtArticleTagCreateRequest) => {
  const hide = message.loading('正在创建');
  try {
    await createArticleTag({
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
      <ProTable<API.ArtArticleTagVo, API.PageArtArticleTagVo>
        columns={columns}
        type="form"
        onSubmit={async (value) => {
          const success = await handleCreate(value as API.ArtArticleTagCreateRequest);
          if (success) {
            onSubmit?.();
          }
        }}
      />
    </Modal>
  );
};

export default CreatForm;
