
 const questions = [
  {
    question: "Яка мова прогамування працює в браузері?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Що означає CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Що означає HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В якому році був створений JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

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
}

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
}

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
}

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
}

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

 function formInput(formContainer) {
  const formTemplate = `
    <div class="box">
      <form class="form" id="contact-form">
        <input class="input" type="text" name="fname" id="fname" placeholder="First Name">
        <input class="input" type="text" name="lname" id="lname" placeholder="Last Name">
        <input class="input" type="email" name="email" id="email" placeholder="Email">
        <input class="input" type="tel" name="phone" id="phone" placeholder="Phone">
        <button class="button" type="submit">Submit</button>
      </form>
    </div>
  `;
  formContainer.innerHTML = formTemplate;

  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
    "Введено неправильний формат."
  );
  const phoneInput = document.getElementById("phone");

  const iti = window.intlTelInput(phoneInput, {
    separateDialCode: true,
    initialCountry: "auto",
    preferredCountries: ["us", "gb", "ca"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js",
  });
  $(phoneInput).mask("000-000-0000");

  $("#contact-form").validate({
    rules: {
      fname: {
        required: true,
        minlength: 3,
        regex: /^[A-Za-z\s]+$/,
      },
      lname: {
        required: true,
        minlength: 3,
        regex: /^[A-Za-z\s]+$/,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        minlength: 10,
        required: true,
      },
    },
    messages: {
      fname: {
        required: "Це поле обов'язкове для заповнення",
        minlength: "Мінімум 3 символи",
        regex: "Введіть тільки літери та пробіли",
      },
      lname: {
        required: "Це поле обов'язкове для заповнення",
        minlength: "Мінімум 3 символи",
        regex: "Введіть тільки літери та пробіли",
      },
      email: {
        required: "Це поле обов'язкове для заповнення",
        email: "Введіть коректну адресу електронної пошти",
      },
      phone: {
        required: "Це поле обов'язкове для заповнення",
      },
    },
    submitHandler: function (form, e) {
      e.preventDefault();
      const fname = $("#fname").val();
      const lname = $("#lname").val();
      const email = $("#email").val();
      const phone = $("#phone").val();

      $.ajax({
        url: "/process_form.php",
        type: "POST",
        data: {
          fname: fname,
          lname: lname,
          email: email,
          phone: phone,
        },
        success: function (response) {
          alert(response.message);
          form.reset();
        },
        error: function (xhr, status, error) {
          alert("Помилка при відправці форми");
        },
      });
    },
  });
}
