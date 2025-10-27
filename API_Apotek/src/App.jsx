import React, { Suspense } from 'react'
import { BrowserRouter as Router , Route, Routes, NavLink } from 'react-router-dom'

const Home = React.lazy(() => import("./components/Home"));
const KategoriList = React.lazy(() => import("./components/Kategori/List"));
// const KategoriCreate = React.lazy(() => import("./components/Kategori/Create"));
// const KategoriEdit = React.lazy(() => import("./components/Kategori/Edit"));
// const ObatList = React.lazy(() => import("./components/Obat/List"));
// const ObatCreate = React.lazy(() => import("./components/Obat/Create"));
// const ObatEdit = React.lazy(() => import("./components/Obat/Edit"));


function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            API Apotek
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/kategori">
                  Kategori
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/obat">
                  Obat
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/kategori" element={<KategoriList></KategoriList>}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
