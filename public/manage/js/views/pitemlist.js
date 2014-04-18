window.PitemListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var pitems = this.model.models;
        var len = pitems.length;
        
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {

            var animDelay = 100*i+100;
            var rendered = new PitemListItemView({model: pitems[i]}).render();
            $('.thumbnails', this.el).append(rendered.el);
         //   $(rendered.el).hide().delay(animDelay).fadeIn();
            //console.log(animDelay);

        }

  //      $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
        
    }
});


window.NavListView = Backbone.View.extend({
  
    initialize: function () {
        this.render();
    },

    render: function () {
      var pitems = this.model.models;
   //   alert("PITEMS: "+JSON.stringify(pitems));
      var len = pitems.length;
      var startPos = 0;
      var endPos = len;
    
      $(this.el).html('<ul id="subnav" class="nav nav-pills nav-stacked"></ul>');
      
    
      for (var i = startPos; i < endPos; i++) {
    
          var animDelay = 100*i+100;
          var rendered = new TextNavListItemView({model: pitems[i]}).render();
          $('#subnav', this.el).append(rendered.el);
      //    $(rendered.el).hide().delay(animDelay).fadeIn();
      //    console.log(rendered);
      
    
    }

        return this;
                
    }
});


window.PitemListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.TextNavListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
