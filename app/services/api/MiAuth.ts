import axios from "axios";

export async function miAuthCheck(domain: string, session: string): Promise<string>{
    const url = `https://${domain}/api/miauth/${session}/check`;
    // post
    const response = await axios.post(url);
    if (response.status !== 200){
        throw new Error(response.statusText);
    }
    const data = response.data;
    if (data.ok){
        return data.token;
    }
    throw new Error("Authorize Failed.");
}