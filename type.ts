export interface QuizType {
  id: string;
  title: string;
  description: string;
}

export interface AuthQuizType {
  Quiz: QuizType;
  headers: any;
}
export interface QuestionType {
  id: string;
  Question: string;
  CorrectOption: string;
  OptionOne: string;
  OptionTwo: string;
  OptionThree: string;
  quizId:string
}
export interface AuthQuestionType{
  Question:QuestionType
  headers:any
}