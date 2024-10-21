import { login } from '../login.js'
import { logout } from '../logout.js'
import { remove } from '../../../storage/remove.js'

jest.mock('../../../storage/remove.js', () => ({
    remove: jest.fn(),
}))

beforeEach(() => {
    jest.clearAllMocks()

    const localStorageMock = {
        setItem: jest.fn(),
        getItem: jest.fn(() => null),
        removeItem: jest.fn(),
        clear: jest.fn(),
    }

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
    })
})

test('testing login ok', async () => {
    const mockToken = 'mockAccessToken'
    const recievedToken = { accessToken: mockToken }

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(recievedToken),
        })
    )

    const result = await login('testEmail', 'testPassword')

    expect(result).toEqual(recievedToken)

    expect(localStorage.setItem).toHaveBeenCalledWith(
        'token',
        JSON.stringify(mockToken)
    )
})

test('check unauthorized login', async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
    })

    await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow(
        'Unauthorized'
    )
})

test('testing logout', async () => {
    logout()
    expect(remove).toHaveBeenCalledWith('token')
    expect(remove).toHaveBeenCalledWith('profile')
})
