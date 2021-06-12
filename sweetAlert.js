let userNameChoosed = "Guest";
let ans = localStorage.getItem('USERNAME');
const inputValue = generateName();
while (JSON.parse(ans).includes(inputValue)) {
    inputValue = generateName();
}
async function x() {
    let obj = await Swal.fire({
        title: 'UserName',
        input: 'text',
        inputLabel: `A Random UserName Has Been Given ,
         If You Wish To Change It You Can...`,
        inputValue: inputValue,
        // < iframe src="https://giphy.com/embed/QXgbbBwVGDSE20Aeol" width="480" height="480" frameBorder="0" class= "giphy-embed" allowFullScreen></iframe > <p><a href="https://giphy.com/gifs/pikaole-ananas-pineapple-nana-QXgbbBwVGDSE20Aeol">via GIPHY</a></p>
        backdrop: `
            rgba(0,123,255,0.7)
        `,
        inputPlaceholder: 'Enter your username',
        allowOutsideClick: false,
        confirmButtonText: 'Look up',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
            else if (ans != null && JSON.parse(ans).includes(value)) {
                return 'UserName already taken..'
            }
            else {
                userNameChoosed = value.trim();
                localStorage.setItem('userNameChoosed', userNameChoosed);
                let timerInterval;
                Swal.fire({
                    title: `Ninja ${userNameChoosed}!!!!`,
                    html: `Get Ready , Assembling Battleground......`,
                    backdrop: `
            rgba(0,123,255,0.7)
        `,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            const content = Swal.getHtmlContainer()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                }
                            }
                        }, 10)
                    },
                    willClose: () => {
                        window.location.href = "http://127.0.0.1:5500/pab%20hackathon%202/activity/game.html";
                        clearInterval(timerInterval)
                    }
                })
                if (ans === null) {
                    const userNames = [];
                    userNames.push(value);
                    localStorage.setItem('USERNAME', JSON.stringify(userNames));
                }
                else {
                    let userNamesSet = JSON.parse(ans);
                    userNamesSet.push(value);
                    localStorage.setItem('USERNAME', JSON.stringify(userNamesSet));
                }
            }
        }
    });
}
x();