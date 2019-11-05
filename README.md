# Format Extend Gatsby Site

This a portfolio site for Format Extend, utilising Gatsby with netlify CMS as a backend. The account is authorised for one user (James, in this case). In order to make changes to the content you can either log in to netlify via the site (formatextend.com/admin) or by altering the markdown files within this repo.

## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Access Locally

```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ yarn start
```

The site should then be running on http://localhost:8000

To test the CMS locally, you'll need run a production build of the site:

```
$ yarn build
$ yarn serve
```

### Deploying

To deploy, simply commit your changes locally, then push them to the master branch at the origin. This will trigger a build and deploy by Netlify. If all goes well, the updated site will be deployed.

Any content changes through the site's admin interface will also create a commit on the repo and, subsequently, trigger a build and deployment.

### Setting up the CMS

Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Debugging

Windows users might encounter `node-gyp` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.

```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp "NPM node-gyp page")

## Purgecss

This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [bulma](https://bulma.io/). The bulma builds are usually ~170K but reduced 90% by purgecss.
