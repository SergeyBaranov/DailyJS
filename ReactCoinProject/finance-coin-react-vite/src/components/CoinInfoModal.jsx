import {Divider, Flex, Tag, Typography} from 'antd';

export default function CoinInfoModal({coin}) {
  return (
    <>
      <Flex align='center'>
        <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: 10}}/>
        <Typography.Title level={2} style={{margin: 0}}>
          ({coin.symbol}) {coin.name} <Tag>{coin.symbol.toUpperCase()}</Tag>
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h }%</Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h }%</Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w }%</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price:</Typography.Text>
        {coin.price}$
      </Typography.Paragraph>
    </>
  )
}