document.addEventListener("DOMContentLoaded", function (e) {

  // ! Инициализация библиотеки
  Win.init({
    debug: false,
    loadDelay: 0,
    loadOutput: false,
    back: true,
    forward: true,
    fullSize: true,
    path: './windows',
    selectorWin: 'body',
    color: 'fbafba',
    style: './test.css?ver=15',
    load: {
      'test': {
        title: 'Окно 1',
      },
      'test2': {
        title: 'Окно 2',
        path: './windows/test.php'
      }
    },
  });

  // ! Пример открытия окн
  document.getElementById('btn1').addEventListener('click', function (e) {
    const text = this.innerHTML;
    this.innerHTML = 'Загрузка окна...'
    Win.open('test').then((e) => {
      if(e == undefined) {
        this.innerHTML = 'Ошибка загрузки<br>окна!'
        setTimeout(() => {
          this.innerHTML = text
        }, 1000)
      } else {
        this.innerHTML = text;
      }
    });
  });

  document.getElementById('btn2').addEventListener('click', function (e) {
    const text = this.innerHTML;
    this.innerHTML = 'Загрузка окна...'
    Win.open('test2', {
      path: './windows/test.php'
    }).then((e) => {
      if(e == undefined) {
        this.innerHTML = 'Ошибка загрузки<br>окна!'
        setTimeout(() => {
          this.innerHTML = text
        }, 1000)
      } else {
        this.innerHTML = text;
      }
    });
  });

  document.getElementById('btn3').addEventListener('click', function (e) {
    const text = this.innerHTML;
    this.innerHTML = 'Загрузка<br>окна...'
    Win.open('test2', {
      update: true,
      path: './windows/test.php',
      title: 'Окно 2'
    }).then((e) => {
      if(e == undefined) {
        this.innerHTML = 'Ошибка загрузки<br>окна!'
        setTimeout(() => {
          this.innerHTML = text
        }, 1000)
      } else {
        this.innerHTML = text;
      }
    });
  });

  document.getElementById('btn4').addEventListener('click', function (e) {
    const text = this.innerHTML;
    this.innerHTML = 'Загрузка<br>окна...'
    Win.open('test5').then((e) => {
      if(e == undefined) {
        this.innerHTML = 'Ошибка загрузки<br>окна!'
        setTimeout(() => {
          this.innerHTML = text
        }, 1000)
      } else {
        this.innerHTML = text;
      }
    });
  });

    document.getElementById('btn5').addEventListener('click', function (e) {
    const text = this.innerHTML;
    this.innerHTML = 'Загрузка окна...'
    Win.open('test4', {
      title: '',
      back: false,
      path: './windows/noTitle.html'
    }).then((e) => {
      if(e == undefined) {
        this.innerHTML = 'Ошибка загрузки<br>окна!'
        setTimeout(() => {
          this.innerHTML = text
        }, 1000)
      } else {
        this.innerHTML = text;
      }
    });
  });


  // ! Пример вызова событий
  document.addEventListener('winOpen', (e) => {
    console.log("Событие открытия окна: ", e.detail);
  });

  document.addEventListener('winFullSize', (e) => {
    console.log("Событие открытия окна на весь экран: ", e.detail);
  });

  document.addEventListener('winMinSize', (e) => {
    console.log("Событие открытия окна не на весь экран: ", e.detail);
  });

  document.addEventListener('winClose', (e) => {
    console.log("Событие закрытие окна: ", e.detail);
  });

  document.addEventListener('winCloseAll', (e) => {
    console.log("Событие закрытие всех окн: ", e.detail);
  });

  document.addEventListener('winBack', (e) => {
    console.log("Событие назад: ", e.detail);
  });

  document.addEventListener('winForward', (e) => {
    console.log("Событие вперед: ", e.detail);
  });

  document.addEventListener('winHistoryNew', (e) => {
    console.log("Добавление нового элемента в истории: ", e.detail);
  });

});

