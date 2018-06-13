import { Model } from 'objection';

export default class Users extends Model {
  static get tableName() {
    return 'Users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      require: ['salt_password', 'email', 'fullname'],
      properties: {
        id: { type: 'integer' },
        organisation: { type: 'string' },
        fullname: { type: 'string' },
        email: { type: 'string' },
        salt_password: { type: 'string' },
        role: { type: 'string' }
      }
    }
  }
}
