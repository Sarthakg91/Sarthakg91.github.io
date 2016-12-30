var groupId="group-continent"; 
var quantId="water-avail";
var groupIdReal="group-continent-real";
var quantIdReal="water-avail-real";
function groupButtonClickedIdeal(element)
{
   groupId=element.id;
	console.log("groupButtonClicked" +groupId);
	chooseGraphIdeal(element);


}


function quantityButtonClickedIdeal(element){
	quantId=element.id;
	console.log("quantButtonClicked" +quantId);
	chooseGraphIdeal(this);

}

function chooseGraphIdeal(element){
if(groupId=="group-continent"){
   document.getElementById("group-continent").className="btn btn-primary active";
   document.getElementById("group-income").className="btn btn-primary";
   if(quantId=="water-avail"){
   	   	document.getElementById("water-avail").className="btn btn-primary active";
   		document.getElementById("water-use").className="btn btn-primary";
   	console.log("displaying graph waterDisContinentsIdeal");
	init_p005_WaterDisPerCapita_continents_ideal();
   	//call graph that contains waterAvailAndContinent
   }
   else {
   	   	document.getElementById("water-avail").className="btn btn-primary ";
   		document.getElementById("water-use").className="btn btn-primary active";
   	init_WaterUsePerCapita_continent_ideal() 
   }




}

else if (groupId=="group-income"){
   document.getElementById("group-continent").className="btn btn-primary";
   document.getElementById("group-income").className="btn btn-primary active";
   if(quantId=="water-avail"){
   	//call graph that contains waterAvailAndIncome
   	    document.getElementById("water-avail").className="btn btn-primary active";
   		document.getElementById("water-use").className="btn btn-primary";
   		console.log("displaying graph waterDisIncomeIdeal");
   		init_p007_WaterDisPerCapita_income_ideal();
   }
   else {
   	    document.getElementById("water-avail").className="btn btn-primary ";
   		document.getElementById("water-use").className="btn btn-primary active";
   		console.log("displaying graph waterUseIncomeIdeal");
   		init_p009_WaterUsePerCapita_income_ideal();
   	//call graph that contains waterUse and Income
   }
	
}
}

function groupButtonClickedReal(element)
{
   groupIdReal=element.id;
	console.log("groupButtonClicked" +groupId);
	chooseGraphReal(element);


}


function quantityButtonClickedReal(element){
	quantIdReal=element.id;
	console.log("quantButtonClicked" +quantId);
	chooseGraphReal(this);

}

function chooseGraphReal(element){

if(groupIdReal=="group-continent-real"){

   document.getElementById("group-continent-real").className="btn btn-primary active";
   document.getElementById("group-income-real").className="btn btn-primary";
   
   if(quantIdReal=="water-avail-real"){
   	    document.getElementById("water-avail-real").className="btn btn-primary active";
   		document.getElementById("water-use-real").className="btn btn-primary";

   		console.log("displaying graph waterDisContinentsIdeal");
		init_p006_WaterDisPerCapita_continents_real();
   	//call graph that contains waterAvailAndContinent
   }
   else {

   	    document.getElementById("water-avail-real").className="btn btn-primary";
   		document.getElementById("water-use-real").className="btn btn-primary active";
   		console.log("displaying graph water use continent real");
	
   init_WaterUsePerCapita_continent_real() 
   }




}

else if (groupIdReal=="group-income-real"){
   document.getElementById("group-continent-real").className="btn btn-primary";
   document.getElementById("group-income-real").className="btn btn-primary active";
   if(quantIdReal=="water-avail-real"){
   	//call graph that contains waterAvailAndIncome
   	    document.getElementById("water-avail-real").className="btn btn-primary active";
   		document.getElementById("water-use-real").className="btn btn-primary";
   	console.log("displaying graph waterDisIncomeReal");
   	init_p008_WaterDisPerCapita_income_real();
   }
   else {
   	    document.getElementById("water-avail-real").className="btn btn-primary";
   		document.getElementById("water-use-real").className="btn btn-primary active";
   	console.log("displaying graph waterUseIncomereal");
   	init_p009_WaterUsePerCapita_income_real();
   	//call graph that contains waterUse and Income
   }
	
}
}
/* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , selector
        , isActive

      if ($this.is('.disabled, :disabled')) return

      selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}(window.jQuery);