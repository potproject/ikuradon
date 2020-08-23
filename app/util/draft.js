import * as Storage from "../util/storage";
import * as CONST_Storage from "../constants/storage";

export async function getDraft(index, deleting = true){
    const draft = await Storage.getItem(CONST_Storage.Draft);
    if (draft === null){
        return "";
    }
    if (typeof draft[index].text !== "string"){
        return "";
    }
    if (deleting){
        await deleteDraft(index);
    }
    return draft[index].text;
}

export async function getDraftAll(){
    return await Storage.getItem(CONST_Storage.Draft);
}

export async function addDraft(text){
    let draft = await Storage.getItem(CONST_Storage.Draft);
    if (draft === null){
        draft = [];
    }
    const length = draft.unshift({
        id: Math.random().toString(36).slice(-8),
        text,
    });
    await Storage.setItem(CONST_Storage.Draft, draft);
    // indexを返す
    return length - 1;
}

export async function deleteDraft(index){
    const draft = await Storage.getItem(CONST_Storage.Draft);
    draft.splice(index, 1);
    await Storage.setItem(CONST_Storage.Draft, draft);
    return;
}