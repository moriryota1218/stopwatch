'use stric';

{
  // 定数を設定し、idを取得
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  // クリックイベントの設定

  let startTime; //他の場所でも使うので変数を宣言
 //カウントアップ処理を定義する(10ミリ秒ごと)
 function countUp() {
   // console.log(Date.now() - startTime);
   setTimeout(() => {
     countUp();
   },10);
 }
  start.addEventListener('click',() =>{
    startTime = Date.now();
    countUp();
  });
}
