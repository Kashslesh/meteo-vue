export function weather(city) {
    const key = '4fd6a984da8f8b4a9d0b886b5af3056f'
    return {
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,
        header : {}
    }
}