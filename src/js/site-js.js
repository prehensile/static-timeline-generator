function show(el) {
  el.style.display = 'block';
  el.setAttribute('aria-hidden', false);
}

function hide(el) {
  el.style.display = 'none';
  el.setAttribute('aria-hidden', true);
}

function hideUnchecked() {
  /* Uncheck the "all" box if one of the filter boxes is unchecked */
  var allBoxes = document.querySelectorAll('input[type="checkbox"][name="filter"]');
  var checkedBoxes = document.querySelectorAll('input[type="checkbox"][name="filter"]:checked');
  if (checkedBoxes.length < allBoxes.length) {
    document.querySelector('input[type="checkbox"]#all').checked = false;
  } else {
    document.querySelector('input[type="checkbox"]#all').checked = true;
  }

  var activeFilters = [];
  checkedBoxes.forEach(function (filter) {
    activeFilters.push(filter.id);
  });

  updatePageForFilters( activeFilters );

}

function showAllEntries(){
  document.querySelectorAll('.timeline-entry').forEach((entry)=>{
    show(entry);
  });
  reflowEntries();
}

function scrollToTop(){
  window.scrollTo({
    top: 0,
    // left: window.scrollX,
    behavior: "smooth",
  });
}

function updatePageForFilters( activeFilters ){

  var entries = document.getElementsByClassName('timeline-entry');
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var categories = [];
    try {
      categories = entry.dataset.category.split(',').filter((category) => category.length > 0);
    } catch {
      // Pass
    }
    if (categories.length && !isItemInCategories(categories, activeFilters)) {
      hide(entry);
    } else {
      show(entry);
    }
  }

  reflowEntries();
  scrollToTop();
}

function checkAll() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"][name="filter"]');
  checkboxes.forEach(function (box) {
    box.checked = true;
  });
  var entries = document.getElementsByClassName('timeline-entry');
  for (var i = 0; i < entries.length; i++) {
    show(entries[i]);
  }
  reflowEntries();
}

function isItemInCategories(categories, visibleCategories) {
  return visibleCategories.some(function (id) {
    return categories.indexOf(id) >= 0;
  });
}

function reflowEntries() {
  var entries = document.querySelectorAll('.timeline-entry[aria-hidden="false"]');
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    entry.classList.remove('odd', 'even', 'first');
    if (i === 0) {
      entry.classList.add('first');
    }
    if (i % 2 === 0) {
      entry.classList.add('even');
    } else {
      entry.classList.add('odd');
    }
  }
}

function onCategorySelectorChange(){
  
  const selectedValues = Array.from(
    document.querySelector('#category-selector').selectedOptions
  ).map(({ value }) => value);

  if( selectedValues.includes("_all") ){
    showAllEntries();
  } else if( selectedValues.includes("_random") ){
    selectRandomCategory();
  } else {
    updatePageForFilters( selectedValues );
  }
}

function selectCategory( category ){
  // select option in filter dropdown
  document.querySelector('#category-selector').value = category;
  updatePageForFilters([category]);
}

function onCategoryLinkClick( e ){
  selectCategory( e.target.dataset.category );
}

function getCategories(){
  return [...document.querySelector('#category-selector').options].map(o => o.value)
}

function onDescriptionLinkClick( e ){
  const href = e.target.href;
  // catch links to categories
  if( !href.includes('#') ) return;
  const id = href.substring( href.indexOf('#') + 1 );
  if( getCategories().includes(id) ) selectCategory( id );
}

function onHeaderClick(){
  scrollToTop();
}

function onHomeClick(){
  selectCategory( "_all" );
  showAllEntries();
}

function selectRandomCategory(){
  const categories = getCategories();
  const category = categories[Math.floor(Math.random()*categories.length)];
  selectCategory( category );
}

function onload() {
  /* We have JS! */
  var root = document.documentElement;
  root.classList.remove('no-js');

  /* Listen for filter changes */
  document.querySelector('#category-selector').addEventListener('change', onCategorySelectorChange);
  document.querySelectorAll('.category-link').forEach((a)=>{
    a.addEventListener('click', onCategoryLinkClick);
  });

  document.querySelector('.timeline-filter-inner p').addEventListener('click', onHeaderClick);
  document.querySelectorAll('.timeline-description a').forEach((a)=>{
    a.addEventListener('click', onDescriptionLinkClick);
  });

  document.querySelector('#header-home').addEventListener('click', onHomeClick);

  /* Flow entries */
  reflowEntries();

  // Clean up
  document.removeEventListener('DOMContentLoaded', onload);
}

if (document.readyState != 'loading') {
  onload();
} else {
  document.addEventListener('DOMContentLoaded', onload);
}
