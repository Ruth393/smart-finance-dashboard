import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { AuthProvider } from './context';
import { DashboardView } from './views';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardView />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
