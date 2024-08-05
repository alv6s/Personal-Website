const allCards = document.querySelectorAll(".cards-scroll .card");
const headerHeight = 70;
const baseWidth = 60;

if (allCards.length) 
{
	allCards.forEach((card, i) => {
const incValue = i * headerHeight;
const decValue = (allCards.length - i) * headerHeight;
const widthValue = (allCards.length - i) * baseWidth;

card.style.marginTop = `${incValue}px`;
card.style.marginBottom = `${decValue}px`;
card.style.top = `${incValue}px`;
card.style.bottom = `calc(-100vh + ${decValue}px)`;
card.style.maxWidth = `calc(100% - ${widthValue}px)`;
	})};
