import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LanguagePage from './pages/LanguagePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="learn/:languageId" element={<LanguagePage />} />
      </Route>
    </Routes>
  );
}
