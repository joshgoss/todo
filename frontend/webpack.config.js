const webpack = require("webpack");
require("dotenv/config").config();

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            process: {
                env: {
                    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
                },
            },
        }),
    ],
};
