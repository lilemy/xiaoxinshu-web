import React from "react";
import {Card, Col, Row} from "antd";
import {Link} from "@umijs/max";
import {GridContent} from "@ant-design/pro-layout";

/**
 * 文章主页
 * @constructor
 */
const ArticleIndex: React.FC = () => {
  return (
    <GridContent className="max-width-content">
      <Row gutter={24}>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Card
            title="文章主页"
            extra={<Link to="/add/article">新增文章</Link>}
          >
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Card title="文章列表">
            <Link to="/admin/article">文章列表</Link>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default ArticleIndex;
