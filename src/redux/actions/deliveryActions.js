// src/redux/actions/deliveryActions.js
import { axiosInstance as axios } from "../../services/Api";

// Action Types
export const INIT_STATE = "DELIVERIES_INIT_STATE";
export const FETCH_DELIVERIES_REQUEST = "FETCH_DELIVERIES_REQUEST";
export const FETCH_DELIVERIES_SUCCESS = "FETCH_DELIVERIES_SUCCESS";
export const FETCH_DELIVERIES_FAILURE = "FETCH_DELIVERIES_FAILURE";
export const UPDATE_DELIVERY_SUCCESS = "UPDATE_DELIVERY_SUCCESS";
export const DELETE_DELIVERY = "DELETE_DELIVERY";

// Action Creators
export const initialState = () => ({
     type: INIT_STATE,
});

export const fetchDeliveriesRequest = () => ({
     type: FETCH_DELIVERIES_REQUEST,
});

export const fetchDeliveriesSuccess = (deliveries) => ({
     type: FETCH_DELIVERIES_SUCCESS,
     payload: deliveries,
});

export const fetchDeliveriesFailure = (error) => ({
     type: FETCH_DELIVERIES_FAILURE,
     payload: error,
});

export const updateDeliveryRequest = () => ({
     type: FETCH_DELIVERIES_REQUEST,
});

export const updateDeliverySuccess = (deliveries) => ({
     type: UPDATE_DELIVERY_SUCCESS,
     payload: deliveries,
});

export const deleteDelivery = (id) => ({
     type: DELETE_DELIVERY,
     payload: id,
});

const API = "https://srdgas.online/public/api/delivery";
const GAS_API = "https://srdgas.online/public/api/gasDeliverys";

//initial state
export const deliveriesIniState = () => {
     return async (dispatch) => {
          dispatch(initialState());
     };
};

// Async Action to Fetch Deliveries
export const fetchDeliveries = (params) => {
     return async (dispatch) => {
          dispatch(fetchDeliveriesRequest());
          console.log(params);
          try {
               const response = await axios().get(API, {
                    params: params,
               });

               // try {
               //      // let logs = response.headers["x-log-data"];
               //      //  logs = decodeURIComponent(logs);
               //      //  logs = JSON.parse(logs);
               //      // console.log(logs);
               // } catch (e) {
               //      console.log(e);
               // }
               const deliveries = response.data;

               //                let deliveries = `
               //                [
               //     {
               //         "id": 334,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-06-04T16:23:27.000000Z",
               //         "updated_at": "2025-06-04T16:23:27.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 193,
               //                 "delivery_id": 334,
               //                 "gas_id": 3,
               //                 "quantity": 55,
               //                 "price": 25,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 47,
               //                 "amount": 88,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 333,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-28T09:15:47.000000Z",
               //         "updated_at": "2025-05-28T09:15:47.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 192,
               //                 "delivery_id": 333,
               //                 "gas_id": 4,
               //                 "quantity": 4,
               //                 "price": 5,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 46,
               //                 "amount": 6,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 332,
               //         "customer_id": 4,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-25T16:06:46.000000Z",
               //         "updated_at": "2025-05-25T16:06:46.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 4,
               //             "user_id": 4,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 190,
               //                 "delivery_id": 332,
               //                 "gas_id": 2,
               //                 "quantity": 10,
               //                 "price": 20,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 191,
               //                 "delivery_id": 332,
               //                 "gas_id": 35,
               //                 "quantity": 2,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 44,
               //                 "amount": 50,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 45,
               //                 "amount": 30,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 331,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-13T16:33:29.000000Z",
               //         "updated_at": "2025-05-18T18:19:59.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 189,
               //                 "delivery_id": 331,
               //                 "gas_id": 4,
               //                 "quantity": 323,
               //                 "price": 23,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 43,
               //                 "amount": 32,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 330,
               //         "customer_id": 2,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 1,
               //         "created_at": "2025-05-13T11:42:25.000000Z",
               //         "updated_at": "2025-05-13T16:08:04.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 2,
               //             "user_id": 2,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "555348"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 188,
               //                 "delivery_id": 330,
               //                 "gas_id": 4,
               //                 "quantity": 88,
               //                 "price": 9,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 42,
               //                 "amount": 96,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 329,
               //         "customer_id": 6,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-13T11:41:48.000000Z",
               //         "updated_at": "2025-05-13T11:41:48.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 6,
               //             "user_id": 6,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 187,
               //                 "delivery_id": 329,
               //                 "gas_id": 3,
               //                 "quantity": 6,
               //                 "price": 2,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 41,
               //                 "amount": 6,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 328,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T15:22:22.000000Z",
               //         "updated_at": "2025-05-19T04:41:06.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 184,
               //                 "delivery_id": 328,
               //                 "gas_id": 2,
               //                 "quantity": 32,
               //                 "price": 23,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 185,
               //                 "delivery_id": 328,
               //                 "gas_id": 4,
               //                 "quantity": 32,
               //                 "price": 23,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 186,
               //                 "delivery_id": 328,
               //                 "gas_id": 34,
               //                 "quantity": 32,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 40,
               //                 "amount": 2,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 327,
               //         "customer_id": 55,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T11:31:19.000000Z",
               //         "updated_at": "2025-05-13T16:07:59.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 55,
               //             "user_id": 55,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 183,
               //                 "delivery_id": 327,
               //                 "gas_id": 3,
               //                 "quantity": 12,
               //                 "price": 12,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 39,
               //                 "amount": 21,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 326,
               //         "customer_id": 55,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T11:31:10.000000Z",
               //         "updated_at": "2025-05-13T16:07:43.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 55,
               //             "user_id": 55,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 182,
               //                 "delivery_id": 326,
               //                 "gas_id": 3,
               //                 "quantity": 12,
               //                 "price": 12,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 38,
               //                 "amount": 21,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 325,
               //         "customer_id": 30,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T11:31:06.000000Z",
               //         "updated_at": "2025-05-13T16:07:47.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 30,
               //             "user_id": 30,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 181,
               //                 "delivery_id": 325,
               //                 "gas_id": 4,
               //                 "quantity": 2,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 37,
               //                 "amount": 2,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 324,
               //         "customer_id": 30,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T11:30:57.000000Z",
               //         "updated_at": "2025-05-12T11:30:57.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 30,
               //             "user_id": 30,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 180,
               //                 "delivery_id": 324,
               //                 "gas_id": 4,
               //                 "quantity": 2,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 36,
               //                 "amount": 2,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 323,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T11:30:53.000000Z",
               //         "updated_at": "2025-05-12T11:30:53.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 179,
               //                 "delivery_id": 323,
               //                 "gas_id": 3,
               //                 "quantity": 2,
               //                 "price": 2,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 35,
               //                 "amount": 1,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 322,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T11:28:50.000000Z",
               //         "updated_at": "2025-05-12T11:28:50.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 178,
               //                 "delivery_id": 322,
               //                 "gas_id": 2,
               //                 "quantity": 2,
               //                 "price": 2,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 34,
               //                 "amount": 2,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 321,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T11:23:23.000000Z",
               //         "updated_at": "2025-06-04T16:19:04.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 167,
               //                 "delivery_id": 321,
               //                 "gas_id": 3,
               //                 "quantity": 3,
               //                 "price": 23,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 168,
               //                 "delivery_id": 321,
               //                 "gas_id": 2,
               //                 "quantity": 2,
               //                 "price": 23,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 169,
               //                 "delivery_id": 321,
               //                 "gas_id": 4,
               //                 "quantity": 23,
               //                 "price": 2,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 170,
               //                 "delivery_id": 321,
               //                 "gas_id": 5,
               //                 "quantity": 23,
               //                 "price": 2,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 171,
               //                 "delivery_id": 321,
               //                 "gas_id": 35,
               //                 "quantity": 23,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 172,
               //                 "delivery_id": 321,
               //                 "gas_id": 34,
               //                 "quantity": 23,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 173,
               //                 "delivery_id": 321,
               //                 "gas_id": 36,
               //                 "quantity": 2,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 174,
               //                 "delivery_id": 321,
               //                 "gas_id": 3,
               //                 "quantity": 32,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 175,
               //                 "delivery_id": 321,
               //                 "gas_id": 15,
               //                 "quantity": 23,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 176,
               //                 "delivery_id": 321,
               //                 "gas_id": 7,
               //                 "quantity": 23,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 177,
               //                 "delivery_id": 321,
               //                 "gas_id": 31,
               //                 "quantity": 23,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 32,
               //                 "amount": 2,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 33,
               //                 "amount": 100,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 320,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T05:03:10.000000Z",
               //         "updated_at": "2025-05-12T05:03:10.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 165,
               //                 "delivery_id": 320,
               //                 "gas_id": 4,
               //                 "quantity": 3,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 30,
               //                 "amount": 3,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 319,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T05:03:10.000000Z",
               //         "updated_at": "2025-05-12T05:03:10.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 166,
               //                 "delivery_id": 319,
               //                 "gas_id": 4,
               //                 "quantity": 3,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 31,
               //                 "amount": 3,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 318,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T05:03:10.000000Z",
               //         "updated_at": "2025-05-12T05:03:10.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 163,
               //                 "delivery_id": 318,
               //                 "gas_id": 4,
               //                 "quantity": 3,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 28,
               //                 "amount": 3,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 317,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T05:03:10.000000Z",
               //         "updated_at": "2025-05-12T05:03:10.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 162,
               //                 "delivery_id": 317,
               //                 "gas_id": 4,
               //                 "quantity": 3,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 27,
               //                 "amount": 3,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 316,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-12T05:03:10.000000Z",
               //         "updated_at": "2025-05-12T05:03:10.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 164,
               //                 "delivery_id": 316,
               //                 "gas_id": 4,
               //                 "quantity": 3,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 29,
               //                 "amount": 3,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 315,
               //         "customer_id": 60,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-11T16:24:44.000000Z",
               //         "updated_at": "2025-05-11T16:24:44.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 60,
               //             "user_id": 60,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 161,
               //                 "delivery_id": 315,
               //                 "gas_id": 2,
               //                 "quantity": 3,
               //                 "price": 2,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 26,
               //                 "amount": 32,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 314,
               //         "customer_id": 40,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-11T16:23:28.000000Z",
               //         "updated_at": "2025-05-11T16:23:28.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 40,
               //             "user_id": 40,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 158,
               //                 "delivery_id": 314,
               //                 "gas_id": 5,
               //                 "quantity": 4,
               //                 "price": 34,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 159,
               //                 "delivery_id": 314,
               //                 "gas_id": 3,
               //                 "quantity": 10,
               //                 "price": 99,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 160,
               //                 "delivery_id": 314,
               //                 "gas_id": 35,
               //                 "quantity": 34,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 24,
               //                 "amount": 34,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 25,
               //                 "amount": 15,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 313,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-11T16:23:26.000000Z",
               //         "updated_at": "2025-05-11T16:23:26.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 156,
               //                 "delivery_id": 313,
               //                 "gas_id": 3,
               //                 "quantity": 3,
               //                 "price": 34,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 157,
               //                 "delivery_id": 313,
               //                 "gas_id": 35,
               //                 "quantity": 34,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 23,
               //                 "amount": 34,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 312,
               //         "customer_id": 33,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-11T16:11:24.000000Z",
               //         "updated_at": "2025-05-11T16:11:24.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 33,
               //             "user_id": 33,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 154,
               //                 "delivery_id": 312,
               //                 "gas_id": 2,
               //                 "quantity": 3,
               //                 "price": 2,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 155,
               //                 "delivery_id": 312,
               //                 "gas_id": 32,
               //                 "quantity": 32,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 21,
               //                 "amount": 3,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 22,
               //                 "amount": 23,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 311,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-11T16:11:22.000000Z",
               //         "updated_at": "2025-05-11T16:11:22.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 152,
               //                 "delivery_id": 311,
               //                 "gas_id": 4,
               //                 "quantity": 4,
               //                 "price": 3,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 153,
               //                 "delivery_id": 311,
               //                 "gas_id": 36,
               //                 "quantity": 33,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 20,
               //                 "amount": 23,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 310,
               //         "customer_id": 2,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-11T09:09:17.000000Z",
               //         "updated_at": "2025-05-11T09:09:17.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 2,
               //             "user_id": 2,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "555348"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 151,
               //                 "delivery_id": 310,
               //                 "gas_id": 2,
               //                 "quantity": 34,
               //                 "price": 3,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 19,
               //                 "amount": 3,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 309,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-11T08:09:57.000000Z",
               //         "updated_at": "2025-05-11T08:09:57.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 150,
               //                 "delivery_id": 309,
               //                 "gas_id": 3,
               //                 "quantity": 23,
               //                 "price": 2,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 18,
               //                 "amount": 32,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 308,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-10T12:07:18.000000Z",
               //         "updated_at": "2025-05-10T12:07:18.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 147,
               //                 "delivery_id": 308,
               //                 "gas_id": 4,
               //                 "quantity": 94,
               //                 "price": 46,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 148,
               //                 "delivery_id": 308,
               //                 "gas_id": 3,
               //                 "quantity": 9,
               //                 "price": 55,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 149,
               //                 "delivery_id": 308,
               //                 "gas_id": 5,
               //                 "quantity": 994,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 16,
               //                 "amount": 799,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 17,
               //                 "amount": 76,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 307,
               //         "customer_id": 2,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-09T17:15:31.000000Z",
               //         "updated_at": "2025-05-09T17:15:31.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 2,
               //             "user_id": 2,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "555348"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 144,
               //                 "delivery_id": 307,
               //                 "gas_id": 2,
               //                 "quantity": 24,
               //                 "price": 944,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 145,
               //                 "delivery_id": 307,
               //                 "gas_id": 3,
               //                 "quantity": 46,
               //                 "price": 65,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 146,
               //                 "delivery_id": 307,
               //                 "gas_id": 35,
               //                 "quantity": 49,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 14,
               //                 "amount": 646,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 15,
               //                 "amount": 9494,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 306,
               //         "customer_id": 104,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-09T02:53:08.000000Z",
               //         "updated_at": "2025-05-09T02:53:08.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 104,
               //             "user_id": 104,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 141,
               //                 "delivery_id": 306,
               //                 "gas_id": 3,
               //                 "quantity": 59,
               //                 "price": 56,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 142,
               //                 "delivery_id": 306,
               //                 "gas_id": 5,
               //                 "quantity": 55,
               //                 "price": 86,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 143,
               //                 "delivery_id": 306,
               //                 "gas_id": 34,
               //                 "quantity": 899,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 12,
               //                 "amount": 566,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 13,
               //                 "amount": 6767,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 305,
               //         "customer_id": 2,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T16:25:26.000000Z",
               //         "updated_at": "2025-05-08T16:25:26.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 2,
               //             "user_id": 2,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "555348"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 139,
               //                 "delivery_id": 305,
               //                 "gas_id": 2,
               //                 "quantity": 7,
               //                 "price": 6,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 140,
               //                 "delivery_id": 305,
               //                 "gas_id": 35,
               //                 "quantity": 7,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 11,
               //                 "amount": 7,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 304,
               //         "customer_id": 2,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T16:19:24.000000Z",
               //         "updated_at": "2025-05-08T16:19:24.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 2,
               //             "user_id": 2,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "555348"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 137,
               //                 "delivery_id": 304,
               //                 "gas_id": 5,
               //                 "quantity": 34,
               //                 "price": 34,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 138,
               //                 "delivery_id": 304,
               //                 "gas_id": 34,
               //                 "quantity": 34,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 10,
               //                 "amount": 34,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 303,
               //         "customer_id": 3,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T16:09:55.000000Z",
               //         "updated_at": "2025-05-08T16:09:55.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 3,
               //             "user_id": 3,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "37"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 135,
               //                 "delivery_id": 303,
               //                 "gas_id": 3,
               //                 "quantity": 23,
               //                 "price": 32,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 136,
               //                 "delivery_id": 303,
               //                 "gas_id": 36,
               //                 "quantity": 2,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 9,
               //                 "amount": 23,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 302,
               //         "customer_id": 2,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T15:55:43.000000Z",
               //         "updated_at": "2025-05-08T15:55:43.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 2,
               //             "user_id": 2,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "555348"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 133,
               //                 "delivery_id": 302,
               //                 "gas_id": 2,
               //                 "quantity": 23,
               //                 "price": 23,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 134,
               //                 "delivery_id": 302,
               //                 "gas_id": 36,
               //                 "quantity": 2,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 8,
               //                 "amount": 23,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 301,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T15:53:29.000000Z",
               //         "updated_at": "2025-05-08T15:53:29.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 132,
               //                 "delivery_id": 301,
               //                 "gas_id": 3,
               //                 "quantity": 12,
               //                 "price": 2,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 7,
               //                 "amount": 2,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 300,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T15:51:11.000000Z",
               //         "updated_at": "2025-05-08T15:51:11.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 131,
               //                 "delivery_id": 300,
               //                 "gas_id": 3,
               //                 "quantity": 332,
               //                 "price": 23,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 6,
               //                 "amount": 2,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 299,
               //         "customer_id": 4,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T15:46:54.000000Z",
               //         "updated_at": "2025-05-08T15:46:54.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 4,
               //             "user_id": 4,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 130,
               //                 "delivery_id": 299,
               //                 "gas_id": 3,
               //                 "quantity": 23,
               //                 "price": 23,
               //                 "is_empty": 0
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 5,
               //                 "amount": 23,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 298,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T15:43:42.000000Z",
               //         "updated_at": "2025-05-08T15:43:42.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 128,
               //                 "delivery_id": 298,
               //                 "gas_id": 3,
               //                 "quantity": 23,
               //                 "price": 2,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 129,
               //                 "delivery_id": 298,
               //                 "gas_id": 35,
               //                 "quantity": 23,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 4,
               //                 "amount": 2,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 297,
               //         "customer_id": 5,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T15:39:28.000000Z",
               //         "updated_at": "2025-05-08T15:39:28.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 5,
               //             "user_id": 5,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": null
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 126,
               //                 "delivery_id": 297,
               //                 "gas_id": 2,
               //                 "quantity": 3,
               //                 "price": 32,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 127,
               //                 "delivery_id": 297,
               //                 "gas_id": 36,
               //                 "quantity": 23,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 3,
               //                 "amount": 32,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 296,
               //         "customer_id": 2,
               //         "courier_boy_id": 1,
               //         "received_amount": 0,
               //         "payment_method": 0,
               //         "balance": 0,
               //         "correction": 0,
               //         "created_at": "2025-05-08T12:04:38.000000Z",
               //         "updated_at": "2025-05-08T12:04:38.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 2,
               //             "user_id": 2,
               //             "diaryNumber": null,
               //             "Balance": 0,
               //             "aadhar_card_no": "555348"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 122,
               //                 "delivery_id": 296,
               //                 "gas_id": 2,
               //                 "quantity": 66,
               //                 "price": 7,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 123,
               //                 "delivery_id": 296,
               //                 "gas_id": 4,
               //                 "quantity": 6,
               //                 "price": 76,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 124,
               //                 "delivery_id": 296,
               //                 "gas_id": 35,
               //                 "quantity": 6,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 125,
               //                 "delivery_id": 296,
               //                 "gas_id": 36,
               //                 "quantity": 6,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": [
               //             {
               //                 "id": 1,
               //                 "amount": 6,
               //                 "method": 1,
               //                 "payment_for": "delivery"
               //             },
               //             {
               //                 "id": 2,
               //                 "amount": 6,
               //                 "method": 0,
               //                 "payment_for": "delivery"
               //             }
               //         ]
               //     },
               //     {
               //         "id": 284,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 132,
               //         "payment_method": 0,
               //         "balance": 16960,
               //         "correction": 0,
               //         "created_at": "2025-05-07T13:43:27.000000Z",
               //         "updated_at": "2025-05-07T13:43:27.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 78,
               //                 "delivery_id": 284,
               //                 "gas_id": 2,
               //                 "quantity": 10,
               //                 "price": 12,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 79,
               //                 "delivery_id": 284,
               //                 "gas_id": 4,
               //                 "quantity": 12,
               //                 "price": 122,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 80,
               //                 "delivery_id": 284,
               //                 "gas_id": 26,
               //                 "quantity": 12,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 81,
               //                 "delivery_id": 284,
               //                 "gas_id": 10,
               //                 "quantity": 34,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": []
               //     },
               //     {
               //         "id": 283,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 132,
               //         "payment_method": 0,
               //         "balance": 16960,
               //         "correction": 0,
               //         "created_at": "2025-05-07T13:35:48.000000Z",
               //         "updated_at": "2025-05-07T13:35:48.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 74,
               //                 "delivery_id": 283,
               //                 "gas_id": 2,
               //                 "quantity": 10,
               //                 "price": 12,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 75,
               //                 "delivery_id": 283,
               //                 "gas_id": 4,
               //                 "quantity": 12,
               //                 "price": 122,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 76,
               //                 "delivery_id": 283,
               //                 "gas_id": 26,
               //                 "quantity": 12,
               //                 "price": 0,
               //                 "is_empty": 1
               //             },
               //             {
               //                 "id": 77,
               //                 "delivery_id": 283,
               //                 "gas_id": 10,
               //                 "quantity": 34,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": []
               //     },
               //     {
               //         "id": 282,
               //         "customer_id": 1,
               //         "courier_boy_id": 2,
               //         "received_amount": 5,
               //         "payment_method": 0,
               //         "balance": 15508,
               //         "correction": 0,
               //         "created_at": "2025-05-04T17:54:18.000000Z",
               //         "updated_at": "2025-05-04T17:54:18.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 2,
               //             "user_id": 113,
               //             "username": "PRABHAT",
               //             "password": "PRABHAT12"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 72,
               //                 "delivery_id": 282,
               //                 "gas_id": 2,
               //                 "quantity": 2,
               //                 "price": 5,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 73,
               //                 "delivery_id": 282,
               //                 "gas_id": 2,
               //                 "quantity": 3,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": []
               //     },
               //     {
               //         "id": 281,
               //         "customer_id": 1,
               //         "courier_boy_id": 2,
               //         "received_amount": 5607,
               //         "payment_method": 0,
               //         "balance": 2766,
               //         "correction": 1,
               //         "created_at": "2025-05-04T16:52:53.000000Z",
               //         "updated_at": "2025-05-06T04:04:19.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 2,
               //             "user_id": 113,
               //             "username": "PRABHAT",
               //             "password": "PRABHAT12"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 70,
               //                 "delivery_id": 281,
               //                 "gas_id": 2,
               //                 "quantity": 50,
               //                 "price": 258,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 71,
               //                 "delivery_id": 281,
               //                 "gas_id": 2,
               //                 "quantity": 20,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": []
               //     },
               //     {
               //         "id": 280,
               //         "customer_id": 1,
               //         "courier_boy_id": 1,
               //         "received_amount": 5,
               //         "payment_method": 1,
               //         "balance": 15503,
               //         "correction": 1,
               //         "created_at": "2025-05-01T14:17:17.000000Z",
               //         "updated_at": "2025-05-05T17:44:52.000000Z",
               //         "cleared": false,
               //         "customer": {
               //             "id": 1,
               //             "user_id": 1,
               //             "diaryNumber": 2,
               //             "Balance": 0,
               //             "aadhar_card_no": "437567655333"
               //         },
               //         "courier_boy": {
               //             "id": 1,
               //             "user_id": 112,
               //             "username": "NITESH",
               //             "password": "NITESH123"
               //         },
               //         "gas_deliveries": [
               //             {
               //                 "id": 68,
               //                 "delivery_id": 280,
               //                 "gas_id": 2,
               //                 "quantity": 12,
               //                 "price": 5,
               //                 "is_empty": 0
               //             },
               //             {
               //                 "id": 69,
               //                 "delivery_id": 280,
               //                 "gas_id": 2,
               //                 "quantity": 5,
               //                 "price": 0,
               //                 "is_empty": 1
               //             }
               //         ],
               //         "payments": []
               //     }
               // ]
               //                `;
               //                deliveries = JSON.parse(deliveries);

               dispatch(fetchDeliveriesSuccess(deliveries));
          } catch (error) {
               console.log("error", error);
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};

//update delivery
export const updateDelivery = (delivery) => {
     console.log("req", delivery);
     return async (dispatch) => {
          dispatch(updateDeliveryRequest());
          //console.log("updateDelivery : ", delivery);
          try {
               let response;
               if (
                    delivery.columnName != null &&
                    (delivery.columnName == "quantity" ||
                         delivery.columnName == "price")
               ) {
                    response = await axios().put(
                         `${GAS_API}/${delivery.id}`,
                         delivery,
                    );
               } else {
                    response = await axios().put(
                         `${API}/${delivery.id}`,
                         delivery,
                    );
               }
               //console.log("res", response.data);
               const deliveries = response.data;
               if (deliveries.success == false) {
                    //error
                    dispatch(fetchDeliveriesFailure(deliveries.message));
               } else {
                    dispatch(updateDeliverySuccess(deliveries));
               }
          } catch (error) {
               console.log("error", error);
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};

//delete delivery
export const deleteDeliveryById = (id) => {
     if (id == null) {
          return;
     }
     return async (dispatch) => {
          try {
               let response = await axios().delete(`${API}/${id}`);
               console.log("res", response.data);
               const deliveries = response.data;
               if (deliveries.success == false) {
                    //error
                    dispatch(fetchDeliveriesFailure(deliveries.message));
               } else {
                    dispatch(updateDeliverySuccess(deliveries));
               }
          } catch (error) {
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};
