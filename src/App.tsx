import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Expertises from './pages/Expertises';
import Cabinet from './pages/Cabinet';
import Besoins from './pages/Besoins';
import Ressources from './pages/Ressources';
import Contact from './pages/Contact';
import Article from './pages/Article';
import NotFound from './pages/NotFound';

// Les routes doivent rester alignées avec PAGES dans src/seo.ts (prérendu, sitemap, balises).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="expertises" element={<Expertises />} />
        <Route path="cabinet" element={<Cabinet />} />
        <Route path="vos-besoins" element={<Besoins />} />
        <Route path="ressources" element={<Ressources />} />
        <Route path="ressources/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
