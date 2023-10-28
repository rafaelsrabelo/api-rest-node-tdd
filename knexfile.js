module.exports = {
    test: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'example',
            database: 'rumi',
            connectTimeout: 90000
        },
        migrations: {
            directory: 'src/migrations'
        },
        debug: true,
        pool: {
            min: 2,
            max: 100,
        }
    }
};
