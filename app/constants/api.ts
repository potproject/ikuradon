export type api = {
    method: "post"|"get";
    url: string;
    form: {};
};

type streaming = {
    url: string;
}

export const UPLOAD_POST_MEDIA_V1: api = {
    method: "post",
    url: "/api/v1/media",
    form: {}
};

export const UPLOAD_POST_MEDIA_V2: api = {
    method: "post",
    url: "/api/v2/media",
    form: {}
};

export const UPLOAD_POST_MEDIA_MISSKEY: api = {
    method: "post",
    url: "/api/drive/files/create",
    form: {}
};

export const UPLOAD_POST_MEDIA_BLUESKY: api = {
    method: "post",
    url: "/xrpc/com.atproto.repo.uploadBlob",
    form: {}
};

export const UPLOAD_GET_MEDIA: api = {
    method: "get",
    url: "/api/v1/media/:param:",
    form: {}
};


export const MISSKEY_CREATE_REACTION: api = {
    method: "post",
    url: "/api/reactions/create",
    form: {
        i: "", //required
        noteId: "", //required
        reaction: "", //required
    }
};

export const MISSKEY_DELETE_REACTION: api = {
    method: "post",
    url: "/api/reactions/delete",
    form: {
        i: "", //required
        noteId: "", //required
    }
};

export const STREAMING_MASTODON: streaming = {
    url: "/api/v1/streaming"
};

export const STREAMING_MISSKEY: streaming = {
    url: "/streaming"
};
