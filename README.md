# Contentful and GraphQL POC

# Project Structure
This repository contains two projects.
- GraphQL App
- Simple UI

GraphQL project is integrated with Contentful via REST APIs. API credentials are in an ```.env``` file (which is gitignored).

In Contentful, there is a Content Model with below fields.
| Field Name | Type |
|------------|------|
|text | Rich Text |
|imageUrl | Short Text |
|buttonText | Short Text |

Above content is read by the GraphQL app and exposes to its client.

The simple UI app written by using React is the GraphQL client who is responsible to consume data, transform Contentful Rich Text documents to HTML and produce the user interface.

## How to run the application

- Git clone
- ```npm install``` on both GraphQL and UI
- Create ```.env``` file in GraphQL folder and add below properties. 

<br />

| Property               | Value |
|------------------------|-------|
|CONTENTFUL_SPACE_ID | space id |
|CONTENTFUL_ACCESS_TOKEN | access token |
|PORT | 4000 |

<br />

- As GraphQL project is containerised, run ```docker-compose up --build```. It exposes GraphQL on ```http://localhost:4000/graphql```.
- Run ```npm start``` on the UI project