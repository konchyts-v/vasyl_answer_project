questionPageContainer = document.getElementById("questionBlock");
infoPageContainer = document.getElementById("mainInfoBlock");
gamePageContainer = document.getElementById("gameBlock");

answerElement = document.getElementById("answer");
loaderElement = document.getElementById("loader");


document.getElementById("mainButton").onclick =  function () {
	var textInput = document.getElementById("textInput").value;
	answerElement.style.display = "none";
	loaderElement.style.display = "block";
	setTimeout(getAnswer, 2000, textInput);
};


function getAnswer(textInput) {
	var answers = [
		"Що смердить, то смак має",
		"Тобі чіхається?",
		"Ну то печаль",
		"Аби не гірше",
		"Хоч одним словом скажу - гамно",
		"Штука баксів",
		"Коли ся жениш?",
		"Дасця чути",
		"Та як все",
		"шшшшшшооооооооооо???",
		"Шо за хуйня?",
		"шшшо серйозно?",
		"Зараз я когось в'їбу",
		"Епічна сила, блять",
		"Зроби мені канапку",
		"Перекуси провід",
		"Ти гниєш!",
		"Срав пес, перділи гуси",
		"Як Федот їбав козу, а коза Федота. Кінець анекдота",
		"Шо скажеш хорошого?",
		"Розказуй..."
	]

	var indexAnswer = Math.floor(Math.random() * answers.length);

	loaderElement.style.display = "none";
	if (textInput == "") {
		answerElement.innerHTML = "Запитайте щось у Василя"
	} else {
		answerElement.innerHTML = "Василь каже: " + answers[indexAnswer];
	}
	answerElement.style.display = "block";
}


document.getElementById("questionButton").onclick = function() {
	infoPageContainer.style.display = "none";
	gamePageContainer.style.display = "none";
	questionPageContainer.style.display = "block";
};

document.getElementById("infoButton").onclick = function() {
	questionPageContainer.style.display = "none";
	gamePageContainer.style.display = "none";
	infoPageContainer.style.display = "block";
};

document.getElementById("gameButton").onclick = function() {
	questionPageContainer.style.display = "none";
	infoPageContainer.style.display = "none";
    gamePageContainer.style.display = "block";
};