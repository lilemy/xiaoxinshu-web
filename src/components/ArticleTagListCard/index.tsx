import React from "react";
import {Space, Tag, Typography} from "antd";

const {Title} = Typography;

interface ArticleTagListCardProps {
  tagList?: API.ArtArticleTagVo[] | API.ArtArticleTagNameVo[];
}

/**
 * 文章标签列表卡片
 * @constructor
 */
const ArticleTagListCard: React.FC<ArticleTagListCardProps> = ({tagList}) => {

  // 随机颜色
  const customColor = ['#2db7f5', '#87d068', '#f69a69', '#108ee9', '#722ed1'];

  return (
    <div>
      {tagList ? (
        <div>
          <Title level={5}>文章标签</Title>
          <Space wrap>
            {tagList.map((item, index) => (
              <Tag key={item.id} color={customColor[index % customColor.length]}>
                {item.name}
              </Tag>
            ))}
          </Space>
        </div>
      ) : (<div></div>)}
    </div>
  );
}

export default ArticleTagListCard;
