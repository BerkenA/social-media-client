const login = require('../login')

test('testing login ok', () => {
    const profile = {
        data: {
            name: 'string',
            email: 'user@example.com',
            bio: 'string',
            banner: {
                url: 'https://url.com/image.jpg',
                alt: 'string',
            },
            avatar: {
                url: 'https://url.com/image.jpg',
                alt: 'string',
            },
            _count: {
                posts: 0,
                followers: 0,
                following: 0,
            },
        },
        meta: {},
    }
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(profile),
        })
    )
    expect(login('testEmail, testPassword')).toBe(profile)
})
