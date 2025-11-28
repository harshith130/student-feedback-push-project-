const menuEl = document.getElementById('menu-list');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');

let MENU = [];

async function loadMenu(){
  try{
    const res = await fetch('menu.json');
    MENU = await res.json();
  }catch(e){
    console.error('Could not load menu.json, using fallback', e);
    MENU = [];
  }
  populateCategories();
  renderMenu(MENU);
}

function populateCategories(){
  const cats = Array.from(new Set(MENU.map(i=>i.category))).sort();
  cats.forEach(cat=>{
    const opt = document.createElement('option');
    opt.value = cat; opt.textContent = cat;
    categoryEl.appendChild(opt);
  });
}

function renderMenu(items){
  menuEl.innerHTML = '';
  if(items.length===0){
    menuEl.innerHTML = '<p style="padding:20px;color:#6b7280">No items found.</p>';
    return;
  }
  items.forEach(it=>{
    const card = document.createElement('article');
    card.className = 'menu-card';

    const titleRow = document.createElement('div');
    titleRow.className = 'meta';
    const h3 = document.createElement('h3'); h3.textContent = it.name;
    const price = document.createElement('div'); price.className='price'; price.textContent = `$${it.price.toFixed(2)}`;
    titleRow.appendChild(h3); titleRow.appendChild(price);

    const desc = document.createElement('p'); desc.textContent = it.description;
    const cat = document.createElement('small'); cat.style.color='#9ca3af'; cat.textContent = it.category;

    card.appendChild(titleRow);
    card.appendChild(desc);
    card.appendChild(cat);
    menuEl.appendChild(card);
  });
}

function applyFilters(){
  const q = searchEl.value.trim().toLowerCase();
  const cat = categoryEl.value;
  const filtered = MENU.filter(i=>{
    const matchesCat = cat==='all' || i.category===cat;
    const matchesSearch = q==='' || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });
  renderMenu(filtered);
}

searchEl.addEventListener('input', () => applyFilters());
categoryEl.addEventListener('change', () => applyFilters());

loadMenu();
