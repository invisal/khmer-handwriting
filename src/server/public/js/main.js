require('../scss/index.scss');
/* eslint-disable no-unused-vars */
function showDate() {
  document.getElementById('demo').innerHTML = Date();
}
document.addEventListener('DOMContentLoaded', () => {
});

const test = (idDom) => {
  console.log('test');
};

module.exports = {
  test,
  showDate,
};
