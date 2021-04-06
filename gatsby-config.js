const dotenv = require("dotenv")
dotenv.config({ path: ".env" })

module.exports = {
  siteMetadata: {
    title: `Smile and Company`,
    description: `Smile and Company`,
    author: `@switchback4ever`,
    metaImg: `src/images/social-media.png`,
    siteLogo: `src/images/smile-and-company-logo.png`,
    siteUrl: `https://smile-and-company.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `smile-and-company`,
        short_name: `Smile and Co.`,
        start_url: `/app/login`,
        background_color: `#6b516d`,
        theme_color: `#ad89a6`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.WORDPRESS_URL,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_API_URL,
        queryLimit: 1000, // Default to 100
        contentTypes: [],
        singleTypes: [],
      },
    },
    `gatsby-plugin-offline`,
  ],
}
