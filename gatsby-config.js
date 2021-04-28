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
        start_url: `/login`,
        background_color: `#6b516d`,
        theme_color: `#ad89a6`,
        display: `standalone`,
        icons: [
          {
            src: "src/images/favicon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "src/images/favicon.png",
            sizes: "196x196",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        // icon: `src/images/favicon.png`,
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
