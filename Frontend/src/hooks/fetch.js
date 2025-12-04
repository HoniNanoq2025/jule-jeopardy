const API_URL = "https://jeopardy-gkiyb.ondigitalocean.app/";

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
export const createTeam = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/team`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating Team:", err);
    throw err;
  }
};

// Create Game
export const createGame = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating Game:", err);
    throw err;
  }
};

// Add teams
export const addTeams = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/game/${id}/add-teams`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error when adding team to game:", err);
    throw err;
  }
};

/* ====== PUT ========  */

// Update Team
export const updateTeam = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/team/${id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating team:", err);
    throw err;
  }
};

// Update Team
export const updateGame = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/game/${id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating game:", err);
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
