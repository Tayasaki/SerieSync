import { Route, Routes } from "react-router-dom";
import Accueil from "./components/Accueil";
import MySeries from "./components/MySeries";
import NewSeries from "./components/NewSeries";
import Footer from "./components/features/layout/Footer";
import Header from "./components/features/layout/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/new" element={<NewSeries />} />
        <Route path="/myseries" element={<MySeries />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
