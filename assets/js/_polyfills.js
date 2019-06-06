/**
 * svg:use support to IE9+ */
import '../node_modules/svgxuse/svgxuse';

(function() {

	/**
	 * @public .matches() */

    if (!Element.prototype.matches) {

        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

    }

    /**
     * @public .closest() */

	if (!Element.prototype.closest) {

		Element.prototype.closest = function(css) {
			var node = this;

			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}

})();
