'use strict';

class Pitch
{
        constructor(screen)
        {
		this.mScreen = screen;
		//console.log("new pitch");
		
		//width and height for this canvas
		//screen.mCanvas.width = 315;
		//screen.mCanvas.height = 204;

		//document.body.insertBefore(this.mCanvas,document.body.childNodes[0]);
		document.getElementById("rondo_screen_html_id").appendChild(screen.mCanvas);

		this.mFrameNumber = 0;
		this.mInterval = setInterval(this.update,20);

		this.mClient = new Client();

		this.mPlayerArray = new Array();

			
		this.mPlayerArray.push(new Player(1,this,30,30,'#87CEEB'));
		this.mPlayerArray.push(new Player(2,this,400,30,'#87CEEB'));
		this.mPlayerArray.push(new Player(3,this,30,200,'#87CEEB'));

		this.mPlayerArray.push(new Player(4,this,200,150,'red'));
		
		this.mBall = new Ball(this,200,150,'black', 'white');

	}
	processData(data)
	{
		var dataArray = data.split(',');
		//console.log('1:' + dataArray[1]);

		if (dataArray[1] == 'm')
		{
			this.processMoves(dataArray);
		}
		if (dataArray[1] == 'j')
		{
			this.processJoin(dataArray);
		}
	}
	processJoin(dataArray)
	{
		//this is confirmation that we have connected to server as server was goodly enough to give us a client id
		APPLICATION.getCurrentScreen().mPitch.mClient.mId = dataArray[2];
                console.log('you connected and your id is:' + APPLICATION.getCurrentScreen().mPitch.mClient.mId);
	}

	processMoves(dataArray)
	{
		for (var d = 2; d < dataArray.length; d = d + 3 ) //start with first id at element 2
		{
							
			for (var p = 0; p < this.mPlayerArray.length; p++) //check for a match
			{
				if (dataArray[d] == this.mPlayerArray[p].mId) //if true we have a player id match so change coords
				{
					this.mPlayerArray[p].x = dataArray[d + 1];		
					this.mPlayerArray[p].y = dataArray[d + 2];		
				}
			}
		}

		//ball
		this.mBall.x = dataArray[dataArray.length - 3];
		this.mBall.y = dataArray[dataArray.length - 2];
	}

	update()
	{
		//if now connection meaning no mClient.mId > 0 then send connection again
		if (APPLICATION.getCurrentScreen().mPitch.mClient.mId == 0)
		{
                	var message = '1,j,' + APPLICATION.getCurrentScreen().getPersonId() + ',';
                        APPLICATION.getCurrentScreen().mWebSocket.send('' + message);
		}
		else
		{
			//only update if we have websocket...
  			if (APPLICATION.getCurrentScreen().mWebSocket)
			{
				//get this clients player move
				if (APPLICATION.getCurrentScreen().mPitch.mClient)
				{

					if (APPLICATION.mpPressed == true)
					{
                				var message = '1,p,' + APPLICATION.getCurrentScreen().getPersonId() + ',';
                        			APPLICATION.getCurrentScreen().mWebSocket.send('' + message);
					}
					else if (APPLICATION.mgPressed == true)
					{
                				var message = '1,g,' + APPLICATION.getCurrentScreen().getPersonId() + ',';
                        			APPLICATION.getCurrentScreen().mWebSocket.send('' + message);
					}
					else
					{
						var message = '1,m,' + APPLICATION.getCurrentScreen().mPitch.mClient.mId + ','; 
						if (APPLICATION.mUpPressed == true)
						{
							message += '1';	
						}
						else
						{
							message += '0';	
						}

						message = message + ',';

						if (APPLICATION.mRightPressed == true)
						{		
							message += '1';	
						}
						else
						{
							message += '0';	
						}

						message = message + ',';

						if (APPLICATION.mDownPressed == true)
						{
							message += '1';	
						}
						else
						{
							message += '0';	
						}

						message = message + ',';

						if (APPLICATION.mLeftPressed == true)
						{
							message += '1';	
						}
						else
						{
							message += '0';	
						}

						message = message + ',';

  						APPLICATION.getCurrentScreen().mWebSocket.send('' + message);
					}
				}
			}

			//update player 
			if (APPLICATION.getCurrentScreen().mPitch)
			{
				for (var i = 0; i <  APPLICATION.getCurrentScreen().mPitch.mPlayerArray.length; i++)
				{
					APPLICATION.getCurrentScreen().mPitch.mPlayerArray[i].update();
				}
			}

			//update ball
			APPLICATION.getCurrentScreen().mPitch.mBall.update();

			//print dimensions to screen
			var screen = APPLICATION.getCurrentScreen();
			var ctx = screen.mCanvas.getContext("2d");
			ctx.font = "30px Arial";
			var width = screen.mCanvas.width;
			var height = screen.mCanvas.height;
			var txt = "w:" + width + " h:" + height; 
			ctx.fillText("" + txt, 10, 50);

			//update client
			APPLICATION.getCurrentScreen().mPitch.mClient.update();
		}
	}

}

