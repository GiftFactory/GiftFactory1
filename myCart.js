'use strict';

let total=0;
let cartNum=0;
// 1. create a constructor function //

function Item(itemName,quantity,itemPrice,path) {
  this.itemName= itemName;
  this.quantity=quantity;
  this.itemPrice=itemPrice ;
  this.multiPrice= multiply(this.itemPrice,this.quantity);
  this.path=path;
  Item.array.push(this);

}


Item.array=[];
console.log(Item.array);

function getData(x){
  let customizedProduct=JSON.parse(localStorage.getItem(x));
  // console.log(customizedProduct);
  if (customizedProduct !== null){
    for (let i=0; i<customizedProduct.length;i++){
      let newInst= new Item(customizedProduct[i].giftName,customizedProduct[i].giftQty,customizedProduct[i].giftPrice,customizedProduct[i].giftpath,customizedProduct[i].id);
    }
  }

}
getData('gift2cart');

function randomData(){

  let customizedProduct=JSON.parse(localStorage.getItem('Gift'));
  if (customizedProduct !== null){
    console.log(customizedProduct);
    let newInst= new Item(customizedProduct[0],1,customizedProduct[3],customizedProduct[2]);
    console.log(newInst);}
}
randomData();



function multiply(price,number){
  return price*number;
}



// 2. create a table //

let divTable=document.getElementById('cartTable');
let table=document.createElement('table');
divTable.appendChild(table);

let tableHeader=document.createElement('thead');
table.appendChild(tableHeader);

let headerRow=document.createElement('tr');
tableHeader.appendChild(headerRow);

let firstHeader=document.createElement('th');
firstHeader.textContent='Item';
headerRow.appendChild(firstHeader);

let secondHeader=document.createElement('th');
secondHeader.textContent='Price Per Item';
headerRow.appendChild(secondHeader);


let thirdHeader=document.createElement('th');
thirdHeader.textContent='Quantity';
headerRow.appendChild(thirdHeader);

let fifthHeader=document.createElement('th');
fifthHeader.textContent='Preview';
headerRow.appendChild(fifthHeader);

let fourthHeader=document.createElement('th');
fourthHeader.textContent='Total Per Item';
headerRow.appendChild(fourthHeader);


let sixthHeader=document.createElement('th');
sixthHeader.textContent='Delete Purchase';
headerRow.appendChild(sixthHeader);

let horizontalRuler=document.createElement('hr');
table.appendChild(horizontalRuler);

let tableBody=document.createElement('tbody');
table.appendChild(tableBody);




for (let i=0; i<Item.array.length;i++){

  let newRow= document.createElement('tr');
  let newCell= document.createElement('td');
  newCell.textContent=`${Item.array[i].itemName}`;
  newRow.appendChild(newCell);
  newCell= document.createElement('td');
  newCell.textContent=`${Item.array[i].itemPrice}`;
  newRow.appendChild(newCell);


  newCell= document.createElement('td');
  newCell.setAttribute('type', 'number');
  // newCell.setAttribute('value',Item.array[i].quantity);
  // newCell.setAttribute('min',1);
  newCell.setAttribute('id','id'+[i]);
  // newCell.setAttribute('class','input');
  newCell.textContent=`${Item.array[i].quantity}`;
  newCell.nodeValue=parseInt(`${Item.array[i].quantity}`);
  newRow.appendChild(newCell);

  newCell= document.createElement('td');
  let newCellimg= document.createElement('img');
  newCellimg.src=`${Item.array[i].path}`;
  newRow.appendChild(newCell);
  newCell.appendChild(newCellimg);

  let newCell1= document.createElement('td');
  newCell1.textContent=`${Item.array[i].multiPrice}`;
  newCell1.setAttribute('id','multi'+[i+1]);
  newRow.appendChild(newCell1);

  let deleteRow= document.createElement('button');
  deleteRow.textContent='Remove Item';
  deleteRow.setAttribute('id','remove'+[i+1]);
  newRow.appendChild(deleteRow);



  tableBody.appendChild(newRow);

  let horizontalRuler=document.createElement('hr');
  tableBody.appendChild(horizontalRuler);
  horizontalRuler.setAttribute('id','hr'+[i]);

  newRow.setAttribute('id','row'+[i+1]);
  total=total+Item.array[i].multiPrice;


}

let tableFooter=document.createElement('tfoot');
table.appendChild(tableFooter);
let footerRow=document.createElement('tr');
tableFooter.appendChild(footerRow);

let totalHeader=document.createElement('th');
totalHeader.textContent='TOTAL';
footerRow.appendChild(totalHeader);
let newCell=document.createElement('td');
newCell.textContent=`${total} Jd` ;
footerRow.appendChild(newCell);

tableFooter.setAttribute('id','tfoot');
//  remove an item from table
for(let i=0;i<Item.array.length;i++){
  document.getElementById('remove'+[i+1]).addEventListener('click', handle);
}


function handle(event){
  let counterEl=document.getElementById('cartName');
  event.preventDefault();
  let imgClicked=event.target.parentElement.firstChild.textContent;

  console.log(imgClicked,event.target);
  let Index= Item.array.findIndex(function(todo,index){
    return todo.itemName===imgClicked;});

  console.log(Index);
  table.deleteRow(Index+1);
  Item.array.splice(Index,1);
  // console.log(Item.array);

  updateTotal();


  let gift2cartArray=JSON.parse(localStorage.getItem('gift2cart'));
  if(Index<gift2cartArray.length){
    gift2cartArray.splice(Index,1);
    localStorage.setItem('gift2cart',JSON.stringify(gift2cartArray));
  }
  else{
    localStorage.removeItem('Gift');
  }

  counterEl.textContent=`Cart (${Item.array.length})`;

}
console.log(Item.array);







// // update total
function updateTotal(){
  total=0;
  table.deleteRow(Item.array.length+1);
  for (let i=0;i<Item.array.length;i++){
    total=total+parseInt(Item.array[i].multiPrice);
  }
  footerRow=document.createElement('tr');
  table.appendChild(footerRow);
  totalHeader=document.createElement('th');
  totalHeader.textContent='TOTAL';
  footerRow.appendChild(totalHeader);
  newCell=document.createElement('td');
  newCell.textContent= `${total} Jd`;
  footerRow.appendChild(newCell);
}


function openForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}


let cartNumber=document.createElement('p');

function cartUpdate(){
  const cartCount= document.getElementById('cartName');
  cartNum=0;
  for (let i=1;i<=Item.array.length;i++)
    if ((parseInt(Item.array.quantity)!== 0))
    {
      cartNum++;
      cartNumber.textContent=`(${cartNum})`;
      cartCount.appendChild(cartNumber);
    }

  for (let i=0;i<Item.array.length;i++){
    console.log('remove'+[i+1]);

    if (document.getElementById('remove'+[i+1]).clicked === true)
    {
      cartNum--;
    }

    cartNumber.textContent=`(${cartNum})`;
    cartCount.appendChild(cartNumber);

  }
  cartNumber.textContent=`(${cartNum})`;
  cartCount.appendChild(cartNumber);
}
cartUpdate();




const deleteStorage=document.getElementById('black').addEventListener('click',removeStorage);
function removeStorage(){
  localStorage.clear();
  horizontalRuler.style.visibility='hidden';
}
