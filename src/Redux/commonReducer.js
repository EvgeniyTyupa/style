import { googleApi } from "../Api/api";

const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_IS_REGISTERED = 'SET_IS_REGISTERED';

let initialState = {
    isFetching: false,
    isRegistered: false
}

const commonReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_IS_REGISTERED: {
            return { ...state, isRegistered: action.isRegistered }
        }
        default: 
            return state;
    }
}

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});
export const setIsRegistered = (isRegistered) => ({
    type: SET_IS_REGISTERED, isRegistered
});

export const register = (formData) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        await googleApi.saveDataToGoogleSheet(formData);
        dispatch([setIsRegistered(true), setIsFetching(false)]);
    }catch(err){
        dispatch(setIsFetching(false));
    }
}

export default commonReducer;
