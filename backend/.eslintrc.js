module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2020': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'no-console': 0
    }
}
