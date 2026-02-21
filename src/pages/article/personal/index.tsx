import React, {useEffect, useState} from "react";
import {useParams} from "@@/exports";
import {message} from "antd";
import {getArticleDetail} from "@/services/xiaoxinshu/artArticleController";
import ArticleDetailCard from "@/components/ArticleDetailCard";

/**
 * 个人文章详情
 * @constructor
 */
const ArticlePersonalPage: React.FC = () => {

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
      message.error('文章不存在');
      return;
    }
    try {
      const res = await getArticleDetail({
        id: articleId as any,
        contentResultType: 1,
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
      <ArticleDetailCard
        article={articleDetail}
        listJump={2}
        loading={loading}
        showRelated={false}
        showRight={false}
      />
    </div>
  )
}

export default ArticlePersonalPage;
