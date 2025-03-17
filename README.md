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

`?platform=linux&arch=x64` - Returns the download link for a specific platform and architecture (Optional Filters)