import { Route, Routes } from "react-router-dom";
import Accueil from "./components/pages/Accueil";
import MySeries from "./components/pages/MySeries";
import NewSeries from "./components/pages/NewSeries";
import Footer from "./components/features/layout/Footer";
import Header from "./components/features/layout/Header";
import { Toaster } from "./components/ui/sonner";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/new" element={<NewSeries />} />
        <Route path="/myseries" element={<MySeries />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
