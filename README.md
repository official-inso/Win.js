<h1>Описание библиотеки Win.js</h1>
<p>Библиотека Win.js предоставляет функционал для работы с окнами веб-приложения.

<h2>Инициализация библиотеки</h2>
<p>Для начала работы с библиотекой необходимо произвести инициализацию с помощью метода Win.init().</p>

<p>В данном методе доступны следующие параметры: </p>

<ul>
  <li><code>debug</code> (boolean, необязательный): Включает режим отладки. По умолчанию установлено значение false.</li>
  <li><code>loadDelay</code> (number, необязательный): Задержка на автозагрузку окон. По умолчанию установлено значение 0.</li>
  <li><code>loadOutput</code> (boolean, необязательный): Автоматический вывод окна в DOM структуру после автозагрузки. По умолчанию установлено значение false.</li>
  <li><code>back</code> (boolean, необязательный): Включение кнопки назад. По умолчанию установлено значение true.</li>
  <li><code>forward</code> (boolean, необязательный): Включение кнопки вперед. Работает только если включена кнопка назад. По умолчанию установлено значение true.</li>
  <li><code>fullSize</code> (boolean, необязательный): Открытие окна на весь экран при прокрутке на мобильной версии. По умолчанию установлено значение false.</li>
  <li><code>path</code> (string, необязательный): Путь, где библиотека будет искать окна. По умолчанию установлено значение ./windows.</li>
  <li><code>selectorWin</code> (string, необязательный): Селектор, где будут размещаться окна. По умолчанию установлено значение body.</li>
  <li><code>color</code> (string, необязательный): Цвет акцента. По умолчанию установлено значение fbafba.</li>
  <li><code>style</code> (string, необязательный): Дополнительные стили для загрузки. По умолчанию установлено пустое значение ''.</li>
  <li><code>load</code> (object, необязательный): Объект автозагрузки окон. Содержит идентификаторы окон и их параметры.</li>
</ul>

<br><p>Пример инициализации библиотеки:</p>

<pre><code>Win.init({
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
      path: './windows/test.php',
    },
  },
});
</code></pre>

<h2>Пример открытия окна</h2>
<p>Для открытия окна используется метод <code>Win.open()</code>. Пример открытия окна без дополнительных параметров:</p>
<pre><code>Win.open('test').then((e) => {/* Your code... */});</code></pre>

<h3>Пример открытия окна с дополнительными параметрами:</h3>
<p>Метод <code>Win.open('test2', {...})</code> используется для открытия окна с идентификатором "test2" и указанными дополнительными параметрами. После открытия окна выполняется блок кода, указанный внутри функции <code>then()</code>.</p>
<p>В данном примере использованы следующие параметры:</p>
<ul>
  <li><code>update: true</code> - (boolean, необязательный): указывает, что окно должно быть загружено повторно при каждом новом открытии.</li>
  <li><code>path: './windows/test.php'</code> - (string, необязательный): задает путь к файлу, содержащему содержимое окна. Этот путь отличается от шаблона по умолчанию, который формируется на основе пути к окну и его идентификатору.</li>
  <li><code>title: 'Окно 2'</code> - (string, необязательный): задает заголовок окна. В данном случае указан явно, отлично от значения, которое могло бы быть взято из идентификатора окна.</li>
  <li><code>back: false</code> - (boolean, необязательный): отключает кнопку "назад" для данного окна.</li>
</ul>
<p>После открытия окна и выполнения кода в блоке <code>then()</code>, можно выполнять дополнительные действия с открытым окном, взаимодействуя с его содержимым и элементами DOM.</p>
<br><p>Пример выполнения кода:</p>
<pre><code>Win.open('test2', {
  update: true,
  path: './windows/test.php',
  title: 'Окно 2',
  back: false,
}).then((e) => {
  // Ваш код...
});
</code></pre>

<h2>Пример закрытия окна или окн.</h2>
<p>Для закрытия окна можно использовать метод <code>Win.close()</code>. Примеры:</p>
<ul>
  <li>Закрытие окна по ID: <code>Win.close('window_name');</code></li>
  <li>Закрытие всех окон: <code>Win.close();</code></li>
  <li>Закрытие активного окна через параметр объекта: <code>Win.close({ type: 'close' });</code></li>
  <li>Шаг назад в окне: <code>Win.close({ type: 'back' });</code></li>
  <li>Шаг вперед в окне: <code>Win.close({ type: 'forward' });</code></li>
  <li>Закрытие всех окон через параметр объекта: <code>Win.close({ type: 'closeAll' });</code></li>
</ul>

<h2>Получение информации об окне</h2>
<p>Методы <code>Win.live()</code> и <code>Win.status()</code> позволяют получить информацию об открытом окне.</p>
<ul>
  <li><code>Win.live()</code>: Возвращает структуру DOM открытого окна.</li>
  <li><code>Win.live('object', true)</code>: Возвращает DOM-структуру открытого окна и настройки, с которыми оно было инициализировано.</li>
  <li><code>Win.live('name')</code>: Возвращает идентификатор открытого окна.</li>
  <li><code>Win.live('name', true)</code>: Возвращает идентификатор и настройки открытого окна.</li>
</ul>

<h2>События</h2>

<p>Библиотека <code>Win.js</code> генерирует следующие события, на которые можно подписываться с помощью метода <code>addEventListener()</code>:</p>
<ul>
  <li><code>winOpen</code>: Событие открытия окна.</li>
  <li><code>winFullSize</code>: Событие открытия окна на весь экран.</li>
  <li><code>winMinSize</code>: Событие открытия окна не на весь экран.</li>
  <li><code>winClose</code>: Событие закрытия окна.</li>
  <li><code>winCloseAll</code>: Событие закрытия всех окон.</li>
  <li><code>winBack</code>: Событие шага назад в окне.</li>
  <li><code>winForward</code>: Событие шага вперед в окне.</li>
  <li><code>winHistoryNew</code>: Событие добавления нового элемента в истории.</li>
</ul>

<br><p>Пример подписки на события:</p>
<pre><code>document.addEventListener('winOpen', (e) => {
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
});</code></pre>
