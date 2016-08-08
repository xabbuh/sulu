define(["underscore","config","text!./form.html"],function(a,b,c){"use strict";var d="#custom-url-form",e={options:{saveCallback:function(){}},templates:{form:c,urlList:'<div><div id="webspace-custom-urls-url-list-toolbar"/><div id="webspace-custom-urls-url-list"/></div>',skeleton:'<div id="webspace-custom-urls-overlay"/>',url:"/admin/api/webspaces/<%= webspaceKey %>/custom-urls<% if (!!id) { %>/<%= id %><% } %>?locale=<%= locale %>",routeUrl:'/admin/api/webspaces/<%= webspaceKey %>/custom-urls/<%= id %>/routes?ids=<%= ids.join(",") %>'},translations:{overlayTitle:"custom-urls.webspace.settings.edit.title",chooseTargetCancel:"custom-urls.choose-target.cancel",customUrlDefaultValue:"custom-urls.custom-url.default-value",localeDefaultValue:"public.please-choose",titleDetails:"public.details",titleUrls:"custom-urls.urls-title",history:"custom-urls.history",descriptionCanonical:"custom-urls.canonical.description",descriptionRedirect:"custom-urls.redirect.description",descriptionNoIndex:"custom-urls.no-index.description",descriptionNoFollow:"custom-urls.no-follow.description"}},f={targetRootUrl:"/admin/api/nodes?webspace={webspace}&language={locale}&fields=title,order,published&webspace-nodes=single",targetSelectedUrl:"/admin/api/nodes/{datasource}?tree=true&webspace={webspace}&language={locale}&fields=title,order,published&webspace-nodes=single"};return{defaults:e,initialize:function(){this.bindCustomEvents(),this.$el.html(this.templates.skeleton),this.startOverlay()},bindCustomEvents:function(){this.sandbox.on("husky.datagrid.custom-urls-overlay.number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar.custom-urls-overlay.item."+b,"delete",!1)}.bind(this)),this.sandbox.on("husky.toggler.custom-url-redirect.changed",function(a){a?$(".redirect-hide").hide():$(".redirect-hide").show()}.bind(this))},bindDomEvents:function(){this.sandbox.dom.on("#analytics-all-domains","change",function(){$("#analytics-domains-container").toggle()}),this.sandbox.dom.on(this.$el,"click",function(){return this.sandbox.emit("husky.overlay.custom-urls.slide-to",1),!1}.bind(this),".custom-url-target, #custom-url-target-button"),this.sandbox.dom.on(this.$el,"click",function(){return this.target=null,$("#custom-url-target-button-clear").hide(),$("#custom-url-target-value").val(""),!1}.bind(this),"#custom-url-target-button-clear")},startOverlay:function(){var c=b.get("sulu_security.contexts")["sulu.webspace_settings."+this.options.webspace.key+".custom-urls"],e=[{title:this.translations.titleDetails,data:this.templates.form({translations:this.translations})}],f=[{type:"cancel",inactive:!1,align:"center"}];(this.options.id&&c.edit||!this.options.id&&c.add)&&(f=[{type:"ok",inactive:!1,align:"right"},{type:"cancel",inactive:!1,align:"left"}]),this.data.routes&&a.size(this.data.routes)>0&&c.edit&&e.push({title:this.translations.titleUrls,data:this.templates.urlList({translations:this.translations})}),this.sandbox.start([{name:"overlay@husky",options:{el:"#webspace-custom-urls-overlay",instanceName:"custom-urls",openOnStart:!0,removeOnClose:!0,slides:[{title:this.translations.overlayTitle,tabs:e,okCallback:function(){return this.sandbox.form.validate(d)&&(this.sandbox.emit("husky.overlay.custom-urls.show-loader"),this.options.saveCallback(this.options.id,this.getData()).done(function(){this.sandbox.emit("husky.overlay.custom-urls.close"),this.sandbox.emit("husky.overlay.custom-urls.hide-loader")}.bind(this)).fail(function(a){switch(this.sandbox.emit("husky.overlay.custom-urls.hide-loader"),a.responseJSON.code){case 9001:var b=$("#custom-url-title");b.parent().addClass("husky-validate-error"),b.focus();break;case 1103:case 9003:$("#custom-url-input").parent().addClass("husky-validate-error")}}.bind(this))),!1}.bind(this),buttons:f},{title:this.translations.overlayTitle,data:'<div id="target-select" class="data-source-content"/>',cssClass:"data-source-slide",okInactive:!0,buttons:[{type:"cancel",text:this.translations.chooseTargetCancel,align:"center"}],cancelCallback:function(){return this.sandbox.emit("husky.overlay.custom-urls.slide-to",0),!1}.bind(this)}]}}]).then(function(){this.sandbox.form.create(d).initialized.then(function(){this.sandbox.form.setData(d,this.data).then(this.initializeFormComponents.bind(this)),this.bindDomEvents()}.bind(this))}.bind(this))},getData:function(){var a=this.sandbox.form.getData(d),b=this.target||null;return!b&&this.data.targetDocument&&(b=this.data.targetDocument.id),a.targetDocument=b?{uuid:b}:null,a},initializeFormComponents:function(){this.customUrls={};var b=a.chain(this.data.routes).map(function(a,b){return a.history?{uuid:a.uuid,route:b,created:a.created}:null}).filter(function(a){return null!==a}).value(),c=a.map(this.options.webspace.customUrls,function(a){return this.customUrls[a.url]=a,a.url}.bind(this)),d=this.filterConcreteLocales(this.data.baseDomain,this.data.targetDocument?this.data.targetDocument.concreteLanguages||[]:[]);this.sandbox.start([{name:"toggler@husky",options:{el:"#custom-url-published"}},{name:"webspace/settings/custom-url/input@sulucustomurl",options:{el:"#custom-url-input",baseDomain:this.data.baseDomain}},{name:"select@husky",options:{el:"#custom-url-base-domain",isNative:!0,data:c,defaultLabel:this.translations.customUrlDefaultValue,selectCallback:function(a,b){$("#custom-url-input-container").show(),this.sandbox.emit("sulu.webspace-settings.custom-url.set-base-domain",b);var c,d=$("#custom-url-target-value").data("item");d&&(c=this.filterConcreteLocales(this.getData().baseDomain,d.concreteLanguages),this.sandbox.emit("husky.select.target-locale.update",c,[c[0]],!1))}.bind(this),preselectCallback:function(){}}},{name:"select@husky",options:{el:"#custom-url-target-locale",instanceName:"target-locale",isNative:!0,data:d,defaultLabel:this.translations.localeDefaultValue,preselectCallback:function(){}}},{name:"toggler@husky",options:{el:"#custom-url-redirect",instanceName:"redirect"}},{name:"toggler@husky",options:{el:"#custom-url-canonical"}},{name:"toggler@husky",options:{el:"#custom-url-no-index"}},{name:"toggler@husky",options:{el:"#custom-url-no-follow"}},{name:"content-datasource@sulucontent",options:{el:"#target-select",selected:this.data.targetDocument?this.data.targetDocument.uuid:null,webspace:this.options.webspace.key,locale:this.data.locale||this.options.webspace.localizations[0].localization,instanceName:"custom-urls",rootUrl:f.targetRootUrl,selectedUrl:f.targetSelectedUrl,resultKey:"nodes",selectCallback:function(a,b,c,d){var e=$("#custom-url-target-value");e.val(c),e.data("item",d),$("#custom-url-target-button-clear").show();var f=this.filterConcreteLocales(this.getData().baseDomain,d.concreteLanguages);this.sandbox.emit("husky.select.target-locale.update",f,[f[0]],!1),this.target=a,this.sandbox.emit("husky.overlay.custom-urls.slide-to",0)}.bind(this)}},{name:"list-toolbar@suluadmin",options:{el:"#webspace-custom-urls-url-list-toolbar",hasSearch:!1,instanceName:"custom-urls-overlay",template:this.sandbox.sulu.buttons.get({"delete":{options:{disabled:!0,callback:this.deleteUrl.bind(this)}}})}},{name:"datagrid@husky",options:{el:"#webspace-custom-urls-url-list",instanceName:"custom-urls-overlay",data:b,idKey:"uuid",viewOptions:{table:{selectItem:{type:"checkbox",inFirstCell:!1}}},matchings:[{content:this.translations.customUrl,attribute:"route"},{content:this.translations.created,attribute:"created",type:"datetime"}]}}]),this.data.baseDomain&&$("#custom-url-input-container").show(),this.data.targetDocument&&($("#custom-url-target-value").val(this.data.targetDocument.title),$("#custom-url-target-button-clear").show()),this.data.redirect&&$(".redirect-hide").hide()},filterConcreteLocales:function(a,b){if(!a||!b)return[];var c=[];for(var d in this.customUrls[a].locales){var e=this.customUrls[a].locales[d].localization;-1!==b.indexOf(e)&&c.push(e)}return c},deleteUrl:function(){var a=this.sandbox.util.deepCopy($("#webspace-custom-urls-url-list").data("selected"));this.sandbox.sulu.showDeleteDialog(function(b){b&&this.sandbox.util.save(this.templates.routeUrl({webspaceKey:this.options.webspace.key,id:this.options.id,ids:a}),"DELETE").done(function(){for(var b=0,c=a.length;c>b;b++){var d=a[b];this.sandbox.emit("husky.datagrid.custom-urls-overlay.record.remove",d)}}.bind(this))}.bind(this))},loadComponentData:function(){var a=this.sandbox.data.deferred();return this.options.id?(this.sandbox.util.load(this.templates.url({webspaceKey:this.options.webspace.key,id:this.options.id,locale:this.sandbox.sulu.getDefaultContentLocale()})).then(function(b){a.resolve(b)}),a):(a.resolve({canonical:!0}),a.promise())}}});