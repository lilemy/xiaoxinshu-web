import {GridContent} from '@ant-design/pro-layout';
import {Card, Col, Image, message, Row} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React, {useEffect, useState} from 'react';
import {getLoginUser} from "@/services/xiaoxinshu/sysUserController";
import {Meta} from "antd/es/list/Item";
import {history} from '@umijs/max';
import AccountArticleList from "@/pages/account/center/components/AccountArticleList";

/**
 * 个人中心
 * @constructor
 */
const AccountCenterPage: React.FC = () => {
  // 当前登录用户
  const [loginUserVO, setLoginUserVO] = React.useState<API.SysLoginUserVo>();
  const [loading, setLoading] = React.useState(false);
  // 菜单栏
  const [activeTabKey, setActiveTabKey] = useState<string>('article');

  // 获取当前用户
  const loginUser = async () => {
    setLoading(true);
    try {
      const res = await getLoginUser();
      setLoginUserVO(res.data);
    } catch (e: any) {
      message.error(e.message);
      history.push('/user/login')
    }
    setLoading(false);
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: string) => {
    if (tabValue === 'article') {
      return <AccountArticleList/>;
    }
    return null;
  };

  useEffect(() => {
    loginUser().then(() => '');
  }, []);

  return (
    <GridContent className="max-width-content">
      <Row gutter={24}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Card loading={loading} variant={'outlined'}>
            <div style={{textAlign: 'center', marginBottom: '24px'}}>
              {loginUserVO?.userAvatar ? (
                <Image width={104} src={loginUserVO?.userAvatar}/>
              ) : (
                <img width={104} alt="userAvatar" src="/logo.svg"/>
              )}
              <Title style={{marginTop: '20px'}} level={3}>
                {loginUserVO?.userName}
              </Title>
              <Meta
                description={
                  <>
                    <Paragraph type="secondary">{loginUserVO?.userProfile}</Paragraph>
                  </>
                }
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Card
            tabList={[
              {
                key: 'article',
                label: '我的文章',
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          >
            {renderChildrenByTabKey(activeTabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default AccountCenterPage;
