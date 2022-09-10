import {
  formatMiOrKm,
  formatNumber,
  formatPhone,
  getValueFromPath,
} from "./utils";
import {
  parseTimeZoneUtcOffset,
  formatOpenNowString,
} from "./time";
import { i18n } from "../i18n";
import {
  base_url,
  limit,
  locationInput,
  locationNoun,
  locationNounPlural,
  locationOption,
  locationOptions,
  radius,
  savedFilterId,
  entityTypes,
  liveAPIKey,
} from "./constants";
import { getRequest, startLoading, stopLoading } from "./loader";
import RtfConverter from "@yext/rtf-converter";
import { highlightLocation } from "./map";
import { PhoneNumber } from "libphonenumber-js";
// import $ from "jquery";


export let currentLatitude = 0;
export let currentLongitude = 0;

export function locationJSONtoHTML(entityProfile, index, locationOptions) {
  const getValue = (opt: locationOption) => {
    let val = opt.value;

    if (opt.contentSource === "FIELD") {
      val = getValueFromPath(entityProfile, opt.value);
      
    }
    return opt.isRtf && !!val ? RtfConverter.toHTML(val) : val;
  };

  const cardTitleValue = getValue(locationOptions.cardTitle);
  const getDirectionsLabelValue = getValue(locationOptions.getDirectionsLabel);
  const viewDetailsLinkTextValue = getValue(
    locationOptions.viewDetailsLinkText
  );
  let cardTitleLinkUrlValue = getValue(locationOptions.cardTitleLinkUrl);
  const hoursValue = getValue(locationOptions.hours);
  const addressValue = getValue(locationOptions.address);
  const phone = getValue(locationOptions.phoneNumber);
  //  const mobilePhone = getValue(locationOptions.mobilePhoneNumber);
  //  const fax= getValue(locationOptions.faxNumber);
  const phoneNumberValue=phone.toString();
  // const mobilePhoneNumberValue=phone.toString();
  let viewDetailsLinkUrlValue = getValue(locationOptions.viewDetailsLinkUrl);

  let html =
   // '<div class="  container my-2 px-2 border-yellow-600 shadow-md rounded-lg  max-w-sm focus-within:ring-2 focus-within:ring-black">';
    '<div class="">';
    // border border-gray-300 shadow-md rounded-lg w-full px-3 py-2 flex items-center focus-within:ring-2 focus-within:ring-black
  if (cardTitleLinkUrlValue && cardTitleValue) {

    if (cardTitleLinkUrlValue["url"]) {
      cardTitleLinkUrlValue = cardTitleLinkUrlValue["url"];
          
    }
    // html += `<div class="name hover:underline hover:font-semibold text-ll-red ">
    //   <a href="${cardTitleLinkUrlValue}">
    //     ${cardTitleValue} 
    //   </a>
    // </div>`;
  } 
  else if (cardTitleValue) {
    // html += `<div class="name hover:underline hover:font-semibold text-ll-red ">
    //   ${cardTitleValue}
    // </div>`;
  }
  // html += "</div>";
  // let count_index = index+1;  
  //  html += '<div class="lp-param-results lp-subparam-getDirectionsLabel ml-6"> '+ count_index + '</div>';
  html += '<h4 class="storelocation-name text-xl font-bold  text-red-600 mb-1 pr-5">'  +  cardTitleValue + '</h4>';
  html += '<div class="address text-[14px]  text-black font-semibold mb-2 pr-5">';
  // html +='<p class="font-bold text-orange-500"></p> '+addressValue.line1 + ', ' + addressValue.city + ', ' + addressValue.region + ', ' + addressValue.postalCode + ', ' + addressValue.countryCode+'</br>';
  html += '<div class="address font-semibold">Address:</div>';
  html +='<p class="font-bold text-orange-500"> </p> '+addressValue.line1 + ', ' + addressValue.city + ', ' + addressValue.region + ', ' + addressValue.postalCode + ', ' + addressValue.countryCode+'</br>';
  // html +='<p class="font-bold text-orange-500"></p>'+addressValue.line1 +'</br>';
'</br>'
'</br>'
// html += '<div class="phone font-semibold"><span>&#128222</span> + phone + </div>';
html += '<div class="phone font-semibold"><span>&#128222</span><a href="tel:123-456-7890" id="address" class="hover:underline" href="https://www.google.com/maps/dir/?api=1&destination={{mainPhone}}" target="_blank">' + phone + " </a></div>";
// 
// html += '<div class="phone font-semibold"><span>&#128222</span>' + mobilePhone + "</div>";
//  html += '<div class="phone font-semibold">' + fax + "</div>";
// html += '<div class="phone font-semibold"><span>&#128222</span> Mobile Number:</div>';
// html += '<div class="phone">' + phone + "</div>";
// html += '<div class="phone font-semibold"> Fax Number:</div>';
// html += '<div class="phone">' + PhoneNumber + "</div>";
  // html += '<div class="phone">'+'<img src="images/icons8-phone-50.png" class= "h-6 ">' + phone + "</div>";
  html += "</div>";

'</br>'
  // html+='<a class="details text-orange-500 font-bold mb-2 pr-5 pl-10 text-sm md:pl-6 lg:pl-16" href='+cardTitleLinkUrlValue +'>see details</a>';
     if (hoursValue) {
       const offset = getValueFromPath(entityProfile, "timeZoneUtcOffset");
       const parsedOffset = parseTimeZoneUtcOffset(offset);
       html += '<div class="lp-param-results lp-subparam-hours">';
       html +=  
         '<div class="open-now-string text-left font-light mb-2 pr-5"><b class="font-bold">Status:</b>' +
         formatOpenNowString(hoursValue, parsedOffset) +
         "</div>";
     
      html += '<div class="storelocation-openCloseTime  hidden pr-5 pb-4 font-light text-left">';                      
       html += '<ul>';
      // html+='<a class="details text-orange-500 font-bold mb-2 pr-5 pl-10 text-sm md:pl-6 lg:pl-16" href='+cardTitleLinkUrlValue +'>see details</a>';

      $.each(hoursValue, function (indexh, hour) {
        function tConvert (time) {
          // Check correct time format and split into components
          time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        
          if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
          }
          return time.join (''); // return adjusted time or original string
        }
      
      html += '<li><strong class="text-7px font-bold capitalize  text-left">';
      html +=  indexh.toString();
      html += '</strong>';
        
        if(hour.openIntervals){
          $.each(hour.openIntervals, function (op, openInterval) {
           html +='<strong class="text-7px font-lightweight text-left">'+' ' +':'+' '+tConvert(openInterval.start)+''+' to '+ tConvert(openInterval.end)+'</strong>';
          });
        }else{
           html +='<strong class="text-7px font-lightweight text-left">'+ ' ' +':'+' '+'Closed' +'</strong>' ;
        }
        
      html += '</li>'; 
    });
    html += '</ul>';  
    '</br>' 
    html += "</div>";
     }
   '</br>'
  //  html+='<a class="details text-orange-500 font-bold mb-2 pr-5 pl-10 text-sm md:pl-6 lg:pl-16" href='+cardTitleLinkUrlValue +'>see details</a>';                     
  html += '<br/><a class="details text-black font-bold py-2 text-sm mb-2" href="'+cardTitleLinkUrlValue+'">See Details</a>';
//   html += '<div class="address text-[12px]  text-black font-serif mb-2 pr-5 pl-10 md:pl-6 lg:pl-16">';
//   // html +='<p class="font-bold text-orange-500"></p> '+addressValue.line1 + ', ' + addressValue.city + ', ' + addressValue.region + ', ' + addressValue.postalCode + ', ' + addressValue.countryCode+'</br>';
//   html +='<p class="font-bold text-orange-500"></p> '+addressValue.line1 +'</br>';
// '</br>'
  // if (phoneNumberValue) {
  //   const formattedPhoneNumber = formatPhone(
  //     phoneNumberValue,
  //     addressValue.countryCode
  //   );
  //   if (formattedPhoneNumber) {
  //     html += '<p class="font-bold">Contact</p><div class="phone">' + formattedPhoneNumber + "</div>";
  //   }
  // }
  // '</br>'
  // html += '<div class="phone"><span>&#128222</span> ' + phone + "</div>";
  // // html += '<div class="phone">'+'<img src="images/icons8-phone-50.png" class= "h-6 ">' + phone + "</div>";
  // html += "</div>";
  html += '<div class="lp-param-results lp-subparam-phoneNumber">';
  
  html += "</div>";

  const singleLineAddress =
    entityProfile.name +
    " " +
    addressValue.line1 +
    " " +
    (addressValue.line2 ? addressValue.line2 + " " : "") +
    addressValue.city +
    " " +
    addressValue.region +
    " " +
    addressValue.postalCode;

  html += `<div class="lp-param-results lp-subparam-getDirectionsLabel text-center">
    <button class="link text-left border-2  bg-blue-500 text-white font-bold p-1 ml-16">
    
      <a target="_blank"
        href="https://www.google.com/maps/dir/?api=1&destination=${singleLineAddress}"
      >
        ${getDirectionsLabelValue}
      </a>
    </button>
  </div>`;
  html += '<div class="lp-param-results lp-subparam-availability mt-3">';
  html += "</div>";

  // if (viewDetailsLinkUrlValue && viewDetailsLinkTextValue) {
  //   // Url value is URL object and not url.
  //   if (viewDetailsLinkUrlValue["url"]) {
  //     viewDetailsLinkUrlValue = viewDetailsLinkUrlValue["url"];
  //   }
  //   html += `<div class="lp-param-results lp-subparam-viewDetailsLinkText lp-subparam-viewDetailsLinkUrl">
  //     <div class="lp-param lp-param-viewDetailsLabel link"><strong>
  //       <a href="${viewDetailsLinkUrlValue}">
  //         ${viewDetailsLinkTextValue}
  //       </a>
  //     </strong></div>
  //   </div>`;
  // }

  // Add center column
  html = `<div class="center-column">${html}</div>`;

  // Add left and right column
  if (entityProfile.__distance) {
    html = 
    html = `<div class="left-column">
      // ${index + 1}.
    // </div>
    ${html}
    // <div class="right-column"><div class="distance">
      ${formatMiOrKm(
        entityProfile.__distance.distanceMiles,
        entityProfile.__distance.distanceKilometers
      )}
    // </div></div>`;
  }
  else{
    html = `<div class="left-column hidden absolute top-4 left-2 lg:left-4 w-5 h-8 marker-no bg-no-repeat bg-center text-center leading-[24px] text-white">
      ${index + 1}.
    </div>${html}`;
  

  return `<div id="result-${index}" class="result  list-group-item w-full border border-[#efeeeb] mb-5 relative ">${html}</div>`;
}

}
// Renders each location the the result-list-inner html
export function renderLocations(locations, append, viewMore) {
  if (!append) {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML = "";
      });
  }

  // Done separately because the el.innerHTML call overwrites the original html.
  // Need to wait until all innerHTML is set before attaching listeners.
  locations.forEach((location, index) => {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML += locationJSONtoHTML(location, index, locationOptions);
      });
  });

  locations.forEach((_, index) => {
    document
      .getElementById("result-" + index)
      .addEventListener("mouseover", () => {
        highlightLocation(index, false, false);
      });
    document.getElementById("result-" + index).addEventListener("click", () => {
      highlightLocation(index, false, true);
    });
  });

  if (viewMore) {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML +=
          '<div><div class="btn btn-link btn-block">View More</div></div>';
      });
  }
  
}

function searchDetailMessageForCityAndRegion(total) {
  if (total === 0) {
    return '0 [locationType] found near <strong>"[city], [region]"</strong>';
  } else {
    return '[formattedVisible] of [formattedTotal] [locationType] near <strong>"[city], [region]"</strong>';
  }
}

function searchDetailMessageForArea(total) {
  if (total == 0) {
    return '0 [locationType] found near <strong>"[location]"</strong>';
  } else {
    return '[formattedVisible] of [formattedTotal] [locationType] near <strong>"[location]"</strong>';
  }
}

function searchDetailMessageNoGeo(total) {
  if (total === 0) {
    return "0 [locationType]";
  } else {
    return "[formattedVisible] of [formattedTotal] [locationType]";
  }
}



// Renders details of the search
export function renderSearchDetail(geo, visible, total, queryString) {
  // x of y locations near "New York, NY"
  // x  locations near "New York, NY"
  // x  locations near "New York, NY"

  let locationType = locationNoun;
  if (total === 0 || total > 1) {
    locationType = locationNounPlural;
  }

  let formattedVisible = formatNumber(visible);
  let formattedTotal = formatNumber(total);

  let searchDetailMessage;
  if (geo) {
    if (geo.address.city !== "") {
      searchDetailMessage = searchDetailMessageForCityAndRegion(total);
      searchDetailMessage = searchDetailMessage.replace(
        "[city]",
        geo.address.city
      );
      searchDetailMessage = searchDetailMessage.replace(
        "[region]",
        geo.address.region
      );
    } else {
      let location = "";
      if (geo.address.region) {
        location = geo.address.region;
      } else if (geo.address.country && queryString) {
        location = queryString;
      } else if (geo.address.country) {
        location = geo.address.country;
      }
      if (location !== "") {
        searchDetailMessage = searchDetailMessageForArea(total);
        searchDetailMessage = searchDetailMessage.replace(
          "[location]",
          location
        );
      }
    }
  } else {
    searchDetailMessage = searchDetailMessageNoGeo(total);
  }
  searchDetailMessage = searchDetailMessage.replace(
    "[locationType]",
    locationType
  );
  searchDetailMessage = searchDetailMessage.replace(
    "[formattedVisible]",
    formattedVisible
  );
  searchDetailMessage = searchDetailMessage.replace(
    "[formattedTotal]",
    formattedTotal
  );

  [].slice
  .call(document.querySelectorAll(".search-center") || [])
  .forEach(function (el) {
    el.innerHTML = "";
   });
  [].slice
    .call(document.querySelectorAll(".search-center") || [])
    .forEach(function (el) {
      el.innerHTML = searchDetailMessage;
    });
}

// export function getNearestLocationsByString() {
//   const queryString = locationInput.value;
//   if (queryString.trim() !== "") {
    
//     var request_url = base_url + "entities/geosearch";

//     request_url += "?radius=" + radius;
//     request_url += "&location=" + queryString;
    
//     // Uncommon below to limit the number of results to diitsplay from the API request
//     // request_url += "&limit=" + limit;
//     getRequest(request_url, queryString);
//   }
//   var url = window.location.href;
//   var myStorage = window.sessionStorage;
//   sessionStorage.setItem('query', url);
// }

// find near location:-
export function getNearestLocationsByString(offset) {
  const queryString = locationInput.value;
  if (queryString.trim() !== "") {

    var request_url = base_url + "entities/geosearch";
    
    request_url += "?radius=" + radius;
    request_url += "&location=" + queryString
    var request_url =
    base_url +
    "entities" +
    "?limit=" +
    limit +
    "&offset=" +
    offset +
    '&sortBy=[{"name":"ASCENDING"}]';
  
    let filterParameters = {};
    let filterAnd = {};
    let filterOr = {}; 

    if (queryString) {
      
      filterOr = {"$or": [
          {"address.line1": {"$eq": queryString}},
          {"address.city": {"$eq": queryString}},
          {"address.region": {"$eq": queryString}},
          {"address.countryCode": {"$eq": queryString}},
          {"address.postalCode": {"$eq": queryString}}, 
          {"name": {"$eq": queryString}},
          {"mainPhone": {"$eq": queryString}}
         
        ]
      }; 
      
    }
    
    var ce_departments = [];
    $('.checkbox_departments').each(function () {              
        if ($(this).is(":checked")) {
        ce_departments.push($(this).val());
        }
    });
    
    if(ce_departments.length > 0){      
      filterAnd = {"$and":[{"c_relatedFields":{"$in": ce_departments}}]};  
    }
    
    filterParameters = {...filterOr,...filterAnd};
    var filterpar = JSON.stringify(filterParameters);
    var filter = encodeURI(filterpar);
    
    if(filter){
      request_url += "&filter=" + filter;
    }

    // true value is for pagination remove when we search any single location or (location < 10)------
  getRequest(request_url,null);
  }
  var url = window.location.href;
  var myStorage = window.sessionStorage;
  sessionStorage.setItem('query', url);
}

// Get locations by lat lng (automatically fired if the user grants acceess)
function getNearestLatLng(position) {
  [].slice
    .call(document.querySelectorAll(".error-text") || [])
    .forEach(function (el) {
      el.textContent = "";
    });
  currentLatitude = position.coords.latitude;
  currentLongitude = position.coords.longitude;
  let request_url = base_url + "entities/geosearch";
  request_url += "?radius=" + radius;
  request_url +=
    "&location=" + position.coords.latitude + ", " + position.coords.longitude;
  // request_url += "&limit=" + limit;
  getRequest(request_url, null);
}

// Gets a list of locations. Only renders if it's a complete list. This avoids a dumb looking map for accounts with a ton of locations.
export let offset = 0;
export function getLocations(offset) {
  let request_url =
    base_url +
    "entities" +
    "?limit=" +
    limit +
    "&offset=" +
    offset +
    '&sortBy=[{"name":"ASCENDING"}]';
  
    let filterParameters = {};
    let filterAnd = {};
    let filterOr = {};
    
    const queryString = locationInput.value;
     
    if (queryString) {
      
      filterOr = {"$or": [
          {"address.line1": {"$eq": queryString}},
          {"address.city": {"$eq": queryString}},
          {"address.region": {"$eq": queryString}},
          {"address.countryCode": {"$eq": queryString}},
          {"address.postalCode": {"$eq": queryString}}, 
          {"name": {"$eq": queryString}},
          {"mainPhone": {"$contains": queryString}}
        ]
      }; 
    }
    
    var ce_departments = [];
    $('.checkbox_departments').each(function () {              
        if ($(this).is(":checked")) {
        ce_departments.push($(this).val());
        }
    });
    
    if(ce_departments.length > 0){      
      filterAnd = {"$and":[{"c_relatedFields":{"$in": ce_departments}}]};
        
    }
    
    filterParameters = {...filterOr,...filterAnd};
    var filterpar = JSON.stringify(filterParameters);
    var filter = encodeURI(filterpar);
    
    if(filter){
      request_url += "&filter=" + filter;
    }
    
  getRequest(request_url, null);
  
}
getLocations(0);
document.getElementById("viewMoreBtn").addEventListener("click", function () { 
  let newOffset=offset+limit;
  
  offset=newOffset;
		getLocations(offset);
});

// function myFunction() {
//   var element = document.getElementById("viewMoreBtn");
//   // element.scrollLeft += 50;
//   element.scrollTop += 5;
// }

export function getDepartments() {
    var baseURL = "https://liveapi.yext.com/v2/accounts/me/entities?";
    var api_key = "308d4d3f6ae747ccda5a5c0bbb8249a6";
    var vparam = "20181017";   
    var entityTypes = "location";    
    var fullURL =
      baseURL +
      "api_key=" +
      api_key +
      "&v=" +
      vparam + 
      "&entityTypes=" +
      entityTypes ;
      
      fetch(fullURL).then(response => response.json()).then(result => {
      
        if (!result.errors) {
              if (result.response.count > 0) {
                var html = '';
                $.each(result.response.entities, function (index, entity) {

                  // html += '<li class="department-list-item w-1/2 sm:w-1/3 md:w-1/4 mb-4 bg-gray-100 py-3 px-4 text-orange-500" data-name="' + entity.name + '" data-id="' + entity.meta.id + '" >';
                  // html += '<div class="form-check relative"><input class="checkbox_departments absolute top-1 left-1 color-black  " type="checkbox" name="c_relatedFields[]" value="' + entity.meta.id + '" id="' + entity.name + '">';
                  // html += '<label class="relative pl-7 text-sm font-Futura font-bold cursor-pointer" for="' + entity.name + '"> ' + entity.name + '</label>';
                  // html += '</li>';
                      
                });

                $(".department-list").html(html);
                
                $(".checkbox_departments").change(function() {                  
                getLocations(0);
                });
                
              } else {

              }  

            } else {

        }

      });
}
getDepartments();


export function getLocationsfordsc( ) {
  let request_url =
    base_url +
    "entities" +
    "?limit=" +
    limit +
    "&offset=" +
    offset +
    '&sortBy=[{"name":"DESCENDING"}]';

  let filterParameters = {};
  let filterAnd = {};
  let filterOr = {};

  const queryString = locationInput.value;

  // if (queryString) {

  //   filterOr = {
  //     "$or": [
  //       { "address.line1": { "$contains": queryString } },
  //       { "address.city": { "$contains": queryString } },
  //       { "address.region": { "$contains": queryString } },
  //       { "address.countryCode": { "$contains": queryString } },
  //       { "address.postalCode": { "$contains": queryString } },
  //       { "name": { "$contains": queryString } }
  //     ]
  //   };

  // }


  // if (queryString) {

  //   filterOr = {
  //     "$or": [
  //       { "address.line1": { "$eq": queryString } },
  //       { "address.city": { "$eq": queryString } },
  //       { "address.region": { "$eq": queryString } },
  //       { "address.countryCode": { "$eq": queryString } },
  //       { "address.postalCode": { "$eq": queryString } },
  //       { "name": { "$eq": queryString } }
  //     ]
  //   };

  // }

  // var ce_departments = [];
  // $('.checkbox_departments').each(function () {
  //   if ($(this).is(":checked")) {
  //     ce_departments.push($(this).val());
  //   }
  // });

  // if (ce_departments.length > 0) {
  //   filterAnd = { "$and": [{ "c_departments": { "$in": ce_departments } }] };

  // }

  filterParameters = { ...filterOr, ...filterAnd };
  var filterpar = JSON.stringify(filterParameters);
  var filter = encodeURI(filterpar);

  if (filter) {
    request_url += "&filter=" + filter;
  }

  getRequest(request_url, null);
}


// function for ascending data
// function ASC() {
//   let request_url =
//     base_url +
//     "entities" +
//     "?limit=" +
//     limit +
//     "&offset=" +
//     offset +
//     '&sortBy=[{"name":"ASCENDING"}]';


//     getRequest(request_url, null);
//   }

// // function for DESending
// function DESC() {
//   let request_url =
//     base_url +
//     "entities" +
//     "?limit=" +
//     limit +
//     "&offset=" +
//     offset +
//     '&sortBy=[{"name":" DESCENDING"}]';


//     getRequest(request_url, null);
//   }
// //Paginate function 
// export function paginate(
//   totalItems: number,
//   currentPage: number = 1,
//   pageSize: number = 5,
//   maxPages: number = 5
// ) {
//   // calculate total pages
//   let totalPages = Math.ceil(totalItems / pageSize);

//   // ensure current page isn't out of range
//   if (currentPage < 1) {
//     currentPage = 1;
//   } else if (currentPage > totalPages) {
//     currentPage = totalPages;
//   }

//   let startPage: number, endPage: number;
//   if (totalPages <= maxPages) {
//     // total pages less than max so show all pages
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     // total pages more than max so calculate start and end pages
//     let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
//     let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
//     if (currentPage <= maxPagesBeforeCurrentPage) {
//       // current page near the start
//       startPage = 1;
//       endPage = maxPages;
//     } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
//       // current page near the end
//       startPage = totalPages - maxPages + 1;
//       endPage = totalPages;
//     } else {
//       // current page somewhere in the middle
//       startPage = currentPage - maxPagesBeforeCurrentPage;
//       endPage = currentPage + maxPagesAfterCurrentPage;
//     }
//   }

//   // calculate start and end item indexes
//   let startIndex = (currentPage - 1) * pageSize;
//   let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

//   // create an array of pages to ng-repeat in the pager control
//   let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);



//   // return object with all pager properties required by the view
//   return {
//     totalItems: totalItems,
//     currentPage: currentPage,
//     pageSize: pageSize,
//     totalPages: totalPages,
//     startPage: startPage,
//     endPage: endPage,
//     startIndex: startIndex,
//     endIndex: endIndex,
//     pages: pages
//   };
// }
// //appendpagination and renderPagination function's
// function appendpagination(pagesLinks) {
//   var pages = pagesLinks.pages;
//   var tPages = pagesLinks.totalPages;
//   var currentPage = pagesLinks.currentPage;
//   if (pages.length > 1) {
//     var html = "<div class = 'flex-inline bg-gray-300 items-left'>";
//     html += "<ul class='pagination inline-flex font-bold items-left pr-5 p-2 px-2 '>";
//     if (currentPage > 1) {


//       // html += '<li><a href="#" class="pg-btn relative inline-flex items-left px-2 border-black bg-yellow-600 text-lg  text-black hover:bg-red-200 " data-id="1">First</a></li>';
//       // html += '<li><a href="#" class="pg-btn relative inline-flex items-left px-2 border-black bg-orange-600 text-lg  text-black hover:bg-red-200 " data-id=' + (currentPage - 1) + '><</a></li>';

//     }
//     pages.forEach((e) => {
//       var isActive = "";
//       if (e == currentPage) {
//         isActive = "active";
//       }
//       // html += '<li><a href="#" class="' + isActive + 'pg-btn relative inline-flex text-lg  px-2" data-id=' + e + ' style = "background-color: white;" > ' + e + '</a></li>';
//     })
//     if (tPages !== currentPage) {


//       // html += '<li><a href="#" class="pg-btn relative inline-flex items-left px-2 border-black bg-yellow-600 text-lg  text-black hover:bg-red-200" data-id=' + (currentPage + 1) + '>></a></li>';
//       // html += '<li><a href="#" class="pg-btn relative inline-flex items-left px-2 border-black bg-yellow-600 text-lg  text-black hover:bg-red-200 "data-id=' + tPages + '>Last</a></li>';

//     }
//     html += "</ul></div>";
//   }
//   else {
//     html = "";
//   }
//   $('.pagination-button').empty();
//   $('.pagination-button').append(html);

// }



// export function renderPagination(pagesLinks, count = 0) {
//   appendpagination(pagesLinks);
//   setTimeout(() => {
//   $(document).on('click', '.pg-btn', function () {

//     var dataId = $(this).attr('data-id');
//     let newOffset = (limit * Number(dataId)) - (limit);
//     offset = newOffset;
//     getLocations(newOffset, false);
//     const pagesLinks = paginate(count, parseInt(dataId), limit, 5);
    
//     appendpagination(pagesLinks);
//   });
// },1000);
// }
// getLocations();

export function getUsersLocation() {
  if (navigator.geolocation) {
    startLoading();
    const error = (error) => {
      [].slice
        .call(document.querySelectorAll(".error-text") || [])
        .forEach(function (el) {
          el.textContent =
            "Unable to determine your location. Please try entering a location in the search bar.";
        });
      stopLoading();
    };
    navigator.geolocation.getCurrentPosition(getNearestLatLng, error, {
      timeout: 10000,
    });
  }
}