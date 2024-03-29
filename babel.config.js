module.exports = function(api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: ["react-native-reanimated/plugin",
            ["module-resolver", {
                "alias": {
                    "net": "./__mocks__/empty.ts",
                    "tls": "./__mocks__/empty.ts",
                    "dns": "./__mocks__/empty.ts",
                    "crypto": "crypto-browserify",
                    "https": "https-browserify",
                    "http": "@tradle/react-native-http",
                    "stream": "stream-browserify",
                    "os": "react-native-os",
                }
            }]
        ]
    };
    
};
