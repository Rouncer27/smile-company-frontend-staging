const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  try {
    const { data } = await graphql(`
      {
        pages: allWpPage {
          edges {
            node {
              id
              slug
              uri
            }
          }
        }

        posts: allWpPost {
          edges {
            node {
              id
              slug
              uri
            }
          }
        }
      }
    `)

    const pages = data.pages.edges
    pages.forEach(({ node }) => {
      if (node.slug === "home") {
        createPage({
          path: `/`,
          component: path.resolve(`./src/pages/index.js`),
        })
      } else {
        const pageSlug = node.uri
          .split("/")
          .filter(item => item !== "")
          .join("/")

        createPage({
          path: `/${pageSlug}`,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            id: node.id,
          },
        })
      }
    })

    const posts = data.allWpPost.edges
    posts.forEach(({ node }, index) => {
      createPage({
        path: `/news/${node.slug}/`,
        component: path.resolve("./src/templates/post.js"),
        context: {
          id: node.id,
          slug: node.slug,
          next: index === 0 ? null : posts[index - 1].node.slug,
          prev: index === posts.length - 1 ? null : posts[index + 1].node.slug,
        },
      })
    })
  } catch (err) {
    console.log("Error retrieving WordPress data", err)
  }
}
