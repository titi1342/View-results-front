import axios from "axios";

export const getSelectedResult = async (api: string) => {

    try {
        const response = await axios.get(`https://view-results-back.onrender.com/${api}`);
        return response.data;       
    } catch (err) {
        console.error("❌ Erreur Axios :", err);
        return [];
    }

}