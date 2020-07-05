'use strict';

class UpcomingScreen extends ScheduleScreen
{
        constructor(application)
        {
                super(application);
               	
		location.hash = 'upcoming_screen';

		this.setHtml(document.getElementById("upcoming_screen_html_id"));
                this.setMessageElement(document.getElementById("upcoming_screen_message_id"));
                this.setSpinner(document.getElementById("upcoming_screen_spinner_id"));
                this.setForm(document.getElementById("upcoming_screen_form_id"));

                document.getElementById("upcoming_available_id").onclick = this.setAllHit.bind(document.getElementById("upcoming_available_id"));
                document.getElementById("upcoming_not_available_id").onclick = this.setAllHit.bind(document.getElementById("upcoming_not_available_id"));
                document.getElementById("upcoming_maybe_available_id").onclick = this.setAllHit.bind(document.getElementById("upcoming_maybe_available_id"));

		//close nav
		this.setCloseNav();
        }

       	processJsonData()
       	{
                super.processJsonData();
 
		this.resetSetAllButtons();
	}

	//upcoming only
	resetSetAllButtons()
	{
		var screen = APPLICATION.getCurrentScreen();

               	//set others back to APPLICATION.mSkyBlue
                document.getElementById("upcoming_available_id").style.backgroundColor = APPLICATION.mSkyBlue;
                document.getElementById("upcoming_not_available_id").style.backgroundColor = APPLICATION.mSkyBlue;
                document.getElementById("upcoming_maybe_available_id").style.backgroundColor = APPLICATION.mSkyBlue;

		var availableArray = new Array();
		var maybeAvailableArray = new Array();
		var notAvailableArray = new Array();

		var allGreen = true;
		var allYellow = true;
		var allRed = true;

                for (var i = 0; i < screen.mItemArray.length; i++)
                {
                	var item = screen.mItemArray[i];

                        for (var b = 0; b < item.mAvailabilityEmailButtonArray.length; b++)
                        {
				var id = item.mAvailabilityEmailButtonArray[b].id.split('_');;
                        	if (id[2] == 1)
                                {
                                        if (item.mAvailabilityEmailButtonArray[b].style.backgroundColor != APPLICATION.mLawnGreen)
					{
						allGreen = false;
					}
                                }
			
				if (id[2] == 2)
                                {
                                        if (item.mAvailabilityEmailButtonArray[b].style.backgroundColor != APPLICATION.mYellow)
                                        {
                                                allYellow = false;
                                        }
                                }

                               	if (id[2] == 3)
                                {
                                        if (item.mAvailabilityEmailButtonArray[b].style.backgroundColor != APPLICATION.mRed)
                                        {
                                                allRed = false;
                                        }
                                }
                        }
		}

		if (screen.mItemArray.length == 0)
		{
                	document.getElementById("upcoming_available_id").style.backgroundColor = APPLICATION.mSkyBlue;
                	document.getElementById("upcoming_not_available_id").style.backgroundColor = APPLICATION.mSkyBlue;
                	document.getElementById("upcoming_maybe_available_id").style.backgroundColor = APPLICATION.mSkyBlue;
		}
		else
		{
			if (allGreen)
			{
                		document.getElementById("upcoming_available_id").style.backgroundColor = APPLICATION.mLawnGreen;
			}
			if (allYellow)
			{
                		document.getElementById("upcoming_maybe_available_id").style.backgroundColor = APPLICATION.mYellow;
			}
			if (allRed)
			{
                		document.getElementById("upcoming_not_available_id").style.backgroundColor = APPLICATION.mRed;
			}
		}
	} //resetSetAllButtons()


	//upcoming only
	setAllHit()
	{
		var screen = APPLICATION.getCurrentScreen();
		screen.resetLists();
		
		if (this.id == "upcoming_available_id")
		{
			for (var i = 0; i < screen.mItemArray.length; i++)
			{
				var item = screen.mItemArray[i];
				for (var b = 0; b < item.mAvailabilityEmailButtonArray.length; b++)
				{
					var id = item.mAvailabilityEmailButtonArray[b].id.split('_');;
				        
					if (id[2] == 1)
                                	{
                                        	//add to array
                                        	screen.mAvailabilityArray.push(id[1]);
                                        	screen.mAvailabilityArray.push(id[2]);
                                        	screen.mAvailabilityArray.push(id[3]);
                                        	screen.mAvailabilityArray.push(id[4]);
                                	}
				}
			}
		}

                if (this.id == "upcoming_maybe_available_id")
                {
                        for (var i = 0; i < screen.mItemArray.length; i++)
                        {
                                var item = screen.mItemArray[i];
                                for (var b = 0; b < item.mAvailabilityEmailButtonArray.length; b++)
                                {
                                        var id = item.mAvailabilityEmailButtonArray[b].id.split('_');;

                                        if (id[2] == 2)
                                        {
                                                //add to array
                                                screen.mAvailabilityArray.push(id[1]);
                                                screen.mAvailabilityArray.push(id[2]);
                                                screen.mAvailabilityArray.push(id[3]);
                                                screen.mAvailabilityArray.push(id[4]);
                                        }
                                }
                        }
                }

		if (this.id == "upcoming_not_available_id")
                {
                        for (var i = 0; i < screen.mItemArray.length; i++)
                        {
                                var item = screen.mItemArray[i];
                                for (var b = 0; b < item.mAvailabilityEmailButtonArray.length; b++)
                                {
                                        var id = item.mAvailabilityEmailButtonArray[b].id.split('_');;

                                        if (id[2] == 3)
                                        {
                                                //add to array
                                                screen.mAvailabilityArray.push(id[1]);
                                                screen.mAvailabilityArray.push(id[2]);
                                                screen.mAvailabilityArray.push(id[3]);
                                                screen.mAvailabilityArray.push(id[4]);
                                        }
                                }
                        }
                }

		screen.mAvailabilityList = screen.mAvailabilityArray.join();
		screen.updateAvailability()
	} //set all hit

        printItems()
        {
                if (this.mItemArray.length > 0)
                {
                        for (var s = 0; s < this.mItemArray.length; s++)
                        {
                                this.mItemArray[s].printToScreen( document.getElementById("upcoming_screen_col_6_html_id") );
                        }
                }
        }

        processMessages()
        {

                if (this.mItemArray.length > 0)
                {
                        this.setMessage('', 'black');
                }
                else
                {
                        this.setMessage('You have no events upcoming. Enjoy the time off.', 'black');
                }
		
		super.processMessages();
        }
}
					/*
					 *
					 
					  4 data points
					  ----------------
					  game:     1
					  practice: 2

				          --------------	
					  available: 1
					  maybe:     2 
					  not:       3 

					  ---------------------
					  game or practice id:
					 
					  --------------------
					  player id:	 
					  */
