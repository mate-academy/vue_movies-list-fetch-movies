/* eslint-disable arrow-parens, curly, max-len */
import darkResults from '../fixtures/dark.json';
import trekResults from '../fixtures/trek.json';
import noPosterResults from '../fixtures/noPoster.json';
const URL_PATTERN = '*/www.omdbapi.com/*';
const REQUEST_DELAY = 500;

const search = {
  form: () => cy.byDataCy('search'),
  field: () => cy.byDataCy('search__field'),
  error: () => cy.byDataCy('search__error'),
  submitButton: () => cy.byDataCy('search__submit-button'),
  clearButton: () => cy.byDataCy('search__clear-button'),

  submit: () => search.submitButton().click({ force: true }),
  clear: () => search.clearButton().click({ force: true }),

  assertNoError: () => {
    search.error().should('not.exist');
    search.field().should('not.have.class', 'is-danger');
    search.form().find('.control').should('not.have.class', 'has-icons-right');
    search.form().find('.icon.is-right').should('not.exist');
  },
  assertError: message => {
    search.error().should('have.text', message);
    search.field().should('have.class', 'is-danger');
    search.form().find('.control').should('have.class', 'has-icons-right');
    search.form().find('.icon.is-right').should('exist');
  },

  assertNotLoading: () => {
    search.submitButton().should('not.have.class', 'is-loading');
  },
  assertLoading: () => {
    search.submitButton().should('have.class', 'is-loading');
  },

  assertButtonsDisabled: () => {
    search.submitButton().should('be.disabled');
    search.clearButton().should('be.disabled');
  },
  assertButtonsEnabled: () => {
    search.submitButton().should('not.be.disabled');
    search.clearButton().should('not.be.disabled');
  },
};

const page = {
  stubRequest: () => cy.intercept(URL_PATTERN, cy.stub().as('apiCall')),
  mockDelay: () => {
    const spy = cy
      .stub()
      .callsFake(req => req.reply({ fixture: 'dark', delay: REQUEST_DELAY }))
      .as('apiCallWithDelay');

    cy.intercept(URL_PATTERN, spy);
  },
  mockDark: () => cy.intercept(URL_PATTERN, { fixture: 'dark' }),
  mockTrek: () => cy.intercept(URL_PATTERN, { fixture: 'trek' }),
  mockNoPoster: () => cy.intercept(URL_PATTERN, { fixture: 'noPoster' }),
  mockNotFound: () => cy.intercept(URL_PATTERN, { fixture: 'notFound' }),
};

const list = {
  movies: () => cy.byDataCy('movie'),

  selectMovie: index => {
    list.movies().eq(index).byDataCy('movie__select-button').click();
  },

  unselectMovie: index => {
    list.movies().eq(index).byDataCy('movie__unselect-button').click();
  },

  assertMovieSelected: index => {
    list.movies().eq(index).should('have.class', 'has-background-grey');
  },

  assertSelectedMoviesCount: count => {
    cy.get('[data-cy="movie"].has-background-grey').should(
      'have.length',
      count,
    );
  },

  assertMovieAt: (index, movie) => {
    list
      .movies()
      .eq(index)
      .byDataCy('movie__title')
      .should('have.text', movie.title);

    if (movie.imdbId) {
      list
        .movies()
        .eq(index)
        .byDataCy('movie__link')
        .should(
          'have.attr',
          'href',
          `https://www.imdb.com/title/${movie.imdbId}`,
        );
    }

    if (movie.imgUrl) {
      list
        .movies()
        .eq(index)
        .byDataCy('movie__image')
        .should('have.attr', 'src', movie.imgUrl);
    }
  },

  assertPoster: (index, url) => {
    list
      .movies()
      .eq(index)
      .byDataCy('movie__image')
      .should('have.attr', 'src', url);
  },
};

const selected = {
  movies: () => cy.byDataCy('selected-movie'),
  delete: index =>
    cy
      .byDataCy('selected-movie')
      .eq(index)
      .byDataCy('selected-movie__delete-button')
      .click(),

  assertMovieAt: (index, movie) => {
    selected
      .movies()
      .eq(index)
      .byDataCy('selected-movie__title')
      .should('have.text', movie.title);
  },
};

let failed = false;

Cypress.on('fail', e => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();
  });

  describe('by default', () => {
    beforeEach(() => {
      page.stubRequest();
      cy.visit('/');
    });

    it('movie list is empty', () => {
      list.movies().should('have.length', 0);
    });

    it('selected movies list is empty', () => {
      selected.movies().should('have.length', 0);
    });

    it('search field is empty', () => {
      search.field().should('have.value', '');
    });

    it('search is not loading', () => {
      search.assertNotLoading();
    });

    it('form buttons are disabled', () => {
      search.assertButtonsDisabled();
    });

    it('search error is not shown', () => {
      search.assertNoError();
    });

    it('request is not made', () => {
      cy.get('@apiCall').should('have.callCount', 0);
    });
  });

  describe('after entering search query', () => {
    beforeEach(() => {
      page.stubRequest();
      cy.visit('/');
      search.field().type('Star Trek');
    });

    it('search field keeps value', () => {
      search.field().should('have.value', 'Star Trek');
    });

    it('movie list is empty', () => {
      list.movies().should('have.length', 0);
    });

    it('selected movies list is empty', () => {
      selected.movies().should('have.length', 0);
    });

    it('search is not loading', () => {
      search.assertNotLoading();
    });

    it('form buttons are enabled', () => {
      search.assertButtonsEnabled();
    });

    it('search error is not shown', () => {
      search.assertNoError();
    });

    it('request is not made', () => {
      cy.get('@apiCall').should('have.callCount', 0);
    });
  });

  describe('after clearing entered search query', () => {
    beforeEach(() => {
      page.stubRequest();
      cy.visit('/');
      search.field().type('Star Trek');
      search.clear();
    });

    it('search field is empty', () => {
      search.field().should('have.value', '');
    });

    it('movie list is empty', () => {
      list.movies().should('have.length', 0);
    });

    it('selected movies list is empty', () => {
      selected.movies().should('have.length', 0);
    });

    it('search is not loading', () => {
      search.assertNotLoading();
    });

    it('form buttons are disabled', () => {
      search.assertButtonsDisabled();
    });

    it('search error is not shown', () => {
      search.assertNoError();
    });
  });

  describe('after submitting before result', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.clock();
      page.mockDelay();
      search.field().type('dark');
      search.submit();
      cy.tick(REQUEST_DELAY - 100);
    });

    it('search is loading', () => {
      search.assertLoading();
    });

    it('form buttons are disabled', () => {
      search.assertButtonsDisabled();
    });

    it('search error is not shown', () => {
      search.assertNoError();
    });

    it('request is made', () => {
      cy.get('@apiCallWithDelay').should('have.callCount', 1);
    });

    it('movie list is empty', () => {
      list.movies().should('have.length', 0);
    });

    it('selected movies list is empty', () => {
      selected.movies().should('have.length', 0);
    });
  });

  describe('after loading success', () => {
    beforeEach(() => {
      page.mockDark().as('searchRequest');
      cy.visit('/');
      search.field().type('dark');
      search.submit();
      cy.wait('@searchRequest');
    });

    it('search is not loading', () => {
      search.assertNotLoading();
    });

    it('form buttons are enabled', () => {
      search.assertButtonsEnabled();
    });

    it('search error is not shown', () => {
      search.assertNoError();
    });

    it('movie list has 10 items', () => {
      list.movies().should('have.length', 10);
    });

    it('selected movies list is empty', () => {
      selected.movies().should('have.length', 0);
    });

    it('no movies are selected', () => {
      list.assertSelectedMoviesCount(0);
    });

    it('movies are displayed correctly', () => {
      const { Title, imdbID, Poster } = darkResults.Search[0];

      list.assertMovieAt(0, { title: Title, imdbId: imdbID, imgUrl: Poster });
    });

    it('search field keeps value', () => {
      search.field().should('have.value', 'dark');
    });

    it('one movie can be selected', () => {
      list.selectMovie(3);
      list.assertMovieSelected(3);
      list.assertSelectedMoviesCount(1);
      selected.assertMovieAt(0, { title: darkResults.Search[3].Title });
    });

    it('selected movie can be unselected', () => {
      list.selectMovie(3);
      list.unselectMovie(3);
      list.assertSelectedMoviesCount(0);
      selected.movies().should('have.length', 0);
    });

    it('selected movie can be deleted from selected list', () => {
      list.selectMovie(3);
      selected.delete(0);
      list.assertSelectedMoviesCount(0);
      selected.movies().should('have.length', 0);
    });

    it('several movies can be selected', () => {
      list.selectMovie(3);
      list.selectMovie(5);
      list.selectMovie(7);

      list.assertSelectedMoviesCount(3);
      selected.movies().should('have.length', 3);

      selected.assertMovieAt(0, { title: darkResults.Search[3].Title });
      selected.assertMovieAt(1, { title: darkResults.Search[5].Title });
      selected.assertMovieAt(2, { title: darkResults.Search[7].Title });
    });

    it('selected movie stays in sidebar after search clear', () => {
      list.selectMovie(3);
      search.clear();
      list.movies().should('have.length', 0);
      selected.movies().should('have.length', 1);
      selected.assertMovieAt(0, { title: darkResults.Search[3].Title });
    });
  });

  describe('after loading movies with no Poster', () => {
    beforeEach(() => {
      page.mockNoPoster().as('searchRequest');
      cy.visit('/');
      search.field().type('philosopher');
      search.submit();
      cy.wait('@searchRequest');
    });

    it('show default poster instead of N/A', () => {
      const NO_POSTER_URL = 'https://placehold.co/360x270/?text=no%20preview';

      list.assertPoster(0, NO_POSTER_URL);
      list.assertPoster(1, noPosterResults.Search[1].Poster);
      list.assertPoster(4, NO_POSTER_URL);
      list.assertPoster(5, NO_POSTER_URL);
    });
  });

  describe('after loading error', () => {
    beforeEach(() => {
      page.mockNotFound().as('searchRequest');
      cy.visit('/');
      search.field().type('dark');
      search.submit();
      cy.wait('@searchRequest');
    });

    it('search is not loading', () => {
      search.assertNotLoading();
    });

    it('form buttons are enabled', () => {
      search.assertButtonsEnabled();
    });

    it('search error is shown', () => {
      search.assertError('Movie not found!');
    });

    it('movie list is empty', () => {
      list.movies().should('have.length', 0);
    });

    it('selected movies list is empty', () => {
      selected.movies().should('have.length', 0);
    });

    it('no movies are selected', () => {
      list.assertSelectedMoviesCount(0);
    });

    it('search field keeps value', () => {
      search.field().should('have.value', 'dark');
    });

    it('error is hidden after clearing search field', () => {
      search.clear();
      search.assertNoError();
    });

    it('error is hidden on query change', () => {
      search.field().type('Trek');
      search.assertNoError();
    });
  });

  describe('after loading success and then error', () => {
    beforeEach(() => {
      page.mockDark().as('searchRequest');
      cy.visit('/');
      search.field().type('dark');
      search.submit();
      cy.wait('@searchRequest');
      list.selectMovie(3);
      list.selectMovie(5);

      page.mockNotFound().as('searchRequest2');
      search.field().type('{selectAll}{backspace}trek');
      search.submit();
      cy.wait('@searchRequest2');
    });

    it('search is not loading', () => {
      search.assertNotLoading();
    });

    it('form buttons are enabled', () => {
      search.assertButtonsEnabled();
    });

    it('search error is shown', () => {
      search.assertError('Movie not found!');
    });

    it('movie list is empty', () => {
      list.movies().should('have.length', 0);
    });

    it('selected movies list keeps selected movies', () => {
      selected.movies().should('have.length', 2);
    });

    it('search field keeps value', () => {
      search.field().should('have.value', 'trek');
    });
  });

  describe('after consequent searches', () => {
    beforeEach(() => {
      cy.visit('/');
      page.mockDark().as('searchRequest');
      search.field().type('dark');
      search.submit();
      cy.wait('@searchRequest');
      list.selectMovie(3);
      list.selectMovie(5);

      page.mockTrek().as('searchRequest2');
      search.field().type('{selectAll}{backspace}trek');
      search.submit();
      cy.wait('@searchRequest2');
    });

    it('movie list has only last results', () => {
      list.movies().should('have.length', 10);
      list.assertMovieAt(0, { title: trekResults.Search[0].Title });
      list.assertMovieAt(9, { title: trekResults.Search[9].Title });
    });

    it('selected movies list keeps previously selected movies', () => {
      selected.movies().should('have.length', 2);
      selected.assertMovieAt(0, { title: darkResults.Search[3].Title });
      selected.assertMovieAt(1, { title: darkResults.Search[5].Title });
    });

    it('new movies are added to previously selected', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300);

      list.selectMovie(0);
      list.selectMovie(2);

      selected.movies().should('have.length', 4);
      selected.assertMovieAt(2, { title: trekResults.Search[0].Title });
      selected.assertMovieAt(3, { title: trekResults.Search[2].Title });
    });

    it('all selected movies stay on clear', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300);

      list.selectMovie(0);
      list.selectMovie(2);
      search.clear();

      list.movies().should('have.length', 0);
      selected.movies().should('have.length', 4);
    });
  });
});
