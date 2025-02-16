const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const contentful = require('contentful');
require('dotenv').config();
const GraphQLJSON = require('graphql-type-json');

const cors = require('cors');

// Initialize Contentful client
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// GraphQL schema
const schema = buildSchema(`
    scalar JSON

    type Banner {
        imageUrl: String
        text: JSON
        buttonText: String
        buttonStyle: String
    }

    type Query {
        getBanner: Banner
    }
`);

// Root resolver
const root = {
    JSON: GraphQLJSON, // Map the JSON scalar

    getBanner: async () => {
        // Fetch data from Contentful
        const contentfulData = await client.getEntries({ content_type: 'banner' });
        const bannerFromContentful = contentfulData.items[0].fields;

        // Fetch data from custom API
        // const customApiResponse = await axios.get('http://custom-api-url.com/data');
        // const customApiData = customApiResponse.data;

        const customApiData = {
            "additionalText": "This is an additional text",
            "buttonStyle": "No button style yet"
        }

        // Combine data
        return {
            imageUrl: bannerFromContentful.imageUrl,
            //text: `${bannerFromContentful.text} ${customApiData.additionalText}`,
            text: bannerFromContentful.text,
            buttonText: bannerFromContentful.buttonText,
            buttonStyle: customApiData.buttonStyle,
        };
    },
};

// Create Express server
const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});