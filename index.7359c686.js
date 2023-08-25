const e=[{question:"Яка мова прогамування працює в браузері?",answers:["Java","C","Python","JavaScript"],correct:4},{question:"Що означає CSS?",answers:["Central Style Sheets","Cascading Style Sheets","Cascading Simple Sheets","Cars SUVs Sailboats"],correct:2},{question:"Що означає HTML?",answers:["Hypertext Markup Language","Hypertext Markdown Language","Hyperloop Machine Language","Helicopters Terminals Motorboats Lamborginis"],correct:1},{question:"В якому році був створений JavaScript?",answers:["1996","1995","1994","все ответы неверные"],correct:2}],t=document.querySelector("#header"),n=document.querySelector("#list"),a=document.querySelector("#submit"),r=document.querySelector("#form"),l=document.querySelector("#back");let i=0,s=0;function o(){s>0&&(s--,c(),u())}function u(){let a='<h2 class="title">%title%</h2>'.replace("%title%",e[s].question);t.innerHTML=a;let r=1;for(let t of e[s].answers){let e=`
	  <li>
     <label>
	  <input value='%number%' type="radio" class="answer" name="answer" />
	  <span>%answer%</span>
     </label>
    </li>`,a=e.replace("%answer%",t);a=a.replace("%number%",r),n.innerHTML+=a,r++}}function c(){t.innerHTML="",n.innerHTML=""}c(),u(),o(),a.addEventListener("click",function(){let l=n.querySelector('input[type="radio"]:checked');if(!l){a.blur();return}let o=parseInt(l.value);o===e[s].correct&&i++,s!==e.length-1?(s++,c(),u()):(c(),function(){let n=`
    <h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>
`,l="",s="";i===e.length?(l="Вітаємо ✅",s="Ви відповіли на всі питання"):100*i/e.length>=50?(l="Хороший результат \uD83D\uDC4C",s="Ви відповіли на половину запитань"):(l="Варто постаратися ❌",s="Ви відповіли менше половини запитань");let o=`${i} з ${e.length}`,u=n.replace("%title%",l).replace("%message%",s).replace("%result%",o);t.innerHTML=u,a.blur(),a.innerHTML="Почати спочатку",a.onclick=()=>history.go(),function(e){let t=`
      <div class="box">
        <form class="form" id="contact-form">
          <input class="input" type="text" name="fname" id="fname" placeholder="First Name">
          <input class="input" type="text" name="lname" id="lname" placeholder="Last Name">
          <input class="input" type="email" name="email" id="email" placeholder="Email">
          <input class="input" type="tel" name="phone" id="phone" placeholder="Phone">
          <button class="button" type="submit">Submit</button>
        </form>
      </div>
    `;e.innerHTML=t,$.validator.addMethod("regex",function(e,t,n){return this.optional(t)||n.test(e)},"Введено неправильний формат.");let n=document.getElementById("phone");window.intlTelInput(n,{separateDialCode:!0,initialCountry:"auto",preferredCountries:["us","gb","ca"],utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js"}),$(n).mask("000-000-0000"),$("#contact-form").validate({rules:{fname:{required:!0,minlength:3,regex:/^[A-Za-z\s]+$/},lname:{required:!0,minlength:3,regex:/^[A-Za-z\s]+$/},email:{required:!0,email:!0},phone:{minlength:10,required:!0}},messages:{fname:{required:"Це поле обов'язкове для заповнення",minlength:"Мінімум 3 символи",regex:"Введіть тільки літери та пробіли"},lname:{required:"Це поле обов'язкове для заповнення",minlength:"Мінімум 3 символи",regex:"Введіть тільки літери та пробіли"},email:{required:"Це поле обов'язкове для заповнення",email:"Введіть коректну адресу електронної пошти"},phone:{required:"Це поле обов'язкове для заповнення"}},submitHandler:function(e,t){t.preventDefault();let n=$("#fname").val(),a=$("#lname").val(),r=$("#email").val(),l=$("#phone").val();$.ajax({url:"./process_form.php",type:"POST",data:{fname:n,lname:a,email:r,phone:l},success:function(t){alert(t.message),e.reset()},error:function(e,t,n){alert("Помилка при відправці форми")}})}})}(r)}())}),l.addEventListener("click",o);
//# sourceMappingURL=index.7359c686.js.map
