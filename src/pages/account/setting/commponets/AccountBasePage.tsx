import {ProFormText, ProFormTextArea} from '@ant-design/pro-components';
import {ProForm, ProFormInstance} from '@ant-design/pro-form/lib';
import {message} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import useStyles from './index.style';
import {getLoginUser, updateUser} from "@/services/xiaoxinshu/sysUserController";
import UploadImage from "@/components/UploadImage";

const AccountBasePage: React.FC = () => {
  const {styles} = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance | null>(null);
  const [loginUser, setLoginUser] = useState<API.SysLoginUserVo>({});

  const handleFinish = async (value: API.SysUserUpdateRequest) => {
    setLoading(true);
    try {
      const res = await updateUser(value);
      message.success('更新信息成功');
      if (res.data) {
        await getLoginUserMes()
      }
    } catch (e: any) {
      message.error('更新信息失败，' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const getLoginUserMes = async () => {
    setLoading(true);
    try {
      const res = await getLoginUser();
      setLoginUser(res.data ?? {});
    } catch (e: any) {
      message.error('获取用户信息错误，' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoginUserMes().then(() => '');
  }, []);

  useEffect(() => {
    formRef.current?.resetFields();
  }, [loginUser]);

  return (
    <div className={styles.baseView}>
      <ProForm
        loading={loading}
        formRef={formRef}
        layout="vertical"
        onFinish={async (value) => {
          await handleFinish({
            id: loginUser?.id as number,
            ...value,
          });
        }}
        submitter={{
          searchConfig: {
            submitText: '更新基本信息',
          },
        }}
        initialValues={{...loginUser}}
      >
        <ProFormText width="lg" name="userName" label="昵称"/>
        <ProFormTextArea name="userProfile" label="个人简介" placeholder="个人简介"/>
        <ProForm.Item
          label="头像"
          name="userAvatar"
        >
          <UploadImage
            prefix="avatar"
            // 上传成功后更新表单值
            onChange={(url) => {
              formRef.current?.setFieldsValue({cover: url});
            }}
          />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};
export default AccountBasePage;
