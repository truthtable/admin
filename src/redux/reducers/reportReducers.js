import {
     INIT_STATE,
     FETCH_REQUEST,
     FETCH_SUCCESS,
     FETCH_FAILURE,
} from "../actions/reportActions";

const initialState = {
     reportLoading: false,
     report: null,
     reportError: false,
};

const reportReducer = (state = initialState, action) => {
     switch (action.type) {
          case INIT_STATE:
               console.log("report init state");
               return {
                    reportLoading: false,
                    report: null,
                    reportError: false,
               };
          case FETCH_REQUEST:
               console.log("report request");
               return {
                    ...state,
                    reportLoading: true,
                    reportError: false,
               };
          case FETCH_SUCCESS:
               console.log("report : ", action.payload);
               return {
                    reportLoading: false,
                    report: action.payload,
                    reportError: false,
               };
          case FETCH_FAILURE:
               console.log("report error : ", action.payload);
               return {
                    reportLoading: false,
                    report: null,
                    reportError: true,
               };
          default:
               return state;
     }
};

export default reportReducer;
