import {Layout, Card, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const siderStyle = {
  textAlign: 'left',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '16px',
};

export default function AppSider () {
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card >
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  )
}