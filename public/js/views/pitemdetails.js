window.PitemView = Backbone.View.extend({

    initialize: function () {
        this.render();
        $('.carousel-inner div:first-child').addClass('active');
    },

    render: function () {
      var modelJson = this.model.toJSON();
//      console.log(modelJson.images[0]);
      


      $(this.el).html(this.template(this.model.toJSON())); 
      
//      console.log(this);
      
      
  //    this.hide().fadeIn(500);
  //    var imageFade = this.el.children[0].children[1].children[0];
    //  $(imageFade).hide().fadeIn(500);
      
      return this;
      
//------------------------------------------------------------------------
      
    },
});

window.PitemImageSingleView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template(this.model));
      console.log(this.model);
        return this;
    }
  });