// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, waitFor } from '@testing-library/dom';
import { router, routes } from '../index';
import { data401 } from '../../pages/netError';
import { SELECTOR } from '../../consts';

Object.keys(routes).forEach((item) => {
  router.use(routes[item]);
});

document.body.innerHTML = `<div id="${SELECTOR.rootId}"></div><div class="${SELECTOR.loader.wrapper} hide"></div>`;

router.start();

describe('utils/Router', () => {
  it('should return 404 if Route not exist', async () => {
    router.go('/fakepath-1-2-3');

    await waitFor(async () => {
      expect(document.title).toBe(routes.page404.title);
    });
  });

  it('should go to Route by pathname', async () => {
    router.go(routes.login.pathname);

    await waitFor(async () => {
      expect(document.title).toBe(routes.login.title);
    });
  });

  it('should go back to previous Route in history', async () => {
    router.go(routes.login.pathname);
    router.go(routes.page401.pathname);
    router.back();

    await waitFor(async () => {
      expect(document.title).toBe(routes.login.title);
    });
  });

  it('should go to Route by click on link', async () => {
    const link = document.createElement('a');
    link.href = routes.page401.pathname;

    document.querySelector(`#${SELECTOR.rootId}`)?.appendChild(link);

    link.click();

    await screen.findByText(data401.code);
  });
});
