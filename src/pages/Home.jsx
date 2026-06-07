import React from 'react'
import Carousel from '../components/home/Carousel'
import NewArrival from '../components/home/NewArrival'
import Vehicle from '../components/home/Vehicle'
import UniversalArrival from "../components/home/UniversalArrival";
const Home = () => {
    return (
        <div>
            <Carousel />
                <Vehicle /> 
                <UniversalArrival />
            <NewArrival />
            
        </div>
    )
}

export default Home
