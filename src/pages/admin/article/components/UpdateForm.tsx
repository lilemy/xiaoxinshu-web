import {ProColumns, ProTable} from '@ant-design/pro-components';
import {message, Modal} from 'antd';
import React from 'react';
import {updateArticle} from "@/services/xiaoxinshu/artArticleController";

interface Props {
  oldData?: API.ArtArticleVo;
  modalVisible: boolean;
  columns: ProColumns<API.ArtArticleVo>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * @zh-CN 更新文章
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ArtArticleUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateArticle(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败' + error.message);
    return false;
  }
};

const UpdateForm: React.FC<Props> = (props) => {
  const {oldData, modalVisible, columns, onSubmit, onCancel} = props;

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal title={'更新文章'} open={modalVisible} destroyOnHidden footer={null} onCancel={onCancel}>
      <ProTable<API.ArtArticleVo, API.PageArtArticleVo>
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        type="form"
        onSubmit={async (values) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id ?? 0,
          } as API.ArtArticleUpdateRequest);
          if (success) {
            onSubmit?.();
          }
        }}
      />
    </Modal>
  );
};

export default UpdateForm;
