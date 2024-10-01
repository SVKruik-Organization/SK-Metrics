import mariadb from 'mariadb';

export const database = () => {
    const runtimeConfig = useRuntimeConfig();
    return mariadb.createPool({
        host: runtimeConfig.database_host,
        port: parseInt(runtimeConfig.database_port as string),
        database: runtimeConfig.database_name,
        user: runtimeConfig.database_username,
        password: runtimeConfig.database_password,
        multipleStatements: true
    });
};