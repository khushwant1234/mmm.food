import Navbar from "@/components/Navbar";
import { fetchScore, updateTable, getScore, getRecommendations } from "./recommandation_algo/getScore";
import RecipeDisplaySwipe from "@/components/RecipeDisplaySwipe";
export default async function Home() {
  console.log('Fetching score');
//   await fetch("https://cosylab.iiitd.edu.in/recipe/73527",{
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': "*/*"
//     },
// }) .then(response => response.json())
//     .then(dataIngridients => {
//         console.log('SuccessBOOOO:', dataIngridients);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
  // console.log( await getRecommendations("user123"));
  return (
    <div>
      <Navbar />
      <RecipeDisplaySwipe />
      </div>
  );
}
