const API_URL = "https://jeopardy-gkiyb.ondigitalocean.app";

/* ====== FETCH ========  */

// All teams
export const fetchAllTeams = async () => {
  try {
    const response = await fetch(`${API_URL}/teams`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching all teams:", err);
    throw err;
  }
};

// Team by ID
export const fetchTeamById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/team/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching team by id:", err);
    throw err;
  }
};

// All Team images
export const fetchTeamImages = async () => {
  try {
    const response = await fetch(`${API_URL}/teams/images`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching Team Images:", err);
    throw err;
  }
};

// All Games
export const fetchAllGames = async () => {
  try {
    const response = await fetch(`${API_URL}/games`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching all games:", err);
    throw err;
  }
};

// Game by ID
export const fetchGameById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/game/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching game:", err);
    throw err;
  }
};

/* ====== POST ========  */

// Create Team
export const createTeam = async (newTeam) => {
  try {
    const response = await fetch(`${API_URL}/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeam),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating Team:", err);
    throw err;
  }
};

// Create Game
export const createGame = async (newGame) => {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });

    return await response.json();
  } catch (err) {
    console.error("Error creating Game:", err);
    throw err;
  }
};

// Add teams
export const addTeams = async (id, teams) => {
  try {
    const response = await fetch(`${API_URL}/game/${id}/add-teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teams),
    });

    return await response.json();
  } catch (err) {
    console.error("Error when adding team to game:", err);
    throw err;
  }
};

/* ====== PUT ========  */

// Update Team
export const updateTeam = async (updatedTeam) => {
  try {
    const response = await fetch(`${API_URL}/team`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTeam),
    });

    return await response.json();
  } catch (err) {
    console.error("Error updating team:", err);
    throw err;
  }
};

// Update Game
export const updateGame = async (id, updatedGame) => {
  try {
    const response = await fetch(`${API_URL}/game/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGame),
    });

    return await response.json();
  } catch (err) {
    console.error("Error updating game:", err);
    throw err;
  }
};

/* ====== PATCH ========  */

// Update score
export const updateScore = async (id, scoreData) => {
  try {
    const response = await fetch(`${API_URL}/team/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating score:", err);
    throw err;
  }
};

/* ====== DELETE ========  */

// Delete team
export const deleteTeam = async (id) => {
  try {
    const response = await fetch(`${API_URL}/team/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error deleting team:", err);
    throw err;
  }
};

// Delete Game
export const deleteGame = async (id) => {
  try {
    const response = await fetch(`${API_URL}/game/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error deleting game:", err);
    throw err;
  }
};
