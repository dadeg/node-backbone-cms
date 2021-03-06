window.PitemEditView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      
  /*
      this.hide().fadeIn(500);
      var imageFade = this.el.children[0].children[1].children[0];
      console.log(imageFade);
      $(imageFade).hide().fadeIn(500);
  */
      return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deletePitem",
        "drop #picture" : "dropHandler",
	"dragover #picture" : "dragover",
	"click #picture" : "alertMe"

    },

     logC: function (event) {
        // Remove any existing alert message
    },
    
    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSavex: function () {
      
//      $(this.el).html();
      console.log(this.model.attributes['description']);
      
//      this.model.attributes['description'] = 'ys';
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.savePitem();
        return false;
    },


    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.savePitem();
        return false;
    },

    savePitem: function () {
        var self = this;
        this.model.save(null, {
            success: function (model) {
                self.render();
//                app.navigate('items/' + model.id, false);
                var tempTitle = model.attributes['title'];
                utils.showAlert('Saved.', 'Portfolio item: "'+tempTitle+'" was saved successfully.', 'alert-success');
//                console.log();
            },
            error: function () {
                utils.showAlert('Error', 'Error in attempt to update item. You might have to toggle the allowEditing variable in the code.', 'alert-error');
            }
        });
    },

    deletePitem: function () {
        this.model.destroy({
            success: function () {
                alert('Portfolio item deleted successfully.');
                window.history.back();
            }
        });
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];
	
	var imagestring = this.pictureFile.name;
	if($('#images').attr('value') == ""){
		var imagestring = '/imgs/' + this.pictureFile.name;
	} else {
		var imagestring = $('#images').attr('value') + ",/imgs/" + this.pictureFile.name;
	}
	$('#images').attr('value', imagestring);
        
	
	utils.uploadFile(this.pictureFile, function(){ });

        
	//var reader = new FileReader();
     //   reader.readAsDataURL(this.pictureFile);
	//reader.onload = function (e) {
		/*var result = http.post('/files', this.pictureFile);
		result.success(function() {
			alert('done');
		});*/
        
	//};
	
	// Apply the change to the model
        var target = $('#images');
	var targetjson = target.attr('value').split(',');
        var change = {};
        change[target.attr('name')] = targetjson;
        this.model.set(change);
	
    },

    dragover: function(event) {
	//console.log('drag over event called');
	event.preventDefault();
    },

    alertMe: function(){
	//console.log('clicked on image');
    }

});
