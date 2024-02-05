import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

startBtn.setAttribute('disabled', 'true');

let userSelectedDate;
let options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 4000,
        progressBar: false,
        layout: 2,
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartClick);
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let intervalId;
function onStartClick() {
  startBtn.disabled = true;
  input.disabled = true;
  intervalId = setInterval(() => {
    const diff = userSelectedDate.getTime() - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      iziToast.show({
        theme: 'dark',
        message: 'Do you want to reload the page?',
        position: 'center',
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
          [
            '<button>Ok</button>',
            function (instance, toast) {
              location.reload();
            },
            true,
          ],
          [
            '<button>Close</button>',
            function (instance, toast) {
              instance.hide(
                {
                  transitionOut: 'fadeOutUp',
                  onClosing: function (instance, toast, closedBy) {
                    console.info('closedBy: ' + closedBy);
                  },
                },
                toast,
                'buttonName'
              );
            },
          ],
        ],
      });
    } else {
      const time = convertMs(diff);
      days.textContent = time.days;
      hours.textContent = time.hours;
      minutes.textContent = time.minutes;
      seconds.textContent = time.seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
}
