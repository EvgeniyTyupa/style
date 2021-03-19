import { googleApi } from "../Api/api";

const SET_IS_FETCHING = 'SET_IS_FETCHING';

let initialState = {
    isFetching: false
}

const commonReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default: 
            return state;
    }
}

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});

export const register = (formData) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        await googleApi.saveDataToGoogleSheet(formData);
        dispatch(setIsFetching(false));
    }catch(err){
        dispatch(setIsFetching(false));
    }
}

export default commonReducer;
