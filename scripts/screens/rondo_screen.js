'use strict';

class RondoScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'rondo_screen';

          	this.setHtml(document.getElementById("rondo_screen_html_id"));
                this.setMessageElement(document.getElementById("rondo_screen_message_id"));
          	this.setForm(document.getElementById("rondo_screen_form_id"));
          	this.setSpinner(document.getElementById("rondo_screen_spinner_id"));

               	this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });

		document.getElementById("rondoscreenfullbuttonid").onclick = this.hitFullScreen.bind(document.getElementById("rondoscreenfullbuttonid"));
	
		//game objects
		this.mPitch = null;

		//for esc full screen
		document.addEventListener('fullscreenchange', exitHandler);
		document.addEventListener('webkitfullscreenchange', exitHandler);
		document.addEventListener('mozfullscreenchange', exitHandler);
		document.addEventListener('MSFullscreenChange', exitHandler);

		function exitHandler() 
		{
    			if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) 
			{
				if (APPLICATION.getCurrentScreen().mPitch)
				{
					APPLICATION.getCurrentScreen().mPitch.removeDivs();
				}
				APPLICATION.getCurrentScreen().mPitch = null;
    			}
		}
	}

	hitFullScreen()
	{
		APPLICATION.getCurrentScreen().mPitch = new Pitch(APPLICATION.getCurrentScreen());

		var elem = document.getElementById("svg_div_id");

  			if (elem.requestFullscreen) 
			{
    				elem.requestFullscreen();
  			} else if (elem.mozRequestFullScreen) 
			{ /* Firefox */
    				elem.mozRequestFullScreen();
  			} 
			else if (elem.webkitRequestFullscreen) 
			{ /* Chrome, Safari & Opera */
   				elem.webkitRequestFullscreen();
  			} 
			else if (elem.msRequestFullscreen) 
			{ /* IE/Edge */
    				elem.msRequestFullscreen();
  			}
	}

	update()
	{
		super.update();

		//now update pitch. pitch will update players
		if (this.mPitch)
		{
			this.mPitch.update();
		}
	}
}
