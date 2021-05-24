var schoolname = 'template'
var today = new Date();
var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var time = months[today.getMonth() + 1] + ' ' + today.getDate() + ', ' + today.getFullYear()

$(document).ready(function(){
  $('.parallax').parallax();
});

$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
});

 $(document).ready(function(){
    $('.modal').modal();
  });

var scrollUp = document.getElementById("top");
scrollUp.addEventListener("click", function(){
  window.scrollTo(0,0);
})

var scrollDown = document.getElementById("bottom");
scrollDown.addEventListener("click", function(){
  var height = window.innerHeight
  window.scrollTo(0, height)
})

//function bodyChange(){
//  var select = document.getElementById('subjects')
//  var bodyAdditons = []
//  var bodyAdditons = ['no u',
//    'I would like to join Iteam at ' + schoolname + '. ',
//    'I would like to learn more about Iteam, and have potential interest. ',
//    '\n \n \n --This email was sent with automatic additions at ' + time + '. '
//  ]
//  for (var i=0; i<4; i++) //the loop loops for all options; increase the number of options, increase this amount.
//  {
//      var childOption = select.getElementsByTagName('option')[i];
//     if (childOption.selected == true) {
//      document.getElementById('mailto').href += bodyAdditons[i];
//    }
//  }
//}
//document.getElementById('mailto').addEventListener('click', bodyChange())
//document.getElementById('date3').innerHTML = time


// DO NOT MESS WITH THIS SECTION IF YOU DO NOT KNOW WHAT YOU ARE DOING!! IF THIS GETS BROKEN, MOST OF THE CONTENT ON THE SUPPORTING PAGE GETS BROKEN!!! SAME GOES WITH THE SUPPORTING .JSON FILE!!!!!
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState ==4 && this.status == 200){
		var pageObj = JSON.parse(this.responseText);
		$('.primaryColor').each(function(){this.classList.add(pageObj.primaryColor)})
		$('.accentColor').each(function(){this.classList.add(pageObj.accentColor)});
		$('.accentTextColor').each(function(){this.classList.add(pageObj.accentTextColor)});
		
		document.getElementById('parallaximg').src = pageObj.backgroundImage;

		for (i in pageObj.contactOptions){
			var option = document.createElement('option');
			option.value = i
			option.innerHTML = pageObj.contactOptions[i].name
			
			var options = pageObj.contactOptions[i].options.split(' ');
			console.log(options)
			document.getElementById('subjects').appendChild(option)
			for (j in options){
				if (options[j] != ""){
					option.setAttribute(options[j], options[j]);
				}
			}
			
		}
   		$('select').formSelect();

		for (i in pageObj.content){
			var row = pageObj.content[i]
			for (j in row){
				var item = row[j]
				var rows = document.createElement('div')
				rows.classList = "row"
				rows.id = i
				document.getElementById('section').appendChild(rows)

				var col = document.createElement('div')
				if (item.size !== "" && item.size !== undefined){
					var colClasses = item.size.split(' ')
					for (k in colClasses){
						col.classList.add(colClasses[k]);
					}
				}
				document.getElementById(i).appendChild(col);
				
				if (item.type == "card"){
					var card = document.createElement('div');
					card.className = pageObj.accentColor 
					card.classList.add('card', 'darken-1');
					card.id = "card" + i + " " + j
					col.appendChild(card);
					

					var cardContent = document.createElement('div');
					cardContent.classList.add('card-content');
					cardContent.classList += pageObj.accentTextColor
					cardContent.id = "cardContent" + i + " " + j
					card.appendChild(cardContent);

					if (item.img != "" && item.img !== undefined){
						var cardImage = document.createElement('div')
						cardImage.classList.add('card-image')
						cardImage.id = "cardImage" + i + " " + j
						document.getElementById('card'+i+' '+j).insertBefore(cardImage, document.getElementById('cardContent'+i+' '+j));
						
						var image = document.createElement('img')
						image.src = item.img
						document.getElementById('cardImage'+i+' '+j).appendChild(image);

						var cardTitle = document.createElement('span');
						cardTitle.classList.add('card-title');
						cardTitle.innerHTML = item.title
						document.getElementById('cardImage'+i+' '+j).appendChild(cardTitle);
					} else {

					
						var cardTitle = document.createElement('span');
						cardTitle.classList.add('card-title');
						cardTitle.innerHTML = item.title
	    					document.getElementById('cardContent'+i+' '+j).appendChild(cardTitle);

					}

					var cardText = document.createElement('p');
					cardText.innerHTML = item.text
					document.getElementById('cardContent'+i+' '+j).appendChild(cardText);

					var cardAction = document.createElement('div');
					cardAction.classList.add('card-action');
					cardAction.id = "cardAction" + i + ' ' + j
					document.getElementById('card'+i+' '+j).appendChild(cardAction);
					
					if (item.link != "" && item.link !== undefined){
						var cardLink = document.createElement('a');
						cardLink.innerHTML = item.linkText 
						cardLink.href = item.link
						document.getElementById('cardAction'+i+' '+j).appendChild(cardLink)
					}
				} else {
					try {
						var obj = document.createElement(item.type);
						obj.classList = item.classes
						document.getElementById(i).appendChild(obj)
						//for (k in objClasses) {
						//	col.classList.add(colClasses(k));
						//}
					} catch (error) {
						console.error(error);
					}
				}
			}
		}
	}
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();
