import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Board from "../components/Board";
import Contest from "../components/Contest";
import Login from "../components/Login";
import Navigation from "../components/Navigation";
import Ranking from "../components/Ranking";
import TTT from "../components/TTT";
import Write from "../components/Write";
import {
  MainPage,
  BuyStockPage,
  SellStockPage,
  SearchPage,
  Portfolio,
  Portfolio2,
  Portfolio3,
  Price,
  Register,
  StockInformation,
} from "./index";

const RRouter = () => (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/buy" element={<BuyStockPage />} />
        <Route path="/sell" element={<SellStockPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/Price" element={<Price />} />
        <Route path="/Portfolio2" element={<Portfolio2 />} />
        <Route path="/Portfolio3" element={<Portfolio3 />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/StockInformation" element={<StockInformation />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/board" element={<Board />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ttt" element={<TTT />} />
      </Routes>
      <Navigation />
    </div>
  </Router>
);

export default RRouter;
