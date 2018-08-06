import test from 'ava';
import { Spec } from '../..';

test('method isRoot() indicates if the spec is nested or not', async (t) => {
  const results = [];
  const spec1 = new Spec();
  const spec0 = new Spec();
  spec0.spec('', spec1);
  await spec0.perform();
  t.true(spec0.isRoot());
  t.false(spec1.isRoot());
});

test('method perform() executes spec stack', async (t) => {
  const results = [];
  const spec1 = new Spec();
  spec1.test('', () => { results.push('1-0'); });
  spec1.before(() => { results.push('1-before-0'); });
  const spec0 = new Spec();
  spec0.test('', () => { results.push('0-0'); });
  spec0.before(() => { results.push('0-before-0'); });
  spec0.beforeEach(() => { results.push('0-beforeeach-0'); });
  spec0.after(() => { results.push('0-after-0'); });
  spec0.afterEach(() => { results.push('0-aftereach-0'); });
  spec0.before(() => { results.push('0-before-1'); });
  spec0.beforeEach(() => { results.push('0-beforeeach-1'); });
  spec0.after(() => { results.push('0-after-1'); });
  spec0.afterEach(() => { results.push('0-aftereach-1'); });
  spec0.spec('', spec1);
  spec0.test('', () => { results.push('0-1'); });
  await spec0.perform();
  t.deepEqual(results, [
    '0-before-0',
    '0-before-1',
    '0-beforeeach-0',
    '0-beforeeach-1',
    '0-0',
    '0-aftereach-0',
    '0-aftereach-1',
    '0-before-1',
    '0-before-0',
    '1-before-0',
    '0-beforeeach-1',
    '0-beforeeach-0',
    '1-0',
    '0-aftereach-0',
    '0-aftereach-1',
    '0-after-0',
    '0-after-1',
    '0-beforeeach-0',
    '0-beforeeach-1',
    '0-1',
    '0-aftereach-0',
    '0-aftereach-1',
    '0-after-0',
    '0-after-1',
  ]);
});

test('method perform() ignores skipped tests', async (t) => {
  const results = [];
  const spec0 = new Spec();
  spec0.skip('', () => { results.push('0-0'); });
  spec0.before(() => { results.push('0-before-0'); });
  spec0.beforeEach(() => { results.push('0-beforeeach-0'); });
  spec0.after(() => { results.push('0-after-0'); });
  spec0.afterEach(() => { results.push('0-aftereach-0'); });
  spec0.before(() => { results.push('0-before-1'); });
  spec0.beforeEach(() => { results.push('0-beforeeach-1'); });
  spec0.after(() => { results.push('0-after-1'); });
  spec0.afterEach(() => { results.push('0-aftereach-1'); });
  spec0.test('', () => { results.push('0-1'); });
  await spec0.perform();
  t.deepEqual(results, [
    '0-before-0',
    '0-before-1',
    '0-beforeeach-0',
    '0-beforeeach-1',
    '0-1',
    '0-aftereach-0',
    '0-aftereach-1',
    '0-after-0',
    '0-after-1',
  ]);
});

test('method perform() performs only selected tests', async (t) => {
  const results = [];
  const spec0 = new Spec();
  spec0.only('', () => { results.push('0-0'); });
  spec0.before(() => { results.push('0-before-0'); });
  spec0.beforeEach(() => { results.push('0-beforeeach-0'); });
  spec0.after(() => { results.push('0-after-0'); });
  spec0.afterEach(() => { results.push('0-aftereach-0'); });
  spec0.before(() => { results.push('0-before-1'); });
  spec0.beforeEach(() => { results.push('0-beforeeach-1'); });
  spec0.after(() => { results.push('0-after-1'); });
  spec0.afterEach(() => { results.push('0-aftereach-1'); });
  spec0.test('', () => { results.push('0-1'); });
  await spec0.perform();
  t.deepEqual(results, [
    '0-before-0',
    '0-before-1',
    '0-beforeeach-0',
    '0-beforeeach-1',
    '0-0',
    '0-aftereach-0',
    '0-aftereach-1',
    '0-after-0',
    '0-after-1',
  ]);
});

test('method spec() appends new spec with shared stage instance', async (t) => {
  const results = [];
  const spec2 = new Spec();
  const spec1 = new Spec();
  const spec0 = new Spec();
  spec1.spec('', spec2);
  spec0.spec('', spec1);
  t.true(spec2.stage === spec1.stage);
  t.true(spec2.stage === spec0.stage);
  t.true(spec1.stage === spec0.stage);
});
