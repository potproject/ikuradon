const NOTIFICATION_TYPE = {
    FAVOURITE: "favourite",
    BOOST: "reblog",
    FOLLOW: "follow",
    MENTION: "mention",
};

export const NEW_NOTIFICATION_TYPE = {
    FAVOURITEANDBOOST: "FavouriteAndBoost",
    FOLLOW: "follow",
    MENTION: "mention",
};

export function notificationParse(notifications){
    //お気に入りまたはブースト
    // [ {id, status, favouriteAccounts:[account...]}, boostAccounts:[account...]},]
    let newNotifications = [];
    for (let notification of notifications){
        const { type } = notification;
        switch (type){
            case NOTIFICATION_TYPE.FAVOURITE:
            case NOTIFICATION_TYPE.BOOST:
                const { account, status } = notification;
                const findIndex = newNotifications.findIndex(item => item.type === NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOST && item.id === status.id);
                if (findIndex !== -1){
                    type === NOTIFICATION_TYPE.FAVOURITE && newNotifications[findIndex].favouriteAccounts.push(account);
                    type === NOTIFICATION_TYPE.BOOST && newNotifications[findIndex].boostAccounts.push(account);
                } else {
                    newNotifications.push(
                        {
                            id: status.id,
                            type: NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOST,
                            status: status,
                            favouriteAccounts: type === NOTIFICATION_TYPE.FAVOURITE ? [account] : [],
                            boostAccounts: type === NOTIFICATION_TYPE.BOOST ? [account] : [],
                        }
                    );
                }
                break;
            case NOTIFICATION_TYPE.FOLLOW:
                const { id: followId, account: followAccount } = notification;
                newNotifications.push(
                    {
                        id: followId,
                        type: NEW_NOTIFICATION_TYPE.FOLLOW,
                        account : followAccount
                    }
                );
                break;
            case NOTIFICATION_TYPE.MENTION:
                const { id: mentionId, account: mentionAccount, status: mentionStatus } = notification;
                newNotifications.push(
                    {
                        id: mentionId,
                        type: NEW_NOTIFICATION_TYPE.MENTION,
                        account : mentionAccount,
                        status: mentionStatus,
                    }
                );
                break;
        }
    }
    return newNotifications;
}