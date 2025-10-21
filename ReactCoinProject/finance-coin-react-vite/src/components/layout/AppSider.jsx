import {Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import  {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {capitalizeFirstLetter} from '../../utils';
import { useContext } from 'react';
import CryptoContext from '../../context/СryptoContext';

const siderStyle = {
  padding: '16px',
};

export default function AppSider() {
  const { assets } = useContext(CryptoContext);
  

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: 16 }}>
          <Statistic
            title={capitalizeFirstLetter(asset.id)}
            value={asset.totalAmount}
            precision={3}
            valueStyle={{ color:  asset.grow ? '#3f8600' : '#cf1322'}}
            prefix={ asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            dataSource={[
              {title: 'Total Profit', value: asset.totalProfit, withTag: true},
              {title: 'Asset Profit', value: asset.amount, isPlain: true},
              // {title: 'Difference', value: asset.growPercent}
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                      <Tag color={asset.grow ? 'green' : 'red'} >
                        {asset.growPercent}%
                      </Tag>
                    )}
                  {item.isPlain && item.value }
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
            size='small'
          />
        </Card>  
      ))}
    </Layout.Sider>
  );
}