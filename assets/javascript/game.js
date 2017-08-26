/**
 * Created by hansel.tritama on 8/24/17.
 */
var question,
    image,
    song_title,
    question_num,
    song,
    html,
    new_html,
    wrongGuess_html,
    i, j, k,
    hangman= {
        "question": ["nat king cole",
            "diana krall",
            "frank sinatra",
            "jamie cullum",
            "louis armstrong",
            "stan getz"],
        "song_title": ["smile",
            "love letter",
            "my way",
            "twentysomething",
            "dream a little dream of me",
            "the girl from ipanema"],
        "image": ["assets/images/nat-king-cole.jpg",
            "assets/images/diana-krall.jpg",
            "assets/images/frank-sinatra.jpg",
            "assets/images/jamie-cullum.jpg",
            "assets/images/louis-armstrong.jpg",
            "assets/images/stan-getz.jpg"],
        "song": ["https://www.youtube.com/embed/UN8oLGBNXpE?ecver=1&rel=0&autoplay=1",
            "https://www.youtube.com/embed/jVkHoEhANvk?ecver=1&rel=0&autoplay=1",
            "https://www.youtube.com/embed/6E2hYDIFDIU?ecver=1&rel=0&autoplay=1",
            "https://www.youtube.com/embed/aFIjSY0amtc?ecver=1&rel=0&autoplay=1",
            "https://www.youtube.com/embed/R-xzfwDAn1I?ecver=1&rel=0&autoplay=1",
            "https://www.youtube.com/embed/9KpIV57PSeo?ecver=1&rel=0&autoplay=1"],
        "num_of_attempt": 0,
        "wins": 0,
        "loses": 0,
        "incorrectGuess": [],
        "correctGuess": [],

        startGame: function () {
            html = "";
            question_num = Math.floor(Math.random() * this.question.length);
            question = this.question[question_num];

            this.num_of_attempt = 12;
            this.incorrectGuess = [];
            this.correctGuess = [];

            //copy the question to the new array, correctGuess
            //if its a space (" "), push &nbsp to give a space between underscores ( _ )
            for (i = 0; i < question.length; i++) {
                if (question.charAt(i) === " ") {
                    this.correctGuess.push("&nbsp;");
                }
                else {
                    this.correctGuess.push("_");
                }
            }

            //store that new array to a string, which is = html
            for (i = 0; i < question.length; i++) {
                html += this.correctGuess[i] + " ";
            }

            document.getElementById("wins-text").innerHTML = this.wins;
            document.getElementById("loses-text").innerHTML = this.loses;
            document.getElementById("attempt-text").innerHTML = this.num_of_attempt;
            document.getElementById("letters-container").innerHTML = html;
            document.getElementById("wrongGuess").innerHTML = "";
        },

        checkGuess:function (userGuess) {
            new_html = "";
            wrongGuess_html = "";

            //if the keystroke that user inputs is NOT found
            if(question.indexOf(userGuess)===-1)
            {
                //to keep track the correctGuess array
                for (i = 0; i < question.length; i++) {
                    new_html += this.correctGuess[i] + " ";
                }

                //store the wrong guess to an array = incorrectGuess
                //if its there, don't push it
                if(this.incorrectGuess.indexOf(userGuess) === -1)
                {
                    this.incorrectGuess.push(userGuess);
                    this.num_of_attempt--;
                }
                document.getElementById("attempt-text").innerHTML = this.num_of_attempt;

                for(i = 0; i < this.incorrectGuess.length; i++)
                {
                    if(i>0)
                    {
                        wrongGuess_html += ", " + this.incorrectGuess[i];
                    }
                    else
                    {
                        wrongGuess_html += this.incorrectGuess[i];
                    }
                }
                document.getElementById("letters-container").innerHTML = new_html;
                document.getElementById("wrongGuess").innerHTML = wrongGuess_html;
                document.getElementById("wrongGuess").style.marginTop = "-15px";
            }
            else
            {
                var indices = [];

                //get the index of the letter that user input
                for(j=0; j<question.length; j++)
                {
                    if(question[j]===userGuess)
                    {
                        indices.push(j);
                    }
                }

                //change _ to the letter that user input
                for(k = 0; k < indices.length; k++)
                {
                    this.correctGuess[indices[k]] = userGuess;
                }

                //update underscores string
                for (i = 0; i < question.length; i++) {
                    new_html += this.correctGuess[i] + " ";
                }

                document.getElementById("letters-container").innerHTML = new_html;
            }
        },

        winOrLose:function () {
            if(this.num_of_attempt === 0)
            {
                this.num_of_attempt = 12;
                this.loses++;
                this.startGame();
            }
            else if(this.correctGuess.indexOf("_") === -1)
            {
                {
                    image = this.image[question_num];
                    song = this.song[question_num];
                    song_title = this.song_title[question_num];
                    document.getElementById("singer-name").innerHTML = question;
                    document.getElementById("song-title").innerHTML = song_title;
                    document.getElementById("song-image").src = image;
                    document.getElementById("play-song").src = song;
                    this.wins++;
                    this.startGame();
                }
            }
        }
    };

document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    hangman.checkGuess(userGuess);
    hangman.winOrLose();
};

hangman.startGame();