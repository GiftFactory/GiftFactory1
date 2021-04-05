'use strict';
let cartNameEl =document.getElementById('cartName');
let cateElX=document.getElementsByClassName('cate');
for(let i=0;i<cateElX.length;i++){
  cateElX[i].addEventListener('click',showItems);}
let giftItemsElX=document.getElementsByClassName('giftItems');
function showItems(event){
  let btnCateg;
  // let z=giftItemsElX;
  // // console.log(z);
  for(let i=0;i<giftItemsElX.length;i++){
    giftItemsElX[i].setAttribute('style',' display:none');
  }
  switch (event.target.parentElement.id){
  case 'cate1':
    btnCateg=document.getElementById('giftItems1');
    btnCateg.style.display='inline-flex';
    break;
  case 'cate2':
    btnCateg=document.getElementById('giftItems2');
    btnCateg.style.display='inline-flex';
    break;
  case 'cate3':
    btnCateg=document.getElementById('giftItems3');
    btnCateg.style.display='inline-flex';
    break;
  case 'cate4':
    btnCateg=document.getElementById('giftItems4');
    btnCateg.style.display='inline-flex';
    break;
  }
}
let btnAdd2Cart=document.getElementsByClassName('giftItem');

for(let i=0;i<btnAdd2Cart.length;i++){
  btnAdd2Cart[i].addEventListener('submit',btn);}
function btn (event){
  event.preventDefault();
  // debugger;
  let giftName = event.target.children[0].alt;
  let giftpath = event.target.children[0].src;
  let giftPrice =event.target.children[1].textContent;
  let giftQty = event.target.children[2].value;
  let btnAdd = event.target.children[3].value;
  let added=0;
  if (btnAdd==='Add To Cart'){
    if(Gifts.all.length>0){
      for(let i=0;i<Gifts.all.length;i++){
        if(Gifts.all[i].giftName===giftName){
          Gifts.all[i].giftQty=parseInt(Gifts.all[i].giftQty,10)+ parseInt(giftQty,10);
          added=1;
          break;}
      }
      if(added!==1){
        let giftOrder =new Gifts;
        giftOrder.giftName=giftName;
        giftOrder.giftPrice=giftPrice;
        giftOrder.giftQty=giftQty;
        giftOrder.giftpath=giftpath;
        console.log(Gifts.all,1000);}
    }
    else{
      let giftOrder =new Gifts;
      giftOrder.giftName=giftName;
      giftOrder.giftPrice=giftPrice;
      giftOrder.giftQty=giftQty;
      giftOrder.giftpath=giftpath;
      console.log(Gifts.all,1010);
    }
    localStorage.setItem('gift2cart',JSON.stringify(Gifts.all));
    cartNameEl.textContent=`Cart (${Gifts.all.length})`;
  }}


const Gifts = function(giftName,giftpath,giftPrice,giftQty){
  this.giftName=giftName;
  this.giftpath=giftpath;
  this.giftPrice=giftPrice;
  this.giftQty=giftQty;
  this.id =Gifts.all.length;
  Gifts.all.push(this);
};
Gifts.all=[];


//////////////////////////////

