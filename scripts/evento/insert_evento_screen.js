'use strict';

class InsertEventoScreen
{
	constructor(schedule)
	{
		console.log('constructor InsertEventoScreen');
		
		this.mInputArray = new Array();

		this.mBreak = document.createElement("BR");

                this.mDiv = document.createElement("DIV");
                this.mDiv.setAttribute("class", "card");
                
		//add card to main
                this.mContainer = document.querySelector('.main');
               
		//H1
                this.mH1 = document.createElement("H1");
		this.mH1.innerHTML = "Add Event";

		//eventoDate
		this.mEventoDate = document.createElement("INPUT");
		
		//arrivalTime
		this.mArrivalTime = document.createElement("INPUT");
		
		//endTime
		this.mEndTime = document.createElement("INPUT");
		
		//address
                this.mAddress = document.createElement("INPUT");

                //coordinatesaddress
                this.mCoordinates = document.createElement("INPUT");
                
		//pitch
                this.mPitch = document.createElement("SELECT");

                //fieldName
                this.mFieldName = document.createElement("INPUT");
		
		//eventoType
                this.mEventoType = document.createElement("SELECT");

		/***************
		 *
		 * ADD TO DIV
		 *
		 */

                this.mContainer.appendChild(this.mDiv);
		this.mDiv.appendChild(this.mH1);

		//eventoDate
                this.mEventoDateLabel = document.createElement("LABEL");
		this.mEventoDate.setAttribute("type","date"); 
                this.mEventoDate.focus();
                this.mEventoDateLabel.setAttribute("for", this.mEventoDate);
                this.mEventoDateLabel.innerHTML = "Date: ";
                this.mDiv.appendChild(this.mEventoDateLabel);
		this.mDiv.appendChild(this.mEventoDate);
		
		//BR
		this.mBrA = document.createElement("BR");
		this.mDiv.appendChild(this.mBrA);

		//arrivalTime
                this.mArrivalTimeLabel = document.createElement("LABEL");
		this.mArrivalTime.setAttribute("type","time"); 
                this.mArrivalTimeLabel.setAttribute("for", this.mArrivalTime);
                this.mArrivalTimeLabel.innerHTML = "Arrive by: ";
		this.mDiv.appendChild(this.mArrivalTimeLabel);
		this.mDiv.appendChild(this.mArrivalTime);

		//BR
		this.mBrB = document.createElement("BR");
		this.mDiv.appendChild(this.mBrB);
	
		//endTime
                this.mEndTimeLabel = document.createElement("LABEL");
		this.mEndTime.setAttribute("type","time"); 
                this.mEndTimeLabel.setAttribute("for", this.mEndTime);
                this.mEndTimeLabel.innerHTML = "End Time: ";
                this.mDiv.appendChild(this.mEndTimeLabel);
		this.mDiv.appendChild(this.mEndTime);
	
		//BR
		this.mBrC = document.createElement("BR");
		this.mDiv.appendChild(this.mBrC);
               
		//address
                this.mAddressLabel = document.createElement("LABEL");
                this.mAddressLabel.setAttribute("for", this.mAddress);
                this.mAddressLabel.innerHTML = "Address: ";
		this.mDiv.appendChild(this.mAddressLabel);
		this.mDiv.appendChild(this.mAddress);
               
		//BR
		this.mBrD = document.createElement("BR");
		this.mDiv.appendChild(this.mBrD);
                
                //coordinates
                this.mCoordinatesLabel = document.createElement("LABEL");
                this.mCoordinatesLabel.setAttribute("for", this.mCoordinates);
                this.mCoordinatesLabel.innerHTML = "Coordinates: ";
                this.mDiv.appendChild(this.mCoordinatesLabel);
		this.mDiv.appendChild(this.mCoordinates);
	
		//BR
		this.mBrE = document.createElement("BR");
                this.mDiv.appendChild(this.mBrE);
               
                //pitch
                this.mPitchLabel = document.createElement("LABEL");
                this.mPitchLabel.setAttribute("for", this.mPitch);
                this.mPitchLabel.innerHTML = "Pitch: ";
		this.mDiv.appendChild(this.mPitchLabel);
		this.mDiv.appendChild(this.mPitch);

		//BR
		this.mBrF = document.createElement("BR");
                this.mDiv.appendChild(this.mBrF);
               
                //fieldName
                this.mFieldNameLabel = document.createElement("LABEL");
                this.mFieldNameLabel.setAttribute("for", this.mFieldName);
                this.mFieldNameLabel.innerHTML = "Field Name: ";
		this.mDiv.appendChild(this.mFieldNameLabel);
		this.mDiv.appendChild(this.mFieldName);
		
		//BR
		this.mBrG = document.createElement("BR");
                this.mDiv.appendChild(this.mBrG);
                
		//eventoType
                this.mEventoTypeLabel = document.createElement("LABEL");
                this.mEventoTypeLabel.setAttribute("for", this.mEventoType);
                this.mEventoTypeLabel.innerHTML = "Event Type: ";
		this.mDiv.appendChild(this.mEventoTypeLabel);
		this.mDiv.appendChild(this.mEventoType);

		/*
		this.mDivInputEmail = document.createElement("INPUT");
                this.mDivInputEmail.setAttribute("type", "text");
                this.mDivInputEmail.setAttribute("placeholder", "email");
                this.mDivInputEmail.setAttribute("id", "username");
                this.mDivInputEmail.setAttribute("name", "username");
                this.mDivInputEmail.addEventListener("keydown",this.divInputEmailKeyDown);
		this.mDivLogin.appendChild(this.mDivInputEmail);
                this.mDivInputEmail.focus();
		
		this.mDivInputPassword = document.createElement("INPUT");
                this.mDivInputPassword.setAttribute("type", "password");
                this.mDivInputPassword.setAttribute("placeholder", "password");
                this.mDivInputPassword.setAttribute("id", "password");
                this.mDivInputPassword.setAttribute("name", "password");
                this.mDivInputPassword.addEventListener("keydown",this.divInputPasswordKeyDown);
		this.mDivLogin.appendChild(this.mDivInputPassword);
		
		this.mButton = document.createElement("BUTTON");
		this.mButton.innerHTML = "LOGIN";
		
                this.mButton.setAttribute("class", "btn");
               	this.mButton.addEventListener("click",this.mLogin.sendLogin);

		this.mDivLogin.appendChild(this.mButton);
	
		//shadow
                this.mDivShadow = document.createElement("DIV");
                this.mDivShadow.setAttribute("class", "shadow");
		this.mDivLogin.appendChild(this.mDivShadow);
		*/
	}

	divInputEmailKeyDown(e)
	{
		/*
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mDivInputPassword.focus();
		}
		*/
	}

	divInputPasswordKeyDown(e)
	{
		/*
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mButton.focus();
		}
		*/
	}

	show()
	{
		//this.mDivLogin.style.display = "block";	
	}

	hide()
	{
		//this.mDivLogin.style.display = "none";	
	}
}
