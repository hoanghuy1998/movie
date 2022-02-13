import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import movieService from "../sevicers/movieService";
import ActionTypes from "../stores/action";
const ItemMovie = ({ content }) => {
  const baseUrl = useSelector((state) => state.auth.img);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMovie = (e, data) => {
    e.preventDefault();
    movieService.getDetail(data?.id).then((res) => {
      dispatch({
        type: ActionTypes.DETAIL_MOVIE,
        detailMovie: res.data,
      });
    });
    navigate(`/home/list/detail?name=${data?.title}`);
  };
  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      className="mb-4"
      onClick={(e) => handleMovie(e, content)}
    >
      <div className="">
        <span className="play">
          <span className="name">{content?.original_title}</span>
        </span>
        <a href="/#">
          <div className="position-relative overflow-hidden overlayHoverImg">
            <img
              className="w-100"
              style={{ height: "324px" }}
              src={baseUrl + content?.poster_path}
              alt=""
            />
            <div className="overlayHover p-2 ">
              <Row>
                <span className="text-start text-danger fw-bolder d-flex fs-16 mt-2">
                  Giới Thiệu :{" "}
                </span>
                <span className="text-start line-7 fs-16">
                  {content?.overview}
                </span>
              </Row>
              <Row className="align-items-center gy-0">
                <Col
                  xs="auto"
                  className="text-start text-danger fw-bolder fs-16 mt-2 mb-0"
                >
                  <p className="mb-0"> Ngày Ra Mắt : </p>
                </Col>
                <Col className="text-start fs-16 mt-2">
                  <span className="mt-3">{content?.release_date}</span>{" "}
                </Col>
              </Row>
            </div>
          </div>
        </a>
      </div>

      <Row className="mt-2">
        <Col
          className="text-light pointer mt-2 text-uppercase fs-16 line-1"
          style={{ height: "22px" }}
        >
          {content?.original_title}
        </Col>
        <Button
          as={Col}
          xs={2}
          className={
            content?.vote_average >= 8
              ? "btn btn-success me-2"
              : content?.vote_average < 8 && content?.vote_average > 5
              ? "btn btn-info me-2"
              : "btn btn-danger me-2"
          }
        >
          {content?.vote_average}{" "}
        </Button>
      </Row>
    </Col>
  );
};

export default ItemMovie;
