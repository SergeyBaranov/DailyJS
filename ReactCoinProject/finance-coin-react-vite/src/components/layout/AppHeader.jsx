import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/СryptoContext';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  color: '#fff',
  height: '100%',
  padding: '32px 16px',
  lineHeight: '64px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};



export default function AppHeader() {
  const [select, setSelect ] = useState(false);
  const [coin, setCoin ] = useState(null);
  const [modal, setModal] = useState(false);  
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])
  

  function handleSelect(value) {
    setCoin(crypto.find(c => c.id === value));
    setModal(true)
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: '250px' }}
        open={select}
        value="press to open"
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
          </Space>
        )}
      />
    <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

    <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin}/>
      </Modal>

      <Drawer
        title="Add Asset"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setDrawer(false)}
        open={drawer}
        width={600}
      >
        <AddAssetForm/>
      </Drawer>

    </Layout.Header>
  )
}