import { formInput } from "./formInput/formInput";
import { questions } from "./questions/questions";

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
const formContainer = document.querySelector("#form");
const goBack = document.querySelector("#back");

let score = 0;
let questionIndex = 0;

clearPage();
showQuestions();
goBackButton();

submitBtn.addEventListener("click", checkAnswer);
goBack.addEventListener("click", goBackButton);

function goBackButton() {
  if (questionIndex > 0) {
    questionIndex--;
    clearPage();
    showQuestions();
  }
};

function showQuestions() {
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  let answerNumber = 1;

  for (let answerText of questions[questionIndex]["answers"]) {
    const questionsTemplate = `
	  <li>
     <label>
	  <input value='%number%' type="radio" class="answer" name="answer" />
	  <span>%answer% </span>
     </label>
    </li>`;
    let answerHtml = questionsTemplate.replace("%answer%", answerText);
    answerHtml = answerHtml.replace("%number%", answerNumber);

    listContainer.innerHTML += answerHtml;
    answerNumber++;
  }
};

function checkAnswer() {
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );

  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }
  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestions();
  } else {
    clearPage();
    showResults();
  }
};

function showResults() {
  const resultsTemplate = `
    <h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>
`;
  let title = "";
  let message = "";
  if (score === questions.length) {
    title = "Вітаємо ✅";
    message = "Ви відповіли на всі питання";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Хороший результат 👌";
    message = "Ви відповіли на половину запитань";
  } else {
    title = "Варто постаратися ❌";
    message = "Ви відповіли менше половини запитань";
  }
  let result = `${score} з ${questions.length}`;

  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;

  submitBtn.blur();
  submitBtn.innerHTML = "Почати спочатку";
  submitBtn.onclick = () => history.go();

  formInput(formContainer);
};

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
};





