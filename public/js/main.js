var AppRouter = Backbone.Router.extend({

    routes: {
        ""  : "home",
	"yes"  : "yes",
        "item/page/:page" : "list",
        "item/add"  : "addPitem",
        "item/:id"  : "pitemDetails",
        "item/edit/:id"  : "pitemEdit",
        "identity"  : "identity",
        "portfolio/:sectionVar"  : "portfolioFilter",
        "portfolio/:sectionVar/:page"  : "filteredList",
        "manage"  : "manage"
    },

    initialize: function () {
        
  //      var editor = new EpicEditor().load();

    },
    

//---route path----------------------------------------------------------

  home: function (id) {
    if (!this.homeView) {
        this.homeView = new HomeView();
    }
    
    $('#content').html(this.homeView.el);
    $('.container.pg').hide();
    $("#sub-nav-container").html('');

  },



//---route path----------------------------------------------------------

  yes: function (id) {
    if (!this.yesView) {
        this.yesView = new YesView();
    }
    
    $('#content').html(this.yesView.el);
    $('.container.pg').hide();
    $("#sub-nav-container").html('');

  },




//---route path----------------------------------------------------------


  
  
 

//---route path----------------------------------------------------------

	list: function(page) {
    var p = page ? parseInt(page, 10) : 1;
    var pitemList = new PitemCollection();
    pitemList.fetch({success: function(){
        $("#content").html(new PitemListView({model: pitemList, page: p}).el);
  //      $('.carousel-inner div:first-child').addClass('active');
        console.log('loadList!');
        
        var new_query = MQ.addQuery({
    context: 'desktop', 
    match: function() { 
        console.log( 'second desktop callback!' )
			$("#inner-carousel").addClass('carousel-inner');
			$("#inner-carousel .item").removeClass('no-slide').addClass('item');
			$("#inner-carousel div:first-child").addClass('active');
        }
    });
    
    }});

  },


	filteredList: function(sectionVar, page) {
	
    var p = page ? parseInt(page, 10) : 1;
    var pitemList = new PitemCollection();
    
        
    pitemList.fetch({
      success: function(){
    
        //--filter by section then convert array to Pitem Collection
//        console.log(pitemList);
        var filterArray = pitemList.where({section: sectionVar});
//        console.log(filterArray);
        var filteredCollection = new PitemCollection(filterArray);
        
        var singlePitem = new PitemListView({model: filteredCollection, page: p, sectionVar:sectionVar});
        
        $("#content").html(singlePitem.el);
  //      $('.carousel-inner div:first-child').addClass('active');
                
        var new_query = MQ.addQuery({
    context: 'desktop', 
    match: function() { 
//        console.log( 'second desktop callback!' )
        			$("#inner-carousel").addClass('carousel-inner');
        			$("#inner-carousel .item").removeClass().addClass('item');
			$("#inner-carousel div:first-child").addClass('active');
			$("#carousel-nav").show();
			
    }
});

        var new_query2 = MQ.addQuery({
          context: ['mobile', 'skinny'],
      		call_for_each_context: false,
      		match: function() {
            $("#carousel-nav").hide();
          }
        });

$('.container.pg').show();

    }});


  },

//---route path----------------------------------------------------------


  pitemDetails: function (id) {       
    var pitem = new Pitem({_id: id});
    
    pitem.fetch({success: function(){
      $("#content").html(new PitemView({model: pitem}).el);
      $('.carousel-inner div:first-child').addClass('active');
//     var sectionVar = pitem.attributes['section'];

    }});

/*    
   // console.log(JSON.stringify(pitem));
    
 //   if (!this.identityView) {
      this.identityView = new IdentityView();
      var pitemList = new PitemCollection();
      // sectionVar = pitem.attributes['section'];
      //console.log('pitem:'+pitem.attributes['section']);
    
      pitemList.fetch({success: function(){
        
        //--filter by section then convert array to Pitem Collection
        var filterArray = pitemList.where({section: sectionVar});
        var filteredCollection = new PitemCollection(filterArray);

        //--add the data model to the template
      //  $('#sub-nav').append(new NavListView({model: filteredCollection}).el);
      }});
 //   }
 */
    
  },


//---route path----------------------------------------------------------


  pitemEdit: function (id) {       
    var pitem = new Pitem({_id: id});
    pitem.fetch({success: function(){
      $("#main-row").html(new PitemEditView({model: pitem}).el);
    
    }});
    
//    $('#content').html(this.identityView.el);
  },

    
    
    
//---route path----------------------------------------------------------
//-- "PitemView" equates to "EditPitemView" ----------------------------- 
	addPitem: function() {
    var pitem = new Pitem();
    $('#content').html(new PitemView({model: pitem}).el);
	},
	
	
//---route path----------------------------------------------------------

  identity: function (id) {
    if (!this.identityView) {
        this.identityView = new IdentityView();
        var pitemList = new PitemCollection();
      pitemList.fetch({success: function(){
          $('#sub-nav').append(new NavListView({model: pitemList}).el);
      }});
    }   
      
    $('#content').html(this.identityView.el);
    // this.headerView.selectMenuItem('identity-menu');
  },
  
  
  
//---route path----------------------------------------------------------

  portfolioFilter: function (sectionVar) {
 //   if (!this.placeholderView) {
      this.placeholderView = new PlaceholderView();
      var pitemList = new PitemCollection();
      
      pitemList.fetch({
        success: function(){ 

console.log(pitemList);
        //--filter by section then convert array to Pitem Collection
        var filterArray = pitemList.where({section: sectionVar});
        var filteredCollection = new PitemCollection(filterArray);

        $('#sub-nav').html(new NavListView({model: filteredCollection}).el);    
        
        }
      });
             
   // }
              
    $('#content').html(this.placeholderView.el);
     
  },
    
    
//---route path----------------------------------------------------------
    
  manage: function (id) {
    if (!this.manageView) {
        this.manageView = new ManageView();
        var pitemList = new PitemCollection();
      
      pitemList.fetch({success: function(){
        $('#col1').html(new NavListView({model: pitemList}).el);                                
      }});
    }
    $('#content').html(this.manageView.el);
  }


});

// LOAD INDIVIDUAL TEMPLATES FROM 'tpl'
utils.loadTemplate(['HomeView', 'PitemView', 'PitemListItemView','PlaceholderView','TextNavListItemView','PitemImageSingleView', 'YesView'], function() {
    app = new AppRouter();
//    Backbone.history.start({pushState: true});
    Backbone.history.start();
});
