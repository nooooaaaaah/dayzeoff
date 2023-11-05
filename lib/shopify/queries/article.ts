import seoFragment from '../fragments/seo';
// articles 
const articleFragment = /* GraphQL */ `
    fragment article on Article {
        id
        title
        content
        publishedAt
        seo {
        ...seo
        }
        author {
        name
        }
        image {
        src
        }
    }
    ${seoFragment}
    `;
export const getArticleQuery = /* GraphQL */ `
    query getArticle($handle: String!) {
        articleByHandle(handle: $handle) {
            ...article
        }
    }
    ${articleFragment}
`;
const getArticlesQuery = /* GraphQL */ `
    query getArticles {
        articles(first: 100) {
            edges {
                node {
                    ...article
                }
            }
        }
    }
    ${articleFragment}
`;