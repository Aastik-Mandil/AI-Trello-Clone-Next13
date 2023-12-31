type TypedColumns = "todo" | "inprogress" | "done";

interface Board {
  columns: Map<TypedColumns, Column>;
}

interface Image {
  bucketId: string;
  fileId: string;
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumns;
  image?: Image;
}

interface Column {
  id: TypedColumns;
  todos: Todo[];
}
