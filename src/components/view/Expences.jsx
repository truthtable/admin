import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpences } from '../../redux/actions/expencesActions';
export default function Expences() {
     //get user_id from url
     //
     const currentUrl = window.location.href;
     const hashIndex = currentUrl.indexOf('#');
     const hashPart = currentUrl.substring(hashIndex + 1);
     const url = new URL(hashPart, window.location.origin);
     const searchParams = new URLSearchParams(url.search);
     const USER_ID = searchParams.get('user_id');
     console.log(USER_ID);
     //

     const dispatch = useDispatch();
     const {
          expenses,
          expenceLoading,
          expenceError,

     } = useSelector((state) => state.expence);

     console.log({ expenses, expenceLoading, expenceError });

     useEffect(() => {
          dispatch(fetchExpences());
     }, []);

     return (
          <div>
               <h1>Expences</h1>
          </div>
     )
}