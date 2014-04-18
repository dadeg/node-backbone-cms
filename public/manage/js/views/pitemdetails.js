window.PitemView = Backbone.View.extend({

    initialize: function () {
        var kk = this.render();
//        console.log(kk.el.children[0].children[1]);
    },

    render: function () {
      var rendered = $(this.el).html(this.template(this.model.toJSON()));
      
  //    this.hide().fadeIn(500);
      var imageFade = this.el.children[0].children[1].children[0];
      console.log(imageFade);
      $(imageFade).hide().fadeIn(500);
      return this;
    },

});
