/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
}

export default config
