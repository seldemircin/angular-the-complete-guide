import fs from "node:fs/promises";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Logging-Interceptor"]
}));

app.get("/places", async (req, res) => {

  const fileContent = await fs.readFile("./data/places.json", 'utf-8');

  const placesData = JSON.parse(fileContent);

  res.status(200).json({places: placesData});
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json", 'utf-8');

  const places = JSON.parse(fileContent);

  res.status(200).json({places});
});

app.put("/user-places", async (req, res) => {
  const placeId = req.body.placeId;

  const fileContent = await fs.readFile("./data/places.json", 'utf-8');
  const placesData = JSON.parse(fileContent);

  const place = placesData.find((place) => place.id === placeId);

  const userPlacesFileContent = await fs.readFile("./data/user-places.json", 'utf-8');
  const userPlacesData = JSON.parse(userPlacesFileContent);

  let updatedUserPlaces = userPlacesData;

  if (!userPlacesData.some((p) => p.id === place.id)) {
    updatedUserPlaces = [...userPlacesData, place];
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({userPlaces: updatedUserPlaces});
});

app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;

  const userPlacesFileContent = await fs.readFile("./data/user-places.json", 'utf-8');
  const userPlacesData = JSON.parse(userPlacesFileContent);

  const placeIndex = userPlacesData.findIndex((place) => place.id === placeId);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {
    updatedUserPlaces.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({userPlaces: updatedUserPlaces});
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({message: "404 - Not Found"});
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
