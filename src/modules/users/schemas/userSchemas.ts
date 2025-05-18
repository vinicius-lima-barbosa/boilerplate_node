export const UserResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const UsersListSchema = {
  description: 'List all users',
  tags: ['Users'],
  response: {
    200: {
      type: 'array',
      items: UserResponseSchema
    }
  }
};

export const ListUserByIdSchema = {
  description: 'List user by ID',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },
  response: {
    200: UserResponseSchema
  }
};

export const EditUserByIdSchema = {
  description: 'Edit user',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' }
    }
  },
  response: {
    200: UserResponseSchema
  }
};

export const DeleteUserSchema = {
  description: 'Delete user',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};
