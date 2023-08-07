export function autocomplete(city) {
    return {
        method: 'get',
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${city}&apiKey=d571026248df4a09b5902b1ee7012b5c`,
        headers: {}
    }
}
