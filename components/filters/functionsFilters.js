const filtersState = {
  "hotelStars": 1,
  "hotelPrice": 1,
  "crimesSelected": []
}

const startFilterComponent = () => {

  _buildFiltersSection();
  $('#inspection_section').hide();
}

const _buildFiltersSection = () => {

  let filters = _buildHotelAutocomplete();

  filters += _buildHotelStarsFilter();

  filters += _buildHotelPriceFilters();

  filters += _buildCrimesFilter(getCrimesTypologies());

  filters += _buildButtonReset();

  filters += _buildInspectorMode();



  $('#filters_placeholder').html(filters);
  $('#filters_reset').hide();
  $('#reset_inspect_section').hide();
}

// Returns the html for the autocomplete of the hotels
const _buildHotelAutocomplete = () => {

  let autocompleteHtml = '<div class="col-9 pb-3">';
  autocompleteHtml += '   <form autocomplete="off">';
  autocompleteHtml += '    <div class="autocomplete" style="width:280px;">';
  autocompleteHtml += '     <input id="myInput" type="text" name="myHotel" placeholder="Insert hotels name">';
  autocompleteHtml += '    </div>';
  autocompleteHtml += '   </form>';
  autocompleteHtml += '   </div>';
  autocompleteHtml += '   <div class="col-3 pb-3">';
  autocompleteHtml += '     <button type="button" class="btn btn-dark" onClick="goToHotels()">Go</button>';
  autocompleteHtml += '   </div>';

  return autocompleteHtml;
}

const _buildHotelStarsFilter = () => {

  let html = '<div class="col-12 form-group pb-3">';

  html += '     <label for="filter_hotel_stars">Stars</label>';
  html += '     <select id="filter_hotel_stars" class="form-control" onChange="_updateFilters()">';

  html += '         <option value="">All</option>';

  for (let i = 1; i < 6; i++) {

    html += '       <option value="' + i + '">' + i + '</option>';
  }

  html += '     </select>';

  html += '   </div>';
  return html;
}

const _buildHotelPriceFilters = () => {

  let prices = ["below 20$", "from 20$ to 50$", "from 50$ to 100$", "over 100$"];
  let html = '<div class="col-12 form-group pb-3">';

  html += '     <label for="filter_hotel_price" >Price</label>';
  html += '     <select id="filter_hotel_price" class="form-control"  onChange="_updateFilters()">';

  html += '       <option value="">All</option>';

  for (let i = 0; i < 4; i++) {

    html += '       <option value="' + [i] + '">' + prices[i] + '</option>';
  }

  html += '     </select>';

  html += '   </div>';
  return html;
}

/**
 * Returns the html for the crimes filter typologies
 * @param {*} crimes : an array of the crimes typologies
 */
// crimes è l'array di crimini senza duplicati(vedi funzione getCrimesTypologies)
const _buildCrimesFilter = (crimes) => {


  let html = '<div class="col-12 form-group pb-3">';

  html += '     <label for="filter_crime_type">Crime Typology</label>';
  html += '     <select multiple id="filter_crime_type" class="form-control" onChange="_updateFilters()">';

  for (let i = 0; i < crimes.length; i++) {

    html += '       <option value="' + crimes[i] + '">' + crimes[i] + '</option>';
  }

  html += '     </select>';

  html += '   </div>';
  return html;
}

const _buildInspectorMode = () => {

  let inspectorButton = '<div class="col-6 form-group">';
  inspectorButton += '    <button type="button" class="btn btn-dark" onClick="startInspectionMode()">Inspects</button>';
  inspectorButton += '   </div>';
  inspectorButton += '  <div id="reset_inspect_section" class="col-6 form-group">';
  inspectorButton += '    <button type="button" class="btn btn-danger" onClick="resetInspectMode()">Cancel</button>';
  inspectorButton += '   </div>';
  inspectorButton += '   <div id="inspection_section" class="col-12 pb-3 form-group">';
  inspectorButton += '    <label for="inspection_range" style="background-color:lightgray;">Range (m)</label>'
  inspectorButton += '    <input id="inspection_range" type="number" onClick="startInspectionMode()" min="1"/>';
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

  if (newHotelStars != null || newHotelPrice != null || newCrimesTypologies.length > 1) {
    $('#filters_reset').show(1000);
  } else {
    $('#filters_reset').hide();
  }

  updateMap(filtersState);
}

const _buildButtonReset = () => {

  let html = '<div id="filters_reset" class="col-12 form-group pb-3">';
  html += '     <button type="button" class ="btn" style="background-color:#f400a1" onClick="window.location.reload();">Reset Filters</button>';
  html += '   </div>';
  return html;
}
