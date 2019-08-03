import {TEST_DISPATCH} from './types';

//Register user
export const registerUser = (userdata) => {
    return {
        type: TEST_DISPATCH,
        payload: userdata
    }

}

