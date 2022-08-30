import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/inventory"

const getAllInventoryItems = () => {
    return axios.get(API_URL + "/strict", {headers: authHeader()});
}


const InventoryService = {
    getAllInventoryItems
}

export default InventoryService;