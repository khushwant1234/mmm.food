
import { createClient } from '../../lib/supabase/server'
import { cookies } from 'next/headers'


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const geminiKey = process.env.GEMINI_API_KEY;

export async function getScore(recipeObject, userID) {
    // recipeObject format: {recipeName: ["ingrident1", "ingrident2", "ingrident3", ...], ...}
    // userID format: string
    // console.log("HELLO FHEIHFIUEHUGH");
    var recipeList = JSON.stringify(recipeObject);
    // console.log(recipeList);
    // console.log(geminiKey);
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
         body: JSON.stringify({
             contents:[{
                parts: [{
                    text: `I will give a list of ingridient for few recepies and its name, what you have to give is give a json output which can be parsed using javascript using the JSON.parse function, no markdown no triple dash JSON markdown too, just a json with scores between 0 and 1 for each of the 5 recepies for 5 catogories which are (sweet, salty, sour, bitter, and umami), the data structure of the output JSON should be like {"Dish 1 name": {"sweet": 0.1, "salty": 0.6, "sour": 0.2, "bitter": 0.1, "umami": 0.8, "spicy": 0.2}, "Dish 2 Name": {"sweet": 0.1, "salty": 0.7, "sour": 0.1, "bitter": 0.1, "umami": 0.6, "spicy": 0.2}, "Dish 3 Name": {"sweet": 0.2, "salty": 0.6, "sour": 0.1, "bitter": 0.2, "umami": 0.7, "spicy": 0.2}, "Dish 4 Name": {"sweet": 0.6, "salty": 0.2, "sour": 0.1, "bitter": 0.1, "umami": 0.1, "spicy": 0.2}, "Dish 5 Name": {"sweet": 0.8, "salty": 0.1, "sour": 0.1, "bitter": 0.1, "umami": 0.2, "spicy": 0.2}} , here are all the data you need: ${recipeList}`
                }]
             }]
         })
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data.candidates[0].content.parts[0].text);
            var flavourValues = data.candidates[0].content.parts[0].text;
            flavourValues = flavourValues.replace(/```json|```/g, '');

            try {
                const jsonData = JSON.parse(flavourValues);
                // console.log(jsonData);
              } catch (error) {
                console.error("Invalid JSON string:", error);
              }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return "recommendations";
}



export async function fetchScore(userID){
    if (!supabase.from) {
        console.error('Supabase client not initialized properly:', supabase);
        throw new Error('Supabase client is invalid.');
    }
    const { data: existingData, error: fetchError } = await supabase
    .from('Recommandation_Points')
    .select('*')
    .eq('user_id', userID)
    .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // Ignore 'No rows found' error
        console.error('Error fetching existing data:', fetchError);
        return;
    }
    return existingData;
}
export async function updateTable(recipeParams, userID) {
    // console.log('Updating table with:', recipeParams, userID);
    if (!supabase.from) {
        console.error('Supabase client not initialized properly:', supabase);
        throw new Error('Supabase client is invalid.');
    }
    const { data: existingData, error: fetchError } = await supabase
    .from('Recommandation_Points')
    .select('*')
    .eq('user_id', userID)
    .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // Ignore 'No rows found' error
        console.error('Error fetching existing data:', fetchError);
        return;
    }

    const updatedValues = {
        user_id: userID,
        sweet: recipeParams.sweet + (existingData?.sweet || 0),
        salty: recipeParams.salty + (existingData?.salty || 0),
        sour: recipeParams.sour + (existingData?.sour || 0),
        bitter: recipeParams.bitter + (existingData?.bitter || 0),
        umami: recipeParams.umami + (existingData?.umami || 0),
        spicy: recipeParams.spicy + (existingData?.spicy || 0),
    };

    const { data, error } = await supabase
        .from('Recommandation_Points')
        .upsert([updatedValues])
        .select();

    if (error) {
        console.error('Error during upsert:', error);
    } else {
        // console.log('Upsert successful, data:', data);
    }

    if (error) {
        console.error('Error:', error);
    } else {
        // console.log('Data:', data);
    }
}
export async function getRecommendations(userID) {
    try {
        const score = await fetchScore(userID);
        console.log("Score ahhh: ", score);

        const recipeObject = {};
        let recommendations = {};

        // Step 1: Fetch recipes by ingredients
        const recipeResponse = await fetch(
            'https://cosylab.iiitd.edu.in/recipe-search/recipesByIngredient?page=1&pageSize=50',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredientNotUsed: "" }),
            }
        );

        const recipeData = await recipeResponse.json();
        // console.log('Fetched Recipes:', recipeData);
        var recipeString = "";
        for (let i = 0; i < recipeData.payload.data.length; i++) {
            recipeString += `${recipeData.payload.data[i].Recipe_title}, ` ;
        }

        // Step 2: Fetch ingredients for each recipe
        // for (let i = 0; i < recipeData.payload.data.length; i++) {
        //     try {
        //         const recipeDetailsResponse = await fetch(
        //             `https://cosylab.iiitd.edu.in/recipe/${recipeData.payload.data[i].Recipe_id}`,
        //             {
        //                 method: 'GET',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Accept': '*/*',
        //                 },
        //             }
        //         );
        //         console.log(recipeDetailsResponse);
        //         try{
        //             recipeDetailsResponse.json();
        //         }
        //         catch(error){
        //             console.log(`https://cosylab.iiitd.edu.in/recipe/${recipeData.payload.data[i].Recipe_id}`);
        //             console.error(`Error fetching recipe details for Recipe ID ${recipeData.payload.data[i].Recipe_id}:`, error);
        //             return;
        //         }
        //         const recipeDetails = await recipeDetailsResponse.json();
        //         console.log('Recipe Details:', recipeDetails);

        //         // Collect ingredients
        //         const ingredients = recipeDetails.payload.ingredients.map(
        //             (ingredient) => ingredient.ingredient
        //         );
        //         recipeObject[recipeData.payload.data[i].Recipe_title] = ingredients;
        //     } catch (innerError) {
        //         console.log(`https://cosylab.iiitd.edu.in/recipe/${recipeData.payload.data[i].Recipe_id}`);
        //         console.error(`Error fetching recipe details for Recipe ID ${recipeData.payload.data[i].Recipe_id}:`, innerError);
        //     }
        // }

        // Step 3: Use Gemini API for recommendations
        const geminiKey = process.env.GEMINI_API_KEY;
        // console.log(`Give me the name of the best 10 recipes in a list like ["recipe1", "recipe2", "recipe3", ...] based on what I like, only a list with no other text or nothing. Use these scores ${JSON.stringify(
        //                                 score
        //                             )} and the list of foods ${recipeString}. Use the relative score to each other to find the best matches.`,
        // );
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Give me the name of the best 10 recipes in a list like ["recipe1", "recipe2", "recipe3", ...] based on what I like, only a list with no other text or nothing. Use these scores ${JSON.stringify(
                                        score
                                    )} and the list of foods ${recipeString}. Use the relative score to each other to find the best matches.`,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const geminiData = await geminiResponse.json();
        recommendations = geminiData.candidates[0].content.parts[0].text;
        recommendations = recommendations.replace(/```json|```/g, '');
        const recommendationsList = JSON.parse(recommendations);

        console.log('Recommendations:', recommendationsList);

        return recommendations;
    } catch (error) {
        console.error('Error in getRecommendations:', error);
        throw error; // Ensure the error propagates for debugging
    }
}
// export async function getRecommendations(userID) {
//     const score = await fetchScore(userID);
//     console.log("Score ahhh: ");
//     console.log(score);
//     var recipeObject = {};
//     var recommendations = {};
//     //make a post request
//     fetch('https://cosylab.iiitd.edu.in/recipe-search/recipesByIngredient?page=1&pageSize=50', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             ingredientNotUsed: "",
//         })
//     })
//         .then(response => response.json())
//         .then(data => {

//             console.log('Success:', data);
//             for (var i = 0; i < data.payload.data.length; i++) {
//                 console.log("https://cosylab.iiitd.edu.in/recipe/"+data.payload.data[i].Recipe_id); 
//                 fetch("https://cosylab.iiitd.edu.in/recipe/"+data.payload.data[i].Recipe_id,{
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': "*/*"
//                     },
//                 }) .then(responseIngridients => responseIngridients.json())
//                     .then(dataIngridients => {
//                         console.log('SuccessBOOOO:', data);
//                         console.log(dataIngridients.payload.ingredients);
//                         var ingredients = [];
//                         for (var i = 0; i < dataIngridients.payload.ingredients.length; i++){
//                             ingredients.push(dataIngridients.payload.ingredients[i].ingredient);
//                         }
//                         recipeObject[data.payload.data[i].Recipe_title] = ingredients;
//                     })
//                     .catch((error) => {
//                         console.error('Error:', error);
//                     });
//             }
//             // console.log(recipeObject);
//             // feed in the recipeObject and the score to gemini and ask it to find the best 10 recepies from this list that matchees with the relative score
//             fetch("")

//         }).then(responseDone => responseDone.json())
//         .then(dataDone => {
//             fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     contents:[{
//                         parts: [{
//                             text: {
//                                 content: `Give me the name of the best 10 recipe in a list like [\"recipe1\", \"recipe2\", \"recipe3\", ...] based on what i like, to know what i like use these scores ${score} and the list of recipes i have is ${recipeObject}. use the relative score to each other and find the dish that matches my taste.`,
//                             }
//                         }]
//                     }]
//                 })
//             })
//                 .then(response => response.json())
//                 .then(dataRecommend => {
//                     // console.log('Success:', dataRecommend);
//                     recommendations = dataRecommend.candidates[0].content.parts[0].text;
//                 })
//                 .catch((error) => {
//                     console.error('ErrorHELLO:', error);
//                 });
//         })
//         .catch((error) => {
//             console.error('ErrorHIII:', error);
//         });
    
