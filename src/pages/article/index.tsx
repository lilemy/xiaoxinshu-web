import React, {useEffect} from "react";
import {Card, Col, Row} from "antd";
import {Link} from "@umijs/max";
import {GridContent} from "@ant-design/pro-layout";
import ArticleWaterfall from "@/components/ArticleWaterfall";
import {Footer} from "@/components";
import UserInfoCard from "@/components/UserInfoCard";
import {getLoginUser} from "@/services/xiaoxinshu/sysUserController";

/**
 * 文章主页
 * @constructor
 */
const ArticleIndexPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  // 当前登录用户
  const [loginUserVO, setLoginUserVO] = React.useState<API.SysLoginUserVo>();

  // 获取当前用户
  const loginUser = async () => {
    setLoading(true);
    try {
      const res = await getLoginUser();
      setLoginUserVO(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loginUser().then(() => '');
  }, []);

  return (
    <GridContent className="max-width-content">
      <Row gutter={24}>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Card
            title="文章主页"
            extra={<Link to="/add/article">新增文章</Link>}
          >
            <ArticleWaterfall/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Card loading={loading} styles={{body: {padding: '16px'}}}>
            <UserInfoCard userInfo={loginUserVO}/>
          </Card>
          <br/>
          <Footer/>
        </Col>
      </Row>
    </GridContent>
  );
};
export default ArticleIndexPage;
