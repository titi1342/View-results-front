import axios from "axios";
import ResultType from "../models/resultType";

export const getSelectedResult = async (api: string) => {

    try {
        const response = await axios.get(`https://view-results-back.onrender.com/${api}`);
        return response.data;       
    } catch (err) {
        console.error("❌ Erreur Axios :", err);
        return [];
    }

}