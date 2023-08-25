import Notiflix from 'notiflix';

export function formInput(formContainer) {
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
   const phoneInput = document.getElementById('phone');

 const iti = window.intlTelInput(phoneInput, {
   separateDialCode: true,
   initialCountry: 'auto',
   preferredCountries: ['us', 'gb', 'ca'],
   utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js'
 });
 $(phoneInput).mask('000-000-0000');
 
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
            Notiflix.Notify.warning("Помилка при відправці форми");
         },
       });
     },
   });
 }