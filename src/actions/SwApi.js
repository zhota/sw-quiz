export const swApi = () => {
    const apiUrl = "https://swapi.co/api/planets";

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => console.log(data));
};