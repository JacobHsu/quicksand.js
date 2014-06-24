$(document).ready(function(){
	var items =$('#gallery li'),
	itemsByTags ={};

	//Loop through tags
	items.each(function(i){
		var elem =$(this),
		tags = elem.data('tags').split(',');
	
		//Add data attribute for quicksand
		elem.attr('data-id',i);
		
		$.each(tags,function(key,value){
			//Remove 
			value = $.trim(value);
		    //console.log('tags value='+value);
			if(!(value in itemsByTags)){
				//Add empty value
				itemsByTags[value] =[];
			}
			
			//Add image to array
			itemsByTags[value].push(elem);
			//console.log(elem);
		});
	});
	
	//Create "All items" options
	createList("All categorie",items);
	
	$.each(itemsByTags,function(key,value){
		createList(key,value);
	});
	
	//Click Handler
	
	$('#navbar a').live('click',function(e){
		var link = $(this);
		
		//Add active class
		link.addClass('active').siblings().removeClass('active');
		
		$('#gallery').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});
	
	$('#navbar a:first').click();
	
	//Create the lists
	function createList(text,items){
		//create empty ul
		var ul = $('<ul>',{'class':'hidden'});
		
		//Create menu item
		var a = $('<a>',{
			html:text,
			href: '#',
			data:{list:ul}
		}).appendTo('#navbar');
		
		//Add gallery div
		ul.appendTo("#gallery");
		
		//Add items
		$.each(items,function(){
			$(this).clone().appendTo(ul);
		});
		

		

	}
	
});