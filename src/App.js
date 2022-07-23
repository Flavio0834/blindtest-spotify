/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react'

const apiToken = 'BQDQoq1FjReELUBv0d0jYTyUNTeJ_WkznLl98H9ufTm3wCdsPP6aUEaErzTQUo1lnRB89GqtDeTk041SHtm2DVD2gkyJdovR7fMHF6ukWKrwbYz773Hhine-Nu20GVSlSGJwEM-c1vC9pu1ThN2MZbOb92S2rrq4cRFOcvtS-Nkw3s_vULkVhFxEwvAPnLgS_oxyIMETFnml';


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
  // const [currentTrack, setCurrentTrack] = useState({});
  const AlbumCover = (props) => {
    const src = props.track.album.images[0].url;
    return <img src={src} style={{ width: 400, height: 400 }} alt="album cover" />
  }
  useEffect(() => { setText('Bonjour'); }, []);
  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/tracks?offset=20&limit=30', {
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
      })
  }, []);

  if (!songsLoaded) {
    return (<img src={loading} className="App-loading" alt="loading" />)
  }
  else {
    const track0 = tracks[0].track;
    const track1 = tracks[1].track;
    const track2 = tracks[2].track;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bienvenue sur le Blindtest de Médah</h1>
        </header>
        <div className="App-images">
          <AlbumCover track={track0} />
          <Sound url={track0.preview_url} playStatus={Sound.status.PLAYING} />
          <p>Il va falloir modifier le code pour faire un vrai Blindtest !</p>
          <p>{text}</p>
          <p>{tracks.length} musiques chargées</p>
          {/* Display a button for each track containing track name */}
          <Button>{track0.name}</Button>
          <Button>{track1.name}</Button>
          <Button>{track2.name}</Button>
          <p>Premier morceau : {track0.name} de {track0.artists[0].name}</p>

        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;
