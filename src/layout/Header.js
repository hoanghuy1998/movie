import React, { useRef } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import ActionTypes from "../stores/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoRef = useRef();
  const menuRef = useRef();
  const params = useParams();
  console.log(params);
  const typeMovie = useSelector((state) => state.auth.typeMovie);
  const param = useSelector((state) => state.auth.param);
  const handleChangeType = (e) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.SELECTED_TYPE_MOVIE,
      typeMovie: e.target.id,
    });
    console.log("do");
    navigate(`/home/list?type=${e.target.id}`);
  };
  const handleUpdateView = () => {
    toast.warning("Tính Năng Đang Được Cập Nhật");
  };
  const handleHome = (e) => {
    dispatch({
      type: ActionTypes.SET_PARAM,
      param: "hunter",
    });
    navigate("/");
    menuRef.current.className = "navbar-collapse collapse";
  };
  const handleChangeNav = (e) => {
    e.preventDefault();
    if (e.target.id === "home") navigate("/home");
    else toast.warning("Tính Năng Đang Được Cập Nhật...");
    dispatch({
      type: ActionTypes.SET_PARAM,
      param: e.target.id,
    });
    menuRef.current.classList.remove("show");
  };
  return (
    <Container>
      <Row className="justify-content-between text-end">
        <div class="social col-12 mt-2 mb-4">
          <span>FOLLOW US ON:</span>
          <ul>
            <li>
              <a class="twitter" href="/#">
                twitter
              </a>
            </li>
            <li>
              <a class="facebook" href="/#">
                facebook
              </a>
            </li>
            <li>
              <a class="vimeo" href="/#">
                vimeo
              </a>
            </li>
            <li>
              <a class="rss" href="/#">
                rss
              </a>
            </li>
          </ul>
        </div>
      </Row>
      <div id="header">
        <Row>
          <Col xs={12}>
            <Navbar fixed="top" bg="dark" expand="lg" className="navigation">
              <Container fluid>
                <Navbar.Brand href="#">
                  <h1
                    ref={logoRef}
                    onClick={handleHome}
                    className="text-white text-decoration-none text-danger fs-2 logo"
                  >
                    MovieHunter
                  </h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse ref={menuRef} id="navbarScroll" className=" ">
                  <Nav
                    className="me-auto my-2 my-lg-0 text-end d-flex justify-content-end w-100 navbarScroll"
                    navbarScroll
                  >
                    <h4
                      className={
                        param === "home"
                          ? " text-danger active mt-2 pointer"
                          : " text-white mt-2 pointer "
                      }
                      id="home"
                      onClick={(e) => handleChangeNav(e)}
                    >
                      TRANG CHỦ
                    </h4>
                    <h4
                      className={
                        param === "new"
                          ? " text-danger active mt-2 pointer"
                          : " text-white mt-2 pointer "
                      }
                      id="new"
                      onClick={(e) => handleChangeNav(e)}
                    >
                      TIN TỨC
                    </h4>
                    <h4
                      className={
                        param === "theaterMovie"
                          ? " text-danger active mt-2 pointer"
                          : " text-white mt-2 pointer "
                      }
                      id="theaterMovie"
                      onClick={(e) => handleChangeNav(e)}
                    >
                      TRONG NHÀ HÁT
                    </h4>
                    <h4
                      className={
                        param === "contact"
                          ? " text-danger active mt-2 pointer"
                          : " text-white mt-2 pointer "
                      }
                      id="contact"
                      onClick={(e) => handleChangeNav(e)}
                    >
                      LIÊN HỆ
                    </h4>
                    <h4
                      className={
                        param === "advertisement"
                          ? " text-danger active mt-2 pointer"
                          : " text-white mt-2 pointer "
                      }
                      id="advertisement"
                      onClick={(e) => handleChangeNav(e)}
                    >
                      QUẢNG CÁO
                    </h4>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>

        {/* <div id="navigation">
          <ul>
            <li>
              <a class="active" href="/#">
                TRANG CHỦ
              </a>
            </li>
            <li>
              <a href="/#">TIN TỨC</a>
            </li>
            <li>
              <a href="/#">TRONG NHÀ HÁT</a>
            </li>
            <li>
              <a href="/#">SẮP RA MẮT</a>
            </li>
            <li>
              <a href="/#">LIÊN HỆ</a>
            </li>
            <li>
              <a href="/#">QUẢNG CÁO</a>
            </li>
          </ul>
        </div> */}
        <Row id="sub-navigation" className="mt-3">
          <Col sm={12} lg={8}>
            <ul>
              <li>
                <a
                  class={typeMovie === "upcomit" ? "activeTab" : ""}
                  id="upcomit"
                  onClick={(e) => handleChangeType(e)}
                  href="/#"
                >
                  VỪA CẬP NHẬT
                </a>
              </li>
              <li>
                <a
                  class={typeMovie === "nowplay" ? "activeTab" : ""}
                  id="nowplay"
                  onClick={(e) => handleChangeType(e)}
                  href="/#"
                >
                  PHIM ĐANG CHIẾU
                </a>
              </li>
              <li>
                <a
                  class={typeMovie === "toprate" ? "activeTab" : ""}
                  id="toprate"
                  onClick={(e) => handleChangeType(e)}
                  href="/#"
                >
                  TOP NỔI BẬT
                </a>
              </li>
              <li>
                <a
                  class={typeMovie === "popular" ? "activeTab" : ""}
                  id="popular"
                  onClick={(e) => handleChangeType(e)}
                  href="/#"
                >
                  PHIM PHỔ BIẾN
                </a>
              </li>
            </ul>
          </Col>
          <Col sm={12} lg={4}>
            <div
              className="w-100"
              id="search"
              onClick={(e) => handleUpdateView(e)}
            >
              <form action="#" method="get" accept-charset="utf-8">
                <Row className="justify-content-center align-items-center gx-0 ">
                  <Col xs="auto">
                    <label className="btn btn-primary" htmlFor="search-field">
                      TÌM KIẾM
                    </label>
                  </Col>
                  <Col xs={9} sm={10} lg={8}>
                    <input
                      type="search"
                      name="search field"
                      value="Nhập Tìm Kiếm Ở Đây..."
                      id="search-field"
                      className="blink search-field form-control fs-12 w-100"
                    />
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Header;
