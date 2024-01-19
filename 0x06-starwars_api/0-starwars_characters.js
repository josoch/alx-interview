#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./0-starwars_characters.js <Movie_ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Error: ${response.statusCode}`);
    process.exit(1);
  }

  const filmData = JSON.parse(body);
  const characters = filmData.characters;

  characters.forEach((characterUrl) => {
    request(characterUrl, (charError, charResponse, charBody) => {
      if (charError) {
        console.error(charError);
        process.exit(1);
      }

      if (charResponse.statusCode !== 200) {
        console.error(`Error: ${charResponse.statusCode}`);
        process.exit(1);
      }

      const characterData = JSON.parse(charBody);
      console.log(characterData.name);
    });
  });
});
