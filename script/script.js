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
        question: `3 + 2 + "5"`,
        options: [7, "25", "75", "NaN"],
        correctAnswer: "75"
    }
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

    // Enable the "Next" button only after an answer is selected
    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.addEventListener("change", validateSelectedAnswer);
    });
}

// Validate the user's selection
function validateSelectedAnswer() {
    let selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    let selectedAnswer = selectedOption.value; // Get the selected option value
    let question = quizData[currentQuestionIndex];
    let correctAnswer = question.correctAnswer;

    // Disable all options after selection
    let options = document.querySelectorAll('input[name="option"]');
    options.forEach(button => {
        button.disabled = false;
    });

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
        score++; // Increase score
        const options = document.querySelectorAll(".option");
    options.forEach(option => {
      option.onclick = null; // Disable click on all options
      if (option.textContent === correctAnswer) {
      } else if (option.textContent === selectedOption) {
      }
    });
    }

    // Show next question button after an answer is selected
    document.getElementById("next-btn").style.display = "block";
}

// Go to the next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        alert(`Quiz Finished! Your final score is ${score}`);
        // Reset quiz if needed
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('score').textContent = score;
        displayQuestion();
    }
}

// Initialize the first question
displayQuestion();

// Add event listener for next question button to go to the next question
document.getElementById("next-btn").onclick = nextQuestion;
