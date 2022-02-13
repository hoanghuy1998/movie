import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Image,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import movieService from "../../sevicers/movieService";
import { toast } from "react-toastify";
import ActionTypes from "../../stores/action";
const DetailMovie = () => {
  const [type, setType] = useState("");
  const [start, setStart] = useState([]);
  const [startHalf, setStartHalf] = useState(0);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state.auth.detailMovie);
  const typeMovie = useSelector((state) => state.auth.typeMovie);
  const baseUrl = useSelector((state) => state.auth.img);
  useEffect(() => {
    switch (typeMovie) {
      case "nowplay":
        setType("Phim Đang Chiếu");
        break;
      case "popular":
        setType("Phim Phổ Biến");
        break;
      case "toprate":
        setType("Phim Tốp Đầu");
        break;
      default:
        setType("Vừa Mới Cập Nhật");
        break;
    }
  }, []);
  const format2 = (n, currency) => {
    return n?.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + " " + currency;
  };
  useEffect(() => {
    movieService.getComment(detailMovie?.id).then((res) => {
      setComments(res.data.results);
    });
  }, [detailMovie]);
  console.log("comments", comments);
  const handleBack = (e) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.SET_PARAM,
      param: "home",
    });
    navigate(`/home/list?type=${typeMovie}`);
  };
  useEffect(() => {
    const x = detailMovie?.vote_average?.toString();
    console.log("x", x);
    setStart(renderStart(parseInt(x?.slice(0, x?.indexOf(".")))));
    setStartHalf(parseInt(x?.slice(x.indexOf(".") + 1)));
  }, [detailMovie]);
  console.log("start", start);
  console.log("detailMovie", detailMovie);
  const renderStart = (n) => {
    let x = [];
    for (let i = 1; i <= n; i++) {
      x = [...x, <i className="fa fa-star " aria-hidden="true"></i>];
    }
    return x;
  };
  const formatDate = (d) => {
    const y = d?.slice(0, 4);
    const m = d?.slice(5, 7);
    const h = d?.slice(8, 10);
    const t = d?.slice(11, 19);
    return y + " / " + m + " / " + h + " _ " + t;
  };
  const handleReamore = (e) => {
    e.target.classList.toggle("line-5");
  };
  const handleUpdateView = () => {
    toast.warning("Tính Năng Đang Được Cập Nhật");
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Xem Thêm
    </Tooltip>
  );
  const handleBackHome = (e) => {
    dispatch({
      type: ActionTypes.SET_PARAM,
      param: "home",
    });
  };
  return (
    <Container>
      <Row className="gx-1 mt-2">
        <Col xs="auto">
          <Row className="gx-1" onClick={handleBackHome}>
            <Col xs="auto">
              <i className="fa fa-home fs-5" aria-hidden="true"></i>
            </Col>
            <Col>
              <Link to="/" className="d-flex fs-16">
                Trang Chủ
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs="auto">
          <i className="fa fa-angle-right fs-5" aria-hidden="true"></i>
        </Col>
        <Col xs="auto">
          <Link to="" onClick={(e) => handleBack(e)} className=" fs-16 d-flex">
            {type}
          </Link>
        </Col>
        <Col xs="auto">
          <i className="fa fa-angle-right fs-5" aria-hidden="true"></i>
        </Col>
        <Col xs="auto">
          <h1
            onClick={(e) => handleBack(e)}
            className="fs-16 d-flex text-danger"
          >
            {detailMovie?.title}
          </h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Row className="position-relative justify-content-center">
            <Col xs={12} className="text-center">
              <img
                className="m-auto w-100"
                src={baseUrl + detailMovie?.backdrop_path}
                alt=""
              />
            </Col>
            <Col
              xs={1}
              className="position-absolute d-flex justify-content-center align-items-center"
              style={{ bottom: 0, top: 0 }}
              onClick={handleUpdateView}
            >
              <div
                className="text-center line-height-100  rounded-circle p-3 playVideo"
                style={{
                  backgroundColor: "#FF9601BF",
                  width: "4rem",
                  height: "4rem",
                }}
              >
                <i class="fa fa-play fs-1 btnplay" aria-hidden="true"></i>{" "}
              </div>
            </Col>
            <Col xs={12} className="review">
              <Row className="w-100 gx-1">
                <Col xs="auto">
                  <img
                    src={baseUrl + detailMovie?.poster_path}
                    className="poster mx-2"
                    alt=""
                  />
                </Col>
                <Col className="text-start mt-2">
                  <Row>
                    <a
                      href={detailMovie?.homepage}
                      className="fs-1 text-danger shadow-lg text-decoration-none "
                    >
                      {" "}
                      {detailMovie?.title}{" "}
                    </a>
                  </Row>
                  <Row>
                    <p className="fs-16 text-capitalize text-white-50 shadow-lg  bold">
                      {detailMovie?.tagline || "Đang Cập Nhật..."}
                    </p>
                  </Row>
                  <Row className="gx-1">
                    <Col xs="auto">
                      {/* <i icon="fa-solid fa-clapperboard-play"></i> */}
                      <Button
                        onClick={handleUpdateView}
                        className="btn btn-secondary"
                      >
                        Xem Trailer
                      </Button>
                    </Col>
                    <Col xs="auto">
                      <Button
                        onClick={handleUpdateView}
                        className="btn btn-primary"
                      >
                        Mua Vé
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12}>
          <Row className="bg-dark gx-0 pt-2 pb-2">
            <Col xs="auto" className="">
              {start?.map((r) => (
                <i {...r.props} id="start"></i>
              ))}
            </Col>
            <Col xs="auto">
              {startHalf >= 5 ? (
                <i className="fa fa-star-half startHalf" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-star fs-16" aria-hidden="true"></i>
              )}
            </Col>
            <Col xs="auto" className="mx-2 fs-16">
              (Đánh giá {detailMovie?.vote_average} /{" "}
              {detailMovie?.vote_count + " "}
              Người)
            </Col>
          </Row>
          <hr className="mt-0 mb-0" />
          <Row className="bg-dark gx-0 pt-4 pb-2 px-2 pe-2 justify-content-center">
            <Col xs={12} md={4} className="mb-2">
              <Row>
                <Col xs="auto"> Trạng Thái : </Col>
                <Col className="text-danger  "> Đang Chiếu </Col>
              </Row>
              <Row className="mt-2">
                <Col xs="auto"> Thể Loại : </Col>
                <Col className="text-danger">
                  {detailMovie?.genres?.map((g, i) => (
                    <>
                      <span key={g.id}>{g.name}</span>
                      <span
                        className={
                          i === detailMovie?.genres.length - 1
                            ? "d-none "
                            : "text-white mx-1 me-1"
                        }
                      >
                        ,
                      </span>
                    </>
                  ))}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs="auto"> Diễn Viên : </Col>
                <Col className="text-danger"> Đang Cập Nhật....</Col>
              </Row>
            </Col>
            <Col xs={12} md={4} className="mb-2">
              <Row>
                <Col xs="auto"> Ngày Phát Hành : </Col>
                <Col className="text-danger ">
                  {" "}
                  {detailMovie?.release_date}{" "}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs="auto"> Đạp Diễn : </Col>
                <Col className="text-danger"> Đang Cập Nhật... </Col>
              </Row>
              <Row className="mt-2">
                <Col xs="auto"> Thời Lượng : </Col>
                <Col className="text-danger">{detailMovie?.runtime} Phút </Col>
              </Row>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <Row className="mt-2">
                <Col xs="auto"> Quốc gia : </Col>
                <Col className="text-danger ">
                  {" "}
                  {detailMovie?.production_countries?.map((g, i) => (
                    <>
                      <span key={g.id}>{g.name}</span>
                      <span
                        className={
                          i === detailMovie?.genres.length - 1
                            ? "d-none "
                            : "text-white mx-1 me-1"
                        }
                      >
                        ,
                      </span>
                    </>
                  ))}{" "}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr className="mt-0 mb-0" />
      <Row className=" bg-dark mx-0 me-0 px-2 pe-2 pb-4 ">
        <Col xs={12}>
          <h1 className="text-warning mt-2">Nội Dung Phim</h1>
        </Col>

        <Col>
          <strong>{detailMovie?.overview} </strong>
        </Col>
      </Row>
      <hr className="mt-0 mb-0" />

      <Row className="pt-2 pb-4 px-2 bg-light mx-0 me-0 mt-2  text-dark align-items-center gx-0">
        <Col xs={12}>
          <div>Có {comments?.length} Bình Luận </div>
        </Col>
        <Col xs={10} md={10} lg={11}>
          <input
            type="text"
            className="form-control mt-2 mb-2"
            placeholder="Nhập Bình Luận ..."
          />
        </Col>
        <Col xs="auto" onClick={handleUpdateView}>
          <Button className="btn btn-primary fw-bold" type="text">
            GIỬI
          </Button>
        </Col>
        <Col>
          {comments?.map((c) => (
            <Row key={c?.id} className="mt-2">
              <Col xs="auto">
                {c?.author_details?.avatar_path?.indexOf("gravatar") &&
                c?.author_details?.avatar_path &&
                parseInt(c?.author_details?.avatar_path?.indexOf("gravatar")) >
                  0 ? (
                  <Image
                    onClick={handleUpdateView}
                    roundedCircle
                    src={c?.author_details?.avatar_path.slice(1)}
                    alt="avatar_path"
                    style={{ width: "3rem" }}
                    className="pointer"
                  />
                ) : !c?.author_details?.avatar_path ? (
                  <div
                    className="noAvatar pt-1 rounded-circle bg-white border pointer"
                    onClick={handleUpdateView}
                  >
                    {c?.author?.slice(0, 1)?.toUpperCase()}
                  </div>
                ) : (
                  <Image
                    onClick={handleUpdateView}
                    roundedCircle
                    src={baseUrl + c?.author_details?.avatar_path}
                    alt="avatar_path"
                    style={{ width: "3rem" }}
                    className="pointer"
                  />
                )}
              </Col>
              <Col>
                <Row className="justify-content-between">
                  <Col
                    xs={10}
                    className="text-capitalize text-primary fs-16 pointer "
                    onClick={handleUpdateView}
                  >
                    {c?.author}
                  </Col>
                  <Col xs="auto"> {formatDate(c?.created_at)} </Col>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 100, hide: 400 }}
                    overlay={renderTooltip}
                    className="readMore"
                  >
                    <p
                      className="line-5 pointer"
                      onClick={(e) => handleReamore(e)}
                    >
                      {c?.content}
                    </p>
                  </OverlayTrigger>
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DetailMovie;
