import  {CryptoContextProvider}  from './context/СryptoContext';
import AppLayout from './components/layout/AppLayout';

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>

  )
}

