import { Layout } from 'antd';
import Sidebar from './Sidebar';
import HeaderLayout from './HeaderLayout';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <HeaderLayout />
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
