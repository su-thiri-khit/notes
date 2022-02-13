import { DEBUG, enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";
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
      body TEXT NOT NULL,
      created_at TEXT,
      updated_at TEXT,
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
      console.error(error);
      throw Error('Failed to get notes !!!');
    }
};


export const saveNotes = async (db: SQLiteDatabase, notes: NoteItem[]) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rowid, title, body, created_at, updated_at, is_favorite, is_archived) values` +
      notes.map(i => `(${i.id}, '${i.title}', '${i.body}',  '${i.created_at}','${i.updated_at}', '${i.is_favorite}' , '${i.is_archived}' )`).join(',');
    return db.executeSql(insertQuery);
  };
