import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    let navigate = useNavigate();
    let url = window.location.pathname;
    useEffect(() => {
        if (url === '/') {
            navigate('/dashboard');
        }
    }, [])


    return (
        <>
        </>
    )
}

export default Home