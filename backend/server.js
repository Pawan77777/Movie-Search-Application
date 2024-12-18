const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const OMDB_API_KEY = "a02d4ac5";

app.get("/movies", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Movie title is required" });
  }

  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apiKey: OMDB_API_KEY,
        t: title,
        r: "json",
      },
      timeout: 10000,
    });

    if (response.data.Response === "False") {
      return res.status(404).json({ message: "No movie found" });
    }

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movie data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
