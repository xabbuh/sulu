define(["text!sulucontact/components/contact-form/address.form.html","text!sulucontact/components/contact-form/bank.form.html"],function(a,b){"use strict";var c={fields:["email","fax","phone","url"],fieldTypes:[],defaultTypes:[],trigger:".contact-options-toggle"},d={fieldId:"field-select",fieldTypeId:"field-type-select",editDeleteSelector:".delete",editDeleteIcon:"fa-minus-circle",editUndoDeleteIcon:"fa-plus-circle",fadedClass:"faded",addressFormId:"#address-form",bankAccountFormId:"#bank-account-form",dropdownContainerId:"#contact-options-dropdown",addressRowTemplateSelector:'[data-mapper-property-tpl="address-tpl"]',bankAccountRowTemplateSelector:'[data-mapper-property-tpl="bank-account-tpl"]',addressComponentSelector:".address-component",bankAccountComponentSelector:".bank-account-component",addressTypeSelector:"#addressType"},e={add:['<div class="grid-row">','   <div id="'+d.fieldId+'" class="grid-col-6"></div>','   <div id="'+d.fieldTypeId+'" class="grid-col-6"></div>',"</div>",'<div class="grid-row m-bottom-0"></div>'].join(""),editField:['<div class="grid-row divider" data-deleted="false">','   <div class="grid-col-7 pull-left">','       <div id="<%= dropdownId %>"></div>',"   </div>",'   <div class="grid-col-2 pull-right">',"<% if (showDeleteButton == true) { %>",'       <div class="delete btn gray-dark fit only-icon pull-right">','           <div class="fa-minus-circle"></div>',"       </div>","<% } %>","   </div>","</div>"].join("")},f="sulu.contact-form",g=function(){return f+".initialized"},h=function(){return f+".changed"},i=function(){return f+".added.address"},j=function(){return f+".removed.address"},k=function(){return f+".added.bank-account"},l=function(){return f+".removed.bank-account"},m=function(){return f+".content-set"},n=function(){this.sandbox.on("sulu.contact-form.add-collectionfilters",z.bind(this)),this.sandbox.on("sulu.contact-form.add-required",A.bind(this)),this.sandbox.on("sulu.contact-form.is.initialized",C.bind(this)),this.sandbox.on("husky.overlay.add-address.initialized",p.bind(this)),this.sandbox.on(m.call(this),U.bind(this)),this.sandbox.on("husky.overlay.add-address.opened",function(){var a=this.sandbox.form.create(d.addressFormId);a.initialized.then(function(){this.sandbox.form.setData(d.addressFormId,this.data)}.bind(this))}.bind(this)),this.sandbox.on("husky.overlay.add-bank-account.opened",function(){this.sandbox.start(d.bankAccountFormId);var a=this.sandbox.form.create(d.bankAccountFormId);a.initialized.then(function(){this.sandbox.form.setData(d.bankAccountFormId,this.data)}.bind(this))}.bind(this)),u.call(this)},o=function(){this.sandbox.dom.on(this.$el,"click",F.bind(this),d.addressRowTemplateSelector),this.sandbox.dom.on(this.$el,"click",function(a){a.stopPropagation(),r.call(this,a.currentTarget)}.bind(this),".address-remove"),this.sandbox.dom.on(this.$el,"click",function(a){a.stopPropagation(),s.call(this,a.currentTarget)}.bind(this),".address-add"),this.sandbox.dom.on(this.$el,"click",G.bind(this),d.bankAccountRowTemplateSelector),this.sandbox.dom.on(this.$el,"click",function(a){a.stopPropagation(),q.call(this,a.currentTarget)}.bind(this),".bank-account-remove"),this.sandbox.dom.on(this.$el,"click",function(a){a.stopPropagation(),t.call(this,a.currentTarget)}.bind(this),".bank-account-add")},p=function(){this.options.defaultTypes.addressType&&this.options.defaultTypes.addressType.id&&this.sandbox.start([{name:"select@husky",options:{el:d.addressTypeSelector,defaultLabel:this.sandbox.translate("contact.address.type.select"),instanceName:"addressTypes",data:this.options.fieldTypes.address,preSelectedElements:[this.options.defaultTypes.addressType.id],valueName:"name",multipleSelect:!1,emitValues:!0}}])},q=function(a){var b=this.sandbox.dom.data(this.sandbox.dom.closest(a,d.bankAccountComponentSelector),"mapper-id");this.sandbox.form.removeFromCollection(this.form,b),this.sandbox.emit(h.call(this)),this.sandbox.emit(l.call(this))},r=function(a){var b=this.sandbox.dom.data(this.sandbox.dom.closest(a,d.addressComponentSelector),"mapper-id");this.sandbox.form.removeFromCollection(this.form,b),this.sandbox.emit(h.call(this)),this.sandbox.emit(j.call(this))},s=function(){N.call(this,null)},t=function(){O.call(this,null)},u=function(){this.sandbox.on("husky.dependent-select.add-fields.all.items.selected",function(){this.sandbox.emit("husky.overlay.add-fields.okbutton.activate")}.bind(this)),this.sandbox.on("husky.dependent-select.add-fields.all.items.deselected",function(){this.sandbox.emit("husky.overlay.add-fields.okbutton.deactivate")}.bind(this))},v=function(){null!==this.$editOverlayContent&&this.sandbox.dom.on(this.sandbox.dom.find(".grid-row",this.$editOverlayContent),"click",w.bind(this),d.editDeleteSelector)},w=function(a){var b=this.sandbox.dom.$(a.delegateTarget),c=this.sandbox.dom.find('[class^="icon"]',a.currentTarget),e=JSON.parse(this.sandbox.dom.attr(b,"data-deleted"));e===!0?(this.sandbox.dom.removeClass(b,d.fadedClass),this.sandbox.dom.removeClass(c,d.editUndoDeleteIcon),this.sandbox.dom.prependClass(c,d.editDeleteIcon),this.sandbox.dom.attr(b,"data-deleted","false")):(this.sandbox.dom.addClass(b,d.fadedClass),this.sandbox.dom.removeClass(c,d.editDeleteIcon),this.sandbox.dom.prependClass(c,d.editUndoDeleteIcon),this.sandbox.dom.attr(b,"data-deleted","true"))},x=function(){this.sandbox.dom.off(this.$editOverlayContent)},y=function(){this.sandbox.form.removeCollectionFilter(this.form,"bankAccounts"),this.sandbox.form.removeCollectionFilter(this.form,"addresses"),this.sandbox.form.removeCollectionFilter(this.form,"emails"),this.sandbox.form.removeCollectionFilter(this.form,"phones"),this.sandbox.form.removeCollectionFilter(this.form,"urls"),this.sandbox.form.removeCollectionFilter(this.form,"faxes"),this.sandbox.form.removeCollectionFilter(this.form,"notes")},z=function(a){this.form=a,this.sandbox.form.addCollectionFilter(this.form,"bankAccounts",function(a){return""===a.id&&delete a.id,""!==a.iban&&""!==a.bic}),this.sandbox.form.addCollectionFilter(this.form,"addresses",function(a){return""===a.id&&delete a.id,!0}),this.sandbox.form.addCollectionFilter(this.form,"emails",function(a){return""===a.id&&delete a.id,""!==a.email}),this.sandbox.form.addCollectionFilter(this.form,"phones",function(a){return""===a.id&&delete a.id,""!==a.phone}),this.sandbox.form.addCollectionFilter(this.form,"urls",function(a){return""===a.id&&delete a.id,""!==a.url}),this.sandbox.form.addCollectionFilter(this.form,"faxes",function(a){return""===a.id&&delete a.id,""!==a.fax}),this.sandbox.form.addCollectionFilter(this.form,"notes",function(a){return""===a.id&&delete a.id,""!==a.value})},A=function(a){var b,c={email:"email-tpl"},d='#contact-fields *[data-mapper-property-tpl="<%= selector %>"]:first';-1!==a.indexOf("email")&&(b=this.sandbox.util.template(d,{selector:c.email}),this.sandbox.form.addConstraint(this.form,b+" *[data-type=husky-input]","required",{required:!0}),this.sandbox.dom.addClass(b+" label.visible","required"),this.sandbox.dom.attr(b,"data-contactform-required",!0))},B=function(a,b){for(var c=-1,d=a.length;++c<d;)if(a[c].id.toString()===b.toString())return a[c]},C=function(a){this.initialized?a.call(this):this.sandbox.on("sulu.contact-form.initialized",function(){a.call(this)}.bind(this))},D=function(){var a,b,c,e=this.sandbox.dom.children("#"+d.fieldId)[0],f=this.sandbox.dom.children("#"+d.fieldTypeId)[0],g=this.sandbox.dom.data(e,"selection"),h=this.sandbox.dom.data(f,"selection");"object"==typeof h&&h.length>0&&(h=h[0]),a=this.dropdownDataArray[g],b=B(this.dropdownDataArray[g].items,h),c={},c[a.type]="",c[a.type+"Type"]={id:h,name:b.name},c.attributes={},"address"===a.type?N.call(this,c):this.sandbox.form.addToCollection(this.form,a.collection,c).then(function(a){this.sandbox.start(a),V.call(this,a)}.bind(this)),this.sandbox.emit("husky.overlay.add-fields.remove")},E=function(){var a,b,c,d,e,f,g;for(a=-1,b=this.editFieldsData.length;++a<b;)f=JSON.parse(this.sandbox.dom.attr(this.editFieldsData[a].$element,"data-deleted")),f===!0?(this.sandbox.form.removeFromCollection(this.form,this.editFieldsData[a].mapperId),this.sandbox.emit(h.call(this))):(c=parseInt(this.sandbox.dom.data(this.editFieldsData[a].$dropdown,"selection"),10),c!==this.editFieldsData[a].type.id&&(d=H.call(this,this.editFieldsData[a].types,c),null!==d&&(e={},e[this.editFieldsData[a].typeName]=d,this.sandbox.form.editInCollection(this.form,this.editFieldsData[a].mapperId,e),g=this.$find('[data-mapper-id="'+this.editFieldsData[a].mapperId+'"]'),V.call(this,g),this.sandbox.emit(h.call(this)))));x.call(this),this.sandbox.stop(this.$editOverlayContent)},F=function(a){var b=this.sandbox.dom.$(a.currentTarget),c=this.sandbox.form.getData(this.form,!0,b);N.call(this,c,this.sandbox.dom.data(b,"mapperId"))},G=function(a){var b=this.sandbox.dom.$(a.currentTarget),c=this.sandbox.form.getData(this.form,!0,b);O.call(this,c,this.sandbox.dom.data(b,"mapperId"))},H=function(a,b){for(var c=-1,d=a.length;++c<d;)if(a[c].id===b)return a[c];return null},I=function(){var a,b,c,d=this.options.fieldTypes;for(c in d)for(a=-1,b=d[c].length;++a<b;)d[c][a].name=this.sandbox.translate(d[c][a].name);this.options.translatedFieldTypes=d},J=function(){this.editFieldsData=[],y.call(this);var a,b,c,d,f,g,h,i=this.sandbox.form.getData(this.form,!0),j=this.sandbox.dom.createElement('<div class="edit-fields"/>');z.call(this,this.form),a={address:i.addresses,email:i.emails,fax:i.faxes,phone:i.phones,url:i.urls};for(d in a)for(b=-1,c=a[d].length;++b<c;)g=this.sandbox.dom.attr(this.sandbox.dom.$('[data-mapper-id="'+a[d][b].mapperId+'"]'),"data-contactform-required"),h=!1,a[d][b].attributes&&a[d][b].attributes.permanent&&(h=a[d][b].attributes.permanent),f=this.sandbox.dom.createElement(this.sandbox.util.template(e.editField)({dropdownId:"edit-dropdown-"+d+"-"+b,showDeleteButton:!g&&!h})),this.editFieldsData.push({id:a[d][b].id,typeName:d+"Type",type:a[d][b][d+"Type"],name:this.sandbox.translate("public."+d),$element:f,dropdownId:"edit-dropdown-"+d+"-"+b,types:this.options.fieldTypes[d],mapperId:parseInt(a[d][b].mapperId),dropdownData:null,$dropdown:null}),this.sandbox.dom.append(j,f);return j},K=function(){var a,b,c,d;for(a=-1,b=this.editFieldsData.length;++a<b;)for(this.editFieldsData[a].dropdownData=[],c=-1,d=this.editFieldsData[a].types.length;++c<d;)this.editFieldsData[a].dropdownData.push({id:this.editFieldsData[a].types[c].id,name:this.editFieldsData[a].name+" ("+this.editFieldsData[a].types[c].name+")"})},L=function(){K.call(this);for(var a=-1,b=this.editFieldsData.length;++a<b;)this.editFieldsData[a].$dropdown=this.sandbox.dom.find("#"+this.editFieldsData[a].dropdownId,this.editFieldsData[a].$element),this.sandbox.start([{name:"select@husky",options:{el:this.editFieldsData[a].$dropdown,instanceName:this.editFieldsData[a].dropdownId,data:this.editFieldsData[a].dropdownData,preSelectedElements:[this.editFieldsData[a].type.id]}}])},M=function(){var a=this.sandbox.dom.createElement("<div>");this.sandbox.dom.append(this.$el,a),this.$editOverlayContent=J.call(this),this.sandbox.start([{name:"overlay@husky",options:{el:a,title:this.sandbox.translate("public.edit-fields"),openOnStart:!0,removeOnClose:!0,instanceName:"edit-fields",data:this.$editOverlayContent,okCallback:E.bind(this),cancelCallback:x.bind(this)}}]),L.call(this),v.call(this)},N=function(b,c){var d,e,f,g=!b;this.sandbox.emit("husky.overlay.add-fields.remove"),this.sandbox.emit("husky.overlay.edit-fields.remove"),b||(b={country:{id:this.options.defaultTypes.country.id},addressType:{id:this.options.defaultTypes.addressType.id}}),this.sandbox.util.extend(!0,b,{translate:this.sandbox.translate,countries:this.options.fieldTypes.countries}),d=this.sandbox.util.template(a,b),e=this.sandbox.dom.createElement("<div>"),this.sandbox.dom.append(this.$el,e),f=this.sandbox.translate(g?"contact.address.add.label":"contacts.edit-address"),this.sandbox.start([{name:"overlay@husky",options:{el:e,title:f,openOnStart:!0,removeOnClose:!0,instanceName:"add-address",data:d,skin:"wide",okCallback:S.bind(this,c),cancelCallback:R.bind(this)}}]),this.data=b},O=function(a,c){var d,e,f,g=!a;a||(a={}),this.sandbox.util.extend(!0,a,{translate:this.sandbox.translate}),d=this.sandbox.util.template(b,a),e=this.sandbox.dom.createElement("<div>"),this.sandbox.dom.append(this.$el,e),f=this.sandbox.translate(g?"contact.accounts.bankAccounts.add.label":"contact.accounts.bankAccounts.edit.label"),this.sandbox.start([{name:"overlay@husky",options:{el:e,title:f,openOnStart:!0,removeOnClose:!0,instanceName:"add-bank-account",data:d,skin:"wide",okCallback:P.bind(this,c),cancelCallback:Q.bind(this)}}]),this.data=a},P=function(a){var b;return this.sandbox.form.validate(d.bankAccountFormId,!0)?(b=this.sandbox.form.getData(d.bankAccountFormId,!0),a?this.sandbox.form.editInCollection(this.form,a,b):this.sandbox.form.addToCollection(this.form,"bankAccounts",b),this.sandbox.emit(h.call(this)),this.sandbox.emit(k.call(this)),void Q.call(this)):!1},Q=function(){this.sandbox.dom.off(d.bankAccountFormId)},R=function(){this.sandbox.dom.off(d.addressFormId),this.sandbox.stop(d.addressTypeSelector)},S=function(a){var b,c;return this.sandbox.form.validate(d.addressFormId)?(b=this.sandbox.form.getData(d.addressFormId,!0),a?(this.sandbox.form.editInCollection(this.form,a,b),c=this.$find('[data-mapper-id="'+a+'"]'),V.call(this,c)):this.sandbox.form.addToCollection(this.form,"addresses",b).then(function(a){V.call(this,a)}.bind(this)),this.sandbox.emit(h.call(this)),this.sandbox.emit(i.call(this)),void R.call(this)):!1},T=function(){var a,b,c={};this.dropdownDataArray=[],this.$addOverlay=this.sandbox.dom.createElement(e.add),this.sandbox.util.foreach(this.options.fields,function(b,d){if(!this.options.fieldTypes||!this.options.fieldTypes[b])throw"contact-form@sulu: fieldTypes not defined for type "+b;a={id:d,name:this.sandbox.translate("public."+b),type:b,collection:b+"s",items:this.options.translatedFieldTypes[b]},c[b]=a}.bind(this)),c.fax.collection="faxes",this.dropdownDataArray=Object.keys(c).map(function(a){return c[a]}),b=this.sandbox.dom.createElement("<div>"),this.sandbox.dom.append(this.$el,b),this.sandbox.start([{name:"overlay@husky",options:{el:b,title:this.sandbox.translate("public.add-fields"),openOnStart:!0,removeOnClose:!0,instanceName:"add-fields",okInactive:!0,data:this.$addOverlay,okCallback:D.bind(this)}},{name:"dependent-select@husky",options:{el:this.$addOverlay,singleSelect:!0,data:this.dropdownDataArray,defaultLabels:this.sandbox.translate("public.please-choose"),instanceName:"add-fields",container:["#"+d.fieldId,"#"+d.fieldTypeId]}}])},U=function(){var a,b,c=this.sandbox.dom.find("label.hidden","#contact-edit-form");for(a=-1,b=c.length;++a<b;)V.call(this,this.sandbox.dom.parent(c[a]))},V=function(a){var b=this.sandbox.dom.trim(this.sandbox.dom.text(this.sandbox.dom.find("label.hidden",a)));b=b.replace(/\s{2,}/g," "),this.sandbox.dom.attr(this.sandbox.dom.find("label.visible",a),"title",b),this.sandbox.dom.html(this.sandbox.dom.find("label.visible",a),this.sandbox.util.cropMiddle(b,20))};return{initialize:function(){this.initialized=!1,this.$editOverlayContent=null,this.form=null,this.$addOverlay=null,this.dropdownDataArray=[],this.editFieldsData=[],this.data=null,this.options=this.sandbox.util.extend(!0,{},c,this.options),I.call(this),this.render(),n.call(this),o.call(this),this.sandbox.emit(g.call(this)),this.initialized=!0},render:function(){var a=this.sandbox.dom.createElement('<div id="contact-form-options-container" />'),b=this.$find(d.dropdownContainerId);this.sandbox.dom.append(b,a),this.sandbox.start([{name:"dropdown@husky",options:{trigger:b,triggerOutside:!0,el:a,alignment:"right",shadow:!0,toggleClassOn:b,data:[{id:1,name:"public.edit-fields",callback:M.bind(this)},{id:2,name:"public.add-fields",callback:T.bind(this)}]}}])}}});