import {PageContainer} from '@ant-design/pro-components';
import {Card} from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer className="max-width-content">
      <Card
        style={{
          borderRadius: 8,
        }}
      >
      </Card>
    </PageContainer>
  );
};

export default Welcome;
