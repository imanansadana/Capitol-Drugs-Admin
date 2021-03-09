export default () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === null) {
    localStorage.setItem('isLoggedIn', true);
    return true;
  } else {
    if (isLoggedIn === 'true') {
      return true;
    }
    return true;
  }
};
