import account from "./account";
import status from "./status";

export default function search() {
    return {
        accounts: [account],
        statuses: [status],
        hashtags: [],
    };
}