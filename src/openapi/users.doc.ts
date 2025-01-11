import { updateProfileSchema } from '@/dtos/user.dto';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import 'zod-openapi/extend';

const tags = ['User'];

export const usersDoc: ZodOpenApiPathsObject = {
  '/api/profile': {
    get: {
      tags,
      summary: 'Fetch user details',
      responses: { 200: { description: 'User profile fetched successfully' } }
    },
    put: {
      tags,
      summary: 'Update profile',
      requestBody: {
        content: {
          'application/json': {
            schema: updateProfileSchema.openapi({
              example: {
                image: undefined,
                name: undefined,
                phone: undefined,
                location: undefined,
                locationUrl: undefined
              }
            })
          }
        }
      },
      responses: {
        200: { description: 'Profile updated successfully' },
        400: { description: 'Invalid request body' },
        401: { description: 'User is not authorized' }
      }
    }
  },
  '/api/logout': {
    get: {
      tags,
      summary: 'Logout',
      responses: {
        200: { description: 'Logged out successfully' },
        401: { description: 'User is not authorized' }
      }
    }
  }
};
