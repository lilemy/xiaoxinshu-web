import React, {useEffect, useRef, useState} from "react";
import {Card, Col, Divider, message, Row, Space} from "antd";
import {ProForm} from "@ant-design/pro-form";
import {ProFormInstance, ProFormSelect, ProFormText} from '@ant-design/pro-components';
import UploadImage from "@/components/UploadImage";
import {listArticleCategory} from "@/services/xiaoxinshu/artArticleCategoryController";
import {createArticle, getArticle, updateArticle} from "@/services/xiaoxinshu/artArticleController";
import {listArticleTag} from "@/services/xiaoxinshu/artArticleTagController";
import MdEditor from "@/components/MdEditor";
import {Footer} from "@/components";
import {history, Link, useParams} from "@@/exports";

/**
 * 新增文章页面
 * @constructor
 */
const AddArticlePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance | null>(null);
  const [categoryList, setCategoryList] = useState<API.ArtArticleCategoryVo[]>([]);
  const [tagList, setTagList] = useState<API.ArtArticleTagVo[]>([]);
  // 获取路由参数
  const params = useParams();
  const {articleId} = params;

  /**
   * 文章新建修改提交表单
   * @param value 表单数据
   */
  const onSubmitFrom = async (value: API.ArtArticleCreateRequest | API.ArtArticleUpdateRequest) => {
    setLoading(true);
    try {
      if (articleId) {
        await updateArticle({
          id: articleId as any,
          ...value
        });
        message.success('文章修改成功');
        setTimeout(() => {
          history.push(`/personal/article/${articleId}`);
        }, 1000);
      } else {
        await createArticle(value);
        message.success('新文章创建成功');
        formRef.current?.resetFields();
      }
    } catch (e: any) {
      message.error(articleId ? '修改失败，' : '创建失败，' + e.message);
    } finally {
      setLoading(false);
    }

  };

  /**
   获取文章分类
   */
  const loadCategoryList = async () => {
    setLoading(true);
    try {
      const res = await listArticleCategory({
        req: {}
      });
      setCategoryList(res.data ?? []);
    } catch (e: any) {
      message.error('获取文章分类失败，' + e.message);
    }
    setLoading(false);
  };

  /**
   获取文章标签
   */
  const loadTagList = async () => {
    setLoading(true);
    try {
      const res = await listArticleTag({
        req: {}
      });
      setTagList(res.data ?? []);
    } catch (e: any) {
      message.error('获取文章标签失败，' + e.message);
    }
  }

  useEffect(() => {
    loadCategoryList().then();
    loadTagList().then();
  }, []);

  const categoryOptions = categoryList.map(c => ({value: c.id, label: c.name}));
  const tagOptions = tagList.map(t => ({value: t.id, label: t.name}));

  return (
    <div style={{padding: '24px', background: '#f5f7fa', minHeight: '100vh'}}>
      <div className="max-width-content" style={{margin: '0 auto'}}>
        <ProForm<API.ArtArticleCreateRequest | API.ArtArticleUpdateRequest>
          formRef={formRef}
          onFinish={async (value) => {
            await onSubmitFrom(value);
          }}
          submitter={{
            render: (_, dom) => (
              <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                background: '#fff', padding: '12px 24px',
                display: 'flex', justifyContent: 'flex-end',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.05)', zIndex: 100
              }}>
                <Space>{dom[0]}{dom[1]}</Space>
              </div>
            ),
            searchConfig: {submitText: articleId ? '修改文章' : '发布文章'}
          }}
          layout="vertical"
          request={async () => {
            if (!articleId) {
              return {} as API.ArtArticleUpdateRequest;
            }
            try {
              const res = await getArticle({
                id: articleId as any,
                contentResultType: 2
              });
              const detail = res.data;
              if (!detail) return {} as API.ArtArticleUpdateRequest;
              return {
                ...detail,
                categoryIdList: detail.categoryList?.map((item: any) => item.id) || [],
                tagIdList: detail.tagList?.map((item: any) => item.id) || [],
              } as API.ArtArticleUpdateRequest;
            } catch (e: any) {
              message.error('获取详情失败');
              return {} as API.ArtArticleUpdateRequest;
            }
          }}
        >
          <Row gutter={24}>
            {/* 左侧主要编辑区 */}
            <Col xs={24} lg={17}>
              <Card
                loading={loading}
                title="基础信息"
                extra={articleId && <Link to={`/personal/article/${articleId}`}>返回详情</Link>}
                style={{borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}
              >
                {/* 标题输入框 */}
                <ProFormText
                  name="title"
                  placeholder="请输入文章标题（2-50字）"
                  fieldProps={{
                    size: 'large',
                    bordered: false,
                    style: {fontSize: 24, fontWeight: 'bold', padding: '0 0 12px 0'}
                  }}
                  rules={[{required: true, message: '请输入标题'}]}
                />
                <Divider style={{margin: '0 0 24px 0'}}/>

                <ProFormText
                  name="summary"
                  label="摘要"
                  placeholder="好的摘要能吸引更多读者..."
                  rules={[{required: true}]}
                />

                <ProForm.Item
                  name="content"
                  rules={[{required: true, message: '请输入文章内容'}]}
                >
                  <MdEditor height={650}/>
                </ProForm.Item>
              </Card>
            </Col>

            {/* 右侧配置区 */}
            <Col xs={24} lg={7}>
              <Space orientation="vertical" size="middle" style={{width: '100%'}}>
                <Card
                  loading={loading}
                  title="发布设置"
                  variant="borderless"
                  style={{borderRadius: 8}}
                >
                  <ProForm.Item
                    label="文章封面"
                    name="cover"
                    tooltip="推荐尺寸 4:3 或 16:9"
                  >
                    <UploadImage
                      prefix="article"
                      // 上传成功后更新表单值
                      onChange={(url) => {
                        formRef.current?.setFieldsValue({cover: url});
                      }}
                    />
                  </ProForm.Item>

                  <ProFormSelect
                    name="categoryIdList"
                    label="所属分类"
                    mode="multiple"
                    options={categoryOptions}
                    placeholder="请选择分类"
                    rules={[{required: true, message: '请选择分类'}]}
                  />

                  <ProFormSelect
                    name="tagIdList"
                    label="添加标签"
                    mode="tags"
                    options={tagOptions}
                    placeholder="输入回车添加标签"
                  />
                </Card>

                <Card
                  loading={loading}
                  title="创作说明"
                  variant="borderless"
                  style={{borderRadius: 8, fontSize: 13, color: '#666'}}
                >
                  <ul style={{paddingLeft: 18, lineHeight: '24px'}}>
                    <li>请勿发布违反社区规范的内容。</li>
                    <li>优质的封面和摘要能显著提升推荐量。</li>
                    <li>建议给文章添加 3-5 个精准标签。</li>
                  </ul>
                </Card>

                <Footer/>
              </Space>
            </Col>
          </Row>
          <div style={{height: '60px'}}/>
        </ProForm>
      </div>
    </div>
  );
};

export default AddArticlePage;
