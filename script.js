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

  document.getElementById('btn9').addEventListener('click', function (e) {
    const text = this.innerHTML;
    this.innerHTML = 'Загрузка окна...'
    Win.open('testLocal', {
      title: "Локальная загрузка",
      content: Random.string(150)
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


/**
 * Объект по работе с рандомом
 * @version 1.0
 * @namespace Random
 * @author Роман Жужгов
 */
let Random = {

  /**
   * Получение случайной строки
   * @param {integer} n=15 Количество символов в случайной строке
   * @param {string} alphabet=qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321 Символы из которых будет состоять случайная строка
   * @returns {string}
   * @example - Получение случайной строки
   *    Random.string(10); // return Yn3B5fJXlr
   *    Random.string(10); // return vJawf5EPT7
   *    Random.string(10); // return lRsdFrwGmY
   */
  string: (n, alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321') => {
    if(n == undefined){
      n = 15;
    }
    let word = '';

    for(let i = 0; i < n; i++){
      word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
    }
    return word;
  },

  /**
   * Получение случайного id
   * @param {integer} n=15 Количество символов в случайном ID
   * @returns {string}
   * @example - Получение случайного id
   *    Random.id(10); // return i8tpPjklIm
   *    Random.id(10); // return iZOoOpnMUL
   *    Random.id(10); // return iNzv9PQpbY
   */
  id: (n)  => {
    if(n == undefined){
      n = 15;
    }
    let alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321',
    word = '';

    for(let i = 0; i < n; i++){
      if(i == 0){
        word += 'i';
      } else {
        word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];

      }
    }
    return word;
  },

  /**
   * Получение случайного целого числа в заданном диапазоне
   * @param {integer} min Минимальное число для диапазона
   * @param {integer} max Максимальное число для диапазона
   * @returns {integer}
   * @example - Получение случайного целого числа в заданном диапазоне
   *    Random.integer(0, 100); // return 76
   *    Random.integer(0, 100); // return 4
   *    Random.integer(0, 100); // return 51
   */
  integer: (min, max)  => {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
  },

  /**
   * Получение случайного дробного числа в заданном диапазоне
   * @param {float} min Минимальное число для диапазона
   * @param {float} max Максимальное число для диапазона
   * @returns {float} 
   * @example - Получение случайного дробного числа в заданном диапазоне
   *    Random.float(0, 100); // return 96.7420185839271
   *    Random.float(0, 100); // return 18.675283068792737
   *    Random.float(0, 100); // return 71.35755505756538
   */
  float: (min, max)  => {
    let rand = Math.random() * (max - min) + min;
    return rand;
  },

  /**
   * Получение случайного пароля
   * @param {integer} n=12 Количество символов в случайном пароле
   * @param {*} alphabet=qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321!%_+=-@#$&. Символы из которых будет состоять случайный пароль 
   * @returns {string}
   * @example - Получение случайного пароля
   *    Random.password(10); // return P15BUzb@=W
   *    Random.password(10); // return PbFTSzQEdh
   *    Random.password(10); // return zUmFsTj4CD
   */
  password: (n, alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321!%_+=-@#$&.')  => {
    if(n == undefined){
      n = 12;
    }
    let password = '';

    for(let i = 0; i < n; i++){
      password += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
    }
    return password;
  }
}