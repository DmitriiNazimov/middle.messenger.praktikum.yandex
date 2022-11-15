// eslint-disable-next-line import/no-extraneous-dependencies
import { screen } from '@testing-library/dom';
import Handlebars from 'handlebars';

describe('Handlebars', () => {
  it('Should compile template', async () => {
    const templateString = 'worked!';

    const template = Handlebars.compile('<div data-testid="hbs-wrapper">Test <b>{{doesWhat}}</b></div>');
    const compiledTemplate = template({ doesWhat: templateString });

    document.body.innerHTML = compiledTemplate;

    await screen.getByTestId('hbs-wrapper');
    await screen.getByText(templateString);
  });
});
