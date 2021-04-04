'use strict';

let cateElX=document.getElementsByClassName('cate');
for(let i=0;i<cateElX.length;i++){
  cateElX[i].addEventListener('click',showItems);}
let giftItemsElX=document.getElementsByClassName('giftItems');
function showItems(event){
  let y;
  let z=giftItemsElX;
  // console.log(z);
  for(let i=0;i<z.length;i++){
    z[i].setAttribute('style',' display:none');
  }
  switch (event.target.parentElement.id){
  case 'cate1':
    y=document.getElementById('giftItems1');
    y.style.display='inline-flex';
    break;
  case 'cate2':
    y=document.getElementById('giftItems2');
    y.style.display='inline-flex';
    break;
  case 'cate3':
    y=document.getElementById('giftItems3');
    y.style.display='inline-flex';
    break;
  case 'cate4':
    y=document.getElementById('giftItems4');
    y.style.display='inline-flex';
    break;
  }
}
let yy=0;
let x=document.getElementsByClassName('giftItem');
// console.log(x[0]);
for(let i=0;i<x.length;i++){
  x[i].addEventListener('submit',btn);}
function btn (event){
  event.preventDefault();
  // debugger;
  let giftName = event.target.children[0].alt;
  let giftpath = event.target.children[0].src;
  let giftPrice =event.target.children[1].textContent;
  let giftQty = event.target.children[2].value;
  let btnAdd = event.target.children[3].value;

  if (btnAdd==='Add To Cart'){
    let giftOrder =new Gifts;
    giftOrder.giftName=giftName;
    giftOrder.giftPrice=giftPrice;
    giftOrder.giftQty=giftQty;
    giftOrder.giftpath=giftpath;
    console.log(`giftName ${giftName}\ngiftpath ${giftpath}\ngiftPrice ${giftPrice} \ngiftQty ${giftQty} \nbtnAdd ${btnAdd}`) ;
    console.log(Gifts.all);
    localStorage.setItem('gift2cart',JSON.stringify(Gifts.all));
  }
}

const Gifts = function(giftName,giftpath,giftPrice,giftQty){
  this.giftName=giftName;
  this.giftpath=giftpath;
  this.giftPrice=giftPrice;
  this.giftQty=giftQty;
  this.id =Gifts.all.length;
  Gifts.all.push(this);
};
Gifts.all=[];
