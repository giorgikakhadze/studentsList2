const name = document.getElementById("name");
const surname = document.getElementById("surname")
const age = document.getElementById("age")
const fakulteti = document.getElementById("fakulteti")
const GPA = document.getElementById("GPA");

const cardContainer = document.querySelector(".card-container")

let saveCardInfo = JSON.parse(localStorage.getItem("students")) || []


function searchStudent(){
     const searchInput = document.getElementById("searchInput").value.toLowerCase();

     cardContainer.innerHTML = ""
     for(let i = 0; i < saveCardInfo.length; i++){
          if(saveCardInfo[i].name.toLowerCase().includes(searchInput)){
               createNewCard(saveCardInfo[i])
          }
     }
}
function studentsCounter(){
     let Students = document.getElementById("Students")

   
     if(Students){
          Students.textContent = `სტუდენტების რაოდენობა:${saveCardInfo.length}`
     }
}
function GPACounter(){
     const highStudents = document.getElementById("highStudents")
     const studentsTotal = document.getElementById("studentsTotal")
     let total = 0
     let count = 0;

     for(let i = 0; i < saveCardInfo.length; i++){
          let currentGPA = saveCardInfo[i].GPA;
          if(saveCardInfo[i].GPA > 0.3){
               count++
               total += currentGPA
          }else{
               if(count > 0){
                  count--
                    total -= currentGPA
               } 
          }
     }
     highStudents.textContent = `მაღალ ქულიანი სტუდენტები:${count}`
     studentsTotal.textContent =  `ქულების ჯამი:${total}`
}
 



function createNewCard(object){
     let card = document.createElement("div");
     let text = document.createElement("div");
     let deleteBtn = document.createElement("button");
     deleteBtn.textContent = "delete"
     let editBtn = document.createElement("button");
     editBtn.textContent = "edit"
     studentsCounter()
     GPACounter()

     text.innerHTML = `<h2>სახელი: ${object.name}</h2>
                       <p>გვარი: ${object.surname}</p>
                       <p>ასაკი: ${object.age}</p>
                       <p>ფაკილტეტი: ${object.fakulteti}</p>
                       <p>ქულა: ${object.GPA}</p>`
     
     card.appendChild(text)
     card.appendChild(deleteBtn)
     card.appendChild(editBtn)
     cardContainer.appendChild(card)

     deleteBtn.onclick = () =>{
       let index = saveCardInfo.findIndex(s => s.id === object.id)
       if(index !== -1){
          saveCardInfo.splice(index, 1)
       }
       card.remove()
       localStorage.setItem("students", JSON.stringify(saveCardInfo))
       studentsCounter();
       GPACounter()
     }

     editBtn.onclick = () =>{
       if(editBtn.textContent === "edit"){
          editBtn.textContent = "save"

          text.innerHTML = `<input type="text" value="${object.name}" class="userName input">
                            <input type="text" value="${object.surname}" class="userSurName input">
                            <input type="number" value="${object.age}" class="userAge input">
                            <input type="text" value="${object.fakulteti}"class="userFakulteti input">
                            <input type="number" value="${object.GPA}" class="userGPA input">`
          }else{
          editBtn.textContent = "edit"

          let newName = card.querySelector(".userName").value
          let newSurname = card.querySelector(".userSurName").value
          let newAge = card.querySelector(".userAge").value
          let newfakulteti = card.querySelector(".userFakulteti").value
          let newGPA = card.querySelector(".userGPA").value

          let index = saveCardInfo.findIndex(s => s.id === object.id);
          if(index !== -1){
          text.innerHTML = `<h2>სახელი: ${newName}</h2>
                         <p>გვარი: ${newSurname}</p>
                       <p>ასაკი: ${newAge}</p>
                       <p>ფაკილტეტი: ${newfakulteti}</p>
                       <p>ქულა: ${newGPA}</p>`
     
          
              object.name = newName
              object.surname = newSurname
              object.age = newAge
              object.fakulteti = newfakulteti
              object.GPA = newGPA
          }
          localStorage.setItem("students", JSON.stringify(saveCardInfo))
          GPACounter()

          }
     }
}

saveCardInfo.forEach(student =>{
     createNewCard(student)
})


function createStudentList(){
     let nameInput = name.value
     let surnameInput = surname.value;
     let ageInput = Number(age.value);
     let fakultetiInput = fakulteti.value;
     let GPAInput = Number(GPA.value);

     if(nameInput === "" || surnameInput === "" || ageInput === "" || fakultetiInput === "" || GPAInput === ""){
         alert("შეავსეთ ყველა ველიუ")
         return;
     }
     if(!isNaN(nameInput) || !isNaN(surnameInput) || !isNaN(fakultetiInput)){
        alert("სახელი გვარი ან ფაკულტეტი არასწორად გიწერია");
        return;
     }
     if(isNaN(ageInput) || isNaN(GPAInput)){
       alert("ასაკი ან ქულა არასწორად წერია")
     }else{
          let studentsObject = {
               id: Date.now(),
               name: nameInput,
               surname: surnameInput,
               age: ageInput,
               fakulteti: fakultetiInput,
               GPA: GPAInput
          }

          saveCardInfo.push(studentsObject)

          createNewCard(studentsObject)

          localStorage.setItem("students", JSON.stringify(saveCardInfo))
         
     }
      
}

const showBtn = document.getElementById("showBtn")
const hiddenBtn = document.getElementById("hiddenBtn")
const container2 = document.querySelector(".container2")

showBtn.addEventListener("click", () =>{
     container2.classList.remove("containerHidden")
     container2.classList.add("containerShow")
})

hiddenBtn.addEventListener("click", () =>{
     container2.classList.add("containerHidden")
     container2.classList.remove("containerShow")
})
