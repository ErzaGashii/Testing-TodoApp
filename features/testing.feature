Feature:  Default priority should be None
Scenario: User wants the default priority to be none
Given User get in the add to-do form
When User fill the form and select None Priority
Then Default priority is Low



#Feature: Cannot have more than one priority selected
#Scenario: User wants to select one more priority
#Given User get in the add to-do form
#When User try to add more priority 
#Then User can’t choose more than priority


#Feature: Task must have a name before choosing priority
#Scenario:	User wants that task must have a name before choosing priority
#Given User get in the add to-do form
#When User give it a name from to-do
#Then User choose priority
