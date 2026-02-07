import React from "react";
import {Avatar, Col, Flex, Row, Space, Typography} from "antd";
import {GithubFilled, GlobalOutlined} from "@ant-design/icons";
import {Link} from "umi";

const {Text, Title} = Typography;

interface UserInfoProps {
  userInfo?: API.SysLoginUserVo | API.SysUserVo;
  showLogin?: boolean;
}

/**
 * 用户信息
 * @constructor
 */
const UserInfo: React.FC<UserInfoProps> = ({userInfo, showLogin = true}) => {

  return (
    <div>
      {userInfo ? (
        <div>
          {/* 顶部：头像与基本信息 */}
          <Flex gap={16} align="flex-start">
            <Avatar
              size={48}
              src={userInfo.userAvatar}
              style={{border: '1px solid #f0f0f0'}}
            />
            <Flex vertical justify="center" style={{height: 48}}>
              <Space align="center">
                <Title level={3} style={{margin: 0, fontSize: 16}}>
                  {userInfo.userName}
                </Title>
                <a href="https://github.com/lilemy/xiaoxinshu-web" target="_blank">
                  <GithubFilled/>
                </a>
                <a href="https://www.lilemy.cn/" target="_blank">
                  <GlobalOutlined/>
                </a>
              </Space>
              <Text type="secondary" style={{marginTop: 4}}>
                后端 <span style={{color: '#d9d9d9', margin: '0 4px'}}>|</span>{userInfo.userProfile}
              </Text>
            </Flex>
          </Flex>
        </div>
      ) : (
        <div>
          {showLogin ? (
            <Row justify="space-between" align="middle">
              <Col>登录后查看你的信息～</Col>
              <Col>
                <Link to="/user/login">
                  去登录
                </Link>
              </Col>
            </Row>) : (<div></div>)}
        </div>
      )}
    </div>
  )
}

export default UserInfo;
