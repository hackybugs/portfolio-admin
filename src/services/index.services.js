const { getAllBreedsFromService } = require('./test.services');
async function getBreeds() {
    try {
        // Call the function from test.service.js
        return await getAllBreedsFromService();
    } catch (error) {
        console.error('Error fetching data from third-party API:', error);
        throw error;
    }
}
module.exports = { getBreeds };
