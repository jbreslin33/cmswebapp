'use strict';

class Pitch
{
        constructor(screen)
        {
		this.mScreen = screen;
                
		
		document.getElementById("rondo_screen_html_id").appendChild(screen.mCanvas);

		this.mFrameNumber = 0;
		this.mInterval = setInterval(this.update,20);

		this.mClient = new Client();

		this.mPlayerArray = new Array();


		//do not create players....
		this.mPlayerArray.push(new Player(1,this,30,30,'black'));
		this.mPlayerArray.push(new Player(2,this,400,30,'red'));
		this.mPlayerArray.push(new Player(3,this,30,200,'red'));
		this.mPlayerArray.push(new Player(4,this,30,200,'red'));
		this.mPlayerArray.push(new Player(5,this,30,200,'red'));

		this.mPlayerArray.push(new Player(6,this,200,150,'yellow'));
		this.mPlayerArray.push(new Player(7,this,200,150,'blue'));
		this.mPlayerArray.push(new Player(8,this,200,150,'blue'));
		this.mPlayerArray.push(new Player(9,this,200,150,'blue'));
		this.mPlayerArray.push(new Player(10,this,200,150,'blue'));
		
		this.mBall = new Ball(this,200,150,'black', 'white');
		
		//websocket
                this.mWebSocket = null;
		
		this.initializeWebSocket();

	}

	removeDivs()
	{
		for (var p = 0; p < this.mPlayerArray.length; p++) //check for a match
		{
			this.mPlayerArray[p].removeDivs();
		}
		
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
		for (var d = 2; d < dataArray.length; d = d + 5 ) //start with first id at element 2
		{
							
			for (var p = 0; p < this.mPlayerArray.length; p++) //check for a match
			{
				if (dataArray[d] == this.mPlayerArray[p].mId) //if true we have a player id match so change coords
				{
					this.mPlayerArray[p].x = dataArray[d + 1];		
					this.mPlayerArray[p].y = dataArray[d + 2];		
					this.mPlayerArray[p].mFacingAngle = dataArray[d + 3];		
					this.mPlayerArray[p].mStateName = dataArray[d + 4];		
					//console.log('player id: ' + this.mPlayerArray[p].mId + 'mStateName: ' + this.mPlayerArray[p].mStateName);
					//this.mPlayerArray[p].mRightFootAngle = dataArray[d + 4];		
				}
			}
		}

		//ball
		this.mBall.x = dataArray[dataArray.length - 3];
		this.mBall.y = dataArray[dataArray.length - 2];
	}

	update()
	{
		if (!APPLICATION.getCurrentScreen().mPitch)
		{
			return;
		}

		if (APPLICATION.getCurrentScreen().mPitch.mClient.mId == 0)
		{
			console.log('trying to join with id:' + APPLICATION.getCurrentScreen().getPersonId());
                	var message = '1,j,' + APPLICATION.getCurrentScreen().getPersonId() + ',';
                        APPLICATION.getCurrentScreen().mPitch.mWebSocket.send('' + message);
		}
		else
		{
			//only update if we have websocket...
  			if (APPLICATION.getCurrentScreen().mPitch.mWebSocket)
			{
				//get this clients player move
				if (APPLICATION.getCurrentScreen().mPitch.mClient)
				{

					if (APPLICATION.mpPressed == true)
					{
                				var message = '1,p,' + APPLICATION.getCurrentScreen().getPersonId() + ',';
                        			APPLICATION.getCurrentScreen().mPitch.mWebSocket.send('' + message);
					}
					else if (APPLICATION.mgPressed == true)
					{
                				var message = '1,g,' + APPLICATION.getCurrentScreen().getPersonId() + ',';
                        			APPLICATION.getCurrentScreen().mPitch.mWebSocket.send('' + message);
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

                                               	if (APPLICATION.mqPressed == true)
                                                {
                                                        message += '1';
                                                }
                                                else
                                                {
                                                        message += '0';
                                                }

                                                message = message + ',';

                                                if (APPLICATION.mwPressed == true)
                                                {
                                                        message += '1';
                                                }
                                                else
                                                {
                                                        message += '0';
                                                }

                                                message = message + ',';

  						APPLICATION.getCurrentScreen().mPitch.mWebSocket.send('' + message);
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
			var txt;
			for (var i = 0; i <  APPLICATION.getCurrentScreen().mPitch.mPlayerArray.length; i++)
			{
				if (APPLICATION.getCurrentScreen().mPitch.mPlayerArray[i].mId == 1)
				{
					txt = "w:" + width + " h:" + height + "mFacingAngle:" + APPLICATION.getCurrentScreen().mPitch.mPlayerArray[i].mFacingAngle + " angle:" + APPLICATION.getCurrentScreen().mPitch.mPlayerArray[i].mAngle; 

				}
				else
				{
					txt = "w:" + width + " h:" + height; 
				}
			}
			ctx.fillText("" + txt, 10, 50);

			//update client
			APPLICATION.getCurrentScreen().mPitch.mClient.update();
		}
	}

}

