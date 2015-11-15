JS_ENTRY_FILE = './web/static/js/index.jsx';
JS_OUTPUT_FILE_PATH = './web/static/build/js/';
JS_OUTPUT_FILE_NAME = 'app.js';

module.exports = {
    entry: JS_ENTRY_FILE,
    cache: true,
    output: {
        path: JS_OUTPUT_FILE_PATH,
        filename: JS_OUTPUT_FILE_NAME
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
