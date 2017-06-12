export const REGISTERING_AN_APPLICATION = {
    method:"post",
    url:"/api/v1/apps",
    form:{
        client_name:"ikuradon",
        redirect_uris:"urn:ietf:wg:oauth:2.0:oob",
        scopes:"read write follow"
    }
};

export const GET_OAUTH_ACCESSTOKEN = {
    method:"post",
    url:"/oauth/token",
    form:{
        client_id:"", //required
        client_secret:"", //required
        code:"",//required
        grant_type:"authorization_code",
        redirect_uri:"urn:ietf:wg:oauth:2.0:oob",
        scope:"read write follow"
    }
};

export const GET_TIMELINES_HOME = {
    method:"get",
    url:"/api/v1/timelines/home",
    form:{
        limit:"40", //optional
        since_id:null, //new timeline
        max_id:null, //old timeline
        redirect_uri:"urn:ietf:wg:oauth:2.0:oob",
        scope:"read write follow"
    }
};

export const POST_STATUS = {
    method:"post",
    url:"/api/v1/statuses",
    form:{
        status:"", //toot
        in_reply_to_id:null, //optional
        media_ids:null, //optional
        sensitive:false, //optional, nsfw flag
        spoiler_text:null, //optional, nsfw message
        visibility:"public", //"direct", "private", "unlisted" or "public"
        redirect_uri:"urn:ietf:wg:oauth:2.0:oob",
        scope:"read write follow"
    }
};