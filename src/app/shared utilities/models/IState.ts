export interface IState {
    name: string;
    code: string;
  }
  
  export interface IMake {
    make: string;
    isPopuplarmake: string;
  }
  
  export class groupMakesData {
    groupName!: string;
    makes!: string[];
  }
  