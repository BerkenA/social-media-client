/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
}

export default config
