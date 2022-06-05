import account from "./account";
import instance from "./instance";

export default function current(){
    return {
        sns: "mastodon",
        user_credentials: account(),
        domain: "mastodon.server.net",
        access_token: "ACCEESS_TOKEN",
        notification_count: 0,
        instance: instance()
    };
}