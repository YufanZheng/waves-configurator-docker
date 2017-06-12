import { WavesConfiguratorPage } from './app.po';

describe('waves-configurator App', () => {
  let page: WavesConfiguratorPage;

  beforeEach(() => {
    page = new WavesConfiguratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
