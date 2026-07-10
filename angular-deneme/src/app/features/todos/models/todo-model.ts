export type Todo = { // görevlerin alabileceği değişken türleri belirlenir
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: string;
  done: boolean;
};

export type TodoFormData ={
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: string;
};