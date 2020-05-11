'use strict';

class Person
{
        constructor(id, first_name, middle_name, last_name, player_id, parent_id, coach_id, manager_id, administrator_id)
        {
		this.mId = id;

		this.mFirstName = first_name;
		this.mMiddleName = middle_name;
		this.mLastName = last_name;

		this.mPlayerId = player_id;
		this.mParentId = parent_id;
		this.mCoachId = coach_id;
		this.mManagerId = manager_id;
		this.mAdministratorId = administrator_id;

		console.log('admin id:' + administrator_id);
        }
}
