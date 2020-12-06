const filtersState = {
  "hotelStars" : 1,
  "hotelPrice" :1,
  "crimesSelected" :[]
}

const startFilterComponent = () => {

  _buildFiltersSection();

}

const _buildFiltersSection = () => {
  
  let filters = _buildHotelAutocomplete();
  
  filters += _buildHotelStarsFilter();

  filters += _buildHotelPriceFilters();

  filters += _buildCrimesFilter(getCrimesTypologies());

  filters += _buildInspectorMode();
  
  $('#filters_placeholder').html(filters);
}

// Returns the html for the autocomplete of the hotels
const _buildHotelAutocomplete = () => {
     
  let autocompleteHtml = '<div class="col-12 pb-3">';
  autocompleteHtml += '   <form autocomplete="off">';
  autocompleteHtml += '    <div class="autocomplete" style="width:150px;">';
  autocompleteHtml += '     <input id="myInput" type="text" name="myHotel" placeholder="Cerca hotel">';
  autocompleteHtml += '    </div>';
  autocompleteHtml += '    <button type="button" onClick="goToHotels()">Search</button>';
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

const _buildHotelPriceFilters = () => {
 
  let prices = ["fino a 20$", "from 20$ to 50$", "da 50$ a 100$", "più di 100$"];
 let html = '<div class="col-12 form-group pb-3">';

 html += '     <label for="filter_hotel_price">Prezzo</label>';
 html += '     <select id="filter_hotel_price" class="form-control" onChange="_updateFilters()">';

  for(let i = 0; i < 4; i++){
    
    html += '       <option value="'+[i]+'">'+ prices[i]+'</option>';
  }
  
  html += '     </select>';

  html += '   </div>';
  return html;
return html;
}

/**
 * Returns the html for the crimes filter typologies
 * @param {*} crimes : an array of the crimes typologies
 */
// crimes è l'array di crimini senza duplicati(vedi funzione getCrimesTypologies)
const _buildCrimesFilter = (crimes) => {
     

  let html = '<div class="col-12 form-group pb-3">';

  html += '     <label for="filter_crime_type">Tipologia di crimine</label>';
  html += '     <select multiple id="filter_crime_type" class="form-control" onChange="_updateFilters()">';

  for(let i = 0; i < crimes.length; i++){
    
    html += '       <option value="'+crimes[i]+'">'+crimes[i]+'</option>';
  }
  
  html += '     </select>';

  html += '   </div>';
  return html;
}

const _buildInspectorMode = () => {

  let inspectorButton = '<div class="col-12 pb-3">';
  inspectorButton += '    <button type="button" onClick="startInspectionMode()">Ispeziona</button>';
  inspectorButton += '   </div>';

  return inspectorButton;
}

const _updateFilters = () => {

  // Takes the current value for the input with the #id
  let newHotelStars = $('#filter_hotel_stars').val();
  let newHotelPrice = $('#filter_hotel_price').val();
  let newCrimesTypologies = $('#filter_crime_type').val();

  // Set attributes into the component state
  filtersState.hotelStars = newHotelStars;
  filtersState.hotelPrice = newHotelPrice;
  filtersState.crimesSelected = newCrimesTypologies;

  updateMap(filtersState);
}