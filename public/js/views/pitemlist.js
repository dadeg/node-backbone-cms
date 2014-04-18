window.PitemListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var pitems = this.model.models;
        var len = pitems.length;
        
        var startPos = (this.options.page - 1) * 1;
        var endPos = Math.min(startPos + 1, len);
        
        $(this.el).html('<div class="item"></div>');

        for (var i = startPos; i < endPos; i++) {

            var animDelay = 100*i+100;
            var rendered = new PitemListItemView({model: pitems[i]}).render();
            $('.item', this.el).append(rendered.el);
            $(rendered.el).hide().fadeIn();
            // console.log('item content: '+rendered);

        }

      //  $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);
//          $('.navbar-inner').append('<div class="container pg"></div>');
          $('.pg').html(new Paginator({model: this.model, page: this.options.page, sectionVar:this.options.sectionVar}).render().el);
          
          

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
    
      $(this.el).html('<ul id="pitem-list" class="columns"></ul>');
      
  
      for (var i = startPos; i < endPos; i++) {
    
          var animDelay = 100*i+100;
          var rendered = new TextNavListItemView({model: pitems[i]}).render();
          $('#pitem-list', this.el).append(rendered.el);
      //    $(rendered.el).hide().delay(animDelay).fadeIn();
      //    console.log(rendered);
      
    }


//        console.log(this);
        return this;
                
    }
});


window.PitemListItemView = Backbone.View.extend({

    tagName: "div",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
       // console.log(MQ.context);

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