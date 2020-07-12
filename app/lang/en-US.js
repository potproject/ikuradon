export default {
    //Settings
    setting_streamingapi: "Streaming API",
    logout: "Logout",
    account_change: "Account Change",
    setting_background: "Setting up Background Image",
    setting_background_clear: "Delete Background Image",
    setting_appversion: "App Version",
    setting_allclear: "ALL Reset",

    setting_themes: "Themes",
    setting_themes_light: "Light",
    setting_themes_dark: "Dark",
    themes: {
        // Light
        default: "Default(IkuraOrange)",
        mikugreen: "MikuGreen",
        tootblue: "TootBlue",
        // Dark
    },

    setting_visible_home: "Do not show Home Timeline",
    setting_visible_local: "Do not show Local Timeline",
    setting_visible_federal: "Do not show Federal Timeline",
    setting_visible_notifications: "Do not show Notifications Timeline",

    setting_smartmode: "Enabled SmartMode",
    setting_timeline_perform: "Optimized the timeline(Experimental)",

    setting_instance_uri: "URL",
    setting_instance_version: "Mastodon Version",
    setting_instance_editlink: "Edit profile",

    setting_push_notifications: "Push Notification (Experimental)",
    setting_push_notifications_alert_text: "Sending the access token to an untrusted server is a security risk because it will send the access token to the Push server.",
    setting_push_notifications_server: "Push Notification Server",
    setting_push_notifications_start: "Using Push Notification",
    setting_push_notifications_stop: "Stopping Push Notification",

    //Settings Header
    setting_header_personal: "Personal",
    setting_header_accounts: "Accounts",
    setting_header_visible: "Visible",
    setting_header_instance: "Server Information",

    //Drawer
    drawer_posts: "Post",
    drawer_following: "Following",
    drawer_follower: "Followers",
    drawer_addaccount: "Add Account",

    //Navigations
    navigation_home: "Home",
    navigation_local: "Local",
    navigation_federal: "Federal",
    navigation_notifications: "Notifications",
    navigation_setting: "Setting",

    //Navigation Button
    navigation_button_toot: "Toot",

    // Timeline
    timeline_title: "Timeline",
    timeline_cwtext: "show more",

    // DM
    directmessage_title: "Direct Message",

    // Search
    search_title: "Search",
    search_accounts: "Accounts",
    search_statuses: "Toots",
    search_hashtags: "HashTags",
    
    // favourited
    favourited_title: "Favourited",

    // bookmarks
    bookmarks_title: "Bookmarks",

    // Settings
    settings_title: "Settings",

    //AppInit
    appinit_title: "initialize...",

    //Login
    login_title: "Login",
    login_message: "Please enter Mastodon Server domain.",
    login_domain_label: "Domain",
    login_token_label: "Access Token",
    login_button: "Login",
    login_token_button: "Login with Access Token",
    login_selectaccounts: "Choose an account",
    login_accesstoken_message: "Please enter Mastodon Access Token.",

    copy_access_token: "Copy an Access Token",

    //Authorize
    authorize_title: "Authorize",

    //Toot
    toot_title: "Toot",
    toot_cw_placeholder: "Write your warning here",
    toot_placeholder: "What is on your mind?",
    toot_draft_delete:  "Delete",
    toot_draft_save: "Save Draft",

    //Toot Visibility
    toot_visibility_public: "public",
    toot_visibility_unlisted: "unlisted",
    toot_visibility_private: "private",
    toot_visibility_direct: "direct",

    //Toot Visibility Detail
    toot_visibility_public_detail: "Post to public timelines",
    toot_visibility_unlisted_detail: "Do not post to public timelines",
    toot_visibility_private_detail: "Post to followers only",
    toot_visibility_direct_detail: "Post to mentioned users only",

    //Detail
    detail_title: "Detail",

    //Actions
    action_openinbrowser: "Open in Browser",
    action_openinbrowserprofile: "Open Profile in Browser",
    action_copy: "Copy",
    action_copyurl: "Copy URL",
    action_reply: "Reply",
    action_hide: "Hide",
    action_delete: "Delete",

    //MediaViewer
    mediaviewer_title: "Media",

    //Errors
    Errors_error: "Error!",
    Errors_network: "Network Error",
    Errors_unauthorized: "Unauthorized Error",
    Errors_server: "Server Error",
    Errors_unknown: "Unknown Error",

    //Global
    global_ok: "OK",
    global_cancel: "Cancel",
    global_back: "Back",
    global_warning: "Warning!",

    //poll
    polls:{
        votes: " votes",
    },

    //Messages
    messages: {
        login_success: "Login Successfully.",
        login_failed: "Failed to login.",
        login_notexist_accounts: "Accounts does not exist.",
        login_copy_accesstoken: "Copied an Access Token.",

        logout_success: "Logout Successfully.",
        logout_failed: "Failed to logout.",

        network_error: "Network error occurred.",

        streaming_enabled: "Timeline Streaming Enabled.",
        streaming_disabled: "Timeline Streaming Disabled.",
        streaming_failed: "Failed to connected a Streaming API.",

        toot_success: "Successfully posted a toot.",
        toot_failed: "Failed to posted a toot.",
        toot_mediaopen_failed: "Failed to open a MediaLibrary.",
        toot_mediaupload_maximum_exceed: "Maximum Upload File Exceeded(Max 4 files).",

        toot_deleted_success: "Successfully deleted a toot.",
        toot_deleted_failed: "Failed to deleted a toot."
    },

    //Notifications Title
    notifications: {
        followed: " followed you.",
        mentioned: " mentioned you.",
        boosted: " boosted you.",
        favourited: " favourited you.",
        follow: "Follow",
        unfollow: "Unfollow",
    }
};
