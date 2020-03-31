import axios from "axios";

export async function getAll() {
    const { data } = await axios.get("heaty566.xyz/api/games/genres/all");
    return data;
}
