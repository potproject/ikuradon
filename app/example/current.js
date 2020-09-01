import account from "./account";
import instance from "./instance";

export default function current(){
    return {
        user_credentials: account(),
        domain: "example.com",
        access_token: "ACCEESS_TOKEN",
        notification_count: 0,
        instance: instance()
    };
}