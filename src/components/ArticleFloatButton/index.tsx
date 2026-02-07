import React from 'react';
import {FloatButton, message} from "antd";
import {DownSquareOutlined, ShareAltOutlined, UpSquareOutlined} from "@ant-design/icons";
import {Link} from "umi";
import addressUtils from "@/utils/addressUtils";

interface ArticleFloatButtonProps {
  id?: number | string;
  preId?: number | string;
  nextId?: number | string;
}

/**
 * 文章悬浮按钮
 * @constructor
 */
const ArticleFloatButton: React.FC<ArticleFloatButtonProps> = ({id, preId, nextId}) => {

  const baseUrl = addressUtils.getFrontendHost();

  /**
   * 将文章链接复制到剪贴板
   */
  const handleCopy = async () => {
    try {
      const textToCopy = `${baseUrl}/article/${id}`;
      await navigator.clipboard.writeText(textToCopy);
      message.success('已成功复制到剪贴板');
    } catch (err) {
      message.error('复制失败，请手动复制地址');
    }
  };

  return (
    <div>
      <FloatButton.Group shape="square" style={{insetInlineEnd: 94}}>
        {preId && <Link to={`/article/${preId}`}>
          <FloatButton
            key="pre"
            icon={<UpSquareOutlined/>}
            tooltip="上一篇"
          />
        </Link>}
        {nextId && <Link to={`/article/${nextId}`}>
          <FloatButton
            key="next"
            icon={<DownSquareOutlined/>}
            tooltip="下一篇"
          />
        </Link>}
        {id && <FloatButton
          icon={<ShareAltOutlined/>}
          tooltip="分享"
          onClick={handleCopy}
        />}
        <FloatButton.BackTop type="primary" key="top"/>
      </FloatButton.Group>
    </div>
  );
};

export default ArticleFloatButton;
