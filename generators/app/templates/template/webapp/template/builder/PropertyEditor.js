sap.ui.define([
    "sap/ui/model/resource/ResourceModel",
    "sap/dm/dme/podfoundation/control/PropertyEditor"
], function (ResourceModel, PropertyEditor) {
    "use strict";
    
    var oFormContainer;

    return PropertyEditor.extend( "<%= namespace %>.<%= name %>.<%= name %>.builder.PropertyEditor" ,{

		constructor: function(sId, mSettings){
			PropertyEditor.apply(this, arguments);
			
			this.setI18nKeyPrefix("customComponentListConfig.");
			this.setResourceBundleName("<%= namespace %>.<%= name %>.<%= name %>.i18n.builder");
			this.setPluginResourceBundleName("<%= namespace %>.<%= name %>.<%= name %>.i18n.i18n");
		},
		
		addPropertyEditorContent: function(oPropertyFormContainer){
			var oData = this.getPropertyData();
			
			//this.addSwitch(oPropertyFormContainer, "backButtonVisible", oData);
			this.addSwitch(oPropertyFormContainer, "closeButtonVisible", oData);
			
			
			
			//this.addInputField(oPropertyFormContainer, "Text", oData);
			//this.addInputField(oPropertyFormContainer, "LogoUrl", oData);
			this.addInputField(oPropertyFormContainer, "title", oData);
			//this.addInputField(oPropertyFormContainer, "text", oData);
			//this.addSwitch(oPropertyFormContainer, "border", oData);
            //this.addSwitch(oPropertyFormContainer, "scroll", oData);
			//this.addInputField(oPropertyFormContainer, "uid", oData);
			//this.addInputField(oPropertyFormContainer, "backgroundColor", oData);
            //this.addInputField(oPropertyFormContainer, "fontColor", oData);
			//this.addInputField(oPropertyFormContainer, "fontSize", oData);
			
			//this.addInputField(oPropertyFormContainer, "Param2Key", oData);
			//this.addInputField(oPropertyFormContainer, "Param2Value", oData);
			
			//this.addInputField(oPropertyFormContainer, "Param3Key", oData);
			//this.addInputField(oPropertyFormContainer, "Param3Value", oData);

            oFormContainer = oPropertyFormContainer;
		},
		
		getDefaultPropertyData: function(){
			return {
				
				"closeButtonVisible" : false,
                "title": "template"
                
			};
		}

	});
});