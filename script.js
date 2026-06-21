const meals={
Monday:['Chole Bhature','Rice'],
Tuesday:['Rajma Chawal','Curd'],
Wednesday:['Paneer','Dal','Roti'],
Thursday:['Pasta','Salad'],
Friday:['Aloo Paratha'],
Saturday:['Noodles'],
Sunday:['Special Dinner']
};

let favorites=JSON.parse(localStorage.getItem('favorites'))||[];
let expenses=JSON.parse(localStorage.getItem('expenses'))||[];

function save(){
 localStorage.setItem('favorites',JSON.stringify(favorites));
 localStorage.setItem('expenses',JSON.stringify(expenses));
}

function renderMeals(){
 const mealList=document.getElementById('mealList');
 mealList.innerHTML='';
 for(const day in meals){
   const div=document.createElement('div');
   div.className='day';
   div.innerHTML=`<h3>${day}</h3>`+
   meals[day].map(m=>`<p>${m} <button onclick="toggleFav('${m}')">${favorites.includes(m)?'⭐':'☆'}</button></p>`).join('');
   mealList.appendChild(div);
 }
}

function toggleFav(meal){
 favorites=favorites.includes(meal)?favorites.filter(x=>x!==meal):[...favorites,meal];
 save(); renderMeals();
 if('Notification' in window){
   Notification.requestPermission().then(p=>{
     if(p==='granted' && favorites.includes(meal))
      new Notification('Favorite meal saved!',{body:meal});
   });
 }
}

function renderExpenses(){
 const body=document.getElementById('expenseBody');
 body.innerHTML='';
 expenses.forEach((e,i)=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${e.name}</td>
  <td>₹${e.amount}</td>
  <td><button class="${e.status}" onclick="toggleStatus(${i})">${e.status}</button></td>
  <td><button onclick="delExp(${i})">X</button></td>`;
  body.appendChild(tr);
 });
}

document.getElementById('addBtn').onclick=()=>{
 const n=document.getElementById('name').value.trim();
 const a=document.getElementById('amount').value;
 if(!n||!a)return;
 expenses.push({name:n,amount:a,status:'pending'});
 save(); renderExpenses();
 document.getElementById('name').value='';
 document.getElementById('amount').value='';
};

function toggleStatus(i){
 expenses[i].status=expenses[i].status==='pending'?'paid':'pending';
 save(); renderExpenses();
}
function delExp(i){
 expenses.splice(i,1);
 save(); renderExpenses();
}

renderMeals();
renderExpenses();
