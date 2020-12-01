
const startFilterComponent = () => {

  _buildFiltersSection();
                          

  //                       </br></br>

  //                           <!--Filtro seleziona per stelle-->
  //                           <div class="dropdown">
  //                               <button onclick="myFunctionStars()" class="dropbtn">Numero di stelle</button>
  //                               <div id="filterStars" class="dropdown-content">
  //                                   <a href="#"> 1 </a>
  //                                   <a href="#"> 2</a>
  //                                   <a href="#"> 3</a>
  //                                   <a href="#"> 4</a>
  //                                   <a href="#"> 5</a>
  //                               </div>

  //                           </div>
  //                       </br></br></br>

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
  //                       </br></br></br>

  //                           <!--Filtro seleziona per crimini-->
  //                           <div>
  //                               <button onclick="dropDown(event);" class="menu-btn" type="button">
  //                                   Tipo di crimini &#9013;
  //                               </button>
  //                               <div class="d-none shadow rounded menu">
  //                                   <span class="d-block menu-option"><label><input type="checkbox">&nbsp;
  //                                       Murder</label></span>
  //                                       <span class="d-block menu-option"><label><input type="checkbox">&nbsp;
  //                                           Sex Abuse</label></span>
  //                                           <span class="d-block menu-option"><label><input type="checkbox">&nbsp;
  //                                               Robbery</label></span>
  //                               </div>
  //                           </div>
  //                           <div class="d-none" id="overlay" onclick="hide(event)"></div>
  //                   </div>
}

const _buildFiltersSection = () => {
  
  let filters = _buildHotelAutocomplete();
  $('#filters').html(filters);
}

// Returns the html for the autocomplete of the hotels
const _buildHotelAutocomplete = () => {
     
  let autocompleteHtml = '<div class="col-12">';
  autocompleteHtml += '   <form autocomplete="off" action="/action_page.php">';
  autocompleteHtml += '    <div class="autocomplete" style="width:150px;">';
  autocompleteHtml += '     <input id="myInput" type="text" name="myHotel" placeholder="Cerca hotel">';
  autocompleteHtml += '    </div>';
  autocompleteHtml += '    <input type="submit">';
  autocompleteHtml += '   </form>';
  autocompleteHtml += '   </div>';

  return autocompleteHtml;
}