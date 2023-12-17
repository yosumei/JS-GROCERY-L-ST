// elements

const form=document.querySelector(".grocery-form");
const alert=document.querySelector(".alert");
const grocery=document.getElementById("grocery");
const submitBtn=document.querySelector(".submit-btn");
const container=document.querySelector(".grocery-container");
const list=document.querySelector(".grocery-list");
const clearBtn= document.querySelector(".clear-btn");


// düzenleme seçenekleri
let editElement; //düzenlem yapılan öğeyi temsil eder
let editFlag= false //düzenleme modunda olup olmadığını belirtir
let editID="";  //unique id


//form gönderdiliğimde addItem çağırma

form.addEventListener("submit",addItem);

// temizle düğmesine bastıktan sonra CleartITEMS fonc çalıştır

clearBtn.addEventListener("click",clearItems);

// sayfa yüklendiğinde setupitems fonc çağır

window.addEventListener("DOMContentLoaded",setupItems);



//! function

function addItem(e){
    e.preventDefault();
    const value=grocery.value; // inputun giriş değerini alma
    const id=new Date().getTime().toString();

     if(value !=="" && !editFlag){
        const element=document.createElement("article");
        let attr=document.createAttribute("data-id"); //yeni bir  veri kimliği oluşturur
        attr.value=id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML=`
        <p class="title">${value }</p>
            <div class="btn-container">
              <button class="edit-btn" type="button">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="delete-btn" type="button">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>`;
            
            
            
            const deleteBtn=element.querySelector(".delete-btn");
            deleteBtn.addEventListener("click",deleteItem);
            
            const editBtn=element.querySelector(".edit-btn");
            editBtn.addEventListener("click",editItem);



            list.appendChild(element);

//alert
displayAlert("Succesfully added","succes");

//show cont.
        container.classList.add("show-container");

        //local storage ekleme
        addToLocalStorage(id,value);
        //içeriği temizleme
        setBackToDefault();
     }else if(value !== "" && editFlag){
        editElement.innerHTML=value;
        displayAlert("changed");
        editLocalStorage(editID,value)
        setBackToDefault();
     }
}

//alert fonc
function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function(){
        alert.textContent="";
        alert.classList.remove(`alert-${action}`);

    },2000);

}

// cleaning
function setBackToDefault(){
    grocery.value=""
    editFlag=false;
    editID="";
    submitBtn.textContent="submit";
}

// cleaning fonc.
function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    // console.log(element);
    const id=element.dataset.id;  //localStorage da kullanılacak

    list.removeChild(element);

    if(list.children.length==0){
        container.classList.remove("show-container");
    }
    displayAlert("Deleted");

    removeFromLocalStorage(id); 

}


// edit fonc

function editItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling;

    grocery.value=editElement.innerHTML;
    editFlag=true;
    editID=element.dataset.id  //düzenlenen elemenin kimliği
    submitBtn.textContent="edit";


}


// delete list 
function clearItems(){
    const items=document.querySelectorAll(".grocery-item");
    if(items.length>0){
        items.forEach(function (item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("The List Cleaned")
    setBackToDefault();

}




// yerel depoya öğe ekleme
function addToLocalStorage(id,value){
const grocery={id,value};
let items=getLocalStorage();
  items.push(grocery);
localStorage.setItem("list",JSONÇ.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    :[];
}
function removeFromLocalStorage(id){
    let items=getLocalStorage();

    items=items.filter(function (item){
        if (item.id !== id){
            return item;
        }
    })
}
function editLocalStorage(id,value){

}

function setupItems(){
    let items=getLocalStorage();
}