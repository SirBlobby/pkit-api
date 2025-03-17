# Programmer Kit API (pkit-api)

Programming Software Manager REST API

![Version](https://img.shields.io/badge/Version-0.0.1-blue)
![Issues](https://img.shields.io/github/issues/GamerBoss101/Pkit)

## TechStack
[![Svelte](https://skillicons.dev/icons?i=svelte)](https://svelte.dev/)
[![Mongo](https://skillicons.dev/icons?i=mongo)](https://www.mongodb.com/)


## API
`/api/languages/` - Returns all available languages

`/api/languages/:name` - Returns all available versions for a specific language

`/api/languages/:name/:version` - Returns all available platforms for a specific language and version

`/api/languages/:name/:version/:platform` - Returns all available architectures for a specific language, version and platform

`/api/languages/:name/:version/:platform/:arch` - Returns all available sections for a specific language, version, platform and architecture