import React, { useEffect, useState } from "react";
import movieService from "../../sevicers/movieService";
import { useDispatch } from "react-redux";
import ActionTypes from "../../stores/action";
import { Row, Col, Container, Tooltip } from "react-bootstrap";
import ItemMovie from "../../components/ItemMovie";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [listNowPlay, setListNowPlay] = useState([]);
  const [listPopular, setListPopular] = useState([]);
  const [listTopRate, setListTopRate] = useState([]);
  const [listUpComit, setListUpComit] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: ActionTypes.DETAIL_MOVIE,
      detailMovie: {},
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: ActionTypes.SELECTED_TYPE_MOVIE,
      typeMovie: "",
    });
  }, []);
  useEffect(() => {
    movieService.getListNowPlay(1).then((res) => {
      setListNowPlay(res.data.results.slice(0, 4));
    });
    movieService.getListPopular(2).then((res) => {
      setListPopular(res.data.results.slice(0, 4));
    });
    movieService.getListTopRate(1).then((res) => {
      setListTopRate(res.data.results.slice(0, 4));
    });
    movieService.getListUpComit(1).then((res) => {
      setListUpComit(res.data.results.slice(0, 4));
    });
  }, []);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <Row>
        <strong className="text-start text-primary">Giới Thiệu : </strong>
        <Col className="text-start line-7">{props?.overview}</Col>
      </Row>
      <Row>
        <strong className="text-start text-primary">Ngày Ra Mắt : </strong>
        <Col className="text-start">{props?.release_date} </Col>
      </Row>
    </Tooltip>
  );

  const handleOpenList = (e) => {
    dispatch({
      type: ActionTypes.SELECTED_TYPE_MOVIE,
      typeMovie: e.target.id,
    });
    navigate(`/home/list?type=${e.target.id}`);
  };
  return (
    <Container>
      <Row className="box mt-2">
        <Col xs={12} className="">
          <Row>
            <Col>
              <h2
                id="upcomit"
                onClick={(e) => handleOpenList(e)}
                className="fs-4 text-info pointer"
              >
                Phim Vừa Cập Nhật
              </h2>
            </Col>
            <Col>
              <p className="text-right fs-5 text-capitalize ">
                <strong
                  id="upcomit"
                  onClick={(e) => handleOpenList(e)}
                  className="nav-link pointer"
                  href="/#"
                >
                  See all
                </strong>
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="overflow-hidden h-390 ">
            {listUpComit?.map((l) => (
              <ItemMovie content={l} />
            ))}
          </Row>
        </Col>
        <div className="cl">&nbsp;</div>
      </Row>
      <Row className="box mt-2">
        <Col xs={12} className="">
          <Row>
            <Col>
              <h2
                id="nowplay"
                onClick={(e) => handleOpenList(e)}
                className="fs-4 text-info pointer"
              >
                Phim Đang Chiếu
              </h2>
            </Col>
            <Col>
              <p className="text-right fs-5 text-capitalize ">
                <strong
                  id="nowplay"
                  onClick={(e) => handleOpenList(e)}
                  className="nav-link pointer"
                >
                  See all
                </strong>
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="overflow-hidden h-390 ">
            {listNowPlay?.map((l) => (
              <ItemMovie content={l} />
            ))}
          </Row>
        </Col>
        <div className="cl">&nbsp;</div>
      </Row>

      <Row className="box mt-2">
        <Col xs={12} className="">
          <Row>
            <Col>
              <h2
                id="toprate"
                onClick={(e) => handleOpenList(e)}
                className="fs-4 pointer text-info pointer"
              >
                Phim Top Đầu{" "}
              </h2>
            </Col>
            <Col>
              <p className="text-right fs-5 text-capitalize ">
                <strong
                  id="toprate"
                  onClick={(e) => handleOpenList(e)}
                  className="nav-link pointer"
                >
                  See all
                </strong>
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="overflow-hidden h-390 ">
            {listTopRate?.map((l) => (
              <ItemMovie content={l} />
            ))}
          </Row>
        </Col>
        <div className="cl">&nbsp;</div>
      </Row>
      <Row className="box mt-2">
        <Col xs={12} className="">
          <Row>
            <Col>
              <h2
                id="popular"
                onClick={(e) => handleOpenList(e)}
                className="fs-4 text-info pointer"
              >
                Phim Phổ Biến
              </h2>
            </Col>
            <Col>
              <p className="text-right fs-5 text-capitalize ">
                <strong
                  id="popular"
                  onClick={(e) => handleOpenList(e)}
                  className="nav-link pointer"
                >
                  See all
                </strong>
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="overflow-hidden h-390 ">
            {listPopular?.map((l) => (
              <ItemMovie content={l} />
            ))}
          </Row>
        </Col>
        <div className="cl">&nbsp;</div>
      </Row>
    </Container>
  );
};

export default Home;
