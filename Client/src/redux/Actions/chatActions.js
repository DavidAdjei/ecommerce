import axios from "axios";

const { SET_MESSAGES, SET_CONTACTS } = require("../constants");

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
});

export const setContacts = (contacts) => ({
    type: SET_CONTACTS,
    payload: contacts
})

export const createOrNavigateToRoom = (userId, sellerId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/chat/join-room`, { buyerId: userId, sellerId });
            return Promise.resolve(data);
        }catch (error) {

            console.error("Failed to create or navigate to chat room:", error);
        }
    }
};

export const fetchMessages = (roomId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/chat/messages/${roomId}`);
            dispatch(setMessages(data.messages));
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };
};

export const getChats = (userId) => {
    return async (dispatch) => {
        try{
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/chat/chatList/${userId}`);
            dispatch(setContacts(data.contacts));
        }catch(error){
            console.error("Failed to fetch messages:", error);
        }
    }
}

export const uploadImages = (formData) => async () => {
    try {
      console.log({ formData });
  
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/chat/uploadImages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data && !response.data.error) {
        return response.data; 
      } else {
        const error = response.data.error || "Image upload failed";
        return Promise.reject(error);
      }
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      console.log(error)
      return Promise.reject(error);
    }
  };
  
