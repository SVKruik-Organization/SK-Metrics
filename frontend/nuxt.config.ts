export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@pinia/nuxt'],
    ssr: true,
    runtimeConfig: {
        uplink_host: process.env.AMQP_HOST,
        uplink_port: process.env.AMQP_PORT,
        uplink_username: process.env.AMQP_USERNAME,
        uplink_password: process.env.AMQP_PASSWORD
    },
    app: {
        head: {
            htmlAttrs: { lang: 'nl' },
            title: 'SK Metrics',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            script: [
                { src: 'https://kit.fontawesome.com/ffc90f94bc.js', crossorigin: 'anonymous' }
            ]
        }
    }
});