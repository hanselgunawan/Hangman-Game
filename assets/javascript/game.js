/**
 * Created by hansel.tritama on 8/24/17.
 */
var hangman={
    "question":["nat king cole",
                "diana krall",
                "frank sinatra",
                "jamie cullum",
                "louis armstrong",
                "stan getz"],
    "num_of_attempt":0,
    "wins": 0,
    "loses": 0,
    "incorrectGuess": [],
    "correctGuess": []
};

var question;
var html, new_html, wrongGuess_html;

function startGame()
{
    html = "";
    question = hangman.question[Math.floor(Math.random() * hangman.question.length)];
    hangman.num_of_attempt = 12;
    hangman.incorrectGuess = [];
    hangman.correctGuess = [];

    for (var i = 0; i < question.length; i++) {
        if (question.charAt(i) === " ")
        {
            hangman.correctGuess.push("&nbsp;");
        }
        else
        {
            hangman.correctGuess.push("_");
        }
    }

    for (var i = 0; i < question.length; i++) {
        html += hangman.correctGuess[i] + " ";
    }

    document.getElementById("wins-text").innerHTML = hangman.wins;
    document.getElementById("loses-text").innerHTML = question;
    document.getElementById("attempt-text").innerHTML = hangman.num_of_attempt;
    document.getElementById("letters-container").innerHTML = html;
    document.getElementById("wrongGuess").innerHTML = "";
}

function checkGuess(userGuess)
{
    new_html = "";
    wrongGuess_html = "";
    if(question.indexOf(userGuess)===-1)
    {
        for (var i = 0; i < question.length; i++) {
            new_html += hangman.correctGuess[i] + " ";
        }

        if(hangman.incorrectGuess.indexOf(userGuess) === -1)
        {
            hangman.incorrectGuess.push(userGuess);
            hangman.num_of_attempt--;
        }
        document.getElementById("attempt-text").innerHTML = hangman.num_of_attempt;

        for(var i = 0; i < hangman.incorrectGuess.length; i++)
        {
            if(i>0)
            {
                wrongGuess_html += ", " + hangman.incorrectGuess[i];
            }
            else
            {
                wrongGuess_html += hangman.incorrectGuess[i];
            }
        }
        document.getElementById("letters-container").innerHTML = new_html;
        document.getElementById("wrongGuess").innerHTML = wrongGuess_html;
    }
    else
    {
        var indices = [];
        for(var j=0; j<question.length; j++)
        {
            if(question[j]===userGuess)
            {
                indices.push(j);
            }
        }

        for(var x = 0; x < indices.length; x++)
        {
            hangman.correctGuess[indices[x]] = userGuess;
        }

        for (var i = 0; i < question.length; i++) {
            new_html += hangman.correctGuess[i] + " ";
        }

        document.getElementById("letters-container").innerHTML = new_html;
    }
}

function winOrLose() {
    if(hangman.num_of_attempt === 0)
    {
        hangman.num_of_attempt = 12;
        hangman.loses++;
        startGame();
    }
    else if(hangman.correctGuess.indexOf("_") === -1)
    {
        {
            hangman.wins++;
            startGame();
        }
    }
}

document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    checkGuess(userGuess);
    winOrLose();
};

startGame();