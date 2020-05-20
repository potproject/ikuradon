export const REGISTERING_AN_APPLICATION = {
    method: "post",
    url: "/api/v1/apps",
    form: {
        client_name: "ikuradon",
        redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
        scopes: "read write follow"
    }
};

export const GET_OAUTH_ACCESSTOKEN = {
    method: "post",
    url: "/oauth/token",
    form: {
        client_id: "", //required
        client_secret: "", //required
        code: "", //required
        grant_type: "authorization_code",
        redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
        scope: "read write follow"
    }
};

export const GET_CURRENT_USER = {
    method: "get",
    url: "/api/v1/accounts/verify_credentials",
    form: {}
};

export const GET_INSTANCE = {
    method: "get",
    url: "/api/v1/instance",
    form: {}
};

export const GET_TIMELINES_HOME = {
    method: "get",
    url: "/api/v1/timelines/home",
    form: {
        limit: "40", //optional
        since_id: null, //new timeline
        max_id: null //old timeline
    }
};

export const GET_TIMELINES_LOCAL = {
    method: "get",
    url: "/api/v1/timelines/public",
    form: {
        local: true,
        limit: "40", //optional
        since_id: null, //new timeline
        max_id: null //old timeline
    }
};

export const GET_TIMELINES_FEDERAL = {
    method: "get",
    url: "/api/v1/timelines/public",
    form: {
        local: false,
        limit: "40", //optional
        since_id: null, //new timeline
        max_id: null //old timeline
    }
};

export const GET_NOTIFICATIONS = {
    method: "get",
    url: "/api/v1/notifications",
    form: {
        limit: "40", //optional
        since_id: null, //new timeline
        max_id: null //old timeline
    }
};

export const GET_FAVOURITES = {
    method: "get",
    url: "/api/v1/favourites",
    form: {
        limit: "40", //optional
        min_id: null, //new timeline
        max_id: null //old timeline
    }
};

export const GET_BOOKMARKS = {
    method: "get",
    url: "/api/v1/bookmarks",
    form: {
        limit: "40", //optional
        since_id: null, //new timeline
        max_id: null //old timeline
    }
};

export const POST_STATUS = {
    method: "post",
    url: "/api/v1/statuses",
    form: {
        status: "", //toot
        in_reply_to_id: null, //optional
        media_ids: null, //optional
        sensitive: false, //optional, nsfw flag
        spoiler_text: null, //optional, nsfw message
        visibility: "public", //"direct", "private", "unlisted" or "public"
        scheduled_at: null // [v2.7.0 Support] scheduled statuses. timestamp string
    }
};

export const DELETE_STATUS = {
    method: "delete",
    url: "/api/v1/statuses/:param:",
    form: {}
};

export const POST_REBLOG = {
    method: "post",
    url: "/api/v1/statuses/:param:/reblog",
    form: {}
};

export const POST_UNREBLOG = {
    method: "post",
    url: "/api/v1/statuses/:param:/unreblog",
    form: {}
};

export const POST_FAVOURITED = {
    method: "post",
    url: "/api/v1/statuses/:param:/favourite",
    form: {}
};

export const POST_UNFAVOURITED = {
    method: "post",
    url: "/api/v1/statuses/:param:/unfavourite",
    form: {}
};

export const POST_BOOKMARKED = {
    method: "post",
    url: "/api/v1/statuses/:param:/bookmark",
    form: {}
};

export const POST_UNBOOKMARKED = {
    method: "post",
    url: "/api/v1/statuses/:param:/unbookmark",
    form: {}
};

export const UPLOAD_POST_MEDIA = {
    method: "post",
    url: "/api/v1/media"
};

export const GET_CUSTOMEMOJIS = {
    method: "get",
    url: "/api/v1/custom_emojis",
    form: {}
};

export const GET_SEARCH_V2 = {
    method: "get",
    url: "/api/v2/search",
    form: {
        q: ""
    }
};

/** Streaming API とりあえずUSERのみサポート */
export const STREAMING = {
    method: "get",
    url: "/api/v1/streaming"
};
