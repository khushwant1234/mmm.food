import SerpApi from 'google-search-results-nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  try {
    const search = new SerpApi.GoogleSearch(process.env.NEXT_PUBLIC_SERPAPI_KEY);

    const searchResults = await new Promise((resolve, reject) => {
      search.json({
        engine: 'google_images',
        q: query,
        ijn: '0'
      }, (result) => {
        resolve(result);
      });
    });

    return Response.json(searchResults);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}