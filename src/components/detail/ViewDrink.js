import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../home/useAxios";
import Heading from "../layout/Heading";

export default function ViewDrink() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { idDrink } = useParams();

  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

  useEffect(function() {
    async function getDrinks() {
      try {
        const response = await http.get(url);
        setDrinks(response.data.drinks);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading drinks...</div>;

  if (error) return <div>{}</div>;

  return (
    <>
      <Heading content="Drink Details" />
      <h2>ID: {idDrink}</h2>
      {drinks.map(response => {
        let idDrStr = JSON.stringify({ idDrink });
        let idStrCut = idDrStr.slice(12, 18);
        let idStrCut5 = idStrCut.slice(0, 5);

        if (response.idDrink === idStrCut || response.idDrink === idStrCut5) {
          var myDrink = response.strDrink;
          var thisImage = response.strDrinkThumb;
        }
        if (response.idDrink === idStrCut || response.idDrink === idStrCut5) {
          return (
            <>
              <p key={response.idDrink}>Name: {myDrink}</p>
              <img key={myDrink} alt={myDrink} src={thisImage} />
            </>
          );
        }
      })}
    </>
  );
}
