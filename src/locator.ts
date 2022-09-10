import {
  defaultQuery,
  enableAutocomplete,
  loadLocationsOnLoad,
  locationInput,
  searchButton,
  useMyLocation
} from "./locator/constants";
import { getLocations, getNearestLocationsByString, getUsersLocation,getLocationsfordsc } from "./locator/locations";
import { getQueryParamsFromUrl } from "./locator/utils";
import { isLoading } from "./locator/loader";
// @ts-ignore
import google from "google";


searchButton.addEventListener("click", function () {
  getNearestLocationsByString(0);
});

useMyLocation.addEventListener("click", function () {
  getUsersLocation();
});
// document.getElementById("viewMoreBtn").addEventListener("click", function () { 
// 	if(locationInput.value == ''){
// 		getLocations(0);
// 	}else{
// 		getNearestLocationsByString();
// 	}
// } , {passive: true}); 
window.addEventListener("popstate", function (e) {
  if (e.state && e.state.queryString) {
    locationInput.value = e.state.queryString;
    getNearestLocationsByString(0);
  }
});

window.addEventListener("load", function () {
  const params = getQueryParamsFromUrl();
  const queryString = params["q"] || defaultQuery;
  locationInput.value = decodeURI(queryString);
  getNearestLocationsByString(0);
});


locationInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
   getNearestLocationsByString(0);
  }
});

if (loadLocationsOnLoad) {
  getLocations(0);
}

if (enableAutocomplete) {
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("location-input"),
    {
      options: {
        //types: ["(regions)"],
        componentRestrictions: {'country': "us"}
      },
    }
  );
  autocomplete.addListener("place_changed", () => {
    if (!isLoading) {
        getNearestLocationsByString(0);
    }
  });
}

// for ascending and descending :-
$(document).on('click', '#asc', function () {
  getLocations(0);
})
$(document).on('click', '#dsc', function () {
  getLocationsfordsc();
})
// end
// for backspace data reload
locationInput.addEventListener("keyup", function (e) {
  var element = document.getElementById("viewMoreBtn");
  element.classList.add("hidden");
  if(locationInput.value.trim() ==""){
    getLocations(0);
  }
  
});

// qurey suggestion starts here

let locationInp = locationInput;


let querySearch = document.getElementById("query-search");

//var matchList = document.getElementById('result');

var searchStates = async searchText => {
  var res= await fetch('https://liveapi.yext.com/v2/accounts/me/entities?&sortBy=[{%22name%22:%22ASCENDING%22}]&filter=%7B%7D&&api_key=308d4d3f6ae747ccda5a5c0bbb8249a6&v=20200308&resolvePlaceholders=true&entityTypes=location&savedFilterIds=1193087217&limit=50');
  
  var states = await res.json();
  const searchres = states.response.entities;

  let matches = searchres.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    //const city=state.address.city;

    const res = state.name.match(regex);


    return res;

  });

  if (searchText.length === 0) {
    matches = [];

    querySearch.innerHTML = '';

  }

  outputHtml(matches);
}

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(match =>
      `<div  class="card card-body mb-1">
      <h6 class="search-name" id="${match.name}">${match.name}</h6>
   
      </div>
      `).join('');
    querySearch.innerHTML = html;
    
  }
};
$(document).on("click",".search-name",function() {

var queryid=$(this).attr('id');
$('#location-input').val(queryid);
getNearestLocationsByString(0);
// getLocations(0);
})


// $('#query-search').click(function () {
//  getLocations(0);
// });


 locationInp.addEventListener('input', () => searchStates(locationInp.value));


// $('#query-search').click(function () {
//   $("#query-search").empty();
// });