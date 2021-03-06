var AppRouter = Backbone.Router.extend({

    routes: {
        ""  : "home",
        "item/page/:page" : "list",
        "item/create"  : "createPitem",
        "item/:id"  : "pitemEdit",
        "item/edit/:id"  : "pitemEdit",
        "identity"  : "identity",
        "portfolio/:sectionVar"  : "portfolioFilter",
        "manage"  : "manage"
    },

    initialize: function () {
        

    },
    

//---route path----------------------------------------------------------

  home: function (id) {
    if (!this.homeView) {
        this.homeView = new HomeView();
    }
    $('#content').html(this.homeView.el);
  },


//---route path----------------------------------------------------------

	list: function(page) {
    var p = page ? parseInt(page, 10) : 1;
    var pitemList = new PitemCollection();
    pitemList.fetch({success: function(){
        $("#content").html(new PitemListView({model: pitemList, page: p}).el);
    }});

  },


//---route path----------------------------------------------------------


  pitemDetails: function (id) {       
    var pitem = new Pitem({_id: id});
    var sectionVar;
    pitem.fetch({success: function(){
      $(".pitemArea").html(new PitemView({model: pitem}).el);
    
      sectionVar = pitem.attributes['section'];

    }});
    
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
    
    $('#content').html(this.identityView.el);
  },


//---route path----------------------------------------------------------


  pitemEdit: function (id) {       
    var pitem = new Pitem({_id: id});
    pitem.fetch({success: function(){
    
      $('#content').html(new PitemEditView({model: pitem}).el);
      
    pitem = pitem.toJSON();
    console.log(pitem.images[0]);

    var opts = {
      container: 'epiceditor',
      basePath: '../epiceditor/epiceditor/',
      clientSideStorage: false,
      useNativeFullsreen: false,
      file: {
        name: 'epiceditor',
        defaultContent: pitem.description,
        autoSave: 100
      }
    }


    $('#content').append('<div id="epiceditor"></div>');
   // var editor = new EpicEditor(opts).load();
    
    $('.save').click(function(){
    //  console.log('123');
    //  var theContent = editor.exportFile(null, 'html');
  //    console.log(theContent); // Returns the editor's content

    })
    
    }
    
    
    
    });
  },

    
    
    
//---route path----------------------------------------------------------
//-- "PitemView" equates to "EditPitemView" ----------------------------- 
	createPitem: function() {
    var pitem = new Pitem();
    $('#content').html(new PitemEditView({model: pitem}).el);
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
 //   if (!this.developmentView) {
      this.developmentView = new DevelopmentView();
      var pitemList = new PitemCollection();
      
      pitemList.fetch({
        success: function(){ 

        //--filter by section then convert array to Pitem Collection
        var filterArray = pitemList.where({section: sectionVar});
        var filteredCollection = new PitemCollection(filterArray);

        $('#sub-nav-container').html(new NavListView({model: filteredCollection}).el);    
        
        }
      });
             
   // }
              
 //   $('#content').html(this.developmentView.el);
     
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
utils.loadTemplate(['HomeView', 'PitemView', 'PitemEditView', 'PitemListItemView', 'TextNavListItemView', 'IdentityView','DevelopmentView', 'ManageView'], function() {
    app = new AppRouter();
//    Backbone.history.start({pushState: true});
    Backbone.history.start();
});
