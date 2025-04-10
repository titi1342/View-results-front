import axios from "axios";
import ResultType from "../models/resultType";

export const getSelectedResult = async (api: string) => {

    try {
        const response = await axios.get(`http://localhost:5000/${api}`);
        return response.data;       
    } catch (err) {
        console.error("❌ Erreur Axios :", err);
        return [];
    }

}