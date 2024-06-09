import axios from "axios";
// member api get

export const selectMemberDatas = async (apiAddress) => {
  const BASE_URL = import.meta.env.VITE_API_ORIGIN;
  // axios.defaults.withCredentials = true;

  try {
    const data = await axios.get(apiAddress, {
      baseURL: import.meta.env.VITE_API_ORIGIN,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
