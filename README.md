# prisma-auth-starter-kit

> nexus, nexus-prisma, apollo-server

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![MIT License][license-shield]][license-url]

This project is guide start with mongoDatasource, Dataloader and handle cache with Redis.

![](https://github.com/othneildrew/Best-README-Template/raw/master/images/logo.png)

<!-- GETTING STARTED -->

## Installing / Getting started

- You must be a member and added ssh key of workspace on bitbucket/gitlab. Clone the repo

```sh
git clone git@github.com:vunguyen2009techdev/prisma-auth-starter-kit.git
```

## Development setup

### Built With

- apollo-server@2.19.2

- graphql-scalars@1.7.0

- nexus@1.0.0

- nexus-prisma@0.16.2

- ...

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- NodeJS v14.4.x

- Postgres


### Setting up

Follow all step bellow to setup your dev environment

1. Start your mongodb (We are using Docker for environment setup)

```sh
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

2. Setup environment variables.
   Create environment config file and config `mongo` connection params

```sh
cp .env.example .env
```

3. Install NPM packages

```sh
yarn install
```

4. Run development:

```sh
yarn dev
```

5. Run production:

```sh
yarn build
```

## Configuration

On `.env`, you must config all environment variables bellow. By default, `.env.example` is used default config for all service.

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
```

## Versioning

- [Current] `beta`: All code is on `master`


## Contributing

1. Fork it (<https://github.com/vunguyen2009techdev/datasources-dataloader-mongo-cache-starter-kit.git>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Licensing

vunguyen2009techdev – [@DEV](anhvu.hcmus.2012@gmail.com) – anhvu.hcmus.2012@gmail.com

Private License.

All Rights Reserved

- Unauthorized copying of this file, via any medium is strictly prohibited
- Proprietary and confidential

[npm-image]: https://img.shields.io/npm/v/npm
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt