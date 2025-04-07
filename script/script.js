let quizData = [
    {
        question: "Which tag is used to define a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<button>"],
        correctAnswer: "<a>"
    },
    {
        question: "What is the correct HTML element for inserting an image?",
        options: ["<img>", "<src>", "<image>", "<pic>"],
        correctAnswer: "<img>"
    },
    {
        question: "Which CSS property is used to change the font of an element?",
        options: ["font-style", "font-family", "font-size", "text-font"],
        correctAnswer: "font-family"
    },
    {
        question: "Which method is used to write text to the console in JavaScript?",
        options: ["console.write()", "console.log()", "log.console()", "write.console()"],
        correctAnswer: "console.log()"
    },
    {
        question: `3 + 4 + "5"`,
        options: [7, "25", "75", "NaN"],
        correctAnswer: "75"
    },
    {
        question: "What property is used to change the background color of an element in CSS?",
        options: ["bg-color", "bg-color", "color", "background-color"],
        correctAnswer: "color"
    },
    {
        question: "Which attribute is used to provide alternative text for an image in HTML?",
        options: ["image-text", "src", "alt", "title"],
        correctAnswer: "alt"
    },
    {
        question: "Which tag is used to define a table in HTML?",
        options: ["<thead>", "<td>", "<tr>", "<table>"],
        correctAnswer: "<table>"
    },
    {
        question: "Which property is used to center text within an element in CSS?",
        options: ["center-align: true;", "text-align: center;", "text-center: true;", "align-text: center;"],
        correctAnswer: "text-align: center;"
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: ["var x = 10;", "let x = 10;", "const x = 10;", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "Which tag is used to define an unordered list?",
        options: ["<li>", "<ul>", "<list>", "<ol>"],
        correctAnswer: "<ul>"
    },
   
];

let currentQuestionIndex = 0;
let score = 0;

// Display the current question and options
function displayQuestion() {
    let question = quizData[currentQuestionIndex];
    document.getElementById("question-container").textContent = question.question;

    let optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ''; // Clear previous options

    // Display the options as radio buttons
    question.options.forEach((option, index) => {
        let optionWrapper = document.createElement("div");

        // Create radio button
        let radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "option"; // All options have the same name so that only one can be selected
        radioButton.id = `option-${index}`;
        radioButton.value = option;

        // Create label for the radio button
        let label = document.createElement("label");
        label.setAttribute("for", radioButton.id);
        label.textContent = option;

        // Append radio button and label to the wrapper
        optionWrapper.appendChild(radioButton);
        optionWrapper.appendChild(label);

        // Add to options container
        optionsContainer.appendChild(optionWrapper);
        
    });

    // Hide the next button until an answer is selected
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("previous-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";

    // Enable the "Next" button only after an answer is selected
    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.addEventListener("change", validateSelectedAnswer);
    });
}

function validateSelectedAnswer() {
    let selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    let selectedAnswer = selectedOption.value;
    let correctAnswer = quizData[currentQuestionIndex].correctAnswer;

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
        score++; // Increase score
    }

    // Disable all options after selection
    let options = document.querySelectorAll('input[name="option"]');
    options.forEach(button => {
        button.disabled = true;
    });

    // Show next & previous buttons
    document.getElementById("next-btn").style.display = "block";
    document.getElementById("previous-btn").style.display = "block";
}
    
    


// Go to the previous question


function previousQuestion() {
    currentQuestionIndex--;

    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        // Quiz is over, show the score
        showScore();
        document.getElementById("submit-btn").style.display = "none";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("previous-btn").style.display = "none";
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        // Quiz is over, show the score
        document.getElementById("submit-btn").style.display = "block";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("previous-btn").style.display = "none";
    }
}




function showScore() {
    let result = document.getElementById("result");
    result.textContent = `You scored ${score} out of ${quizData.length}`;
    result.style.display = "block"; // Make sure it's visible
    document.getElementById("question-container").style.display = "none";
    document.getElementById("options-container").style.display = "none";
}



function submit() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("options-container").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("previous-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    showScore();
}



// Initialize the first question
displayQuestion();

// Add event listener for next question button to go to the next question
document.getElementById("next-btn").onclick = nextQuestion;
document.getElementById("previous-btn").onclick = previousQuestion
