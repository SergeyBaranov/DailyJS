import { useState } from "react"
import { Select, Space, Typography, Flex, Divider, Form, Input } from "antd";
import { useCrypto } from "../context/СryptoContext";

export default function AddAssetForm() {
  const {crypto} = useCrypto();
  const [coin, setCoin] = useState(null);

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        placeholder="Select coin"
        onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img 
              style={{width: 20}}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    )
  } 
  return (
    <form>
        <Flex align='center'>
          <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: 10}}/>
          <Typography.Title level={2} style={{margin: 0}}>
            {coin.name}
          </Typography.Title>
        </Flex>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    </form>
  )
}