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
    let favouriteAndBoost = [];
    for(let notification of notifications){
        const {type, account, status} = notification;
        switch(type){
            case NOTIFICATION_TYPE.FAVOURITE:
            case NOTIFICATION_TYPE.BOOST:
                const findIndex = favouriteAndBoost.findIndex(item => item.id === status.id);
                if(findIndex !== -1){
                    type === NOTIFICATION_TYPE.FAVOURITE && favouriteAndBoost[findIndex].favouriteAccounts.push(account);
                    type === NOTIFICATION_TYPE.BOOST && favouriteAndBoost[findIndex].boostAccounts.push(account);
                }else{
                    favouriteAndBoost.push(
                        {
                            id: status.id,
                            type: NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOST,
                            status: status,
                            favouriteAccounts: type === NOTIFICATION_TYPE.FAVOURITE ? [account] : [],
                            boostAccounts: type === NOTIFICATION_TYPE.BOOST ? [account] : [],
                        }
                    );
                }
            case NOTIFICATION_TYPE.FOLLOW:
            case NOTIFICATION_TYPE.MENTION:
        }
    }
    return { favouriteAndBoost };
}