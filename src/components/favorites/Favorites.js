import { useState, useEffect } from "react";
import useAxios from "../home/useAxios";
import Heading from "../layout/Heading";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function Favorites() {
  const [drinks, setDrinks] = useState([]);
  const [favoritesId, getDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const favorites = localStorage.getItem("favoritesId");
  const favoritesParsed = JSON.parse(favorites);
  const http = useAxios();

  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get(url);
        getDrinks(favoritesParsed);
        setDrinks(response.data.drinks);
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

  if (loading) return <div>Loading drinks...</div>;

  if (error) return <div>{}</div>;

  if (favoritesParsed && favoritesParsed.length !== 0) {
    function removeItem(e) {
      const localFav = localStorage.getItem("favoritesId");
      let parsedFav = JSON.parse(localFav);
      for (let i = 0; i < parsedFav.length; i++) {
        if (parsedFav[i].idDrink === e.idDrink) {
          let index = parsedFav.indexOf(parsedFav[i]);
          parsedFav.splice(index, 1);
          const strFav = JSON.stringify(parsedFav);
          localStorage.setItem("favoritesId", strFav);
          window.location.reload(false);
        }
      }
    }

    return (
      <>
        <Heading key="favHeader" content="Favorites" />
        <Container key="idDrink" className="favContainer">
          {favoritesId.map(response => {
            return (
              <>
                <Card key={response.strDrinkThumb}>
                  <Card.Body>
                    <Link to={`/detail/${response.idDrink}`}>
                      <Card.Img
                        variant="top"
                        src={response.strDrinkThumb}
                        key={response.strDrinkThumb}
                      />
                    </Link>
                    <Link to={`/detail/${response.idDrink}`}>
                      <Card.Title>{response.strDrink}</Card.Title>
                    </Link>
                    <Card.Text>Id: {response.idDrink}</Card.Text>
                    <span onClick={() => removeItem(response)}>X</span>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Container>
      </>
    );
  } else if (!favoritesParsed || favoritesParsed.length === 0) {
    return (
      <>
        <Heading content="Favorites" />
        <p>No favorites added..</p>
      </>
    );
  }
}
