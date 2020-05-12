import * as ImageViewer from "../actiontypes/imageviewer";

// index = 0 start
export function open(mediaAttachments, index) {
    let id = mediaAttachments[index].id;
    let data = [];
    for(let media of mediaAttachments){
        if(media.type === "image"){
            data.push({url: media.url});
        }
    }
    if(data.length === 0 || mediaAttachments[index].type !== "image"){
        return { type: ImageViewer.IMAGEVIEWER_CLOSE };
    }
    index = mediaAttachments.findIndex(media => media.id === id);
    return { type: ImageViewer.IMAGEVIEWER_OPEN, index, data };
}

export function close() {
    return { type: ImageViewer.IMAGEVIEWER_CLOSE };
}
