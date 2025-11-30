import {ProColumns, ProTable} from '@ant-design/pro-components';
import {message, Modal} from 'antd';
import React from 'react';
import {updateArticleTag} from "@/services/xiaoxinshu/artArticleTagController";

interface Props {
  oldData?: API.ArtArticleTagVo;
  modalVisible: boolean;
  columns: ProColumns<API.ArtArticleTagVo>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * @zh-CN 更新文章标签
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ArtArticleTagUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateArticleTag(fields);
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
    <Modal title={'更新'} open={modalVisible} destroyOnHidden footer={null} onCancel={onCancel}>
      <ProTable<API.ArtArticleTagVo, API.PageArtArticleTagVo>
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        type="form"
        onSubmit={async (values) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id ?? 0,
          } as API.ArtArticleTagUpdateRequest);
          if (success) {
            onSubmit?.();
          }
        }}
      />
    </Modal>
  );
};

export default UpdateForm;
