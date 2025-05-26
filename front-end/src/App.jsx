import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Artists = lazy(() => import("./pages/Artists"));
const Artist = lazy(() => import("./pages/Artist"));
const Songs = lazy(() => import("./pages/Songs"));
const Song = lazy(() => import("./pages/Song"));

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<p style={{textAlign: "center"}}>Carregando...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/song/:id" element={<Song />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;