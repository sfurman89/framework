# Contributing

## Issues

We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## Pull Requests

* Fork the repo and create your branch from master.
* If you've added code that should be tested, add tests.
* Ensure the test suite passes.

## Coding Style

Please follow the [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines).

## Testing

All features must be well tested. We use [Codecov](https://codecov.io) to analize test coverage. We advise to install the [browser plugin](https://docs.codecov.io/docs/browser-extension) which allows for overlay reports directly in Github.

## Development

* Don't use lerna commands. Use npm commands instead.
* Run `npm install` to install main dependencies.
* Run `npm run bootstrap` to install the packages in all the subpackages.
* Run `npm test` to run tests in all the subpackages.
* Run `npm publish` to publish all the subpackages.
