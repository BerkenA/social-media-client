/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: 'jsdom', // Change from 'node' to 'jsdom'
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
}

export default config
