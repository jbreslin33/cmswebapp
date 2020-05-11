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
        }

	setRole(role,value)
	{
		if (role == 'player')
		{
			if (value == 1)
			{
				this.mPlayerId = null;
			}
			if (value == 2)
			{
				this.mPlayerId = 2;
			}
		}
		if (role == 'parent')
		{
			if (value == 1)
			{
				this.mParentId = null;
			}
			if (value == 2)
			{
				this.mParentId = 2;
			}
		}
		if (role == 'coach')
		{
			if (value == 1)
			{
				this.mCoachId = null;
			}
			if (value == 2)
			{
				this.mCoachId = 2;
			}
		}
		if (role == 'manager')
		{
			if (value == 1)
			{
				this.mManagerId = null;
			}
			if (value == 2)
			{
				this.mManagerId = 2;
			}
		}
		if (role == 'administrator')
		{
			if (value == 1)
			{
				this.mAdministratorId = null;
			}
			if (value == 2)
			{
				this.mAdministratorId = 2;
			}
		}
	}
}
