import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosGet = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
        setData([]);
      }
    };
    fetchData(dataUrl);
  }, [dataUrl]);
  return { data, fetchError };
};

export default useAxiosGet;
