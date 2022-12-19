export const sessionStorage_transfer = function(event,sessionCallback,logoutCallback) {
    if(!event) { event = window.event; } // ie suq
    if(!event.newValue) return;          // do nothing if no value to work with
    if (event.key == 'getSessionStorage') {
      // another tab asked for the sessionStorage -> send it
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
      // the other tab should now have it, so we're done with it.
      localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
      // another tab sent data <- get it
      var data = JSON.parse(event.newValue);
      for (var key in data) {
        sessionStorage.setItem(key, data[key]);
      }
      sessionCallback(); // to change login state if user was logged in another tab
    } else if (event.key == 'newRefreshToken'){
        sessionStorage.setItem('refreshToken', event.newValue);
    }else if (event.key == 'logout'){
        logoutCallback();
    }
};


