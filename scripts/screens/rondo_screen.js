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
		this.mPitch = new Pitch(this);
 
		//websocket
		this.mWebSocket = null;

		//for esc full screen
		document.addEventListener('fullscreenchange', exitHandler);
		document.addEventListener('webkitfullscreenchange', exitHandler);
		document.addEventListener('mozfullscreenchange', exitHandler);
		document.addEventListener('MSFullscreenChange', exitHandler);

		function exitHandler() 
		{
    			if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) 
			{
				APPLICATION.getCurrentScreen().hideCanvas();
    			}
		}
	}

	hitFullScreen()
	{
		var s = APPLICATION.getCurrentScreen();
		s.showCanvas();

		//lets go full screen
		var canvas = APPLICATION.getCurrentScreen().getCanvas(); 

		if (canvas.requestFullscreen) 
		{
    			canvas.requestFullscreen();
  		} 
		else if (canvas.mozRequestFullScreen) 
		{ /* Firefox */
    			canvas.mozRequestFullScreen();
  		} 
		else if (canvas.webkitRequestFullscreen) 
		{ /* Chrome, Safari & Opera */
    			canvas.webkitRequestFullscreen();
  		} 
		else if (canvas.msRequestFullscreen) 
		{ /* IE/Edge */
    			canvas.msRequestFullscreen();
  		}
              
		//make canvas dimensions the size of physical screen for best resolution
		s.mCanvas.width = screen.width;
		s.mCanvas.height = screen.height;
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

	enter()
	{
		super.enter();
		this.initializeWebSocket();
	}

	initializeWebSocket()
	{
		this.mWebSocket = new WebSocket('ws://127.0.0.1:8080/');

                this.mWebSocket.onopen = function ()
                {
			//might want to do some acknowledgement here to make try to open again if it fails?
                }

                this.mWebSocket.onmessage = function(event)
                {
			//process data
			if (APPLICATION.getCurrentScreen().mPitch)
			{
				APPLICATION.getCurrentScreen().mPitch.processData(event.data);
			}
                }
	}
}
