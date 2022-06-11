import { Entity } from "megalodon";

type reactions = {
    count: number,
    me: boolean,
    emoji: string;
    url: string|null;
}

export function getMisskeyCustomEmojiReaction(emoji_reaction: Entity.Reaction, emojis: Entity.Emoji[]): reactions{
    const customEmojiArr = emojis.filter(({ shortcode }) => shortcode === emoji_reaction.name.replaceAll(":", ""));
    if (customEmojiArr.length > 0){
        return { count:emoji_reaction.count, me:emoji_reaction.me, emoji:emoji_reaction.name, url:customEmojiArr[0].url };
    }
    return { count:emoji_reaction.count, me:emoji_reaction.me, emoji:emoji_reaction.name, url:null };
}

export function reactioned(emoji_reactions: Entity.Reaction[]){
    const meReaction = emoji_reactions.filter(emoji_reaction => emoji_reaction.me === true);
    return meReaction.length > 0;
}