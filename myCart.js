'use strict';

let total=0;
let cartNum=0;
// 1. create a constructor function //

function Item(itemName,quantity) {
  this.itemName= itemName;
  this.quantity=quantity;
  this.itemPrice= getRandomIntInclusive(10,20);
  this.multiPrice= multiply(this.itemPrice,this.quantity);
  this.path=`images/${itemName}.jpg`;
  Item.array.push(this);

}


Item.array=[];
console.log(Item.array);

let firstP=new Item ('rose1',3);
let secondP=new Item ('rose2',6);
let thirdP=new Item ('rose3',3);
let fourthP=new Item ('chocolatePlate',5);



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
fourthHeader.textContent='Total per Item';
headerRow.appendChild(fourthHeader);


let sixthHeader=document.createElement('th');
sixthHeader.textContent='Delete Purchase';
headerRow.appendChild(sixthHeader);


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


  newCell= document.createElement('input');
  newCell.setAttribute('type', 'number');
  newCell.setAttribute('value',Item.array[i].quantity);
  newCell.setAttribute('min',1);
  newCell.setAttribute('id','id'+[i]);
  // newCell.setAttribute('class','input');
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
  deleteRow.textContent='Remove';
  deleteRow.setAttribute('id','remove'+[i+1]);
  newRow.appendChild(deleteRow);

  tableBody.appendChild(newRow);
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
newCell.textContent= total;
footerRow.appendChild(newCell);
//  remove an item from table
for(let i=0;i<Item.array.length;i++){
  document.getElementById('remove'+[i+1]).addEventListener('click', handle);
}
// event listnere for quantity change
for(let i=0;i<Item.array.length;i++){
  document.getElementById('id'+[i]).addEventListener('change', changeQ);
}


function changeQ(event){


  let inputVal = parseInt(event.target.value);

  for(let i=0;i<Item.array.length;i++){
    if(Item.array[i].itemName===event.target.parentElement.firstChild.textContent){
      Item.array[i].quantity=inputVal;
      // console.log(Item.array);
      Item.array[i].multiPrice=Item.array[i].quantity*Item.array[i].itemPrice;

    }


    if(Item.array[i].itemName===event.target.parentElement.firstChild.textContent){
      let cleanRows=document.getElementById('multi'+[i+1]);
      cleanRows.innerHTML = 0;

      if(Item.array[i].itemName===event.target.parentElement.firstChild.textContent){
        Item.array[i].multiPrice=parseInt(event.target.value)*Item.array[i].itemPrice;
        // console.log(Item.array[i]);

        let newTot= document.getElementById('multi'+[i+1]);
        newTot.textContent=`${Item.array[i].multiPrice}`;}

    }


  }
  updateTotal();

  console.log(Item.array);
  console.log(event.target,event.target.value);


}











// cart update
let cartNumber=document.createElement('h6');
function cartUpdate(){
  const cartCount= document.getElementById('cartCount');
  cartNum=0;
  for (let i=1;i<=Item.array.length;i++){
    if ((parseInt(Item.array.quantity)!== 0))
    {
      cartNum++;

    }

  }

  cartNumber.textContent=`(${cartNum})`;
  cartCount.appendChild(cartNumber);

}
cartUpdate();




function handle(event){
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
  cartUpdate();
  console.log();

}

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
  newCell.textContent= total;
  footerRow.appendChild(newCell);
}

