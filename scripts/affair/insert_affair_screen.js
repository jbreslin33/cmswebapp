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
                this.mDiv = document.createElement("DIV");
                this.mDiv.setAttribute("class", "card");
                
		//add card to main
                this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDiv);
               
		//H1
                this.mH1 = document.createElement("H1");
		this.mH1.innerHTML = "Add Event";
		this.mDiv.appendChild(this.mH1);

		//affairDate
		this.mAffairDate = document.createElement("INPUT");
		this.mAffairDate.setAttribute("type","date"); 
                this.mAffairDate.focus();
		
		//affairDateLabel
                this.mAffairDateLabel = document.createElement("LABEL");
                this.mAffairDateLabel.setAttribute("for", "affairdate");
                this.mAffairDateLabel.innerHTML = "Date: ";
                this.mDiv.appendChild(this.mAffairDateLabel);
		this.mDiv.appendChild(this.mAffairDate);
               
		//breakA
		this.mBrA = document.createElement("BR");
		this.mDiv.appendChild(this.mBrA);
		
		//arrivalTime
		this.mArrivalTime = document.createElement("INPUT");
		this.mArrivalTime.setAttribute("type","time"); 
		this.mDiv.appendChild(this.mArrivalTime);
		
		//arrivalTimeLabel
                this.mArrivalTimeLabel = document.createElement("LABEL");
                this.mArrivalTimeLabel.setAttribute("for", "arrivalTime");
                this.mArrivalTimeLabel.innerHTML = "Arrive by: ";
                this.mDiv.appendChild(this.mArrivalTimeLabel);
		this.mDiv.appendChild(this.mArrivalTime);
		
		//breakB
		this.mBrB = document.createElement("BR");
		this.mDiv.appendChild(this.mBrB);
		
		//endTime
		this.mEndTime = document.createElement("INPUT");
		this.mEndTime.setAttribute("type","time"); 
		this.mDiv.appendChild(this.mEndTime);
		
		//endTimeLabel
                this.mEndTimeLabel = document.createElement("LABEL");
                this.mEndTimeLabel.setAttribute("for", "endTime");
                this.mEndTimeLabel.innerHTML = "End Time: ";
                this.mDiv.appendChild(this.mEndTimeLabel);
		this.mDiv.appendChild(this.mEndTime);
		
		//breakC
		this.mBrC = document.createElement("BR");
		this.mDiv.appendChild(this.mBrC);

		//address
                this.mAddress = document.createElement("INPUT");
                this.mDiv.appendChild(this.mAddress);

                //endTimeLabel
                this.mAddressLabel = document.createElement("LABEL");
                this.mAddressLabel.setAttribute("for", "endTime");
                this.mAddressLabel.innerHTML = "Address: ";
                this.mDiv.appendChild(this.mAddressLabel);
                this.mDiv.appendChild(this.mAddress);


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
