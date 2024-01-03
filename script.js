//仮のコード
var resetbtn = document.getElementById("reset");
resetbtn.onclick = function() {
    localStorage.clear();
}
//仮のコード終わり

var group_num;

var alreadysbumit
if(localStorage.getItem("alreadysbumit") == null){
    alreadysbumit = false;
}

function getgroupnum(){
    group_num = localStorage.getItem("group_num");
    var url = location.href;
    if(group_num == null){
        group_num = url.split("=")[1];
        if(Number.isInteger(Number(group_num)) && 0<=group_num && group_num<=29){
            localStorage.setItem("group_num", group_num);
        }else{
            alert("URLが不正です。もう一度QRコードを読み取ってください。");
        }
    }
    return group_num;
}

var answered = [0,0,0,0,0,0,0,0]

window.onload = function() {
    //answered をjsonから取得
    var oldanswered = JSON.parse(localStorage.getItem("answered"));
    if(oldanswered != null){
        answered = oldanswered;
        update(answered);
    }
    getgroupnum();
}
const api_url = "https://script.google.com/macros/s/AKfycbwwNAqCvrzX1hcq9QLoZeBkrWo3tgG72oPAG8K1zdUDL6VE_mQCtZgNuKjNW107tEdi/exec";

var answer = ["1", "2", "3", "4", "5", "6", "7" , "last"];

// モーダル要素を取得
var modal = document.getElementById("myModal");

// ストーリーモーダル要素を取得
var storymodal = document.getElementById("storyModal");

// 最終解答用ボタン要素を取得
var lastbtn = document.getElementById("lastbutton");

// 「解答する」ボタン要素を取得
var ansbtns = document.querySelectorAll('.openAnswer')

// 「ストーリー」ボタン要素を取得
var storybtns = document.querySelectorAll('.openStory')

// <span>要素を取得 (モーダルを閉じるためのxボタン)
var span = document.getElementsByClassName("close");

// ボックス要素を取得
var menubox = document.querySelectorAll(".menu-box");

// 「解答する」ボタンを押下したときのイベントリスナーを設定
ansbtns.forEach(function(btn, index) {
    // 各要素にクリックイベントリスナを追加
    btn.addEventListener('click', function() {
        modal.classList.add("show");
        now_index = index;
    });
});

// 「ストーリー」ボタンを押下したときのイベントリスナーを設定
storybtns.forEach(function(btn, index) {
    // 各要素にクリックイベントリスナを追加
    btn.addEventListener('click', function() {
        storymodal.classList.add("show");
        storymodal.scrollTop = 0;
        now_index = index;
        document.getElementById("storybox").innerHTML = story[now_index];
    });
});


// ユーザーがxをクリックするとモーダルを閉じる
span[0].onclick = function() {
    modal.classList.remove("show");
    storymodal.classList.remove("show");
    correct_telling.style.display = "none";
    document.getElementById("passwordInput").value = ""; // 入力欄をリセット
}
span[1].onclick = function() {
    modal.classList.remove("show");
    storymodal.classList.remove("show");
    correct_telling.style.display = "none";
    document.getElementById("passwordInput").value = ""; // 入力欄をリセット
}

// ユーザーがモーダル外をクリックすると閉じる
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
        document.getElementById("passwordInput").value = ""; // 入力欄をリセット
    } else if (event.target == storymodal) {
        storymodal.classList.remove("show");
        correct_telling.style.display = "none";
    }
}

//押されたボタンのインデックスを保存
var now_index;

var correct_telling = document.getElementById("correct_telling");

// '入力'ボタンをクリックしたときのイベントリスナーを設定
submitBtn.onclick = function() {
    var password = document.getElementById("passwordInput").value;
    modal.classList.remove("show"); // パスワードを入力した後、モーダルを閉じます
    if(password == answer[now_index]) {
        document.getElementById("storybox").innerHTML = story[now_index];
        answered[now_index] = 1;
        update(answered);
        storymodal.classList.add("show");
        correct_telling.style.display = "block";
        storymodal.scrollTop = 0;
        if(answered[0] == 1 && answered[1] == 1 && answered[2] == 1 && answered[3] == 1 && answered[4] == 1 && answered[5] == 1 && answered[6] == 1 && answered[7] == 1) {
            submit_lastans();
        }
    }
    
    document.getElementById("passwordInput").value = ""; // 入力欄をリセット
}

function update(anss){
    anss.forEach(function(ans, index) {
        if(ans){
            ansbtns[index].classList.add("button-correct");
            ansbtns[index].classList.remove("button-default");
            ansbtns[index].disabled = true;
            menubox[index].classList.add("menu-box-correct");
            menubox[index].classList.remove("menu-box");
            storybtns[index].classList.add("button-default");
            storybtns[index].disabled = false;
            answered[index] = 1;
            if(answered[0] == 1 && answered[1] == 1 && answered[2] == 1 && answered[3] == 1 && answered[4] == 1 && answered[5] == 1 && answered[6] == 1 && answered[7] != 1) {
                lastbtn.disabled = false;
            }
            //answered をjsonに変換してlocalStorageに保存
            localStorage.setItem("answered", JSON.stringify(answered));
        }
    });
    
}

function submit_lastans() {
    if(alreadysbumit == false){
        fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`group_num=${getgroupnum()}`)
        })
            .then((response) => {
                response.text().then((text) => {
                    alert(text);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
        alreadysbumit = true;
        localStorage.setItem("alreadysbumit", alreadysbumit);
    }
}
var story = ["なぞなぞ（謎謎、なぞ）は、問いかけに対して、とんちを利かせた答えを要求する言葉遊びを用いたクイズである。ただし普通のクイズとは違って正解は事実に基づくものではなく、言葉の意味をこじつけた駄洒落・洒落が多い。韻を踏んでいたり、何かに見立てられたりする[1]。転じて、言葉によって婉曲的にわからせる事についてもなぞなぞという。",
"クイズ（Quiz）の英語での意味は、「（何か）質問すること」と 「知識をテストすること」 と、これらの名詞としての意味であり、日本語では後者の「知識を問う問題」の意味で使われている。出題者が既知の事実に対して質問をし、解答者がその質問に対する正解を答えるという遊び。あるいはその質問のこと。",
"パズル（英語：Puzzle）は、あらかじめ出された問題を、論理的な考察と試行錯誤によって解くことを目的とした、ゲームやクイズに似た娯楽の一種。",
"4",
"5",
"6",
"7",
"last answer is correct"];