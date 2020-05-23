import { AsyncStorage } from "react-native";

export async function getDraft(index, deleting = true){
    const draftstr = await AsyncStorage.getItem("draft");
    const draft = JSON.parse(draftstr);
    if(!draft === null){
        return "";
    }
    if(typeof draft[index].text !== "string"){
        return "";
    }
    if(deleting){
        await deleteDraft(index);
    }
    return draft[index].text;
}

export async function getDraftAll(){
    const draftstr = await AsyncStorage.getItem("draft");
    const draft = JSON.parse(draftstr);
    return draft;
}

export async function addDraft(text){
    const draftstr = await AsyncStorage.getItem("draft");
    let draft = JSON.parse(draftstr);
    if(draft === null){
        draft = [];
    }
    const length = draft.unshift({
        id: Math.random().toString(36).slice(-8),
        text,
    });
    await AsyncStorage.setItem("draft", JSON.stringify(draft));
    // indexを返す
    return length - 1;
}

export async function deleteDraft(index){
    const draftstr = await AsyncStorage.getItem("draft");
    const draft = JSON.parse(draftstr);
    draft.splice(index, 1);
    await AsyncStorage.setItem("draft", JSON.stringify(draft));
    return;
}