/** eslint-disable **/
const path = require('path');
const process = require('process');

module.exports = {
    reporters: [
        'default',
        ['jest-junit',{
            outputDirectory: "D:\\ly\\ws_node\\TS_Demo\\output",
            outputName: "jest_junit_reporters.html"
        }],
        ['sample-html-reporter',{
            outputDirectory: "D:\\ly\\ws_node\\TS_Demo\\output",
            outputName: "jest_sample_html_reporters.html"
        }],
        '<rootDir>/src/reporter/custom-reporter.js',
        ["jest-html-reporters", {
            publicPath: "D:\\ly\\ws_node\\TS_Demo\\output",
            filename: "jest_html_reporters.html"
        }],
    ],
    rootDir: path.resolve(__dirname),
    testEnvironment: 'node',
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    verbose: true,
};


