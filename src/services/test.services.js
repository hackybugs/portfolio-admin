const axios = require('axios');

async function getAllBreedsFromService() {
    try {
        let allBreeds = [];
        let nextPage = 'https://catfact.ninja/breeds'; // Start with the first page

        while (nextPage) {
            const response = await axios.get(nextPage);
            const responseData = response.data;

            // Concatenate the data from the current page to the array
            allBreeds = allBreeds.concat(responseData.data);

            // Check if there's a next page
            nextPage = responseData.next_page_url;
        }

        return allBreeds;
    } catch (error) {
        console.error('Error fetching data from third-party API:', error);
        throw error;
    }
}

module.exports = { getAllBreedsFromService };