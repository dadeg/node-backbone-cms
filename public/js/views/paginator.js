window.Paginator = Backbone.View.extend({

    className: "",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        //  this.render();
        // console.log(this);
    },

    render:function () {

      var items = this.model.models;
      var len = items.length;
      var pageCount = Math.ceil(len / 1);
      var ii = this.options.page;
      var section = this.options.sectionVar;


      //-- Create the mobile sub nav container
      $(this.el).html('<div class="pgr" />');


      //-- Iterate through and populate sub-navigation ------>
      var menuArray = [];
      for (var i=0; i < pageCount; i++) {
        var menuItem = "<li class=' " + ((i + 1) === this.options.page ? " active'" : "'") + "><a href='#portfolio/"+section+"/"+(i+1)+"'>" + items[i].attributes.title + "</a></li>";
        
//          $('#pitem-list', '#sub-nav-container').append(menuItem);
          menuArray.push(menuItem);
       }
      
      var total = menuArray.length;
      var itemsPerCol = 5;
      var counter = 0;
      
       // console.log($("#pitem-list li"));
       $("#sub-nav-container").html('<div id="nav-columns"></div>');
       
      for (var i = 0; i < total; i += itemsPerCol) {
        counter++;
        $("#nav-columns").append('<ul class="span4" id="pitem-col' + counter + '"></ul>');
        $("#pitem-col" + counter).html(menuArray.splice(0, itemsPerCol));      
      }
       
       
       
//      $("#column").remove();
      
      //--mobile sub-navigation (incrementor)------>
      $('.pgr', this.el).append("<div class='current-item'><h2>" + items[(ii-1)].attributes.title + "</h2></div>");
      $('.pgr', this.el).append("<div class='prv'><a href='#portfolio/"+section+"/"+(ii-1)+"'> <i class='icon-chevron-left'></i> </a></li>");
      $('.pgr', this.el).append("<div class='nxt'><a href='#portfolio/"+section+"/"+(ii+1)+"'> <i class='icon-chevron-right'></i> </a></li>");


      console.log('item index number: '+this.options.page);
      // console.log(JSON.stringify(items));

    
      return this;
    }
    
});