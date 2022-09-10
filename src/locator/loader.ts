import {
  entityTypes,
  liveAPIKey,
  locationInput,
  savedFilterId,
  limit
} from "./constants";
import {
  scrollToRow, 
} from "./utils";
import { renderLocations, renderSearchDetail, getLocationsfordsc, getLocations, offset } from "./locations";
import { addMarkersToMap, centerOnGeo } from "./map";
console.log(liveAPIKey);
export let isLoading = false;
let locations = [];
export function startLoading() {
  // console.log("start loading");
  isLoading = true;

  [].slice
    .call(document.querySelectorAll(".spinner") || [])
    .forEach(function (el) {
      el.style.visibility = "visible";
    });
  [].slice
    .call(document.querySelectorAll(".search-center") || [])
    .forEach(function (el) {
      el.innerHTML = "";
    });
  [].slice
    .call(document.getElementsByClassName("result") || [])
    .forEach(function (el) {
      // el.style.visibility = "hidden";
      el.innerHTML = '<div class="skeleton h-6 flex-grow mx-4 my-10"></div>';
    });
  locationInput.disabled = true;
  [].slice
    .call(document.querySelectorAll(".search") || [])
    .forEach(function (el) {
      el.classList.add("disabled");
    });
}

export function stopLoading() {
  isLoading = false;

  [].slice
    .call(document.querySelectorAll(".spinner") || [])
    .forEach(function (el) {
      el.style.visibility = "hidden";
    });
  [].slice
    .call(document.querySelectorAll(".result-list") || [])
    .forEach(function (el) {
      el.style.visibility = "visible";
    });
  locationInput.disabled = false;
  [].slice
    .call(document.querySelectorAll(".search") || [])
    .forEach(function (el) {
      el.classList.remove("disabled");
    });
}
// pagination export
export function getRequest(request_url, queryString) {
  // Add query string to URL
  if (queryString !== null) {
    const newUrl = window.location.href.replace(
      /(\?.*)?$/,
      "?q=queryString".replace("queryString", null)
    );
    if (
      window.history.state &&
      window.history.state.queryString !== queryString
    ) {
      window.history.pushState({ queryString: queryString }, "", newUrl);
    } else {
      window.history.replaceState({ queryString: queryString }, "", newUrl);
    }
  }

  startLoading();
  request_url += "&api_key=" + liveAPIKey;
  request_url += "&v=" + "20200308";
  request_url += "&resolvePlaceholders=true";


  if (entityTypes) {
    request_url += "&entityTypes=" + entityTypes;
  }

  if (savedFilterId) {
    request_url += "&savedFilterIds=" + savedFilterId;
  }
  let totalCount = Number($('#totalCount').val());
  if (offset == 0) {
    locations = [];
  }
  fetch(request_url, { method: "GET" })
    .then((res) => res.json())
    .then(function (data) {
      // var count=data.response.count;
      // var pagesLinks = paginate(count,1,limit,5);
      // if(ispagination){
      // renderPagination(pagesLinks,count);
      // }
      // console.log(data);
      if (data.meta.errors && data.meta.errors.length > 0) {
        alert(data.meta.errors[0]["message"]);
      }

      for (let i = 0; i < data.response.entities.length; i++) {
        const location = data.response.entities[i];

        // Add location distance if it exists
        if (data.response.distances) {
          location.__distance = data.response.distances[i];
        }
        locations.push(location);
      }
      // Update Panel
      renderLocations(locations, false, false);
      renderSearchDetail(
        data.response.geo,
        locations.length,
        data.response.count,
        queryString
      );

      scrollToRow(offset);
      
      // Update Map
      addMarkersToMap(locations);

      if (locations.length == 0) {
        centerOnGeo(data.response.geo);
      }
      [].slice
        .call(document.querySelectorAll(".error-text") || [])
        .forEach(function (el) {
          el.textContent = "";
        });
      stopLoading();
      //     })
      //     .catch((err) => {
      //       alert("There was an error");
      //       console.error(err);
      //     });
      // }

      $(".open-now-string").click(function () {
        var closeThis = $(this);
        closeThis.parents('.lp-param-results').find(".storelocation-openCloseTime").toggle(function () {
          /* if($(this).is(':visible')){
            closeThis.html('-');
          }else{
            closeThis.html('+');
          } */
        });

      });
    })
    // .catch((err) => {
    //   // alert("There was an error");
    //   // console.error(err);
    //   $(".viewMoreBtnDiv").hide();
    //   // $(".custom-pagination-links").html("");
    //   $(".result-list-inner").html(`<div id="result-0" class="result !pl-4 text-center"><div class="center-column">Something went wrong. Re-try after some time.</div></div>`);
    // });


    // }
    .catch((err) => {
      // alert("There was an error");
      // console.error(err);
      
      $(".viewMoreBtnDiv").hide();
      // $("viewMore").scrollTop(10);
      $(".custom-pagination-links").html("");
      $(".result-list-inner").html(`<div id="result-0" class="result hidden !pl-4 text-center"><div class="center-column">Something went wrong. Re-try after some time.</div></div>`);
    });
}

