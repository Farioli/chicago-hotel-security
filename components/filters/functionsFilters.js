

const filtersState = {
  "hotelStars" : 1,
}

const startFilterComponent = () => {

  _buildFiltersSection();


  //                           <!--Filtro seleziona per prezzo-->
  //                           <div class="dropdown">
  //                               <button onclick="myFunctionPrice()" class="dropbtn">Prezzo</button>
  //                               <div id="filterPrice" class="dropdown-content">
  //                                   <a href="#"> fino a 20$ </a>
  //                                   <a href="#"> meno di 50$</a>
  //                                   <a href="#"> 50-100$ </a>
  //                                   <a href="#"> più di 100$ </a>
  //                               </div>

  //                           </div>
}

const _buildFiltersSection = () => {
  
  let filters = _buildHotelAutocomplete();
  
  filters += _buildHotelStarsFilter();

  filters += _buildCrimesFilter(getCrimesTypologies());
  
  $('#filters_placeholder').html(filters);
}

// Returns the html for the autocomplete of the hotels
const _buildHotelAutocomplete = () => {
     
  let autocompleteHtml = '<div class="col-12 pb-3">';
  autocompleteHtml += '   <form autocomplete="off" action="/action_page.php">';
  autocompleteHtml += '    <div class="autocomplete" style="width:150px;">';
  autocompleteHtml += '     <input id="myInput" type="text" name="myHotel" placeholder="Cerca hotel">';
  autocompleteHtml += '    </div>';
  autocompleteHtml += '    <input type="submit">';
  autocompleteHtml += '   </form>';
  autocompleteHtml += '   </div>';

  return autocompleteHtml;
}

const _buildHotelStarsFilter = () => {
     

  let html = '<div class="col-12 form-group pb-3">';

  html += '     <label for="filter_hotel_stars">Numero di stelle</label>';
  html += '     <select id="filter_hotel_stars" class="form-control" onChange="_updateFilters()">';

  for(let i = 1; i < 6; i++){
    
    html += '       <option value="'+i+'">'+i+'</option>';
  }
  
  html += '     </select>';

  html += '   </div>';
  return html;
}

/**
 * Returns the html for the crimes filter typologies
 * @param {*} crimesTypologies : an array of the crimes typologies
 */
const _buildCrimesFilter = (crimesTypologies) => {
     

  let html = '<div class="col-12 form-group pb-3">';

  html += '     <label for="filter_crime_type">Tipologia di crimine</label>';
  html += '     <select multiple id="filter_crime_type" class="form-control">';

  for(let i = 0; i < crimesTypologies.length; i++){
    
    html += '       <option value="'+crimesTypologies[i]+'">'+crimesTypologies[i]+'</option>';
  }
  
  html += '     </select>';

  html += '   </div>';
  return html;
}

const _updateFilters = () => {

  // Takes the current value for the input with the #id
  let newHotelStars = $('#filter_hotel_stars').val();


  // Set attributes into the component state
  filtersState.hotelStars = newHotelStars;

  console.log(filtersState);

  console.log(filtersState.hotelStars);
}