const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    id
    title
    handle
    url
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