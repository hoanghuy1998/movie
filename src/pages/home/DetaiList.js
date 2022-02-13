import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Pagination, Col } from "react-bootstrap";
import ItemMovie from "../../components/ItemMovie";
import movieService from "../../sevicers/movieService";
import ActionTypes from "../../stores/action";
import { Link } from "react-router-dom";
const DetaiList = () => {
  const typeMovie = useSelector((state) => state.auth.typeMovie);
  const changePage = useSelector((state) => state.auth.changePage);
  const [listRender, setListRender] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pagingItem, setPagingItem] = useState(0);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
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
  useEffect(() => {
    setPage(1);
  }, [changePage]);
  useEffect(() => {
    switch (typeMovie) {
      case "nowplay":
        movieService.getListNowPlay(page).then((res) => {
          setListRender(res.data.results);
          setTotalPage(res.data.total_pages);
          loadPage(res.data.total_pages);
        });
        break;
      case "popular":
        movieService.getListPopular(page).then((res) => {
          setListRender(res.data.results);
          setTotalPage(res.data.total_pages);
          loadPage(res.data.total_pages);
        });
        break;
      case "toprate":
        movieService.getListTopRate(page).then((res) => {
          setTotalPage(res.data.total_pages);
          setListRender(res.data.results);
          loadPage(res.data.total_pages);
        });
        break;
      default:
        movieService.getListUpComit(page).then((res) => {
          setTotalPage(res.data.total_pages);
          setListRender(res.data.results);
          loadPage(res.data.total_pages);
        });
        break;
    }
  }, [typeMovie, page]);
  useEffect(() => {
    dispatch({
      type: ActionTypes.DETAIL_MOVIE,
      detailMovie: {},
    });
  }, []);
  const loadPage = (x) => {
    if (x > 1) {
      const item = [];

      for (let i = 0; i < x; i++) {
        page - 4 < i &&
          i < page + 4 &&
          item.push(
            <Pagination.Item
              key={i}
              active={i === page - 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          );
      }
      setPagingItem(item);
    } else {
      setPagingItem([]);
    }
  };
  return (
    <>
      <Container>
        <Row className="gx-1 mt-2 mb-4">
          <Col xs="auto">
            <Row className="gx-1">
              {" "}
              <Col xs="auto">
                {" "}
                <i className="fa fa-home fs-5" aria-hidden="true"></i>
              </Col>
              <Col>
                {" "}
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
            <h1 className=" fs-16 d-flex text-danger">{type}</h1>
          </Col>
        </Row>
        <Row className="">
          {listRender?.map((s) => (
            <ItemMovie content={s} />
          ))}
        </Row>

        {listRender?.length > 0 ? (
          <Row>
            {totalPage > 1 ? (
              <Pagination className="justify-content-end mt-3 mb-0">
                <Pagination.First onClick={() => setPage(1)} />
                <Pagination.Prev
                  onClick={() =>
                    setPage((page) => (page > 0 ? (page -= 1) : 0))
                  }
                />
                {pagingItem}
                <Pagination.Next
                  onClick={() =>
                    setPage((page) =>
                      page < totalPage ? (page += 1) : totalPage
                    )
                  }
                />
                <Pagination.Last onClick={() => setPage(totalPage - 1)} />
              </Pagination>
            ) : (
              ""
            )}
          </Row>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default DetaiList;
