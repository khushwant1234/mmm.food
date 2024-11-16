const recipeData = {
  url: "http://www.geniuskitchen.com/recipe/rice-and-beef-hash-340107",
  Calories: "420.5",
  servings: "4",
  Recipe_title: "Rice and Beef Hash",
  "Carbohydrate, by difference (g)": "317.6687",
  "Energy (kcal)": "1979.2602",
  "Protein (g)": "134.6011",
  "Total lipid (fat) (g)": "15.3492",
  Processes:
    "cook||heat||drain||stir||reduce||heat||cover||simmer||sprinkle||cook",
  vegan: "0.0",
};
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>swipe</div>
    </div>
  );
};

export default page;
