import emojis from "../example/emojis";

export const NOTIFICATION_TYPE = {
    FAVOURITE: "favourite",
    BOOST: "reblog",
    EMOJIREACTION: "emoji_reaction", // Misskey Only!
    FOLLOW: "follow",
    MENTION: "mention",
};

export const NEW_NOTIFICATION_TYPE = {
    FAVOURITEANDBOOSTANDREACTION: "FavouriteAndBoostAndReaction",
    FOLLOW: "follow",
    MENTION: "mention",
};

type newNotificationsType = {
    id: string;
    type: string;
    status?: any;
    account?: account;
    favouriteAccounts?: account[];
    boostAccounts?: account[];
    reactions?: reactionNotification[];
}[];

type reactionNotification = {
    emoji: string;
    url: string|null;
    accounts: account[];
}

type account = any;

export function notificationParse(notifications){
    let newNotifications: newNotificationsType = [];
    for (let notification of notifications){
        const { type } = notification;
        switch (type){
            case NOTIFICATION_TYPE.FAVOURITE:
            case NOTIFICATION_TYPE.BOOST:
            case NOTIFICATION_TYPE.EMOJIREACTION:
                //お気に入りまたはブーストまたはリアクション
                const { account, status } = notification;
                const findIndex = newNotifications.findIndex(item => item.type === NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOSTANDREACTION && item.id === status.id);
                if (findIndex !== -1){
                    type === NOTIFICATION_TYPE.FAVOURITE && newNotifications[findIndex].favouriteAccounts.push(account);
                    type === NOTIFICATION_TYPE.BOOST && newNotifications[findIndex].boostAccounts.push(account);
                    type === NOTIFICATION_TYPE.EMOJIREACTION && (newNotifications[findIndex].reactions = reactionsMigrate(newNotifications[findIndex].reactions, notification));
                } else {
                    newNotifications.push(
                        {
                            id: status.id,
                            type: NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOSTANDREACTION,
                            status: status,
                            favouriteAccounts: type === NOTIFICATION_TYPE.FAVOURITE ? [account] : [],
                            boostAccounts: type === NOTIFICATION_TYPE.BOOST ? [account] : [],
                            reactions: type === NOTIFICATION_TYPE.EMOJIREACTION ? [getMisskeyCustomEmojiReaction(notification)] : [],
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

function getMisskeyCustomEmojiReaction(notification): reactionNotification{
    const customEmojiArr = notification.status.emojis.filter(({ shortcode }) => shortcode === notification.emoji.replaceAll(":", ""));
    if (customEmojiArr.length > 0){
        return { emoji:notification.emoji, url:customEmojiArr[0].url, accounts: [notification.account] };
    }
    return { emoji:notification.emoji, url:null, accounts: [notification.account] };
}

function reactionsMigrate(reactions: reactionNotification[], notification): reactionNotification[]{
    let migrate = false;
    reactions = reactions.map(reaction => {
        if (reaction.emoji === notification.emoji){
            migrate = true;
            reaction.accounts = [...reaction.accounts, notification.account];
        }
        return reaction;
    });
    return migrate ? reactions : [...reactions, getMisskeyCustomEmojiReaction(notification)];
}