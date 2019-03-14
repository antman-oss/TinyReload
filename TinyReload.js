define( [ "qlik"
],
function ( qlik) {

	return {
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		definition: {
			type: "items",
        	component: "accordion",
        	items: {
				Options: {
					uses: "settings",
					label: "Options",
					items: {
						option: {
							type: "items",
							label: "Options",
							items: {
								Partial_Reload: {
									ref: "props.partial",
									label: "Partial Reload",
									type: "boolean"
								}
							}	
						}
					}
				}
			}	
		},
		paint: function ($element,layout) {
			//add your rendering code here
			var app = qlik.currApp(this);	
			var height = $element.height(),
				width = $element.width();
			
			//Auto adjust images containers
			var contain;
			width < height ? contain = width + 'px' : contain = height + 'px'; 
			
			var $ctrl = $('<div style="height:' + height + '%;width:' + width + ';" id="reloadNow">');
			var html = '<img id="bg" src="/extensions/TinyReload/A0.png" style="width:' + contain + ';height:' + contain + '";>'
			$ctrl.html(html);
			$element.html( $ctrl );
			
			document.getElementById ("reloadNow").addEventListener ("click", reloadNow, false);
			function reloadNow(){
				
				//Animate Logo
				var images = ["/extensions/TinyReload/A0.png","/extensions/TinyReload/A1.png","/extensions/TinyReload/A2.png","/extensions/TinyReload/A3.png","/extensions/TinyReload/A4.png"]
				var x = 1;
				function changeBG(){
				  document.getElementById("bg").src = images[x];
				  if(x == 4 ){
					x = 1;
				  }else{
					x++;
				  };
				};
				
				//Partial Reload
				if(layout.props.partial == true){
					var timer = setInterval( changeBG, 300);
					app.doReload(0,true).then( function () {
						clearTimeout(timer);
						setTimeout(function() { document.getElementById("bg").src = "/extensions/TinyReload/A0.png"}, 300);
						app.doSave();
					})
				}else{ //Full Reload
					var timer = setInterval( changeBG, 300);
					app.doReload(0,false).then( function () {
						clearTimeout(timer)
						setTimeout(function() { document.getElementById("bg").src = "/extensions/TinyReload/A0.png"}, 300);
						app.doSave();
					});
				};
  			};
			
		} //End Paint
	};

} );

