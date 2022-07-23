/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react'

const apiToken = 'BQDG8FQo-5gk16nun7EipBvlBszS57QK8owaL1i765Ux40dtAXXBOfmxxlND-pau722ghVhW0mX8owXkqy6YhtyKrltgpqr_uAoIn99CfFGK_wl_6JlQGB0krLEgwubD0TUn5Bn5zef6x78aigt6ChCRM9qiRRwS5lYOqdofvFPsEZVzPsm7yDZvuJYQvCcuT1sEVaEoQJTP';


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

const checkAnswer = (answerid, trackid) => {
  if (answerid === trackid) {
    swal('Bravo', 'Vous avez trouvé la bonne réponse !', 'success');
  }
  else {
    swal('Dommage', "Vous n'avez pas trouvé la bonne réponse !", 'error');
  }
}


const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState({});
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
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
        const randomIndex = getRandomNumber(data.items.length);
        setCurrentTrack(data.items[randomIndex].track);
        setTracks(data['items']);
        setSongsLoaded(true);
        console.log('tracks', tracks);
        console.log('songsLoaded', songsLoaded);
        console.log('currentTrack', currentTrack);
      })
  });

  if (!songsLoaded) {
    return (<img src={loading} className="App-loading" alt="loading" />)
  }
  else {
    const track1 = tracks[getRandomNumber(tracks.length)].track;
    const track2 = tracks[getRandomNumber(tracks.length)].track;
    var currentTracks = [currentTrack, track1, track2];
    currentTracks = shuffleArray(currentTracks);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bienvenue sur le Blindtest de Médah</h1>
        </header>
        <div className="App-images">
          <AlbumCover track={currentTrack} />
          <Sound url={currentTrack.preview_url} playStatus={Sound.status.PLAYING} />
          <p>Il va falloir modifier le code pour faire un vrai Blindtest !</p>
          <p>{text}</p>
          <p>{tracks.length} musiques chargées</p>
          {/* Display a button for each track containing track name */}
          <Button onClick={() => checkAnswer(currentTracks[0].id, currentTrack.id)}>{currentTracks[0].name}</Button>
          <Button onClick={() => checkAnswer(currentTracks[1].id, currentTrack.id)}>{currentTracks[1].name}</Button>
          <Button onClick={() => checkAnswer(currentTracks[2].id, currentTrack.id)}>{currentTracks[2].name}</Button>
          <p>Premier morceau : {currentTrack.name} de {currentTrack.artists[0].name}</p>

        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;

// TODO:
// At launch, selects random songs many times for no reason. -- to fix
// length error after loading. -- to fix
// Backlog 5. -- to do