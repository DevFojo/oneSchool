import { OneSchoolPage } from './app.po';

describe('one-school App', () => {
  let page: OneSchoolPage;

  beforeEach(() => {
    page = new OneSchoolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
