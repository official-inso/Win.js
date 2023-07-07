<?php date_default_timezone_set('Asia/Tashkent'); ?>
Тут будет содержимое окна и ничего более<br>
Текущее время на сервере: <?= date('d.m.Y H:i:s') ?><br><br>
<button data-tabindex="5" onclick="Win.open('test3', {title: 'Окно без увеличения', path: './windows/tes2t.html', fullSize: false});">Открыть окно 3</button>