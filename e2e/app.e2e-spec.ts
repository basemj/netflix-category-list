import { NetflixCategoryListPage } from './app.po';

describe('netflix-category-list App', () => {
  let page: NetflixCategoryListPage;

  beforeEach(() => {
    page = new NetflixCategoryListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
