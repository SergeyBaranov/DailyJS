import {Layout, Card, Statistic, List, Typography, Spin } from 'antd';
import  {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import { useEffect } from 'react';
import { fetchfakeCrypto } from '../../api';
import { fetchFakeCryptoAssets } from '../../api';
import { useState } from 'react';

const siderStyle = {
  padding: '16px',
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];


export default function AppSider () {
  const [loading, setLoading] = useState(false); //индикатор загрузки, т.к. загрузка идет 2 секунды
  const [cryptoData, setCryptoData] = useState([]); //массив с информацией про крус и т.д.
  const [assets, setAssets] = useState([]); // сколько и какая крипта есть у пользователя

  useEffect(() => {
    setLoading(true); //начали загрузку
    async function preload() {
      const {result} = await fetchfakeCrypto();
      const assets = await fetchFakeCryptoAssets();

      setAssets(assets);
      setCryptoData(result);
      setLoading(false);//загрузка закончилась
    }
    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />;
  } 

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card style={{ marginBottom: 16 }}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
          size='small'
        />
      </Card>
      <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  )
}