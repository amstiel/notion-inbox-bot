module.exports = {
    apps: [
        {
            name: "notion-inbox-bot",
            script: "./dist/index.js",
            wait_ready: true,
        },
    ],
};
