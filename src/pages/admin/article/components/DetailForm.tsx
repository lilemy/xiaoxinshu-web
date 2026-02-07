import {Modal} from 'antd';
import React from 'react';
import ArticleDetailCard from "@/components/ArticleDetailCard";

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

  return (
    <Modal title={'文章详情'} open={modalVisible} destroyOnHidden footer={null} onCancel={onCancel} width={1200}>
      <ArticleDetailCard article={articleDetail} showRelated={false} showRight={false}/>
    </Modal>
  );
};

export default DetailForm;
