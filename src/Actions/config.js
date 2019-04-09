export const APP_AUTH = 'Bearer ba721f9895d5cebe18697546d08580b3bd7faee8';

export const APP_HEADERS_GET = {
    cityList: 'http://localhost:5263/api/city-list',
    weather: 'http://localhost:5263/api/city-list/api/weather/',    // {cityId}
};

export const APP_HEADERS_POST = {
    subscribe: 'http://localhost:5263/api/hooks/weather/subscribe',
    unsubscribe: 'http://localhost:5263/api/hooks/weather/unsubscribe/'    // {cityId}
};