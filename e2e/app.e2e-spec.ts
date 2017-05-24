import { WakeupcallPage } from './app.po';

describe('wakeupcall App', () => {
  let page: WakeupcallPage;

  beforeEach(() => {
    page = new WakeupcallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
