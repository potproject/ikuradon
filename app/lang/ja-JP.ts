export default {
    sns: {
        mastodon: "Mastodon",
        misskey: "Misskey",
        pleroma: "Pleroma",
        bluesky: "Bluesky",
    },
    //設定
    setting_streamingapi: "ストリーミング API",
    logout: "ログアウト",
    account_change: "アカウント変更",
    setting_background: "背景画像を設定",
    setting_background_clear: "背景画像を削除",
    setting_appversion: "アプリバージョン",
    setting_allclear: "初期状態に戻す",

    setting_themes: "テーマ",
    setting_themes_light: "ライト",
    setting_themes_dark: "ダーク",
    themes: {
        // ライト
        default: "デフォルト(イクラオレンジ)",
        mikugreen: "ミクグリーン",
        tootblue: "トゥートブルー",
        // ダーク
        dark: "ダーク(イクラダーク)",
        mikugreendark: "ミクグリーンダーク",
        tootbluedark: "トゥートブルーダーク",
    },

    setting_visible_home: "ホームタイムラインを非表示",
    setting_visible_local: "ローカルタイムラインを非表示",
    setting_visible_federal: "連合タイムラインを非表示",
    setting_visible_notifications: "通知タイムラインを非表示",

    navigation_home: "ホーム",
    navigation_local: "ローカル",
    navigation_federal: "連合",
    navigation_notifications: "通知",
    navigation_setting: "設定",

    bluesky:{        
        setting_visible_local: "自分タイムラインを非表示",
        setting_visible_federal: "What's Hotタイムラインを非表示",

        navigation_local: "自分",
        navigation_federal: "What's Hot",
    },

    setting_instance_uri: "URL",
    setting_instance_version: "バージョン",
    setting_instance_editlink: "プロフィールを編集",

    setting_push_notifications: "プッシュ通知 (実験的機能)",
    setting_push_notifications_alert_text:
        "アクセストークンをPushサーバに送信することになるため、信頼できないサーバにアクセストークンを送ることはセキュリティ上のリスクが伴います。",
    setting_push_notifications_server: "プッシュサーバ",
    setting_push_notifications_start: "プッシュ通知を使用する",
    setting_push_notifications_stop: "プッシュ通知を停止する",

    setting_fontsize: "文字サイズ",
    setting_fontsize_username: "ユーザー",
    setting_fontsize_usernameemoji: "ユーザー(カスタム絵文字)",
    setting_fontsize_datetext: "日付",
    setting_fontsize_detailtext: "詳細テキスト",
    setting_fontsize_text: "通常テキスト",
    setting_fontsize_emoji: "カスタム絵文字",
    setting_fontsize_change: "変更",

    setting_fontsize_error_title: "エラー",
    setting_fontsize_error_message: "文字サイズは1〜50の範囲で設定してください",
    setting_fontsize_success: "文字サイズを変更しました",

    setting_opensticker: "OpenSticker (実験的機能)",
    setting_opensticker_server: "OpenSticker サーバ",
    setting_opensticker_use: "OpenStickerを使用する",

    //設定ヘッダ
    setting_header_personal: "個人",
    setting_header_accounts: "アカウント",
    setting_header_visible: "表示",
    setting_header_instance: "サーバ情報",

    //Drawer
    drawer_posts: "投稿",
    drawer_following: "フォロー",
    drawer_follower: "フォロワー",
    drawer_addaccount: "アカウント追加",

    detail_toot: "トゥート",

    //ナビゲーションボタン
    navigation_button_toot: "トゥート",

    // タイムライン
    timeline_title: "タイムライン",
    timeline_cwtext: "もっと見る",

    // DM
    directmessage_title: "ダイレクトメッセージ",

    // 検索
    search_title: "検索",
    search_accounts: "アカウント",
    search_statuses: "トゥート",
    search_hashtags: "ハッシュタグ",

    // お気に入り
    favourited_title: "お気に入り",

    // ブックマーク
    bookmarks_title: "ブックマーク",

    // 設定
    settings_title: "設定",

    //AppInit
    appinit_title: "初期化中...",

    //ログイン
    login_retry: "ログインの再試行",
    login_title: "ログイン",
    login_message: "サーバドメインを入力してください",
    login_domain_label: "ドメイン",
    login_token_label: "アクセストークン",
    login_identity_label: "ID",
    login_password_label: "パスワード",
    login_button_mastodon: "OAuthでログイン",
    login_button_misskey: "MiAuthでログイン",
    login_button_pleroma: "OAuthでログイン",
    login_button_bluesky: "ログイン",
    login_token_button: "アクセストークンを使用してログイン",
    login_selectaccounts: "アカウントを選択",
    login_accesstoken_message: "アクセストークンを入力してください",

    logout_alert_text: "本当にログアウトしますか？",

    copy_access_token: "アクセストークンをコピーする",
    //認証
    authorize_title: "認証",

    //トゥート
    toot_title: "トゥート",
    toot_placeholder: "今何してる？",
    toot_cw_placeholder: "ここに警告を書いてください",
    toot_draft_delete: "削除",
    toot_draft_save: "下書きを保存",

    //トゥート公開範囲
    toot_visibility_public: "公開",
    toot_visibility_unlisted: "未収載",
    toot_visibility_private: "フォロワーのみ",
    toot_visibility_direct: "ダイレクト",

    //トゥート公開範囲説明
    toot_visibility_public_detail: "公開TLに投稿する",
    toot_visibility_unlisted_detail: "公開TLで表示しない",
    toot_visibility_private_detail: "フォロワーだけに公開",
    toot_visibility_direct_detail: "メンションしたユーザーだけに公開",

    //詳細
    detail_title: "詳細",

    //アクション
    action_openinbrowser: "ブラウザで開く",
    action_openinbrowserprofile: "プロフィールをブラウザで開く",
    action_copy: "コピー",
    action_copyurl: "URLをコピー",
    action_reply: "返信",
    action_openGoogleTranslateLink: "翻訳",
    action_hide: "隠す",
    action_delete: "削除",

    //メディアビュアー
    mediaviewer_title: "メディア",

    //エラー
    Errors_error: "エラー!",
    Errors_network: "ネットワークエラー",
    Errors_unauthorized: "認証エラー",
    Errors_server: "サーバエラー",
    Errors_unknown: "不明なエラー",

    //共通
    global_ok: "OK",
    global_cancel: "キャンセル",
    global_back: "戻る",
    global_warning: "警告",

    //投票
    polls: {
        voting: "投票中",
        voting_multiple: "投票中(複数可)",
        ended: "終了",
        vote: "投票する",
        votes: "票",
        hours: "時間",
        total_one: "人",
        total_people: "人",
        total_votes: "票",
        reload: "更新",
    },

    //メッセージ
    messages: {
        login_success: "ログインしました",
        login_failed: "ログインに失敗しました",
        login_notexist_accounts: "アカウントが存在しません",
        login_copy_accesstoken: "アクセストークンをコピーしました",

        logout_success: "ログアウトしました",
        logout_failed: "ログアウトに失敗しました",

        network_error: "ネットワークエラーが発生しました",

        detail_load_error: "トゥートの読み込みに失敗しました",

        streaming_enabled: "ストリーミングを有効にしました",
        streaming_disabled: "ストリーミングを無効にしました",
        streaming_failed: "ストリーミング接続に失敗しました",

        toot_success: "トゥートの投稿に成功しました",
        toot_failed: "トゥートの投稿に失敗しました",
        toot_mediaopen_failed: "ライブラリの起動に失敗しました",
        toot_mediaupload_maximum_exceed: "最大アップロードファイル数が超過しています(最大 4 ファイル).",

        toot_deleted_success: "トゥートの削除に成功しました",
        toot_deleted_failed: "トゥートの削除に失敗しました",
    },

    //通知タイトル
    notifications: {
        followed: " があなたをフォローしました",
        mentioned: " があなたに返信しました",
        boosted: " がブーストしました",
        favourited: " がお気に入りに登録しました",
        follow: "フォロー",
        unfollow: "フォロー解除",
        followered: "フォロワー",
    },
};
