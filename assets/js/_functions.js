/**
 * Получить всех соседней выбранного элемента */
export const getSiblings = elem => {

	let siblings = [],
		sibling = elem.parentNode.firstChild;

	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;

};
/**
 * Скрыть элемент при клике вне этого элемента */
export const hideOnClickOutside = element => {

	const outsideClickListener = event => {
		if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
			element.classList.remove('is-active');
			removeClickListener()
		}
	};

	const removeClickListener = () => {
		document.removeEventListener('click', outsideClickListener)
	};

	document.addEventListener('click', outsideClickListener)

};
/**
 * Проверить видимость элемента */
export const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );