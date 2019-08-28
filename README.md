# issue-sync

## Developing

```bash
# Restore dependencies
yarn install

# Spin up local lambda test server
yarn run dev

# Test endpoints by calling them in your browser,
# or with a tool like Postman
# Navigate to: `http://localhost:9000/.netlify/functions/hello-world`
```

### Environment Variables

See the `.env.example` file in the root of this directory. Copy it, and name it `.env` to specify variables that can be used for local development.

## Reading

- [Atlassian 3LO OAuth](https://developer.atlassian.com/cloud/jira/platform/oauth-2-authorization-code-grants-3lo-for-apps/)
- [Netlify Functions](https://www.netlify.com/docs/functions/)
  - [Tutorials](https://functions.netlify.com/tutorials/)
  - [Examples](https://functions.netlify.com/examples/)

## Limitations

> All Netlify sites include 125,000 serverless function requests per month, and 100 hours of run time per month.
