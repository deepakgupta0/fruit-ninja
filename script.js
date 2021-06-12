let playing = false;
let score;
let trialsLeft = 3;
let step;
let action; //used for setInterval
let fruits = ['apple', 'banana', 'cherries', 'grapes',
    'mango', 'orange', 'bomb', 'peach', 'pear', 'watermelon'];
let isExplode = false;
$(function () {


    //setting username
    $("#uname").html("Welcome " + localStorage.getItem("userNameChoosed") + " Ninja!");
    //click on start reset button
    $("#startreset").click(function () {
        //we are playing
        if (playing == true) {
            //reload page
            location.reload();
        } else {
            //we are not playing
            playing = true; //game initiated
            //set score to 0
            score = 0; //set score to 0
            $("#scorevalue").html(score); //show trials left 
            $("#trialsLeft").show();
            // trialsLeft = 3;
            addHearts();
            //hide game over box
            $("#gameOver").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game");
            //start sending fruits
            startAction();
        }
    });

    //slice a fruit

    $("#fruit1").mouseover(function () {
        let url = $("#fruit1").attr('src');
        let src = url.split("/")[1];
        let srcName = src.split(".")[0];

        if (srcName === "bomb") {
            $("#game-end-screen").addClass("game-over");
            setTimeout(function () {
                $("#game-end-screen").removeClass("game-over");
            }, 300);
            var audio = new Audio("audio/bomb" + ".mp3");
            audio.play();
            if (trialsLeft > 1) {
                trialsLeft--;
                addHearts();
            } else {
                isExplode = true;
            }
        }
        else {
            score++;
            $("#slicesound")[0].play();//play sound
        }
        $("#scorevalue").html(score); //update score
        // document.getElementById("slicesound").play();

        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 400); //slice fruit

        //send new fruit
        setTimeout(startAction, 500);
        // startAction();
    });
    //functions
    //fill trialLeft box with hearts

    function addHearts() {
        $("#trialsLeft").empty();
        for (i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append('<img src = "images/heart.png" class= "life" > ');
        }
    }
    //start sending fruits
    function startAction() {

        //generate a fruit
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({
            'left':
                Math.round(550 * Math.random()), 'top': -50
        }); //random         position

        //generate a random step
        step = 1 + Math.round(6 * Math.random()); // change step

        // Move fruit down by one step every 10ms
        action = setInterval(function () {

            let url = $("#fruit1").attr('src');
            let src = url.split("/")[1];
            let srcName = src.split(".")[0];

            //when last life is present and bomb is exploded 
            if (isExplode == true) {
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); //change button to Start Game
                $("#gameOver").show();
                $('<p>GameOver!</p > <p>Your score is ' + score + '</p>').insertBefore(".wrapper");
                // $("#gameOver").html('<p>Game Over!</p > <p>Your score is ' + score + '</p>');
                $("#trialsLeft").hide();
                stopAction();
                $("#transparent-screen").addClass("transparent-screen");
                updateScore();
            }

            //move fruit by one step
            $("#fruit1").css('top',
                $("#fruit1").position().top + step);

            //check if the fruit is too low
            if ($("#fruit1").position().top >
                $("#fruitsContainer").height()) {

                //check if we have trials left
                if (trialsLeft > 1 || srcName == "bomb") {
                    //generate a fruit

                    $("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                    $("#fruit1").css({
                        'left':
                            Math.round(550 * Math.random()), 'top': -50
                    }); //random position
                    //generate a random step
                    step = 1 + Math.round(5 * Math.random()); //change step
                    //reduce trials by one
                    if (srcName != "bomb")
                        trialsLeft--;
                    //populate trialsLeft box
                    addHearts();
                }
                else { // game over
                    playing = false; //we are not playing anymore
                    $("#startreset").html("Start Game"); //change button to Start Game
                    $("#gameOver").show();
                    $('<p>GameOver!</p > <p>Your score is ' + score + '</p>').insertBefore(".wrapper");
                    // $("#gameOver").html('<p>Game Over!</p > <p>Your score is ' + score + '</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                    $("#transparent-screen").addClass("transparent-screen");
                    updateScore();
                }
            }
        }, 10);

    }
    // generate a random fruit
    function chooseFruit() {
        let fruitIdx = Math.floor(10 * Math.random())
        $("#fruit1").attr('src', 'images/' +
            fruits[fruitIdx] + '.png');
        console.log(fruitIdx);
    }
    //Stop dropping fruits
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }

    //update scores in localStorage
    function updateScore() {
        let userScores = [];
        let userObj = {};
        userObj.uname = localStorage.getItem("userNameChoosed");
        userObj.uscore = score;
        let userScoreFromStorage;
        let userPresent = false;
        if (localStorage.getItem("USERSCORE") != null && JSON.parse(localStorage.getItem("USERSCORE")).length > 0) {
            userScoreFromStorage = JSON.parse(localStorage.getItem("USERSCORE"));
            userScoreFromStorage.forEach(element => {
                if (element.uname == localStorage.getItem("userNameChoosed")) {
                    if (element.uscore < score) {
                        element.uscore = score;
                    }
                    userPresent = true;
                }

            });
            if (userPresent == false) {
                userScoreFromStorage.push(userObj);
            }
            localStorage.setItem("USERSCORE", JSON.stringify(userScoreFromStorage));
        }
        else {
            userScores.push(userObj);
            localStorage.setItem("USERSCORE", JSON.stringify(userScores));
        }

    }


    //restart game
    $("#reload").click(function () {
        location.reload();
    })
    //go to leaderboard
    $("#leaderboard").click(function () {
        window.location.href = "http://127.0.0.1:5500/pab%20hackathon%202/activity/leaderboard.html";
    })


});


