import 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import {  createTable, getNotes, saveNotes, addToFavoriteNotes } from '../database/dataBaseService';

const dbName = 'NoteDB'


jest.mock('react-native-sqlite-storage', () => ({
  DEBUG: jest.fn,
  enablePromise: jest.fn(),
  openDatabase: (...args) => {
    return {
      transaction: (...args) => Promise.resolve({
        executeSql: (query) => {
          return Promise.resolve([]);
        }
      }),
      cleanDb: ()=> Promise.resolve(),
      executeSql: (query) => {
        return Promise.resolve([]);
      }
    };
  },
}))

let database;

describe('read all notes from database', () => {
  beforeEach(() => {
     database = openDatabase({ name: dbName, location: 'default' });
     createTable(database)
  })

  it('should get all notes from database', () => {
    getNotes(database)
  });

  it('should not get all notes from database', () => {
    const database = null
    const error = getNotes(database)
    expect(error.error).toEqual(undefined)
  });
})


describe('insert new note into database',  () => {
  beforeEach(() => {
     database = openDatabase({ name: dbName, location: 'default' });
     createTable(database);
  })

  it('should add new note to database', async () => {
    const notes = await getNotes(database);
    const newNotesId = notes ? notes.length : 0;
    const newNote = [{ id: newNotesId, 
      title: `Test Note Title ${newNotesId}`,
      body:  `Test Note Body ${newNotesId}`,
      created_at:  new Date().getMilliseconds().toString(),
      updated_at: new Date().getMilliseconds().toString(),
      is_favorite: false,
      is_archived: false
    }]
    saveNotes(database, newNote);
  });

  it('should not add new notes to database', () => {
    const newNote = [{ id: null, 
      title: `Test Note Title`,
      body:  `Test Note Body`,
      created_at:  new Date().getMilliseconds().toString(),
      updated_at: new Date().getMilliseconds().toString(),
      is_favorite: false,
      is_archived: false
    }]
    const error = saveNotes(database, newNote);
    expect(error.error).toEqual(undefined)
  });
})

describe('update note from database', () => {
  beforeEach(() => {
     database = openDatabase({ name: dbName, location: 'default' });
     createTable(database);
     const initNotesData = [
      { id: 0, title: 'Note 1', body: 'Note Body', created_at: '2021-12-30', updated_at: '2021-12-30', is_favorite: false, is_archived: false }
    ];
     saveNotes(database, initNotesData);
  })
  

  it('should update note from database', () => {
    const notes = getNotes(database);
    const newNote = [{ id: notes.length, 
      title: `Test Note Title ${notes.length}`,
      body:  `Test Note Body ${notes.length}`,
      created_at:  new Date().getMilliseconds().toString(),
      updated_at: new Date().getMilliseconds().toString(),
      is_favorite: true,
      is_archived: false
    }]
    addToFavoriteNotes(database, newNote)
  });

  it('should not update note from database', () => {
    const notes = getNotes(database);
    const newNote = [{ id: null, 
      title: `Test Note Title`,
      body:  `Test Note Body`,
      created_at:  new Date().getMilliseconds().toString(),
      updated_at: new Date().getMilliseconds().toString(),
      is_favorite: true,
      is_archived: false
    }]
    const error = addToFavoriteNotes(database, newNote);
    expect(error.error).toEqual(undefined)
  });
})