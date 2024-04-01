const express = require("express");
const app = express();
const fs = require('fs').promises;
const path = require('path');

const CITIES_FILE_PATH = path.join(__dirname, 'cities.json');
const SERVICES_FILE_PATH = path.join(__dirname, 'services.json');

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3, () => console.log("Server ready on port 3000."));


// Routes for retrieving cities and updating markers
app.get('/getCities', async (req, res) => {
    try {
      const cities = await fs.readFile(CITIES_FILE_PATH, 'utf8');
      res.json(JSON.parse(cities));
    } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).send('Error fetching cities');
    }
  });
  
  app.post('/updateMarker', async (req, res) => {
    try {
      const newMarker = req.body;
      let cities = await fs.readFile(CITIES_FILE_PATH, 'utf8');
      cities = JSON.parse(cities);
      cities.push(newMarker);
      await fs.writeFile(CITIES_FILE_PATH, JSON.stringify(cities, null, 2), 'utf8');
      res.status(200).send('Marker added successfully');
    } catch (error) {
      console.error('Error adding marker:', error);
      res.status(500).send('Error adding marker');
    }
  });
  
  

module.exports = app;