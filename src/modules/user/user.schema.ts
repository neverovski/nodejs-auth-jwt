import { IJsonSchema } from '@core/schema';

export const CreateUserSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email', 'profile', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        transform: ['trim', 'toLowerCase'],
      },
      password: {
        type: 'string',
        minLength: 6,
      },
      profile: {
        type: 'object',
        additionalProperties: false,
        required: ['firstName', 'lastName'],
        properties: {
          firstName: {
            type: 'string',
            minLength: 1,
          },
          lastName: {
            type: 'string',
            minLength: 1,
          },
        },
      },
    },
  },
};
