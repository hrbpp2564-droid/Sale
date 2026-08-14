/* BWP Vantage — session shared by the dashboard, the data editor and the
   customer database.

   Log in once on any of the three pages and the others follow, because what
   travels between them is a random session token, never a password. The token
   is issued by login_session (checked against bwp_users), stored only as a
   SHA-256 hash server-side, expires 8 hours after its last use, and is accepted
   by the *_s RPCs only. Losing it exposes a session that can be revoked and
   that dies on its own — not the password behind it.

   sessionStorage, not localStorage: closing the tab ends the session. */
(function () {
  var KEY = 'bwp_session';

  function read() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || null; } catch (e) { return null; }
  }

  window.BWP_SESSION = {
    get: read,
    token: function () { var s = read(); return s && s.token ? s.token : null; },
    // A session is usable while its token exists; the server is the real judge
    // of expiry, so an optimistic read here just avoids a pointless round-trip.
    canWrite: function () { var s = read(); return !!(s && s.canWrite); },
    save: function (result) {
      try {
        sessionStorage.setItem(KEY, JSON.stringify({
          token: result.token,
          username: result.username,
          role: result.role,
          canWrite: !!result.canWrite,
          expiresAt: result.expiresAt,
        }));
      } catch (e) {}
    },
    clear: function () { try { sessionStorage.removeItem(KEY); } catch (e) {} },
    // true when the server says the token is no longer good, so callers can
    // drop back to the login screen instead of showing a generic failure
    isExpired: function (err) {
      var m = (err && err.message) || '';
      return /session_invalid|session_expired/i.test(m);
    },
  };
})();
