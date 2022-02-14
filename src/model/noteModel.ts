export type NoteItem = {
    id: number;
    title?: string;
    body?: string;
    created_at: number,
    updated_at: number,
    is_favorite: boolean,
    is_archived: boolean
  };