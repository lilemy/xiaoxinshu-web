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

const CustomMdEditor: React.FC<MdEditorProps> = ({value, onChange, height}) => {

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

  // 3. 定义工具栏的展示顺序，'emoji' 是我们自定义的 key
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
    'mermaid',
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
