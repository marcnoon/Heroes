import { Developer } from './developer';

describe('Developer', () => {
  it('should create an instance', () => {
    const developer: Developer = { 
      firstName: 'John', 
      lastName: 'Doe', 
      language: 'Python', 
      startYear: 2015 
    };
    expect(developer).toBeTruthy();
  });
});
