/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react'

const apiToken = 'BQDf_zGtzXHvOTu8gT9MYfkxvUmLOrvZKD1PfmU_5cWy-fwGtZ2T3gTN-S__tLwjtdPr9BEvtxM1hQsnjJ6VDqSKnPereD9K0ipAg5Yaf2WW8nYh-RnlsNSCIDg8VcGJ4alqhrRr3roXe7jOFFD-8P7bY2uJjvRZQ9KHgWKWgBKq';


function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState({});
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({}); 
  const AlbumCover = () => {return(<p>okkkkkkkkkkkkkkkkkk</p>)}// fin ici
  useEffect(() => {setText('Bonjour');}, []);
  useEffect(() => {fetch('https://api.spotify.com/v1/me/tracks?offset=20&limit=30', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  })
  .then(response => response.json())
  .then((data) => {
    console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
    setTracks(data['items']);
    setSongsLoaded(true);
  })}, []);
  
  if(!songsLoaded){
    return(<img src={loading} className="App-loading" alt="loading"/>)
  }
  else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest de Médah :)</h1>
        </header>
        <div className="App-images">
          <AlbumCover track={currentTrack} /> FIN ICI
          <p>Il va falloir modifier le code pour faire un vrai Blindtest !</p>
          <p>{text}</p>
          <p>{tracks.length} musiques chargées</p>
          <p>Premier morceau : {tracks[0].track.name} de {tracks[0].track.artists[0].name}</p>

        </div>
        <div className="App-buttons">
        </div>
      </div>
  );}
}

export default App;
