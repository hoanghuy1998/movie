import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./resoures/css/ie6.css";
import "./resoures/css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
    <>
      <div
        className="position-fixed  w-100"
        style={{ zIndex: 100, position: "fixed" }}
      >
        <LoadingBar
          updateTime={100}
          className="bg-danger position-fixed"
          style={{ height: "4px" }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
