var i = 0
var showString= "Lorem ipsum dolor sit amet, consectetur adipisc elit." 
				+"Proin ultricies vestibulum velit.Lorem ipsum dolor sit amet."
				+"when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				+"Proin ultricies vestibulum velit."
				+"Lorem ipsum dolor sit amet."
				+"when an unknown printer took Proin ultricies vestibulum velit."
				+"Lorem ipsum dolor sit amet"
function marquee()
{
var stringLength= showString.length
document.show.marquee1.value= document.show.marquee1.value + showString.charAt(i)
i++
var timeID= setTimeout("marquee()",70)
if (i >= stringLength)
	{clearTimeout(timeID); i=0;}
}