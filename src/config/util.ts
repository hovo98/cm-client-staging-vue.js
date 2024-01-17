/**
 * @description Lodash's startcase function.
 */
import startcase from 'lodash.startcase'
import { validationMixin } from 'vuelidate'

export const _startcase = startcase

/**
 * @description Helper function for querying dom.
 */
// /* eslint-disable */
export const domQueryAll = function(selector: string, parent: HTMLElement, callback: any): void {
	parent.querySelectorAll(selector).forEach((el: HTMLElement) => {
		callback(el)
	})
}

export const getDemoAsset = function(assetName: string): string {
	return require(`@/assets/images/__demo/${assetName}`)
}

export const getImagesAsset = function (assetName: string): string {
	return require(`@/assets/images/${assetName}`)
}

export default {
	mixins: [validationMixin],
}

/**
 * Translates a simple JSON GraphQL into Multipart FormData to include a File variable $file
 * @param query
 * @param File
 */
export const mapMultipartFormData = function (query: any, File: any): FormData {
	const formData = new FormData()

	formData.append('operations', JSON.stringify(query))

	formData.append('map', JSON.stringify({
		file: ['variables.file'],
	}))

	formData.append('file', File)

	return formData
}

/**
 * @description Toggle slide animation.
 */
export const slideToggle = {
	config: {
		duration: 300,
		easing: 'ease-in',
	},

	/* eslint-disable */
	slideUp: (target: HTMLElement, configuration: any = {}): void => {
		const config = {...slideToggle.config, ...configuration};

		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = config.duration + 'ms';
		target.style.transitionTimingFunction = config.easing;
		target.style.boxSizing = 'border-box';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = '0';
		target.style.paddingTop = '0';
		target.style.paddingBottom = '0';
		target.style.marginTop = '0';
		target.style.marginBottom = '0';
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.style.removeProperty('transition-timing-function');
		}, config.duration);
	},

	/* eslint-disable */
	slideDown: (target: HTMLElement, configuration: any = {}): void => {
		const config = {...slideToggle.config, ...configuration};

		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;

		if (display === 'none') {
			display = 'block';
		}

		target.style.display = display;
		const height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = '0';
		target.style.paddingTop = '0';
		target.style.paddingBottom = '0';
		target.style.marginTop = '0';
		target.style.marginBottom = '0';
		target.offsetHeight;
		target.style.boxSizing = 'border-box';
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = config.duration + 'ms';
		target.style.transitionTimingFunction = config.easing;
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.style.removeProperty('transition-timing-function');
		}, config.duration);
	},

	/* eslint-disable */
	slideToggle: (target: HTMLElement, configuration: any = {}): void => {
		const config = {...slideToggle.config, ...configuration};

		if (window.getComputedStyle(target).display === 'none') {
			return slideToggle.slideDown(target, config);
		} else {
			return slideToggle.slideUp(target, config);
		}
	}
};

/**
 * @description scroll to page top
 */

export const scrollToTop = function() {
	setTimeout(() => {
		document.body.scrollIntoView({
			behavior: 'smooth', block: 'start'
		});
	}, 200);
};

/**	
 * @author Branislav Jerinic
 * @description allow only numbers to be typed
 */

export const allowOnlyNumbersGlobal = function (evt): void {
	const _self = evt.currentTarget
	const currentValue = _self.value;
	const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const keyPressed: string = evt.key;
	
	if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
		evt.preventDefault();
	}

	if (!keysAllowed.includes(keyPressed) && evt.keyCode !== 8 && evt.keyCode !== 9) {
		evt.preventDefault();
	}

	if (currentValue < 0) {
		_self.value = 0;
	}
	
	if (currentValue === '0') {
		_self.value = '';
	}
}

/**
 * @author Branislav Jerinic
 * @description format number as dollars
 */

export const formatNumber = function (num) {
	if(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	} else {
		return '';
	}
}

/**
 * @author Branislav Jerinic
 * @description format dollars as string
 */

export const formatDollarToString = function (string) {
	return string.replace(/[^0-9]/g, '');
}

/**
 * @author Branislav Jerinic
 * @description remove commas and format string to number
 */

export const stringToNumber = function(string) {
	string = string.toString();
	if (string || (typeof string === 'string' || string instanceof String)) {
		let number = string.replace(/[^0-9]/g, '');
		number = parseInt(number);
		return number;
	}
}

/**
 * @author Nikola Popov
 * @param string string
 * @description Change enum type to lowercase letter and first letter uppercase
 */
export const changeEnum = function(string) {
	if(!string) {
		return;
	}
	let str = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	str = str.replace(/_/g, " ")
	return str.replace(/-/g, " ");
}

export const checkDomain = function() {
	if(process.env.VUE_APP_DOMAIN_CHECK) {
		return true
	}
}

/**
 * @author Nikola Popov
 * @param string string
 * @description check if string number and if > 100 || < 0
 */
export const percentLimit = function(string) {
	if(isNaN(parseInt(string))) {
		return false;
	}

	if(parseInt(string) > 100 || parseInt(string) <= 0) {
		return false;
	}

	return true;
}

/**
 * @author Nikola Popov
 * @param data Object
 * @description recursive function to remove "0" from data
 */
export const changeData = (data) => {
	if(typeof data === 'object') {
		for(let key in data) {
			if(typeof data[key] === 'object') {
				data[key] = changeData(data[key]);
			} else {
				if(data[key] === '0' || data[key] === 0)
					data[key] = '';
			}
		}
	}

	return data;
}

/**
 * @author Nikola Popov
 * @param labelValue String or num
 * @description 
 */
export const formatMilion = (labelValue) => {
	
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));
}

/**
 * @author Nikola Popov
 * @param date date
 * @description reverse date to american format
 */
export const changeDate = (date) => {
	if(date) {
		const dateReverse = new Date(date);
		let dd = dateReverse.getDate();
		let mm = dateReverse.getMonth()+1; 
		let yyyy = dateReverse.getFullYear();
		let str = '';
		
		(mm < 10) ? str += '0'+mm : str += mm;
		
		(dd < 10) ? str += '-0'+dd : str += '-'+dd;
		return str += '-'+yyyy;
	} else {
		return '';
	}
}


/**
 * @author Nikola Popov
 * @param value string
 * @description percentage decimals formatting
 */

export const percentageFormatting = (value) => {
	return parseFloat(value).toFixed(2);
}

/**
 * @author Milica Mihajlovic
 * @param string
 * @returns string
 * @description Escape single and double quotes for password.
 */
export const escapeSingleDoubleQuotes = function(string) {
	return string ? string.replace(/\\/g,'\\\\').replace(/"/g, '\\"') : '';
}


export const errorScroll = () => {
	const el = document.querySelectorAll(".error-message");
	const el2 = document.querySelectorAll(".error-messages");
	const el3 = document.querySelectorAll(".js-error-message");
	const el4 = document.querySelectorAll(".table-error-message");
	
	const arr1 = Array.prototype.slice.call(el);
	const arr2 = Array.prototype.slice.call(el2);
	const arr3 = Array.prototype.slice.call(el3);
	const arr4 = Array.prototype.slice.call(el4);

	let arr = arr1.concat(arr2);
	arr = arr.concat(arr3);
	arr = arr.concat(arr4);
	let div = null;
	arr.forEach(element => {
		if(div === null) {
			if(element.style.display !== 'none' && element.innerHTML !== '') {
				div = element;
			}
		} 
	})
	if(div) {
		div.scrollIntoView({ behavior: 'smooth', block: "center" });
	} 
}

/**
 * Converts Array to string, each uppercase first, joined by comma
 *
 * @param {Array<string>} array
 * @returns {string}
 */
export const arrayToStringCommaUppercaseFirst = (array: Array<string>): string => {
	const arr = [];
	array.forEach((value) => {
		arr.push(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
	});

	return arr.join(', ');
}

export const checkForbidenWords = (string) => {
	const stringToArray = string.split(' '); 
	let isValid = checkArrayStringsWithRegEx(stringToArray);

	const lowercaseString = string.toLowerCase(); 
	const isThereNum = lowercaseString.match(/\d+/g)?.join('');

	if(lowercaseString.match(/\d+/g)?.length === 3) if(isThereNum.length === 10) isValid = true;

	if(isValid) return true;

	return false;
} 

const checkArrayStringsWithRegEx = (stringToArray) => {
	const forbiddenWords = ["contact", "phone", "email address", "email", "cell", "call"];
	const regExPatterns = [
		/[^\s@]+@[^\s@]+\.[^\s@]+/gi, // x@x.com
		/[^\s@]+@[^\s@]/, // x@x
	];
	let flag = false;
	stringToArray.forEach(element => {
		let lowercaseString = element.toLowerCase(); 
		for (const word of forbiddenWords) {
			if (lowercaseString === word) // ["contact", "phone", "email address", "email", "cell", "call"]
				flag = true;

			regExPatterns.forEach(regEx => {
				if (lowercaseString.match(regEx))  
					flag = true;
			});
		}
	});

	return flag;
} 

