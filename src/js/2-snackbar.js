import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormBtn);

function onFormBtn(e) {
  e.preventDefault();

  const delay = +formEl.elements.delay.value;
  const value = formEl.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    res => {
      iziToast.success({
        message: `Fulfilled promise in ${res}ms`,
        position: 'topRight',
        timeout: 4000,
        progressBar: false,
        layout: 2,
      });
    },
    err => {
      iziToast.error({
        message: `Rejected promise in ${err}ms`,
        position: 'topRight',
        timeout: 4000,
        progressBar: false,
        layout: 2,
      });
    }
  );
  formEl.reset();
}
