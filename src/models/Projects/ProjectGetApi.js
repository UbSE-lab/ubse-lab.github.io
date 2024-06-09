import axios from "axios";

export const selectProjectDatas = async (apiAddress) => {
  //??
  const BASE_URL = import.meta.env.VITE_API_ORIGIN;

  try {
    const data = await axios.get(apiAddress, {
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
