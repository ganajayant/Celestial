export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Celestial API',
            version: '1.0.0',
            description: 'A simple API for Celestial Application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            }
        },
        servers: [
            {
                url: 'http://localhost:5000/',
            },
        ],
    },
    apis: ['./routes/*.js'],
};