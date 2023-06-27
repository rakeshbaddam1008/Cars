import { Questiontype } from '../models/Questiontype';
import { IQuestion } from './questionsJson';

export const QuestionaireVechileConditionDetails: IQuestion[] = [
  {
    id: 6,
    name: 'carDrive',
    title: 'Does the car drive?',
    options: ['Yes', 'No'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 7,
    name: 'carstart',
    title: 'Does  the car start?',
    options: [
      'Engine is partly taken apart.',
      'Engine or Transmission is removed but still available.',
      'Engine or Tranmission is no longer available.',
    ],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },

  {
    id: 8,
    name: 'needsmechanicalwork',
    title: 'Does your car needs mechanical work?',
    options: ['Yes', 'No'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 8,
    name: 'kindofmechanicalwork',
    title: 'What kind of work does your car need?',
    options: ['Engine repairs', "I don't know"],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },

  {
    id: 8,
    name: 'panelsintact',
    title: 'Body panels intact?',
    options: ['Yes', 'No'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },

  {
    id: 8,
    name: 'tiresAttached',
    title: 'Are all tires attached to the car?',
    options: ['Yes', 'No'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 8,
    name: 'floodorfire',
    title: ' Have your car ever been in a flood or fire?',
    options: ['Yes', 'No'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 8,
    name: 'floodorfire',
    title: 'Is the windshield is broken?',
    options: ['Yes', 'No'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
];
