import { API_URL } from '@env';
console.log('API_URL from .env:', API_URL);

// Fonction utilitaire pour gérer les erreurs de fetch
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
  }
  return response.json();
};

// Récupérer toutes les discussions d'un utilisateur
export const fetchDiscussions = async (token) => {
  try {
    const response = await fetch(`${API_URL}/discussions?token=${token}`);
    const data = await response.json();
    console.log('Réponse de fetchDiscussions:', data);
    return data;
  } catch (error) {
    console.error('Erreur dans fetchDiscussions:', error);
    throw error;
  }
};

// Récupérer les messages d'une discussion spécifique
export const fetchMessages = async (discussionId) => {
  const response = await fetch(`${API_URL}/discussions/${discussionId}/messages`);
  return handleApiResponse(response);
};

// Envoyer un nouveau message
export const sendMessage = async (token, discussionId, text) => {
  const response = await fetch(`${API_URL}/discussions/${discussionId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, text }),
  });
  return handleApiResponse(response);
};

// Créer une nouvelle discussion ou récupérer une existante
export const createOrGetDiscussion = async (token, otherUserId) => {
  const response = await fetch(`${API_URL}/discussions/create/${otherUserId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  return handleApiResponse(response);
};

// Récupérer les informations de l'utilisateur à partir de son ID
export const fetchUserInfo = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de l'utilisateur: ${response.status}`);
    }
    const data = await response.json();
    console.log('Réponse de l\'API:', data);
    
    if (data.result && data.message === "User exist") {
      return {
        _id: userId,
        exists: true,
        // Ajoutez d'autres propriétés si elles deviennent disponibles dans la réponse
      };
    } else {
      throw new Error('Utilisateur non trouvé');
    }
  } catch (error) {
    console.error('Erreur dans fetchUserInfo:', error);
    throw error;
  }
};