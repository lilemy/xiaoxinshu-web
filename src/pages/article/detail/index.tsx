import {useParams} from "@@/exports";
import React, {useEffect, useState} from "react";
import {message} from "antd";
import {getArticleDetail} from "@/services/xiaoxinshu/artArticleController";
import ArticleDetailCard from "@/components/ArticleDetailCard";
import ArticleFloatButton from "@/components/ArticleFloatButton";

/**
 * 文章详情页面
 * @constructor
 */
const ArticleDetailPage: React.FC = () => {
  // 获取路由参数
  const params = useParams();
  const {articleId} = params;
  const [loading, setLoading] = useState<boolean>(false);
  // 获取文章详情
  const [articleDetail, setArticleDetail] = useState<API.ArtArticleDetailVo>();

  // 获取文章数据
  const loadData = async () => {
    setLoading(true)
    if (!articleId) {
      message.error('文章不存在1111');
      return;
    }
    try {
      const res = await getArticleDetail({
        id: articleId as any,
      });
      setArticleDetail(res.data ?? {});
    } catch (e: any) {
      message.error('获取文章详情失败，' + e.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadData().then(() => '');
  }, [articleId]);

  return (
    <div className="max-width-content">
      <ArticleDetailCard article={articleDetail} loading={loading}/>
      <ArticleFloatButton
        id={articleDetail?.id}
        preId={articleDetail?.preArticle?.id}
        nextId={articleDetail?.nextArticle?.id}
      />
    </div>
  );
}

export default ArticleDetailPage;
