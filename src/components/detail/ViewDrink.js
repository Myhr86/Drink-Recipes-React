import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../home/useAxios";
import Heading from "../layout/Heading";

export default function ViewDrink() {
  const [drinks, setDrinks] = useState([]);
  const [ing, setIng] = useState([]);
  const [newImg, setNewImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { idDrink } = useParams();

  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

    const url2 =
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + idDrink;

  useEffect(function() {
    async function getDrinks() {
      try {
        const response = await http.get(url);
        setDrinks(response.data.drinks);
        const response2 = await http.get(url2);
        console.log(response2.data.drinks);
        setIng(response2.data.drinks);
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
      {drinks.map(response => {
        let idDrStr = JSON.stringify({ idDrink });
        let idStrCut = idDrStr.slice(12, 18);
        let idStrCut5 = idStrCut.slice(0, 5);

        if (response.idDrink === idStrCut || response.idDrink === idStrCut5) {
          var myDrink = response.strDrink;
          var thisImage = response.strDrinkThumb;
        }
        if (response.idDrink === idStrCut || response.idDrink === idStrCut5) {
          console.log(thisImage)
        }
      })}

        <>
        <div class="sides">
        <div class="sides_leftSide">
          <h3 key={ing[0].idDrink}>Name: {ing[0].strDrink}</h3>
          <img key={ing[0].strDrink} src={ing[0].strDrinkThumb} />
        </div>
        <div class="sides_rightSide">
          <h5 class="categoryHeader" key={ing[0].strCategory}>Category: {ing[0].strCategory}</h5>
          <p>Ingredients: </p>
          <div class="instructions">
          <ul class="instructions_ingredients">
            <li key={ing[0].strIngredient1}>{ing[0].strIngredient1}</li>
            <li key={ing[0].strIngredient2}>{ing[0].strIngredient2}</li>
            <li key={ing[0].strIngredient3}>{ing[0].strIngredient3}</li>
            <li key={ing[0].strIngredient4}>{ing[0].strIngredient4}</li>
            <li key={ing[0].strIngredient5}>{ing[0].strIngredient5}</li>
            <li key={ing[0].strIngredient6}>{ing[0].strIngredient6}</li>
            <li key={ing[0].strIngredient7}>{ing[0].strIngredient7}</li>
            <li key={ing[0].strIngredient8}>{ing[0].strIngredient8}</li>
            <li key={ing[0].strIngredient9}>{ing[0].strIngredient9}</li>
            <li key={ing[0].strIngredient10}>{ing[0].strIngredient10}</li>
          </ul>
          <ul class="instructions_measures">
            <li key={ing[0].strMeasure1}>{ing[0].strMeasure1}</li>
            <li key={ing[0].strMeasure2}>{ing[0].strMeasure2}</li>
            <li key={ing[0].strMeasure3}>{ing[0].strMeasure3}</li>
            <li key={ing[0].strMeasure4}>{ing[0].strMeasure4}</li>
            <li key={ing[0].strMeasure5}>{ing[0].strMeasure5}</li>
            <li key={ing[0].strMeasure6}>{ing[0].strMeasure6}</li>
            <li key={ing[0].strMeasure7}>{ing[0].strMeasure7}</li>
            <li key={ing[0].strMeasure8}>{ing[0].strMeasure8}</li>
            <li key={ing[0].strMeasure9}>{ing[0].strMeasure9}</li>
            <li key={ing[0].strMeasure10}>{ing[0].strMeasure10}</li>
          </ul>
          </div>
          <h6>Instructions:</h6>
          <p key={ing[0].strInstructions}>{ing[0].strInstructions}</p>
        </div>
        </div>

        </>
    </>
  );
}
