import React from 'react';
import Banner from '../Banner';
import './Homescreen.css';
import Nav from '../Nav';
import requests from '../request';
import Row from '../Row';

function Homescreen() {
    return (
        <div className = 'homescreen'>
            <Nav/>
            <Banner/>
            <Row title = {'Netflix Originals'} fetchUrl = {requests.fetchNetflixOriginals} isLargeRow = {true}/>
            <Row title = {'Trending Now'} fetchUrl = {requests.fetchTrending}/>
            <Row title = {'Top Rated'} fetchUrl = {requests.fetchTopRated}/>
            <Row title = {'Action Movies'} fetchUrl = {requests.fetchActionMovies}/>
            <Row title = {'Comedy Movies'} fetchUrl = {requests.fetchComedyMovies}/>
            <Row title = {'Horror Movies'} fetchUrl = {requests.fetchHorrorMovies}/>
            <Row title = {'Romance Movies'} fetchUrl = {requests.fetchRomanceMovies}/>
            <Row title = {'Documentaries'} fetchUrl = {requests.fetchDocumentaries}/>
        </div>
    )
}

export default Homescreen
