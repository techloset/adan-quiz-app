export interface QuizType {
  id: string;
  title: string;
  description: string;
}

export interface AuthQuizType {
  Quiz: QuizType;
  headers: any
}
