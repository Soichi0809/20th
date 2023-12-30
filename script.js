alert("パスワードは問題番号")

var answer = ["1", "2", "3", "4", "5", "6", "7"];

// モーダル要素を取得
var modal = document.getElementById("myModal");

// 最終解答用ボタン要素を取得
var lastbtn = document.getElementById("lastbutton");

// ボタン要素を取得
var btns = document.querySelectorAll('.openModal')

// <span>要素を取得 (モーダルを閉じるためのxボタン)
var span = document.getElementsByClassName("close")[0];

// ボックス要素を取得
var menubox = document.querySelectorAll(".menu-box");

btns.forEach(function(btn, index) {
    // 各要素にクリックイベントリスナを追加
    btn.addEventListener('click', function() {
        modal.style.display = "block";
        now_index = index;
    });
});

// ユーザーがxをクリックするとモーダルを閉じる
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("passwordInput").value = ""; // 入力欄をリセット
}

// ユーザーがモーダル外をクリックすると閉じる
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("passwordInput").value = ""; // 入力欄をリセット
    }
}

// ボタン要素を取得
var btn = document.querySelector(".button-default");

//押されたボタンのインデックスを保存
var now_index;

var answered = [0,0,0,0,0,0,0]

// '入力'ボタンをクリックしたときのイベントリスナーを設定
submitBtn.onclick = function() {
    var password = document.getElementById("passwordInput").value;
    if(password == answer[now_index]) {
        btns[now_index].classList.add("button-correct");
        btns[now_index].classList.remove("button-default");
        btns[now_index].disabled = true;
        menubox[now_index].classList.add("menu-box-correct");
        menubox[now_index].classList.remove("menu-box");
        answered[now_index] = 1;
        if(answered[0] == 1 && answered[1] == 1 && answered[2] == 1) {
            lastbtn.classList.remove("graybutton");
            lastbtn.disabled = false;
        }
    }
    modal.style.display = "none"; // パスワードを入力した後、モーダルを閉じます
    document.getElementById("passwordInput").value = ""; // 入力欄をリセット
}