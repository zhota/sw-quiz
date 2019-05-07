export const swApi = (planetId) => {
    const apiUrl = "https://swapi.co/api/planets/" + planetId.toString() + "/";
    //const apiUrl = "https://linkquebrado.co/" + planetId.toString();
    
    return fetch(apiUrl, {mode: 'cors'})
        .then(response => response.json());
};
