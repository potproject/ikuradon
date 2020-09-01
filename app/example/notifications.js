import account from "./account";
import status from "./status";

export default function notifications(){
    return [
        {
            "id": "34975889",
            "type": "follow",
            "created_at": "2019-11-23T07:49:02.064Z",
            "account": account(),
        },
        {
            "id": "34975861",
            "type": "mention",
            "created_at": "2019-11-23T07:49:02.064Z",
            "account": account(),
            "status": status()
        },
        {
            "id": "34975535",
            "type": "favourite",
            "created_at": "2019-11-23T07:29:18.903Z",
            "account": account(),
            "status": status()
        },
        {
            "id": "34975314",
            "type": "favourite",
            "created_at": "2019-11-23T07:20:24.432Z",
            "account": account(),
            "status": status()
        },
        {
            "id": "34975240",
            "type": "reblog",
            "created_at": "2019-11-23T07:11:54.391Z",
            "account": account(),
            "status": status()
        },
    ];
}