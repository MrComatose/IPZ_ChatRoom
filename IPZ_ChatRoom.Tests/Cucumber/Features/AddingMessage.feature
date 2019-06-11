Feature: AddingMessage

A short summary of the feature

@tag1
Scenario: AddingSimpleMessage
	Given I create new database context.
	And I successfuly create message srvice. 
	When I adding new message for user with email "test@gmail.com".
	Then Message Successfuly added.
