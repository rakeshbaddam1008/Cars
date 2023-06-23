export const questionJson = {
  elements: [
    {
      name: 'username',
      type: 'text',
      title: 'Username',
      maxLength: 25,
    },
    {
      name: 'email',
      type: 'text',
      title: 'E-mail address',
      inputType: 'email',
      placeholder: 'foobar@example.com',
      isRequired: true,
      autocomplete: 'email',
    },
    {
      name: 'password',
      type: 'text',
      title: 'Password',
      description: 'Enter 8 characters minimum.',
      inputType: 'password',
      isRequired: true,
      autocomplete: 'password',
      validators: [
        {
          type: 'text',
          minLength: 8,
          text: 'Your password must be at least 8 characters long.',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      title: 'URL',
      inputType: 'url',
      placeholder: 'https://www.example.com',
      validators: [
        {
          type: 'regex',
          regex: 'https://.*',
          text: 'Your answer must match the URL pattern.',
        },
      ],
    },
  ],
  showQuestionNumbers: false,
};

export const vechileDetailsJSON = {
  clearInvisibleValues: 'onHidden',
  elements: [
    {
      name: 'title1',
      title: 'Does your car have a title?',
      type: 'boolean',
      isRequired: true,
      colCount: 2,
      choices: ['Yes', 'No'],
    },
    {
      type: 'radiogroup',
      name: 'tile',
      title: 'Title?',
      visibleIf: "{title1} = 'Yes'",
      isRequired: true,
      choices: ['Clean', 'salvage', 'Rebuilt'],
      colCount: 0,
    },
    {
      name: 'mileage',
      title: 'What is the mileage of your car?',
      type: 'text',
      isRequired: true,
      showClearButton: true,
    },
    {
      name: 'canDrive',
      title: 'Does the car drive?',
      type: 'boolean',
      isRequired: true,
      colCount: 2,
      choices: ['Yes', 'No'],
    },
  ],
};

export const surveyjson2 = {
  elements: [
    {
      name: 'isRepairNeeded',
      title: 'Does your car needs mechanical work?',
      isRequired: true,
      colCount: 2,
      choices: ['Yes', 'No'],
    },
    {
      name: 'isBodyPanelIntact',
      title: 'Body panels intact?',
      isRequired: true,
      colCount: 2,
      choices: ['Yes', 'No'],
    },
  ],
  showQuestionNumbers: false,
};
