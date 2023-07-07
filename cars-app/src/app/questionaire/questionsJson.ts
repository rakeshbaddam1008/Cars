enum Questiontype {
  radio,
  text,
  DorpBown,
  MultiSelect,
}

export class IVechileDetailQuestionaire {
  hasCarownership?: boolean;
  carOwnership?: string;
  hasCarTitle?: boolean;
  carTitle?: string;
  zipCode?: string;
  mileage?: Number;
  color?: string;
}

export const CarTitleOptions: string[] = ['Clean', 'salvage', 'Rebuilt'];
export const CarTitleOwnership: string[] = ['Own', 'Lease', 'Re-finance'];

export const QuestionaireVechileDetails: IQuestion[] = [
  {
    id: 1,
    name: 'ownership',
    title: 'Car Ownership?',
    options: [],
    answer: '',
    type: Questiontype.text,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 1,
    name: 'hasCarTitle',
    title: 'Does your car have a title?',
    options: ['Yes', 'No'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 2,
    name: 'CarTitle',
    title: 'Car title?',
    options: ['Clean', 'salvage', 'Rebuilt'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 2,
    name: 'Ownership',
    title: 'Ownership?',
    options: ['Own', 'Lease', 'Re-finance'],
    answer: '',
    type: Questiontype.radio,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 2,
    name: 'mileage',
    title: 'What is the mileage of your car?',
    options: [],
    answer: '',
    type: Questiontype.text,
    isRequired: true,
    isHidden: false,
  },
  {
    id: 2,
    name: 'color',
    title: 'What is the colour of your car?',
    options: ['red', 'green', 'yellow', 'purple', 'blue'],
    answer: '',
    type: Questiontype.DorpBown,
    isRequired: true,
    isHidden: false,
  },
];

export class IQuestion {
  constructor() {}
  id: Number | undefined;
  name: string | undefined;
  title: String | undefined;
  options: string[] | undefined;
  answer: String | undefined;
  type: Questiontype | undefined;
  isRequired: boolean | undefined;
  isHidden: boolean | undefined;
}
