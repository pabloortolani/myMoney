import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';

const reducer = (state, action) => {
    //Manipular meu estado
    if(action.type === 'REQUEST'){
        return {
            ...state,
            loading: true
        }
    }
    if(action.type === 'SUCCESS'){
        return {
            ...state,
            loading: false,
            data: action.data
        }
    }
    return state;
}

const useGet = url => {
    /*
    const [data, setData] = useState({
        loading: true,
        data: {}
    });
    */
    const [data, dispatch] = useReducer(reducer, {
        loading: true,
        data: {}
    });

    useEffect(()=>{
        dispatch({type:'REQUEST'});
        axios
        .get(url)
        .then(res => {
            /*
            setData({
                loading: false,
                data: res.data
            });
            */
            dispatch({type: 'SUCCESS', data: res.data})
        })
    },[]);
    return data;
}

export default useGet;