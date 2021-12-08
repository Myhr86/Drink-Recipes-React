import React, { useState, useEffect } from "react";
import useAxios from "./useAxios";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function DrinkList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
        );
        setPosts(response.data.drinks);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{}</div>;

  function addFavorite(media) {
    let favoritesId = [];
    let favoritesStr = [];
    let favoritesThumb = [];

    return function(e) {
      favoritesId.push(media.idDrink);
      favoritesStr.push(media.strDrink);
      favoritesThumb.push(media.strDrinkThumb);

      favoritesId = JSON.parse(localStorage.getItem("favoritesId")) || [];
      favoritesId.push(media);
      localStorage.setItem("favoritesId", JSON.stringify(favoritesId));
    };
  }

  return (
    <ul className="posts">
      <Container>
        <Row lg={3} md={2} sm={2} xs={1}>
          {posts.map(media => {
            return (
              <Col key={media.idDrink}>
                <li>
                  <ListGroup>
                    <button
                      value={media.idDrink}
                      onClick={addFavorite(media)}
                      className="favButton btn"
                    >
                      Favorite
                    </button>
                    <ListGroup.Item action>
                      <Link to={`/detail/${media.idDrink}`}>
                        {media.strDrink}
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to={`/detail/${media.idDrink}`}>
                        <img
                          className="imgThumb"
                          alt="drink"
                          src={media.strDrinkThumb}
                        />
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </li>
              </Col>
            );
          })}
        </Row>
      </Container>
    </ul>
  );
}
