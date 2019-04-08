import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure
} from '../index';
import {APP_HEADERS} from '../config';

export function fetchData() {
    return dispatch => {
        dispatch(fetchDataBegin());
        return fetch(APP_HEADERS.cityList, {
            method: 'GET',
            headers: {
                "authorization": "Bearer ba721f9895d5cebe18697546d08580b3bd7faee8",
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then((response) => dispatch(fetchDataSuccess({cityList: response})))
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    };
}
