module.exports = {
    plugins: ["react", "prettier", "jest", "@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    extends: ["prettier"],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        "jest/globals": true
    },
    parserOptions: {
        ecmaVersion: 2019,
        ecmaFeatures: {
            tsx: true
        },
        sourceType: "module"
    },
    parser: "@typescript-eslint/parser",
    rules: {
        // max length 200
        "max-len": ["warn", { code: 200, ignoreUrls: true }],

        //セミコロン必須(但しワンラインブロックのコードのみ例外で不要)
        semi: ["error", "always", { omitLastInOneLineBlock: true }],

        // if等のスペース
        "keyword-spacing": ["error", { before: true, after: true }],

        // paramのスペース
        "space-in-parens": ["error", "never"],

        // objectのスペース
        "object-curly-spacing": ["error", "always", { objectsInObjects: true }],

        // カンマスペース
        "comma-spacing": ["error"],

        //indentは4spaces
        indent: ["error", 4, { SwitchCase: 1 }],

        //constを変更してはいけない
        "no-const-assign": "error",

        //クラスのsuper()は最初に
        "no-this-before-super": "error",

        //未定義変数を使用しない
        "no-undef": "error",

        //return, throw, continueの後に処理書かない
        "no-unreachable": "warn",

        //未使用変数を警告
        "no-unused-vars": "warn",

        //クラスのextend時のみsuperを使えるようにする
        "constructor-super": "warn",

        //typeofのタイプミス
        "valid-typeof": "error",

        //Reactの無駄ロード防止(JSX)
        "react/jsx-uses-react": "error",

        //ReactJSX使用時のno-unused-vars
        "react/jsx-uses-vars": "error",

        //ダブルクオート推奨
        //O: console.log("test");
        //X: console.log('test');
        quotes: "warn",

        //if文等で必ず値を返す
        //O: if(flag){return 1;}else{return 2;}
        //X: if(flag){return 1;}else{return;}
        //"consistent-return":"error",

        //中括弧必須
        //O: if(flag){return 1;}
        //X: if(flag)return 1;
        curly: "error",

        //配列は可能な限りドットを使う
        //O: array.name
        //X: array["name"]
        "dot-notation": "warn",

        // != or == は非推奨
        //O: 1 === num
        //X: 1 == num
        eqeqeq: "warn",

        //変な小数点の書き方防止
        //O: var num = 0.1;
        //X: var num = .1;
        "no-floating-decimal": "error",

        //eval()っぽい書き方防止
        //O:setTimeout(()=>{console.log("hello");}, 100);
        //X:setTimeout("console.log('hello');", 100);
        "no-implied-eval": "error"
    }
};
