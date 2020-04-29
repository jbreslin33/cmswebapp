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
				//APPLICATION.getCurrentScreen().hideCanvas();
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
		/*

		var s = APPLICATION.getCurrentScreen();
		s.showCanvas();

		//lets go full screen
		var canvas = APPLICATION.getCurrentScreen().getCanvas(); 

		if (canvas.requestFullscreen) 
		{
    			canvas.requestFullscreen();
  		} 
		else if (canvas.mozRequestFullScreen) 
		{ 
    			canvas.mozRequestFullScreen();
  		} 
		else if (canvas.webkitRequestFullscreen) 
		{ 
    			canvas.webkitRequestFullscreen();
  		} 
		else if (canvas.msRequestFullscreen) 
		{
    			canvas.msRequestFullscreen();
  		}
              
		//make canvas dimensions the size of physical screen for best resolution
		s.mCanvas.width = screen.width;
		s.mCanvas.height = screen.height;
		*/
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
