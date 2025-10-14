import React from 'react'
import Carousel from '../components/home/Carousel'
import NewArrival from '../components/home/NewArrival'
import Vehicle from '../components/home/Vehicle'
const Home = () => {
    return (
        <div>
            <Carousel />

            <NewArrival />
            <Vehicle />
        </div>
    )
}

export default Home
