export type NoteItem = {
    id: number;
    title?: string;
    body?: string;
    created_at: string,
    updated_at: string,
    is_favorite: boolean,
    is_archived: boolean
  };