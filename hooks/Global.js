
import axios from 'axios'
export const fetchData = async (url) => {
  
    const response = axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });
  return response;
};
export async function postData(url, data) {
    console.log("SEND AXIOS" , data)
  
  const response = await axios({
    method: "post",
    url,
    data,
  })
    .then((res) => res?.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });

  return response;
}

export async function updateData(url, data) {
  
  const response = await axios({
    method: "put",
    url,
    data,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });

  return response;
}

export async function deleteData(url, data) {

  const response = await axios({
    method: "delete",
    url,
    data,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });

  return response;
}