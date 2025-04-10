import { useEffect, useState } from "react";
import ResultType from "../models/resultType";
import { getSelectedResult } from "../services/ResultsService";
const useResults = (link: string) => {
    const [ data, setData] = useState<ResultType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchInitialData();
    }, [link]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const response = await getSelectedResult(link);
            if (Array.isArray(response)){
                setData(response);
                setLoading(false);
            }
            else {
                console.log("❌ L'API ne retourne pas un tableau.")
            }
        }
        catch(err) {
            console.error("❌ Erreur Axios :", err);
        }            
    }

    return {data, loading};

}

export default useResults;