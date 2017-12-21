var ClozeCard = function(text, cloze){
	if(this instanceof ClozeCard){
		this.text = text;
		this.cloze = cloze;
		this.partial = text.replace(cloze, '__');
	} else {
		return new ClozeCard(text, cloze);
	}
};

module.exports = ClozeCard;