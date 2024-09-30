import mariadb, { Pool } from 'mariadb';

export default defineNitroPlugin(async (_nitroApp) => {
    const runtimeConfig = useRuntimeConfig();
    const database: Pool = mariadb.createPool({
        host: runtimeConfig.database_host,
        port: parseInt(runtimeConfig.database_port as string),
        database: runtimeConfig.database_name,
        user: runtimeConfig.database_username,
        password: runtimeConfig.database_password,
        multipleStatements: true
    });
    console.log("Database connection established.");
    // Temp, for testing purposes
});