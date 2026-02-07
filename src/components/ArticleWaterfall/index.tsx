import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Card, Masonry, message, Space, Spin, Tag, Typography} from 'antd';
import {listArticlePage} from "@/services/xiaoxinshu/artArticleController";
import {MasonryItemType} from "antd/es/masonry/MasonryItem";
import {CalendarOutlined, FolderOpenOutlined} from "@ant-design/icons";
import {history} from '@umijs/max';

const {Title, Paragraph} = Typography;

/**
 * 文章瀑布流
 * @constructor
 */
const ArticleWaterfall: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<MasonryItemType<API.ArtArticleVo>[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);

  // 1. 创建一个引用，用于观察底部元素
  const observer = useRef<IntersectionObserver | null>(null);
  // 2. 哨兵元素的 Ref
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return; // 如果正在加载，不观察
    if (observer.current) observer.current.disconnect(); // 断开之前的观察

    observer.current = new IntersectionObserver(entries => {
      // 3. 当哨兵元素进入视口，且还有更多数据时加载
      if (entries[0].isIntersecting && dataSource.length < total) {
        loadData(current + 1).then();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, dataSource.length, total, current]); // 依赖项变化时重新创建观察器

  const loadData = async (page: number) => {
    // 防止重复请求同一页
    if (loading) return;

    setLoading(true);
    try {
      const res = await listArticlePage({
        req: {},
        pageQuery: {
          current: page,
          pageSize: 20,
          sortField: 'createTime',
          sortOrder: 'descend',
        }
      });
      if (res.data) {
        const list = res.data.records || [];
        const formattedList: MasonryItemType<API.ArtArticleVo>[] = list.map((item) => ({
          key: item.id || `${page}-${Math.random()}`, // 优化 Key 防止冲突
          data: item,
        }));

        setDataSource((prev) => (page === 1 ? formattedList : [...prev, ...formattedList]));
        setTotal(res.data.total || 0);
        setCurrent(page);
      }
    } catch (error: any) {
      message.error('文章数据加载失败，' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadData(1).then();
  }, []);

  return (
    <div style={{padding: 20}}>
      <Masonry
        items={dataSource}
        columns={{xs: 1, sm: 2, md: 2, lg: 3}}
        gutter={20}
        itemRender={(item) => {
          const article = item.data;
          return (
            <Card
              hoverable
              variant="outlined"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              styles={{body: {padding: '14px'}}}
              cover={
                article.cover && (
                  <img
                    alt={article.title}
                    src={article.cover}
                    style={{width: '100%', display: 'block', borderBottom: '1px solid #f0f0f0'}}
                  />
                )
              }
              onClick={() => history.push("/article/" + article.id)}
            >
              <div style={{marginBottom: '8px'}}>
                <Space wrap>
                  {article.tagList?.map((tag) => (
                    <Tag key={tag.id} style={{backgroundColor: '#e6f7ff', color: '#1890ff'}}>
                      {tag.name}
                    </Tag>
                  ))}
                </Space>
              </div>
              <Title level={5} style={{marginTop: 0, marginBottom: '8px', fontSize: '20px', fontWeight: 600}}>
                {article.title}
              </Title>
              <Paragraph ellipsis={{rows: 2}} style={{color: '#666', fontSize: '14px'}}>
                {article.summary}
              </Paragraph>
              <Space size={10} style={{color: '#999', fontSize: '12px'}} wrap>
                <span><FolderOpenOutlined/> {article.categoryList?.map(c => c.name).join('、') || '无分类'}</span>
                <span><CalendarOutlined/> {article.createTime}</span>
              </Space>
            </Card>
          );
        }}
      />

      {/* 4. 哨兵元素和状态提示 */}
      <div ref={lastElementRef} style={{textAlign: 'center', marginTop: 32, paddingBottom: 20}}>
        {loading && <Spin tip="正在加载更多文章..."/>}
        {!loading && dataSource.length >= total && dataSource.length > 0 && (
          <span style={{color: '#ccc'}}>— 已经到底啦 —</span>
        )}
      </div>
    </div>
  );
};

export default ArticleWaterfall;
