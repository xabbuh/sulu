define(function(){"use strict";var a={unselectOnBackgroundClick:!0,selectable:!0,selectOnAction:!1,imageFormat:"190x",emptyListTranslation:"public.empty-list",fields:{image:"thumbnails",title:["title"],description:["mimeType","size"]},separators:{title:" ",description:", "}},b={masonryGridId:"masonry-grid",emptyIndicatorClass:"empty-list",itemHeadClass:"item-head",itemInfoClass:"item-info",selectedClass:"selected",loadingClass:"loading",headIconClass:"head-icon",headImageClass:"head-image",actionNavigatorClass:"action-navigator",downloadNavigatorClass:"download-navigator"},c={emptyIndicator:['<div class="'+b.emptyIndicatorClass+'" style="display: none">','   <div class="fa-coffee icon"></div>',"   <span><%= text %></span>","</div>"].join(""),item:['<div class="masonry-item '+b.loadingClass+'">','   <div class="masonry-head '+b.actionNavigatorClass+'">','       <div class="fa-coffee '+b.headIconClass+'"></div>','       <img ondragstart="return false;" class="'+b.headImageClass+'" src="<%= image %>"/>',"   </div>",'   <div class="masonry-info">','       <span class="title '+b.actionNavigatorClass+'"><%= title %></span><br/>','       <span class="description '+b.actionNavigatorClass+'"><%= description %></span>',"   </div>",'   <div class="masonry-footer">',"       <% if (!!selectable) { %>",'       <div class="footer-checkbox custom-checkbox"><input type="checkbox"><span class="icon"></span></div>',"       <% } %>",'       <a href= "<%= downloadUrl %>" class="fa-cloud-download footer-download '+b.downloadNavigatorClass+'"></a>',"   </div>","</div>"].join("")},d=function(a,b,c){if(a&&b){var d=[];return b.forEach(function(b){a[b]&&d.push(a[b])}),d.join(c)}},e=function(a){var b=this.sandbox.util.extend(!1,{},a);return this.datagrid.matchings.forEach(function(a){var c=a.type===this.datagrid.types.THUMBNAILS?this.options.imageFormat:"";b[a.attribute]=this.datagrid.processContentFilter.call(this.datagrid,a.attribute,b[a.attribute],a.type,c)}.bind(this)),b};return{initialize:function(b,c){this.datagrid=b,this.sandbox=this.datagrid.sandbox,this.options=this.sandbox.util.extend(!0,{},a,c),this.setVariables()},setVariables:function(){this.rendered=!1,this.$el=null,this.$items={}},render:function(a,b){this.renderMasonryContainer(b),this.initializeMasonryGrid(),this.bindGeneralDomEvents(),this.renderRecords(a.embedded),this.rendered=!0},renderMasonryContainer:function(a){this.$el=this.sandbox.dom.createElement('<div class="masonry-container"/>');var d=this.sandbox.util.template(c.emptyIndicator,{text:this.sandbox.translate(this.options.emptyListTranslation)});this.sandbox.dom.append(this.$el,d);var e=this.sandbox.dom.createElement('<div id="'+b.masonryGridId+'"/>');this.sandbox.dom.append(this.$el,e),this.sandbox.dom.append(a,this.$el)},updateEmptyIndicatorVisibility:function(){this.datagrid.data.embedded&&this.datagrid.data.embedded.length>0?this.sandbox.dom.hide("."+b.emptyIndicatorClass):this.sandbox.dom.show("."+b.emptyIndicatorClass)},initializeMasonryGrid:function(){this.sandbox.masonry.initialize("#"+b.masonryGridId,{align:"left",direction:"left",itemWidth:190,offset:30,verticalOffset:20,possibleFilters:[b.selectedClass]})},bindGeneralDomEvents:function(){this.options.unselectOnBackgroundClick&&this.sandbox.dom.on("body","click.masonry",function(){this.deselectAllRecords()}.bind(this))},renderRecords:function(a,b){this.updateEmptyIndicatorVisibility(),this.sandbox.util.foreach(a,function(a){var c=e.call(this,a),f=c.id,g=c[this.options.fields.image].url||"",h=c.url,i=d(c,this.options.fields.title,this.options.separators.title),j=d(c,this.options.fields.description,this.options.separators.description);this.renderItem(f,g,h,i,j,b)}.bind(this))},renderItem:function(a,d,e,f,g,h){this.$items[a]=this.sandbox.dom.createElement(this.sandbox.util.template(c.item,{image:d,downloadUrl:e,title:this.sandbox.util.cropMiddle(String(f),24),description:this.sandbox.util.cropMiddle(String(g),32),selectable:this.options.selectable})),this.datagrid.itemIsSelected.call(this.datagrid,a)&&this.selectRecord(a),h?this.sandbox.dom.append(this.sandbox.dom.find("#"+b.masonryGridId,this.$el),this.$items[a]):this.sandbox.dom.prepend(this.sandbox.dom.find("#"+b.masonryGridId,this.$el),this.$items[a]),this.bindItemLoadingEvents(a),this.bindItemDomEvents(a)},bindItemDomEvents:function(a){this.sandbox.dom.on(this.$items[a],"click",function(b){this.sandbox.dom.stopPropagation(b),this.datagrid.itemAction.call(this.datagrid,a),this.options.selectOnAction&&this.toggleItemSelected(a)}.bind(this),"."+b.actionNavigatorClass),this.options.selectable&&this.sandbox.dom.on(this.$items[a],"click",function(b){this.sandbox.dom.stopPropagation(b),this.toggleItemSelected(a)}.bind(this))},bindItemLoadingEvents:function(a){this.sandbox.dom.one($(this.$items[a]).find("."+b.headImageClass),"load",function(){this.sandbox.dom.remove($(this.$items[a]).find("."+b.headIconClass)),this.sandbox.masonry.refresh("#"+b.masonryGridId,!0),this.sandbox.dom.removeClass(this.$items[a],b.loadingClass)}.bind(this)),this.sandbox.dom.one($(this.$items[a]).find("."+b.headImageClass),"error",function(){this.sandbox.dom.remove($(this.$items[a]).find("."+b.headImageClass)),this.sandbox.masonry.refresh("#"+b.masonryGridId,!0),this.sandbox.dom.removeClass(this.$items[a],b.loadingClass)}.bind(this))},toggleItemSelected:function(a){this.datagrid.itemIsSelected.call(this.datagrid,a)===!0?this.deselectRecord(a):this.selectRecord(a)},extendOptions:function(a){this.options=this.sandbox.util.extend(!0,{},this.options,a)},destroy:function(){this.sandbox.dom.off("body","click.masonry"),this.sandbox.masonry.destroy("#"+b.masonryGridId),this.sandbox.dom.remove(this.$el)},addRecord:function(a,b){this.renderRecords([a],b)},removeRecord:function(a){return this.$items[a]?(this.sandbox.dom.remove(this.$items[a]),this.sandbox.masonry.refresh("#"+b.masonryGridId,!0),this.datagrid.removeRecord.call(this.datagrid,a),this.updateEmptyIndicatorVisibility(),!0):!1},selectRecord:function(a){this.sandbox.dom.addClass(this.$items[a],b.selectedClass),$(this.$items[a]).attr("data-filter-class",JSON.stringify([b.selectedClass])),this.sandbox.dom.is(this.sandbox.dom.find('input[type="checkbox"]',this.$items[a]),":checked")||this.sandbox.dom.prop(this.sandbox.dom.find('input[type="checkbox"]',this.$items[a]),"checked",!0),this.datagrid.setItemSelected.call(this.datagrid,a)},deselectRecord:function(a){this.sandbox.dom.removeClass(this.$items[a],b.selectedClass),$(this.$items[a]).attr("data-filter-class",JSON.stringify([])),this.sandbox.dom.is(this.sandbox.dom.find('input[type="checkbox"]',this.$items[a]),":checked")&&this.sandbox.dom.prop(this.sandbox.dom.find('input[type="checkbox"]',this.$items[a]),"checked",!1),this.datagrid.setItemUnselected.call(this.datagrid,a)},deselectAllRecords:function(){this.sandbox.util.each(this.$items,function(a){this.deselectRecord(Number(a))}.bind(this))},showSelected:function(a){var c=[],d=$(".masonry-item:not(.selected)");a?(c.push(b.selectedClass),d.hide()):d.show(),this.sandbox.masonry.updateFilterClasses("#"+b.masonryGridId),this.sandbox.masonry.filter("#"+b.masonryGridId,c)}}});