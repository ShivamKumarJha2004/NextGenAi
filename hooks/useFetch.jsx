import { useState } from "react";
import { toast } from "sonner";
const useFetch = (cb) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (params) => {
       setLoading(true);
       setError(null);
        try {
            const response = await cb(params);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { data, loading, error, fetchData, setData };
}

export default useFetch;