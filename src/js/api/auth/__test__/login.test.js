import { login } from '../login.js'
import { apiPath } from '../constants.js'
import { headers } from '../headers.js'
import { save } from '../../storage/index.js'

jest.mock('../../storage/index.js') // Mock the save function

describe('login function', () => {
    beforeEach(() => {
        jest.clearAllMocks() // Clear mocks before each test
    })

    test('should log in successfully and save the token and profile', async () => {
        const mockEmail = 'user@example.com'
        const mockPassword = 'password123'

        const mockProfile = {
            name: 'Test User',
            email: mockEmail,
            accessToken: 'mockAccessToken',
        }

        // Mock the fetch function to return a successful response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockProfile),
            })
        )

        // Call the login function
        const result = await login(mockEmail, mockPassword)

        // Check that fetch was called with the correct parameters
        expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
            method: 'post',
            body: JSON.stringify({ email: mockEmail, password: mockPassword }),
            headers: headers('application/json'),
        })

        // Check that the token was saved
        expect(save).toHaveBeenCalledWith('token', 'mockAccessToken')

        // Ensure the accessToken was removed from the profile before saving
        const expectedProfile = { ...mockProfile }
        delete expectedProfile.accessToken
        expect(save).toHaveBeenCalledWith('profile', expectedProfile)

        // Ensure the correct profile is returned
        expect(result).toEqual(expectedProfile)
    })

    test('should throw an error if the response is not ok', async () => {
        const mockEmail = 'user@example.com'
        const mockPassword = 'wrongPassword'

        // Mock the fetch function to return an unsuccessful response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Unauthorized',
            })
        )

        // Check that the function throws the correct error
        await expect(login(mockEmail, mockPassword)).rejects.toThrow(
            'Unauthorized'
        )
    })
})
