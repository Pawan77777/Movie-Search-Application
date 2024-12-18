const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

// Your OMDb API key
const OMDB_API_KEY = "a02d4ac5";

app.get("/movies", async (req, res) => {
  const { title } = req.query;

  // Check if title is provided in the query
  if (!title) {
    console.error("Error: Missing 'title' query parameter.");
    return res.status(400).json({ message: "Movie title is required" });
  }

  console.log(`Received request to /movies with title: "${title}"`);

  try {
    // OMDb API request
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apiKey: OMDB_API_KEY, // Correctly pass the API key
        t: title, // Title parameter to search the movie by
        r: "json", // Response format
      },
      timeout: 10000, // Set timeout to 10 seconds
    });

    console.log("OMDb API Request Successful.");

    // Check if the movie data is available in the response
    if (response.data.Response === "False") {
      console.warn(`No movie found for the title: "${title}"`);
      return res.status(404).json({ message: "No movie found" });
    }

    return res.json(response.data); // Return the movie details
  } catch (error) {
    console.error("Error fetching data from OMDb API:", error.message);
    return res.status(500).json({ message: "Error fetching movie data" });
  }
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
