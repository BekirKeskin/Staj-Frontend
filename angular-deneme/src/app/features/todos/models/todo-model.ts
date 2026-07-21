export type Priority = 'High' | 'Medium' | 'Low';

export type Category = 'Work' | 'Study' | 'Personal';

export type Filter = 'all' | 'active' | 'completed';

export type Todo = { // görevlerin alabileceği değişken türleri belirlenir
  id: number;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  category: Category;
  done: boolean;
};

export type TodoFormData ={
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  category: Category;
};