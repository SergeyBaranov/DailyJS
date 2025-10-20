import { Layout } from 'antd';
import { AppHeader } from './components/layout/AppHeader';
import { AppSider } from './components/layout/AppSider';
import { AppContent } from './components/layout/AppContent';


// export default function App() {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <AppHeader />
//       <Layout>
//         <AppSider />
//         <AppContent />
//       </Layout>     
//     </Layout>
//   )
// }


export default function App() {
  console.log('App is rendering!');
  return (
    <div style={{ padding: '20px', background: 'lightblue' }}>
      <h1 style={{ color: 'red' }}>✅ React is WORKING!</h1>
      <p>If you see this, everything is fine</p>
    </div>
  );
}

