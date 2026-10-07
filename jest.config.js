module.exports = {
    testEnvironment: 'node',

    collectCoverageFrom: [
        'src/routes/products.js',
        'src/routes/categories.js',
        'src/models/**/*.js'
    ],

    coverageDirectory: 'coverage',

    coverageReporters: [
        'text',
        'html'
    ],

    coverageThreshold: {
        global: {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70
        }
    }
};