

export interface QuizType {
  id: string;
  title: string;
  description: string;
}

export interface AuthQuizType {
  Quiz: QuizType;
  token?:any
}
export interface CorrectOptionType {
  id: string;
  CorrectOption: string;
}
export interface QuestionType {
  id: string;
  Question: string;
  CorrectOption?: CorrectOptionType;
  OptionOne: string;
  OptionTwo: string;
  OptionThree: string;
  quizId: string;
}
export interface AuthQuestionType {
  Question: QuestionType;
  QuizId:string
}

export interface AuthTestQuiz {
  id: string;
}
export interface TestQuizType {
  id: string;
  title: string;
  description: string;
  Question: QuestionType[];
}
export interface AuthResulttype {
  id: string;
}
export interface ResultType {
  id: string;
  userId: string;
  quizId: string;
  total: number;
  mark: number;
  createdAt: Date;
  ResultHistory: ResultQuestion[];
}
export interface ResultQuestion {
  id: string;
  Question: string;
  CorrectOption: string;
  SelectedOption: string;
  resultId: string;
}
