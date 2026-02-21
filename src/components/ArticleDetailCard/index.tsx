import React, {useEffect, useRef} from "react";
import {Affix, Card, Col, Divider, Flex, Row, Skeleton, Space, Tag, Typography} from "antd";
import NoFoundPage from "@/pages/404";
import {CalendarOutlined, EyeOutlined, FolderOpenOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'
import styles from './articleDetail.module.css';
import UserInfoCard from "@/components/UserInfoCard";
import ArticleCategoryListCard from "@/components/ArticleCategoryListCard";
import ArticleTagListCard from "@/components/ArticleTagListCard";
import {history} from "@@/core/history";
import ArticleCatalog from "@/components/ArticleCatalog";
import {Link} from "umi";

const {Text, Title} = Typography;

interface ArticleDetailCardProps {

  /**
   * 文章详情
   */
  article?: API.ArtArticleDetailVo;

  /**
   * 列表跳转地址
   * 1 主页列表
   * 2 个人列表
   */
  listJump?: number;

  /**
   * 是否显示上下篇文章
   */
  showRelated?: boolean;

  /**
   * 是否显示右侧
   */
  showRight?: boolean;

  /**
   * 是否加载中
   */
  loading?: boolean;
}

/**
 * 文章详情卡片
 * @constructor
 */
const ArticleDetailCard: React.FC<ArticleDetailCardProps> = (props) => {
  const {article, listJump = 1, showRelated = true, showRight = true, loading = false} = props;

  /**
   * 数据加载时，显示骨架屏
   */
  if (loading) {
    return (
      <Row gutter={24}>
        <Col span={18}>
          <Card>
            <Skeleton active paragraph={{rows: 15}}/>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Skeleton active avatar paragraph={{rows: 4}}/>
          </Card>
        </Col>
      </Row>
    );
  }

  if (!article) {
    return <NoFoundPage/>;
  }

  const contentRef = useRef<HTMLDivElement>(null);
  // 随机颜色
  const customColor = ['green', 'cyan', 'blue', 'geekblue', 'purple'];

  // 跳转逻辑
  const handleNavigate = (id?: number | string) => {
    if (id) {
      history.push(`/article/${id}`);
    }
  };

  useEffect(() => {
    // 只有当有内容时才执行高亮
    if (article?.content && contentRef.current) {
      const blocks = contentRef.current.querySelectorAll('pre code');
      blocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [article?.content]); // 监听内容变化

  return (
    <div>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={showRight ? 18 : 24} lg={showRight ? 18 : 24} xl={showRight ? 18 : 24}>
          <Card>
            <div>
              <Flex align="start" justify="space-between">
                <Title level={1} style={{fontSize: '2.2rem', fontWeight: 700}}>{article.title}</Title>
                {listJump === 1 && <Link to={"/article"}>返回列表</Link>}
                {listJump === 2 && <Link to={"/account/center"}>返回列表</Link>}
              </Flex>
              <Flex gap="middle" wrap="wrap" style={{marginBottom: 32, color: '#999'}}>
                <Space size={4}>
                  <CalendarOutlined/>
                  <Text type="secondary">发表于 {article.createTime}</Text>
                </Space>
                <Space size={4}>
                  <FolderOpenOutlined/>
                  <Text type="secondary">分类于</Text>
                  {article.categoryList?.map((item) => (
                    <Text key={item.id} style={{color: '#1890ff', cursor: 'pointer'}}>{item.name}</Text>
                  ))}
                </Space>
                <Space size={4}>
                  <EyeOutlined/>
                  <Text type="secondary">阅读量 {article.readNum}</Text>
                </Space>
              </Flex>
              <div className="article-container">
                <div
                  ref={contentRef}
                  className={`${styles.articleContent} mt-5`}
                  dangerouslySetInnerHTML={{__html: article.content ? article.content : "无内容"}}
                />
              </div>
              <div style={{marginTop: 40}}>
                <Space size={12}>
                  {article.tagList?.map((item, index) => (
                    <Tag
                      key={item.id}
                      variant="outlined"
                      icon={<span>#</span>}
                      color={customColor[index % customColor.length]}
                      style={{padding: '4px 12px', borderRadius: 15, fontSize: 14, border: 'none'}}
                    >
                      {item.name}
                    </Tag>
                  ))}
                </Space>
              </div>
            </div>
            {article && showRelated && (
              <div style={{marginTop: 30}}>
                <Divider/>
                <Row justify="space-between" align="middle">
                  <Col span={11}>
                    {article.preArticle ? (
                      <div
                        style={{cursor: 'pointer', textAlign: 'left'}}
                        onClick={() => handleNavigate(article.preArticle?.id)}
                      >
                        <div style={{color: '#8c8c8c', marginBottom: 8}}>
                          <LeftOutlined/> 上一篇
                        </div>
                        <div style={{
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: '#1677ff'
                        }}>
                          {article.preArticle.title}
                        </div>
                      </div>
                    ) : (
                      <div style={{color: '#d9d9d9'}}>没有上一篇了</div>
                    )}
                  </Col>

                  <Col span={2} style={{textAlign: 'center'}}>
                    <Divider orientation="vertical" style={{height: 40}}/>
                  </Col>

                  <Col span={11}>
                    {article.nextArticle ? (
                      <div
                        style={{cursor: 'pointer', textAlign: 'right'}}
                        onClick={() => handleNavigate(article.nextArticle?.id)}
                      >
                        <div style={{color: '#8c8c8c', marginBottom: 8}}>
                          下一篇 <RightOutlined/>
                        </div>
                        <div style={{
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: '#1677ff'
                        }}>
                          {article.nextArticle.title}
                        </div>
                      </div>
                    ) : (
                      <div style={{color: '#d9d9d9', textAlign: 'right'}}>没有下一篇了</div>
                    )}
                  </Col>
                </Row>
              </div>
            )}
          </Card>
        </Col>
        {showRight && <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Affix offsetTop={40}>
            <Space orientation="vertical" size="middle" style={{display: 'flex'}}>
              <ArticleCatalog
                htmlContent={article?.content || ""}
                containerRef={contentRef}
              />
              <Card
                styles={{body: {padding: '16px'}}}
              >
                <UserInfoCard userInfo={article?.user} showLogin={false}/>
              </Card>
              <Card>
                <ArticleCategoryListCard categoryList={article?.categoryList}/>
              </Card>
              <Card>
                <ArticleTagListCard tagList={article?.tagList}/>
              </Card>
            </Space>
          </Affix>
        </Col>}
      </Row>

    </div>
  );
}

export default ArticleDetailCard;
