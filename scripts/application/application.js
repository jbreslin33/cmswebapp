'use strict';

class Application 
{

	constructor() 
	{
		console.log("Application constructor");

    		var mStateLogs = true;

                //states
		this.mStateMachine = new StateMachine(this);
			
                //this.mGLOBAL_APPLICATION  = new GLOBAL_APPLICATION();
                var mINIT_APPLICATION    = new INIT_APPLICATION  ();
                
                //this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);
                
		this.mStateMachine.update();
	}

	update()
	{
		console.log('application.update called');
		this.mStateMachine.update();
	}
}
/*
class Application 
{
	constructor() 
	{

	}
}
*/
class Polygon {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }

  // Simple class instance methods using short-hand method
  // declaration
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }

  sayHistory() {
    console.log('"Polygon" is derived from the Greek polus (many) ' +
      'and gonia (angle).');
  }

  // We will look at static and subclassed methods shortly
}
