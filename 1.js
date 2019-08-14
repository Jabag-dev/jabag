import './PollContract.sol'; 
 
/* 
* Смарт контракт прикрепленный к пользователю для взаимодействия с blockchain 
*/ 
 
contract Account  { 
 
 // Объект для хранения информации о прошедших голосованиях 
 struct Poll { 
        address addr; 
		string answer; 
 } 
 // Событие извещающее о завершении операции 
 eventUserVoted(string res); 
 
 Poll[] public polls; 
 
 // Метод для голосования 
 function vote(address pollAddress, bytes32 answer) public {
	    emit UserVoted("success");
		PollContract poll = PollContract(pollAddress);
		poll.vote(answer); 
 } 
 
 // Метод для добавления голосования 
 function addPoll(address addr, string answer) public { 
        polls.push(Poll(addr, answer)); 
 } 
 
 // Метод для получения количества прошедших голосований 
 function getPollsCount() view public returns (uint) { 
        return polls.length; 
 } 
 
 // Метод для получения голосования по индексу 
 function getPollByIndex(uint index) view public returns (address, string) { 
        return (polls[index].addr, polls[index].answer); 
 } 
}