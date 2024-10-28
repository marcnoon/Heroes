import { Developer } from './developer';

describe('Developer', () => {
  it('should create an instance', () => {
    const developer: Developer = {
      firstName: 'John',
      lastName: 'Doe',
      favoriteLanguage: 'Python',
      yearStarted: 2015,
      id: '1'
    };
    expect(developer).toBeTruthy();
  });
});
