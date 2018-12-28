'use strict';

class InsertAffairScreen
{
	constructor(schedule)
	{
		console.log('constructor InsertAffairScreen');
		/*
		 *                 this.mAffairDate   = 'JAN 01 2000';
                this.mArrivalTime  = '11PM';
                this.mStartTime    = '12AM';
                this.mEndTime      = null;
                this.mAddress      = 'NOWHERE';
                this.mCoordinates  = null;
                this.mPitch        = null;
                this.mFieldName    = null;
                this.mTeam         = null;
                this.mAffairType   = 'Practice';
*/
		this.mInputArray = new Array();

                this.mDiv = document.createElement("DIV");
                this.mDiv.setAttribute("class", "card");
                
		//add card to main
                this.mContainer = document.querySelector('.main');
               
		//H1
                this.mH1 = document.createElement("H1");
		this.mH1.innerHTML = "Add Event";

		//affairDate
		var input = document.createElement("INPUT");
		input.setAttribute("type","date"); 
                input.focus();
		this.mInputArray.push(input);
		
		//arrivalTime
		var input = document.createElement("INPUT");
		input.setAttribute("type","time"); 
		this.mInputArray.push(input);
		
		//endTime
		this.mEndTime = document.createElement("INPUT");
		this.mEndTime.setAttribute("type","time"); 
		
		//address
                this.mAddress = document.createElement("INPUT");

                //coordinatesaddress
                this.mCoordinates = document.createElement("INPUT");
                
		//pitch
                this.mPitch = document.createElement("SELECT");

                //fieldName
                this.mFieldName = document.createElement("INPUT");
		
		//team
                this.mTeam = document.createElement("SELECT");
		
		//affairType
                this.mAffairType = document.createElement("SELECT");

		/***************
		 *
		 * ADD TO DIV
		 *
		 */

                this.mContainer.appendChild(this.mDiv);
		
		this.mDiv.appendChild(this.mH1);

		//affairDate
                this.mAffairDateLabel = document.createElement("LABEL");
                this.mAffairDateLabel.setAttribute("for", this.mInputArray[0]);
                this.mAffairDateLabel.innerHTML = "Date: ";
                this.mDiv.appendChild(this.mAffairDateLabel);
		this.mDiv.appendChild(this.mInputArray[0]);
		
		//breakA
		this.mBrA = document.createElement("BR");
		this.mDiv.appendChild(this.mBrA);

		//arrivalTime
                this.mArrivalTimeLabel = document.createElement("LABEL");
                this.mArrivalTimeLabel.setAttribute("for", this.mInputArray[1]);
                this.mArrivalTimeLabel.innerHTML = "Arrive by: ";
		this.mDiv.appendChild(this.mArrivalTimeLabel);
		this.mDiv.appendChild(this.mInputArray[1]);

		this.mBrB = document.createElement("BR");
		this.mDiv.appendChild(this.mBrB);
	
		//endTime
                this.mEndTimeLabel = document.createElement("LABEL");
                this.mEndTimeLabel.setAttribute("for", this.mEndTime);
                this.mEndTimeLabel.innerHTML = "End Time: ";
                this.mDiv.appendChild(this.mEndTimeLabel);
		this.mDiv.appendChild(this.mEndTime);
		
		this.mBrC = document.createElement("BR");
		this.mDiv.appendChild(this.mBrC);
               
		//address
                this.mAddressLabel = document.createElement("LABEL");
                this.mAddressLabel.setAttribute("for", this.mAddress);
                this.mAddressLabel.innerHTML = "Address: ";
		this.mDiv.appendChild(this.mAddressLabel);
		this.mDiv.appendChild(this.mAddress);
                
		this.mBrD = document.createElement("BR");
		this.mDiv.appendChild(this.mBrD);
                
                //coordinates
                this.mCoordinatesLabel = document.createElement("LABEL");
                this.mCoordinatesLabel.setAttribute("for", this.mCoordinates);
                this.mCoordinatesLabel.innerHTML = "Coordinates: ";
                this.mDiv.appendChild(this.mCoordinatesLabel);
		this.mDiv.appendChild(this.mCoordinates);
		
		this.mBrE = document.createElement("BR");
                this.mDiv.appendChild(this.mBrE);
               
                //pitch
                this.mPitchLabel = document.createElement("LABEL");
                this.mPitchLabel.setAttribute("for", this.mPitch);
                this.mPitchLabel.innerHTML = "Pitch: ";
		this.mDiv.appendChild(this.mPitchLabel);
		this.mDiv.appendChild(this.mPitch);

		this.mBrF = document.createElement("BR");
                this.mDiv.appendChild(this.mBrF);
               
                //fieldName
                this.mFieldNameLabel = document.createElement("LABEL");
                this.mFieldNameLabel.setAttribute("for", this.mFieldName);
                this.mFieldNameLabel.innerHTML = "Field Name: ";
		this.mDiv.appendChild(this.mFieldNameLabel);
		this.mDiv.appendChild(this.mFieldName);

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
