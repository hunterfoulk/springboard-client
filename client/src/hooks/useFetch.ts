import { useState } from "react";
import axios from "axios";


const useFetch = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // Just pass the variables that changes in each new fetch requisition
    const fetchData = async (term: string) => {
        setIsError(false);
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/fetchThreads", { params: { term: term } });
            setData(response.data);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };


    return [{ data, isLoading, isError }, fetchData];
};

export default useFetch;