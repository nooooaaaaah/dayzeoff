import seoFragment from '../fragments/seo';

const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    id
    title
    handle
    seo {
      ...seo
    }
    articles(first: 100) {
      edges {
        node {
          id
          title
          content
          publishedAt
          url
          author {
            name
          }
          image {
            src
          }
        }
      }
    }
  }
  ${seoFragment}
`;

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!) {
    blogByHandle(handle: $handle) {
      ...blog
    }
  }
  ${blogFragment}
`;

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs {
    blogs(first: 100) {
      edges {
        node {
          ...blog
        }
      }
    }
  }
  ${blogFragment}
`;

// get article 
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