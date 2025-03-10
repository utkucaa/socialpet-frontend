import axiosInstance from './axios';

// Types
export interface User {
  id: number;
  name?: string;
  email?: string;
}

export interface Question {
  id?: number;
  title: string;
  content: string;
  user: User;
  createdAt?: string;
  status?: string;
}

export interface Answer {
  id?: number;
  content: string;
  question: {
    id: number;
  };
  user: User;
  createdAt?: string;
}

// Question API functions
export const getAllQuestions = async () => {
  const response = await axiosInstance.get('/api/questions');
  return response.data;
};

export const getQuestionById = async (id: number) => {
  const response = await axiosInstance.get(`/api/questions/${id}`);
  return response.data;
};

export const createQuestion = async (question: Question) => {
  const response = await axiosInstance.post('/api/questions', question);
  return response.data;
};

export const updateQuestion = async (id: number, question: Question) => {
  const response = await axiosInstance.put(`/api/questions/${id}`, question);
  return response.data;
};

export const deleteQuestion = async (id: number) => {
  const response = await axiosInstance.delete(`/api/questions/${id}`);
  return response.data;
};

// Answer API functions
export const getAllAnswers = async () => {
  const response = await axiosInstance.get('/api/answers');
  return response.data;
};

export const getAnswerById = async (id: number) => {
  const response = await axiosInstance.get(`/api/answers/${id}`);
  return response.data;
};

export const getAnswersByQuestionId = async (questionId: number) => {
  const response = await axiosInstance.get(`/api/questions/${questionId}/answers`);
  return response.data;
};

export const createAnswer = async (answer: Answer) => {
  const response = await axiosInstance.post('/api/answers', answer);
  return response.data;
};

export const updateAnswer = async (id: number, answer: Answer) => {
  const response = await axiosInstance.put(`/api/answers/${id}`, answer);
  return response.data;
};

export const deleteAnswer = async (id: number) => {
  const response = await axiosInstance.delete(`/api/answers/${id}`);
  return response.data;
}; 