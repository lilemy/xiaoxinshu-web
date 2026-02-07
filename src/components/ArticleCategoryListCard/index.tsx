import React from "react";
import {Typography} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

interface ArticleCategoryListCardProps {
  categoryList?: API.ArtArticleCategoryVo[] | API.ArtArticleCategoryNameVo[];
}

/**
 * 文章分类列表卡片
 * @constructor
 */
const ArticleCategoryListCard: React.FC<ArticleCategoryListCardProps> = ({categoryList}) => {

  return (
    <div>
      {categoryList ? (
        <div>
          <Title level={5}>文章分类</Title>
          <div>
            {categoryList.map((item) => (
              <div key={item.id} style={{marginBottom: '2px'}}>
                <FolderOpenOutlined style={{marginRight: '4px'}}/>
                <Text key={item.id}>{item.name}</Text>
              </div>
            ))}
          </div>
        </div>
      ) : (<div></div>)}
    </div>
  );
}

export default ArticleCategoryListCard;
