import {InboxOutlined, LoadingOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {message, Upload} from 'antd';
import React, {useEffect, useState} from 'react';
import {deleteFile, uploadFile} from "@/services/xiaoxinshu/sysOssController";
import Dragger from "antd/es/upload/Dragger";

interface UploadImageProps {
  prefix: string;
  value?: string;
  onChange?: (url?: string) => void;
  maxSize?: number; // MB
}

/**
 * 图片上传
 * @param prefix 文件前缀
 * @param value 图片地址
 * @param onChange 图片上传成功后的回调
 * @param maxSize 图片大小限制
 * @constructor
 */
const UploadImage: React.FC<UploadImageProps> = ({prefix, value, onChange,  maxSize = 5}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  /**
   * 文件上传前校验
   * @param file  文件
   */
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件').then();
      return Upload.LIST_IGNORE;
    }

    const isLtSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtSize) {
      message.error(`图片不能超过 ${maxSize}MB`).then();
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  /**
   * 自定义上传
   * @param file  文件
   * @param onSuccess 上传成功
   * @param onError 上传失败
   */
  const customUpload: UploadProps['customRequest'] = async ({file, onSuccess, onError}) => {
    try {
      setLoading(true);
      // 如果已经存在旧图片，先删除旧图片
      if (imageUrl) {
        try {
          await deleteFile({url: imageUrl});
        } catch (err) {
          console.error("旧图片删除失败"+ err);
        }
      }
      // 上传新图片
      const res = await uploadFile({prefix: prefix}, file as File);
      const url = res.data;
      setImageUrl(url);
      onChange?.(url);
      onSuccess?.({}, new XMLHttpRequest());
    } catch (e: any) {
      message.error('上传失败，' + e.message);
      onError?.(e as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{width: '100%'}}>
      <Dragger
        name="file"
        accept="image/*"
        multiple={false}
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={customUpload}
        style={{
          padding: imageUrl ? 0 : '20px',
          overflow: 'hidden',
          width: '100%',
          borderRadius: '8px'
        }}
      >
        {imageUrl ? (
          <div style={{position: 'relative', width: '100%'}}>
            <img
              src={imageUrl}
              alt="cover"
              style={{
                width: '100%',
                display: 'block',
                maxHeight: '240px',
                objectFit: 'cover'
              }}
            />
            {/* 悬浮提示 */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.45)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s',
            }}
                 onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                 onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            >
              点击或拖拽更换图片
            </div>
          </div>
        ) : (
          <div>
            <p className="ant-upload-drag-icon" style={{marginBottom: '2px'}}>
              {loading ? <LoadingOutlined/> : <InboxOutlined style={{color: '#1890ff'}}/>}
            </p>
            <p className="ant-upload-text" style={{fontSize: '14px'}}>
              {loading ? '上传中...' : '点击或拖拽上传图片'}
            </p>
            <p className="ant-upload-hint" style={{fontSize: '12px', color: '#999'}}>
              支持单次上传，最大 {maxSize}MB
            </p>
          </div>
        )}
      </Dragger>
    </div>
  );
};

export default UploadImage;
