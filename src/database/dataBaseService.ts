import { openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";
import { NoteItem } from "../model/noteModel";

const dbName = 'NoteDB'
const tableName = 'notesTable';


export const getDBConnection = async () => {
    return openDatabase({ name: dbName, location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT,
      body TEXT,
      created_at INTEGER,
      updated_at INTEGER,
      is_favorite BIT false,
      is_archived BIT false
    );`
    await db.executeSql(query);
}


export const getNotes = async (db: SQLiteDatabase): Promise<NoteItem[]> => {
    try {
      const notes: NoteItem[] = [];
      const results = await db.executeSql(`SELECT * FROM ${tableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          notes.push(result.rows.item(index))
        }
      });
      return notes;
    } catch (error) {
      throw Error('Failed to get notes !!!');
    }
};


export const saveNotes = async (db: SQLiteDatabase, notes: NoteItem[]) => {
    const newNotes = notes[0]
    const insertQuery =
        `INSERT INTO ${tableName} VALUES (?,?,?,?,?,?,?)`;
    return db.executeSql(insertQuery, [newNotes.id, newNotes.title, newNotes.body, newNotes.created_at, newNotes.updated_at, newNotes.is_favorite, newNotes.is_archived] );
};


export const addToFavoriteNotes = async (db: SQLiteDatabase, noteItem: NoteItem) => {
  const updateQuery =
    `UPDATE ${tableName} SET updated_at=${noteItem.updated_at}, is_favorite=${noteItem.is_favorite} WHERE id=${noteItem.id};` ;

  return db.executeSql(updateQuery);
};


export const addToArchivedNotes = async (db: SQLiteDatabase, noteItem: NoteItem) => {
  const updateQuery =
    `UPDATE ${tableName} SET updated_at=${noteItem.updated_at}, is_archived=${noteItem.is_archived} WHERE id=${noteItem.id};` ;

  return db.executeSql(updateQuery);
};