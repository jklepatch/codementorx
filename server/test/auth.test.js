const jwt = require('jsonwebtoken');
const SECRET = 'SECRET';
const USER_ID = 10;
const assert = require('assert');

// this test the jsonwebtoken and not our app, true, but it validates our approach
describe('auth', () => {
  it('should decode jwt if good secret', () => {
    const access = jwt.sign({sub: USER_ID }, SECRET);
    const decoded = jwt.verify(access, SECRET);
    assert(decoded.sub == USER_ID);
  });
  it('should not decode jwt if bad secret', () => {
    const access = jwt.sign({sub: USER_ID }, SECRET);
    try {
      const decoded = jwt.verify(access, 'BAD_SECRET');
    } catch(_e) {
      assert(true);
      return;
    }
    assert(false);
  });
});
