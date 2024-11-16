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
        const geminiKey = process.env.GEMINI_API_KEY;
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

        // Add validation for the API response
        if (!geminiData?.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.error('Unexpected Gemini API response:', geminiData);
            throw new Error('Invalid response from Gemini API');
        }

        recommendations = geminiData.candidates[0].content.parts[0].text;
        recommendations = recommendations.replace(/```json|```/g, '');

        // Add try-catch for JSON parsing
        try {
            const recommendationsList = JSON.parse(recommendations);
            console.log('Recommendations:', recommendationsList);
            return recommendations;
        } catch (error) {
            console.error('Failed to parse recommendations:', recommendations);
            throw new Error('Invalid JSON response from Gemini API');
        }
    } catch (error) {
        console.error('Error in getRecommendations:', error);
        // Return a default value or rethrow based on your needs
        return []; // or throw error;
    }
}

export async function getQuickMeals(){
    const quickMealsResponse = await fetch('https://cosylab.iiitd.edu.in/recipe-search/recipesByIngredient?page=1&pageSize=50', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredientNotUsed: "" }),
    });

    const quickMealsData = await quickMealsResponse.json();
    const quickMeals = quickMealsData.payload.data.filter(recipe => {
        return parseInt(recipe.total_time) <= 30; // Convert total_time to integer for comparison
    }).map(recipe => recipe.Recipe_title); // Extract the recipe titles

    console.log('Quick Meals:', quickMeals);
    return quickMeals;
}