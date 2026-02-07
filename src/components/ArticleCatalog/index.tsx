import React, {useEffect, useState} from 'react';
import {Anchor, Card} from 'antd';
import type {AnchorLinkItemProps} from 'antd/es/anchor/Anchor';
import {UnorderedListOutlined} from "@ant-design/icons";

interface ArticleCatalogProps {
  /** 文章内容的 HTML 字符串，用于触发目录更新 */
  htmlContent: string;
  /** 包含文章内容的容器 Ref */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** 距离顶部偏移量（用于避开固定导航栏） */
  offsetTop?: number;
}

/**
 * 文章目录
 * @param htmlContent 文章内容的 HTML 字符串
 * @param containerRef 容器 Ref
 * @param offsetTop 距离顶部偏移量
 * @constructor
 */
const ArticleCatalog: React.FC<ArticleCatalogProps> = ({htmlContent, containerRef, offsetTop = 10}) => {
  const [items, setItems] = useState<AnchorLinkItemProps[]>([]);

  useEffect(() => {
    if (!containerRef.current || !htmlContent) return;

    // 1. 获取容器内所有带 id 的标题标签
    const headerNodes = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocItems: AnchorLinkItemProps[] = [];

    // 辅助栈：用于处理嵌套逻辑
    const itemStack: { level: number; item: AnchorLinkItemProps }[] = [];

    headerNodes.forEach((node) => {
      const id = node.getAttribute('id');
      if (!id) return; // 如果没有 ID 则跳过

      const level = parseInt(node.tagName.replace('H', ''), 10);
      const newItem: AnchorLinkItemProps = {
        key: id,
        href: `#${id}`,
        title: (node as HTMLElement).innerText,
        children: [],
      };

      // 2. 构建嵌套树逻辑
      while (itemStack.length > 0 && itemStack[itemStack.length - 1].level >= level) {
        itemStack.pop();
      }

      if (itemStack.length === 0) {
        tocItems.push(newItem);
      } else {
        const parent = itemStack[itemStack.length - 1].item;
        parent.children = parent.children || [];
        parent.children.push(newItem);
      }

      itemStack.push({level, item: newItem});
    });

    setItems(tocItems);
  }, [htmlContent, containerRef]); // 只有当 HTML 内容变化时才重新提取

  if (items.length === 0) return null;

  return (
    <Card
      title={<div><UnorderedListOutlined/> 目录</div>}
      size="small"
      styles={{body: {padding: '0 12px'}}}
      variant="outlined"
    >
      <Anchor
        affix={false}
        targetOffset={offsetTop}
        items={items}
        style={{maxHeight: '70vh', overflowY: 'auto'}}
      />
    </Card>
  );
};

export default ArticleCatalog;
