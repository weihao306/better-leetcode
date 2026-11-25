import * as assert from 'assert';
import { getStudyPlanEntries } from '../../tree/studyPlans';

suite('Study plan settings', () => {
  test('keeps the built-in plans when the setting is empty or invalid', () => {
    const expected = [
      { name: 'Top Interview 150', slug: 'top-interview-150' },
      { name: 'LeetCode 75', slug: 'leetcode-75' },
    ];

    for (const setting of [undefined, null, [], 'sql-50']) {
      assert.deepStrictEqual(getStudyPlanEntries(setting), expected);
    }
  });

  test('appends configured slugs in order and deduplicates against built-in and custom plans', () => {
    const plans = getStudyPlanEntries([' LeetCode-75 ', ' SQL-50 ', 'top-100-liked', 'sql-50']);

    assert.deepStrictEqual(plans, [
      { name: 'Top Interview 150', slug: 'top-interview-150' },
      { name: 'LeetCode 75', slug: 'leetcode-75' },
      { name: 'sql-50', slug: 'sql-50' },
      { name: 'top-100-liked', slug: 'top-100-liked' },
    ]);
  });

  test('skips malformed entries without dropping valid plans', () => {
    const plans = getStudyPlanEntries([
      null,
      123,
      '',
      'https://leetcode.com/studyplan/sql-50/',
      'sql--50',
      'sql-50',
    ]);

    assert.deepStrictEqual(
      plans.map((plan) => plan.slug),
      ['top-interview-150', 'leetcode-75', 'sql-50'],
    );
  });
});
