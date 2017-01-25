module.exports = function (config) {
    config.set({
        files: [
            {pattern: './index.js', mutated: true, included: false},
            './test/test.js'
        ],
        testRunner: 'mocha',
        testFramework: 'mocha',
        coverageAnalysis: 'perTest',
        reporter: ['html', 'progress'],
        logLevel: 'debug'
    });
};