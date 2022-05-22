export const UPLOAD_POST_MEDIA_V1 = {
    method: "post",
    url: "/api/v1/media",
    form: {}
};

export const UPLOAD_POST_MEDIA_V2 = {
    method: "post",
    url: "/api/v2/media",
    form: {}
};

export const UPLOAD_POST_MEDIA_MISSKEY = {
    method: "post",
    url: "/api/drive/files/create",
    form: {}
};

export const UPLOAD_GET_MEDIA = {
    method: "get",
    url: "/api/v1/media/:param:",
    form: {}
};

/** Streaming API とりあえずUSERのみサポート */
export const STREAMING = {
    url: "/api/v1/streaming"
};
