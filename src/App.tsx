import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import FormListPage from './pages/FormListPage';
import FormEditorPage from './pages/FormEditorPage';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={4} style={{ margin: 0 }}>多步骤表单审批</Title>
      </Header>
      <Content style={{ padding: 24, background: '#f5f5f5' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/forms" replace />} />
          <Route path="/forms" element={<FormListPage />} />
          <Route path="/forms/new" element={<FormEditorPage />} />
          <Route path="/forms/:id/edit" element={<FormEditorPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
