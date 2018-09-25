const express = require('express')
const next = require('next')
const LRUCache = require('lru-cache')
var logger = require('./configs/logger')

const nextAuth = require('next-auth')
const nextAuthConfig = require('./next-auth.config')

const routes = {
  admin:  require('./routes/admin'),
  account:  require('./routes/account')
}

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '3000'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.PORT = process.env.PORT || 3000

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
})

// Cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1 hour
})

// Load environment variables from .env file if present
require('dotenv').load()

// Add next-auth to next app
nextApp
  .prepare()
  .then(() => {
    // Load configuration and return config object
    return nextAuthConfig()
  })
  .then(nextAuthOptions => {
    // Pass Next.js App instance and NextAuth options to NextAuth
    // Note We do not pass a port in nextAuthOptions, because we want to add some
    // additional routes before Express starts (if you do pass a port, NextAuth
    // tells NextApp to handle default routing and starts Express automatically).
    return nextAuth(nextApp, nextAuthOptions)
  })
  .then(nextAuthOptions => {
    // Get Express and instance of Express from NextAuth
    const expressApp = nextAuthOptions.expressApp

    // Add admin routes
    routes.admin(expressApp)

    // Add account management route - reuses functions defined for NextAuth
    routes.account(expressApp, nextAuthOptions.functions)

    // A simple example of custom routing
    // Send requests for '/custom-route/{anything}' to 'pages/examples/routing.js'
    expressApp.get('/page/:id', (req, res) => {
      // Note: To make capturing a slug easier when rendering both client
      // and server side, name it ':id'
      return renderAndCache(req, res, '/page', req.params)
    })

    expressApp.get('/', (req, res) => {
      // Note: To make capturing a slug easier when rendering both client
      // and server side, name it ':id'
      return renderAndCache(req, res, '/', req.params)
    })

    expressApp.get('/login', (req, res) => {
      // Note: To make capturing a slug easier when rendering both client
      // and server side, name it ':id'
      return renderAndCache(req, res, '/login', req.params)
    })

    // Default catch-all handler to allow Next.js to handle all other routes
    expressApp.all('*', (req, res) => {
      let nextRequestHandler = nextApp.getRequestHandler()
      return nextRequestHandler(req, res)
    })

    expressApp.listen(process.env.PORT, err => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.NODE_ENV + ']')
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })


/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    logger.info("Page found in SSR cache: " + key);
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await nextApp.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)
    logger.info("Page was not found in SSR cache. Caching as " + key);

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    nextApp.renderError(err, req, res, pagePath, queryParams)
    logger.error("Error Rendering '" + pagePath + "': " + err);
  }
}
