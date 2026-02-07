import React from 'react';
import 'md-editor-rt/lib/style.css';
import {message} from 'antd';
import {MdEditor, ToolbarNames} from "md-editor-rt";
import {uploadFile} from "@/services/xiaoxinshu/sysOssController";

// 引入扩展组件
import {Emoji} from "@vavt/rt-extension";
import '@vavt/rt-extension/lib/asset/Emoji.css';

interface MdEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: number;
}

/**
 * 自定义 markdown 编辑器
 * @param value 文本内容
 * @param onChange 文本内容改变回调
 * @param height 高度
 * @constructor
 */
const CustomMdEditor: React.FC<MdEditorProps> = ({value, onChange, height}) => {

  /**
   * 图片上传
   * @param files 文件列表
   * @param callback 回调
   */
  const onUploadImg = async (files: File[], callback: (urls: string[]) => void) => {
    try {
      const uploadTasks = files.map(async (file) => {
        const res = await uploadFile({prefix: 'markdown'}, file);
        return res.data;
      });
      const urls = (await Promise.all(uploadTasks)).filter((url): url is string => !!url);
      callback(urls);
    } catch (error) {
      message.error('图片上传失败');
    }
  };

  // 定义工具栏的展示顺序
  const toolbars: ToolbarNames[] = [
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'katex',
    0, // 表情
    '-',
    'revoke',
    'next',
    '=',
    'prettier',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'catalog',
  ];

  return (
    <MdEditor
      value={value || ''}
      onChange={onChange}
      onUploadImg={onUploadImg}
      style={{height: height || 500}}
      // 注册扩展工具栏组件
      defToolbars={[
        <Emoji key="emoji-extension"/>
      ]}
      // 应用工具栏配置
      toolbars={toolbars}
    />
  );
};

export default CustomMdEditor;
