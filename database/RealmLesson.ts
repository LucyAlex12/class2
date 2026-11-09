
import Realm from 'realm';

export class Lesson extends Realm.Object<Lesson> {
  id!: string;
  title!: string;
  description!: string;
  completed!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Lesson',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      description: 'string',
      completed: {
        type: 'bool',
        default: false,
      },
    },
  };
}
