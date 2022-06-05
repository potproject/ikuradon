type reactions = {
    count: number,
    me: boolean,
    emoji: string;
    url: string|null;
}

export function getMisskeyCustomEmojiReaction(emoji_reaction, emojis): reactions{
    const customEmojiArr = emojis.filter(({ shortcode }) => shortcode === emoji_reaction.name.replaceAll(":", ""));
    if (customEmojiArr.length > 0){
        return { count:emoji_reaction.count, me:emoji_reaction.me, emoji:emoji_reaction.name, url:customEmojiArr[0].url };
    }
    return { count:emoji_reaction.count, me:emoji_reaction.me, emoji:emoji_reaction.name, url:null };
}
