/*
//仮のコード
var resetbtn = document.getElementById("reset");
resetbtn.onclick = function() {
    localStorage.clear();
}
//仮のコード終わり
*/

var group_num;

var alreadysbumit
if(localStorage.getItem("alreadysbumit") == null){
    alreadysbumit = false;
}

var groupnumindi = document.getElementById("groupnumbox").children[0];

function getgroupnum(){
    var url = location.href;
    group_num = url.split("=")[1];
    if(Number.isInteger(Number(group_num)) && 0<=group_num && group_num<=29){
        localStorage.setItem("group_num", group_num);
    }else{
        if(localStorage.getItem("group_num")!=null){
            group_num = localStorage.getItem("group_num");
        }else{
            alert("URLが不正です。もう一度QRコードを読み取ってください。");
            group_num = "ERROR";
        }
    }
    groupnumindi.innerHTML = group_num+"班";
    return group_num;
}

var answered = [0,0,0,0,0,0,0,0]

var expbtn = document.getElementById("explanation");

expbtn.onclick = function() {
    if(!comparedate()){
        url = "./answer.html"
        window.open(url, '_blank')
    }
}

window.onload = function() {
    //answered をjsonから取得
    var oldanswered = JSON.parse(localStorage.getItem("answered"));
    if(oldanswered != null){
        answered = oldanswered;
        update(answered);
    }
    getgroupnum();
    if(comparedate()){
        expbtn.style.display = "none";
    }else{
        expbtn.style.display = "block";
    }
}
const api_url = "https://script.google.com/macros/s/AKfycbwwNAqCvrzX1hcq9QLoZeBkrWo3tgG72oPAG8K1zdUDL6VE_mQCtZgNuKjNW107tEdi/exec";

// モーダル要素を取得
var modal = document.getElementById("myModal");

// ストーリーモーダル要素を取得
var storymodal = document.getElementById("storyModal");

// 「解答する」ボタン要素を取得
var ansbtns = document.querySelectorAll('.openAnswer')

// 「ストーリー」ボタン要素を取得
var storybtns = document.querySelectorAll('.openStory')

// <span>要素を取得 (モーダルを閉じるためのxボタン)
var span = document.getElementsByClassName("close");

// ボックス要素を取得
var menubox = document.querySelectorAll(".menu-box");

// 「解答する」「ストーリーを見る」ボタン要素を取得
var boxmsg = document.querySelectorAll(".box-content");

var btnbox = document.querySelectorAll(".button-box");

// boxをクリックしたときのイベントリスナーを設定
menubox.forEach(function(btn, index) {
    // 各要素にクリックイベントリスナを追加
    if(index < 7){
        btn.addEventListener('click', function() {
            if(answered[index] == 0){
                modal.classList.add("show");
                now_index = index;
            }else{
                storymodal.classList.add("show");
                storymodal.scrollTop = 0;
                now_index = index;
                document.getElementById("storybox").innerHTML = story[now_index];
            }
        });
    }
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
    if(password == correctanswer[now_index]) {
        document.getElementById("storybox").innerHTML = story[now_index];
        answered[now_index] = 1;
        update(answered);
        correct_telling.classList.add("correct");
        correct_telling.classList.remove("incorrect");
        storymodal.classList.add("show");
        correct_telling.innerHTML = "正解！！";
        correct_telling.style.display = "block";
        storymodal.scrollTop = 0;
        if(answered[0] == 1 && answered[1] == 1 && answered[2] == 1 && answered[3] == 1 && answered[4] == 1 && answered[5] == 1 && answered[6] == 1 && answered[7] == 1) {
            submit_lastans();
        }
    }else{
        document.getElementById("storybox").innerHTML = "もう一度考えてみよう！";
        storymodal.classList.add("show");
        correct_telling.classList.remove("correct");
        correct_telling.classList.add("incorrect");
        correct_telling.innerHTML = "不正解";
        correct_telling.style.display = "block";
        storymodal.scrollTop = 0;
    }
    
    document.getElementById("passwordInput").value = ""; // 入力欄をリセット
}

function update(anss){
    anss.forEach(function(ans, index) {
        if(ans){
            menubox[index].classList.add("menu-box-correct");
            menubox[index].classList.remove("menu-box");
            boxmsg[index].innerHTML = "ストーリーを見る";
            var img = document.createElement("img");
            img.src = "sumi.svg";
            img.classList.add("sumi");
            img.width = 100;
            boxmsg[index].appendChild(img);
            boxmsg[index].classList.add("box-content-correct");
            btnbox[index].classList.remove("button-box-before");
            answered[index] = 1;
            if(answered[0] == 1 && answered[1] == 1 && answered[2] == 1 && answered[3] == 1 && answered[4] == 1 && answered[5] == 1 && answered[6] == 1 && answered[7] != 1) {
                btnbox[7].classList.add("button-box-before");
                menubox[7].addEventListener('click', function() {
                    if(answered[7] == 0){
                        modal.classList.add("show");
                        now_index = 7;
                    }else{
                        storymodal.classList.add("show");
                        storymodal.scrollTop = 0;
                        now_index = 7;
                        document.getElementById("storybox").innerHTML = story[now_index];
                    }
                });
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



var correctanswer = ["えいごか", "いくほうかん", "たてしな", "きょういく", "とうきょうどーむ", "そうがんきょう", "むしとりあみ" , "じたきょうえい"];

var story = ["附属小学校の中を探していたら、英語科(えいごか)準備室で先生の手伝いをしている嘉納治五郎を見つけたよ！でも、すぐに逃げられちゃった……次の場所を探しに行こう。",
"附属中学校の中を探していたら、育鳳館(いくほうかん)で桐陰会歌の練習をしている嘉納治五郎を見つけたよ！でも、すぐに逃げられちゃった……次の場所を探しに行こう。",
"附属高校の中を探しても見つからないから、自然を求めて蓼科(たてしな)に来たら、登山をしている嘉納治五郎を見つけたよ！でも、流石の脚力で急いで下山して逃げちゃった……次の場所を探しに行こう。",
"学校周辺を探していたら、教育(きょういく)の森公園で手持ち花火を楽しんでいる嘉納治五郎を見つけたよ！でも、すぐにゴミを片付けて撤収してしまった……次の場所を探しに行こう。",
"文京区内を探していたら、東京ドーム(とうきょうどーむ)で野球を観戦している嘉納治五郎を見つけたよ！でも、すぐに逃げられちゃった……このままだと捕まえられないから、ここで何か使えそうなアイテムを探そう。",
"双眼鏡(そうがんきょう)が売られていた！買って覗いてみると、逃げている嘉納治五郎を見つけたぞ！彼はこちらの存在に気付いていない。捕まえるなら今のうちだ！",
"嘉納治五郎の自宅で見つけた書きかけの手紙を読んでいたら、隣に虫取り網(むしとりあみ)があった。これで嘉納治五郎を捕まえられるぞ！あと少しだ！",
"虫取り網で嘉納治五郎を捕まえた！嘉納治五郎は、自分が提唱した理念「精力善用・自他共栄(じたきょうえい)」を皆が忘れているんじゃないかと悲しんで肖像画から飛び出してしまったみたい。でも、皆が理念を再確認したことで、嘉納治五郎は肖像画に帰ってきてくれたよ！<br><br><span>これで謎解きは終了です。結果発表までお待ちください。</span>"];

function comparedate() {
    var now = new Date();
    var end = new Date("2024/01/07 19:30:00");
    if(now <= end){
        return true; //時間内ならtrue
    }else{
        return false; //時間外ならfalse
    }
}