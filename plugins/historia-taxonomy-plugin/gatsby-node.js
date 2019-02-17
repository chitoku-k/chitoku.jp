const createTaxonomies = require('./createTaxonomies')
const createArticles = require('./createArticles')

exports.createPages = async ({
  graphql,
  actions: {
    createPage,
  },
}, {
  limit = 3,
}) => {
  await createTaxonomies({ graphql, createPage, limit })
  await createArticles({ graphql, createPage })
}
