const submit = document.getElementById('submit');
const APP_SCRIPT = "https://script.google.com/macros/s/AKfycbw6pd0azvYdTyzwXwQ4I6kEo0aJdWb4h8-swNRDm4MftHecxOxW3VaRC77V5D6YFjVc/exec";
const cake = document.getElementById('cake');
const confirmedWish = document.getElementById('confirmed-wish');
const wish = document.getElementById('wish');
const edit = document.getElementById('edit');
const blow = document.getElementById('blow');
const congrats = document.getElementById('congrats');
const countGift = document.getElementById('count-gift');
const gifts = document.getElementsByClassName('gift');
const bgm = document.getElementById('bgm');
const tada = document.getElementById('tada');
const win = document.getElementById('win');
const applause = document.getElementById('applause');
const congrats2 = document.getElementById('congrats-2');
const presents = document.getElementById('presents');

let count = 0;
let play = false;

async function sendWish(e) {
    e.preventDefault();
    const message = wish.value;
    if (!message) {
        alert("You haven't made any wish!");
        return;
    }
    confirmedWish.style.display = 'block';
    wish.style.display = 'none';
    edit.style.display = 'block';
    submit.style.display = 'none';
    confirmedWish.innerHTML = message;
    fetch(APP_SCRIPT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ message })
    })
        .then(res => console.log(res.text()))
        .catch(err => console.error("Error:", err));
}

const handleEdit = () => {
    edit.style.display = 'none';
    submit.style.display = 'block';
    confirmedWish.style.display = 'none';
    wish.style.display = 'block';
};


const changeCake = () => {
    const message = wish.value;
    if (!message) {
        alert("You haven't made any wish!");
        return;
    }
    cake.src = '/public/svg/cake.svg';
    cake.removeEventListener('click', changeCake);
    cake.style.removeProperty('cursor');
    confetti();
    blow.style.display = 'none';
    edit.style.display = 'none';
    submit.style.display = 'none';
    congrats.style.display = 'block';
    confirmedWish.style.display = 'block';
    wish.style.display = 'none';
    confirmedWish.innerHTML = message;
    tada.play();
    presents.style.display = 'block';
};

const order = Math.random() > 0.5 ? ['card', 'panda'] : ['panda', 'card'];

function confettiAtElement(element) {
    const rect = element.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({ origin: { x, y } });
}

function openGift(e) {
    switch (count) {
        case 0:
            e.target.src = `/public/svg/${order[0]}.svg`;
            win.play();
            confettiAtElement(e.target);
            break;
        case 1:
            e.target.src = 'public/svg/rolling-eyes.svg';
            break;
        case 2:
            e.target.src = `/public/svg/${order[1]}.svg`;
            applause.play();
            confettiAtElement(e.target);
            congrats2.style.display = 'block';
    }
    if (count < 3) count++;
    countGift.innerHTML = `Attempt ${count}/3`;
    e.target.removeEventListener('click', openGift);
}
wish.addEventListener('click', () => {
    if (!play) bgm.play();
});
submit.addEventListener('click', sendWish);
cake.addEventListener('click', changeCake);
blow.addEventListener('click', changeCake);
edit.addEventListener('click', handleEdit);
Array.from(gifts).forEach(gift => {
    gift.addEventListener('click', openGift);
});