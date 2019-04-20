'use stric';

{
  // 定数を設定し、HTMLからidを取得
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  // クリックイベントの設定

  let startTime; //他の場所でも使うので変数を宣言
  let timeoutId; //引数として渡すタイムアウト用のidを変数で宣言
  let elapsedTime = 0; //経過時間を０として変数で宣言
 //カウントアップ処理を定義する(10ミリ秒ごと)
 function countUp() {
   // 経過時間でDateオブジェクトを作り、定数dに代入
   const d = new Date(Date.now() - startTime + elapsedTime);
   // 定数dに対して、分,秒のメソッド使用する
   const m = d.getMinutes();
   const s = d.getSeconds();
   const ms = d.getMilliseconds();
   // timer.textContentに分や秒のテンプレートリテラルを文字列として代入
   /*桁数を指定するためpadStartメソッドを使う。文字列にしか使えないのでstring型を指定
   ()の中に桁数と文字列'0'(その桁に満たなかった場合)を指定*/
   timer.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.
   ${String(ms).padStart(3,'0')}`;
   // タイムアウト用の IDはsetTimeout() の返り値で取得できるので、ここで代入
   timeoutId = setTimeout(() => {
     countUp();
   },10);
 }
// ボタンを状態をセットする関数処理
// htmlでdivをしているとdisabledプロパティが使えないので別の処理をする
 function setButtonStateInitial(){
   start.classList.remove('inactive');
   stop.classList.add('inactive');
   reset.classList.add('inactive');

 }

 function setButtonStateRunning(){
   start.classList.add('inactive');
   stop.classList.remove('inactive');
   reset.classList.add('inactive');
 }

 function setButtonStateStopped(){
   start.classList.remove('inactive');
   stop.classList.add('inactive');
   reset.classList.remove('inactive');
 }
// ページ読み込み時にsetButtonStateInitial();をセット
  setButtonStateInitial();

  start.addEventListener('click',() =>{
    // ボタンに inactive クラスが付いていたらそれぞれの処理をしないようにする
    if(start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click',() =>{
    // ボタンに inactive クラスが付いていたらそれぞれの処理をしないようにする
    if(stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    // タイマーが走っていた時間を全て足しあげるために+を指定
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click',() =>{
    // ボタンに inactive クラスが付いていたらそれぞれの処理をしないようにする
    if(reset.classList.contains('inactive') === true) {
      return;
    }
    // 最初の状態に戻る処理
    setButtonStateInitial();
    //タイマーを0に戻す処理
    timer.textContent = '00:00.000';
    // resetを押した時に0に戻す処理
    elapsedTime = 0;
  });
}
