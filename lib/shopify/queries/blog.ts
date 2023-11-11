import seoFragment from '../fragments/seo';

const blogFragment = /* GraphQL */ `
  fragment blog on Blog
  ... on Blog {
    id
    title
    handle
    seo {
      ...seo
    }
  }
  ${seoFragment}
`;
const articleFragment = /* GraphQL */ `
  fragment article on Article {
      id
      title
      handle
      content
      publishedAt
      seo {
        title
        description
      }
      excerpt
      tags
      image {
        src
      }
      authorV2 {
        name
    }
  }
`;
export const getArticleQuery = /* GraphQL */ `
  query getArticle($handle: String!, $blogHandle: String!) {
  blog(handle: $blogHandle) {
    articleByHandle(handle: $handle) {
      ...article
    }
  }
}
  ${articleFragment}
`;

export const getBlogQuery = /* GraphQL */ `
query BlogByHandle($handle: String!) {
  blog(handle: $handle) {
    id
    title
    articles(first: 10) {
      nodes {
        authorV2 {
          name
        }
        handle
        excerpt
        content
        seo {
          title
          description
        }
        tags
      }
    }
  }
}
`;

export const getBlogsQuery = /* GraphQL */ `
query GetBlogs {
  blogs(first: 10) {
    edges {
      node {
        id
      }
    }
  }
}
`;