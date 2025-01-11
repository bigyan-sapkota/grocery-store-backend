import { apiReference } from '@scalar/express-api-reference';
import packageJson from 'package.json';
import { createDocument, ZodOpenApiPathsObject } from 'zod-openapi';
import { defaultDoc } from './default.doc';
import { usersDoc } from './users.doc';

export const openApiSpecs = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Grocery Store Server',
    version: packageJson.version,
    description: 'Express server with scalar for openapi documentation'
  },
  paths: Object.assign(
    {
      '/': {
        get: {
          summary: 'Check server status',
          responses: { 200: { description: 'Server is running fine' } }
        }
      }
    } satisfies ZodOpenApiPathsObject,
    usersDoc
  ),
  components: {
    securitySchemes: {
      googleOAuth2: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: '/api/auth/login/google',
            tokenUrl: '/api/auth/callback/google',
            scopes: {
              openid: 'Grants access to user profile and email'
            }
          }
        }
      }
    }
  }
});

export const serveApiReference = apiReference({
  spec: { content: openApiSpecs },
  theme: 'kepler',
  darkMode: true,
  layout: 'modern',
  defaultHttpClient: {
    targetKey: 'javascript',
    clientKey: 'fetch'
  },
  metaData: {
    title: 'Express Server Api Reference'
  }
});
