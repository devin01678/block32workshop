const client = require("./client");
const util = require("util");

const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    const { rows: videoGames } = await client.query(
      // Here we are fetching the videoGames table from the database and displaying it onto the screen
      "SELECT * from videoGames;"
    );
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game

// Below, we are creating a new entry into the video game database by inserting a new object. This object is being defined by the six characteristics: name, description, price, etc... We also use the row of values to protect against SQL injection.
async function createVideoGame(body) {
  const { name, description, price, inStock, isPopular, imgUrl } = body;
  {
    try {
      const {
        rows: [videoGame],
      } = await client.query(
        `
            INSERT INTO videogames (name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
        [name, description, price, inStock, isPopular, imgUrl]
      );
      return videoGame;
    } catch (error) {
      throw error;
    }
  }
}

// PUT - /api/video-games/:id - update a single video game by id

// Below, we are creating a function that is used to update the videogames database, taking a given property/characteristic of a video game and updating it in the database.

async function updateVideoGame(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
        UPDATE videogames
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id

// Below, we are accessing the videogames table, creating values to circumvent SQL injection, and we are calling the delete verb/keyword to remove a given file from the database.

async function deleteVideoGame(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
        DELETE FROM videogames
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
  // LOGIC GOES HERE
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
