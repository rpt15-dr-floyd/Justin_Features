# RPT15 - FEC - Tabata Yoga

> A clone of the web app, Steam and its page for the Stardew Valley game.

## Related Projects

- https://github.com/teamName/repo
- https://github.com/teamName/repo
- https://github.com/teamName/repo
- https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### 1.1 API endpoints

- `GET /api/features/:gameId?`
  - returns data for specific id ( aboutHeader, aboutBody, featureTitle, features)
- `POST '/api/features/`
  - post a new game to specified id (within the req.body with: (aboutHeader, aboutBody, featureTitle, features))
- `PUT /api/features/:gameId?`
  - updates game with specified id (within the req.body with: (aboutHeader, aboutBody, featureTitle, features))
- `DELETE /api/features/:gameId?`
  - deletes game with specified id
