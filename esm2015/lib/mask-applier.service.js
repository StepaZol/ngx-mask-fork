/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { config } from './config';
export class MaskApplierService {
    /**
     * @param {?} _config
     */
    constructor(_config) {
        this._config = _config;
        this.maskExpression = '';
        this.actualValue = '';
        this.shownMaskExpression = '';
        this._formatWithSeparators = (/**
         * @param {?} str
         * @param {?} thousandSeparatorChar
         * @param {?} decimalChar
         * @param {?} precision
         * @return {?}
         */
        (str, thousandSeparatorChar, decimalChar, precision) => {
            /** @type {?} */
            const x = str.split(decimalChar);
            /** @type {?} */
            const decimals = x.length > 1 ? `${decimalChar}${x[1]}` : '';
            /** @type {?} */
            let res = x[0];
            /** @type {?} */
            const separatorLimit = this.separatorLimit.replace(/\s/g, '');
            if (separatorLimit && +separatorLimit) {
                if (res[0] === '-') {
                    res = `-${res.slice(1, res.length).slice(0, separatorLimit.length)}`;
                }
                else {
                    res = res.slice(0, separatorLimit.length);
                }
            }
            /** @type {?} */
            const rgx = /(\d+)(\d{3})/;
            while (rgx.test(res)) {
                res = res.replace(rgx, '$1' + thousandSeparatorChar + '$2');
            }
            if (precision === undefined) {
                return res + decimals;
            }
            else if (precision === 0) {
                return res;
            }
            return res + decimals.substr(0, precision + 1);
        });
        this.percentage = (/**
         * @param {?} str
         * @return {?}
         */
        (str) => {
            return Number(str) >= 0 && Number(str) <= 100;
        });
        this.getPrecision = (/**
         * @param {?} maskExpression
         * @return {?}
         */
        (maskExpression) => {
            /** @type {?} */
            const x = maskExpression.split('.');
            if (x.length > 1) {
                return Number(x[x.length - 1]);
            }
            return Infinity;
        });
        this.checkInputPrecision = (/**
         * @param {?} inputValue
         * @param {?} precision
         * @param {?} decimalMarker
         * @return {?}
         */
        (inputValue, precision, decimalMarker) => {
            if (precision < Infinity) {
                /** @type {?} */
                const precisionRegEx = new RegExp(this._charToRegExpExpression(decimalMarker) + `\\d{${precision}}.*$`);
                /** @type {?} */
                const precisionMatch = inputValue.match(precisionRegEx);
                if (precisionMatch && precisionMatch[0].length - 1 > precision) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                else if (precision === 0 && inputValue.endsWith(decimalMarker)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
            }
            return inputValue;
        });
        this._shift = new Set();
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = this._config.specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.suffix = this._config.suffix;
        this.thousandSeparator = this._config.thousandSeparator;
        this.decimalMarker = this._config.decimalMarker;
        this.hiddenInput = this._config.hiddenInput;
        this.showMaskTyped = this._config.showMaskTyped;
        this.placeHolderCharacter = this._config.placeHolderCharacter;
        this.validation = this._config.validation;
        this.separatorLimit = this._config.separatorLimit;
        this.allowNegativeNumbers = this._config.allowNegativeNumbers;
    }
    /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    applyMaskWithPattern(inputValue, maskAndPattern) {
        const [mask, customPattern] = maskAndPattern;
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    applyMask(inputValue, maskExpression, position = 0, cb = (/**
     * @return {?}
     */
    () => { })) {
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        console.log(inputValue);
        /** @type {?} */
        let cursor = 0;
        /** @type {?} */
        let result = '';
        /** @type {?} */
        let multi = false;
        /** @type {?} */
        let backspaceShift = false;
        /** @type {?} */
        let shift = 1;
        /** @type {?} */
        let stepBack = false;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        if (!!this.suffix && inputValue.endsWith(this.suffix)) {
            inputValue = inputValue.slice(0, inputValue.length - this.suffix.length);
        }
        /** @type {?} */
        const inputArray = inputValue.toString().split('');
        if (maskExpression === 'IP') {
            this.ipError = !!(inputArray.filter((/**
             * @param {?} i
             * @return {?}
             */
            (i) => i === '.')).length < 3 && inputArray.length < 7);
            maskExpression = '099.099.099.099';
        }
        if (maskExpression.startsWith('percent')) {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                inputValue = this._stripToDecimal(inputValue);
                /** @type {?} */
                const precision = this.getPrecision(maskExpression);
                inputValue = this.checkInputPrecision(inputValue, precision, '.');
            }
            if (inputValue.indexOf('.') > 0 && !this.percentage(inputValue.substring(0, inputValue.indexOf('.')))) {
                /** @type {?} */
                const base = inputValue.substring(0, inputValue.indexOf('.') - 1);
                inputValue = `${base}${inputValue.substring(inputValue.indexOf('.'), inputValue.length)}`;
            }
            if (this.percentage(inputValue)) {
                result = inputValue;
            }
            else {
                result = inputValue.substring(0, inputValue.length - 1);
            }
        }
        else if (maskExpression.startsWith('separator')) {
            if (inputValue.match('[wа-яА-Я]') ||
                inputValue.match('[ЁёА-я]') ||
                inputValue.match('[a-z]|[A-Z]') ||
                inputValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\[\]:";<>.?\/]/) ||
                inputValue.match('[^A-Za-z0-9,]')) {
                inputValue = this._stripToDecimal(inputValue);
            }
            inputValue =
                inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== this.decimalMarker
                    ? inputValue.slice(1, inputValue.length)
                    : inputValue;
            // TODO: we had different rexexps here for the different cases... but tests dont seam to bother - check this
            //  separator: no COMMA, dot-sep: no SPACE, COMMA OK, comma-sep: no SPACE, COMMA OK
            /** @type {?} */
            const thousandSeperatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);
            /** @type {?} */
            const decimalMarkerEscaped = this._charToRegExpExpression(this.decimalMarker);
            /** @type {?} */
            const invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,";<>?\\/'
                .replace(thousandSeperatorCharEscaped, '')
                .replace(decimalMarkerEscaped, '');
            /** @type {?} */
            const invalidCharRegexp = new RegExp('[' + invalidChars + ']');
            if (inputValue.match(invalidCharRegexp)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            /** @type {?} */
            const precision = this.getPrecision(maskExpression);
            inputValue = this.checkInputPrecision(inputValue, precision, this.decimalMarker);
            /** @type {?} */
            const strForSep = inputValue.replace(new RegExp(thousandSeperatorCharEscaped, 'g'), '');
            result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, precision);
            /** @type {?} */
            const commaShift = result.indexOf(',') - inputValue.indexOf(',');
            /** @type {?} */
            const shiftStep = result.length - inputValue.length;
            if (shiftStep > 0 && result[position] !== ',') {
                backspaceShift = true;
                /** @type {?} */
                let _shift = 0;
                do {
                    this._shift.add(position + _shift);
                    _shift++;
                } while (_shift < shiftStep);
            }
            else if ((commaShift !== 0 && position > 0 && !(result.indexOf(',') >= position && position > 3)) ||
                (!(result.indexOf('.') >= position && position > 3) && shiftStep <= 0)) {
                this._shift.clear();
                backspaceShift = true;
                shift = shiftStep;
                position += shiftStep;
                this._shift.add(position);
            }
            else {
                this._shift.clear();
            }
        }
        else {
            for (
            // tslint:disable-next-line
            let i = 0, inputSymbol = inputArray[0]; i < inputArray.length; i++, inputSymbol = inputArray[i]) {
                if (cursor === maskExpression.length) {
                    break;
                }
                if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                    result += inputSymbol;
                    cursor += 2;
                }
                else if (maskExpression[cursor + 1] === '*' &&
                    multi &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                    multi = false;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '*') {
                    result += inputSymbol;
                    multi = true;
                }
                else if (maskExpression[cursor + 1] === '?' &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) ||
                    (this.hiddenInput &&
                        this.maskAvailablePatterns[maskExpression[cursor]] &&
                        this.maskAvailablePatterns[maskExpression[cursor]].symbol === inputSymbol)) {
                    if (maskExpression[cursor] === 'H') {
                        if (Number(inputSymbol) > 2) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'h') {
                        if (result === '2' && Number(inputSymbol) > 3) {
                            cursor += 1;
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    /** @type {?} */
                    const daysCount = 31;
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputValue.slice(cursor, cursor + 2)) > daysCount || inputValue[cursor + 1] === '/') {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'M') {
                        /** @type {?} */
                        const monthsCount = 12;
                        // mask without day
                        /** @type {?} */
                        const withoutDays = cursor === 0 &&
                            (Number(inputSymbol) > 2 ||
                                Number(inputValue.slice(cursor, cursor + 2)) > monthsCount ||
                                inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for input
                        /** @type {?} */
                        const day1monthInput = inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            ((inputValue[cursor - 2] === '/' &&
                                (Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount && inputValue[cursor] !== '/')) ||
                                inputValue[cursor] === '/' ||
                                ((inputValue[cursor - 3] === '/' &&
                                    (Number(inputValue.slice(cursor - 2, cursor)) > monthsCount && inputValue[cursor - 1] !== '/')) ||
                                    inputValue[cursor - 1] === '/'));
                        // 10<day<31 && month<12 for input
                        /** @type {?} */
                        const day2monthInput = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] === '/' &&
                            (Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for paste whole data
                        /** @type {?} */
                        const day1monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) > daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            (!inputValue.slice(cursor - 2, cursor).includes('/') &&
                                Number(inputValue.slice(cursor - 2, cursor)) > monthsCount);
                        // 10<day<31 && month<12 for paste whole data
                        /** @type {?} */
                        const day2monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] !== '/' &&
                            Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount;
                        if (withoutDays || day1monthInput || day2monthInput || day1monthPaste || day2monthPaste) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                    result += maskExpression[cursor];
                    cursor++;
                    /** @type {?} */
                    const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                    this._shift.add(shiftStep + this.prefix.length || 0);
                    i--;
                }
                else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1 &&
                    this.maskAvailablePatterns[maskExpression[cursor]] &&
                    this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                    if (!!inputArray[cursor] && maskExpression !== '099.099.099.099') {
                        result += inputArray[cursor];
                    }
                    cursor++;
                    i--;
                }
                else if (this.maskExpression[cursor + 1] === '*' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.maskExpression[cursor + 1] === '?' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.showMaskTyped && this.maskSpecialCharacters.indexOf(inputSymbol) < 0 && inputSymbol !== this.placeHolderCharacter) {
                    stepBack = true;
                }
            }
        }
        if (result.length + 1 === maskExpression.length &&
            this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        /** @type {?} */
        let newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        /** @type {?} */
        let actualShift = this._shift.has(position) ? shift : 0;
        if (stepBack) {
            actualShift--;
        }
        cb(actualShift, backspaceShift);
        if (shift < 0) {
            this._shift.clear();
        }
        /** @type {?} */
        let res = `${this.prefix}${result}${this.suffix}`;
        if (result.length === 0) {
            res = `${this.prefix}${result}`;
        }
        return res;
    }
    /**
     * @param {?} inputSymbol
     * @return {?}
     */
    _findSpecialChar(inputSymbol) {
        return this.maskSpecialCharacters.find((/**
         * @param {?} val
         * @return {?}
         */
        (val) => val === inputSymbol));
    }
    /**
     * @protected
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    _checkSymbolMask(inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
        return (this.maskAvailablePatterns[maskSymbol] &&
            this.maskAvailablePatterns[maskSymbol].pattern &&
            this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    _stripToDecimal(str) {
        return str
            .split('')
            .filter((/**
         * @param {?} i
         * @param {?} idx
         * @return {?}
         */
        (i, idx) => {
            return i.match('^-?\\d') || i === '.' || i === ',' || (i === '-' && idx === 0);
        }))
            .join('');
    }
    /**
     * @private
     * @param {?} char
     * @return {?}
     */
    _charToRegExpExpression(char) {
        /** @type {?} */
        const charsToEscape = '[\\^$.|?*+()';
        return char === ' ' ? '\\s' : charsToEscape.indexOf(char) >= 0 ? '\\' + char : char;
    }
}
MaskApplierService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MaskApplierService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
];
if (false) {
    /** @type {?} */
    MaskApplierService.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.hiddenInput;
    /** @type {?} */
    MaskApplierService.prototype.showTemplate;
    /** @type {?} */
    MaskApplierService.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskApplierService.prototype.maskExpression;
    /** @type {?} */
    MaskApplierService.prototype.actualValue;
    /** @type {?} */
    MaskApplierService.prototype.shownMaskExpression;
    /** @type {?} */
    MaskApplierService.prototype.maskSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.maskAvailablePatterns;
    /** @type {?} */
    MaskApplierService.prototype.prefix;
    /** @type {?} */
    MaskApplierService.prototype.suffix;
    /** @type {?} */
    MaskApplierService.prototype.thousandSeparator;
    /** @type {?} */
    MaskApplierService.prototype.decimalMarker;
    /** @type {?} */
    MaskApplierService.prototype.customPattern;
    /** @type {?} */
    MaskApplierService.prototype.ipError;
    /** @type {?} */
    MaskApplierService.prototype.showMaskTyped;
    /** @type {?} */
    MaskApplierService.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskApplierService.prototype.validation;
    /** @type {?} */
    MaskApplierService.prototype.separatorLimit;
    /** @type {?} */
    MaskApplierService.prototype.allowNegativeNumbers;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype._shift;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype._formatWithSeparators;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.percentage;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.getPrecision;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.checkInputPrecision;
    /**
     * @type {?}
     * @protected
     */
    MaskApplierService.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1hcHBsaWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLWFwcGxpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLFVBQVUsQ0FBQztBQUczQyxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBd0I3QixZQUE2QyxPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBbkJ0RCxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFvVmhDLDBCQUFxQjs7Ozs7OztRQUFHLENBQzlCLEdBQVcsRUFDWCxxQkFBNkIsRUFDN0IsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsRUFBRTs7a0JBQ0ksQ0FBQyxHQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDOztrQkFDcEMsUUFBUSxHQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Z0JBQ2hFLEdBQUcsR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDaEIsY0FBYyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDckUsSUFBSSxjQUFjLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDaEIsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7aUJBQ3hFO3FCQUFNO29CQUNILEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzdDO2FBQ0Y7O2tCQUNLLEdBQUcsR0FBVyxjQUFjO1lBQ2xDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUM3RDtZQUNELElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDM0IsT0FBTyxHQUFHLEdBQUcsUUFBUSxDQUFDO2FBQ3ZCO2lCQUFNLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxHQUFHLENBQUM7YUFDWjtZQUNELE9BQU8sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDLEVBQUM7UUFFTSxlQUFVOzs7O1FBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtZQUM1QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNoRCxDQUFDLEVBQUM7UUFFTSxpQkFBWTs7OztRQUFHLENBQUMsY0FBc0IsRUFBVSxFQUFFOztrQkFDbEQsQ0FBQyxHQUFhLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzdDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEM7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLEVBQUM7UUFFTSx3QkFBbUI7Ozs7OztRQUFHLENBQzVCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLGFBQXVDLEVBQy9CLEVBQUU7WUFDVixJQUFJLFNBQVMsR0FBRyxRQUFRLEVBQUU7O3NCQUNsQixjQUFjLEdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxHQUFHLE9BQU8sU0FBUyxNQUFNLENBQUM7O3NCQUV6RyxjQUFjLEdBQTRCLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUNoRixJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLEVBQUU7b0JBQzlELFVBQVUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDtxQkFBTSxJQUFJLFNBQVMsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDaEUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzdEO2FBQ0Y7WUFDRCxPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDLEVBQUM7UUE1WEEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDcEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7UUFDaEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDNUQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNoRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDbEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7SUFDaEUsQ0FBQzs7Ozs7O0lBRU0sb0JBQW9CLENBQUMsVUFBa0IsRUFBRSxjQUE2QztjQUNyRixDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsR0FBRyxjQUFjO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7Ozs7SUFDTSxTQUFTLENBQUMsVUFBa0IsRUFBRSxjQUFzQixFQUFFLFdBQW1CLENBQUMsRUFBRTs7O0lBQWUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3pHLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDbkYsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7O1lBQ3BCLE1BQU0sR0FBRyxDQUFDOztZQUNWLE1BQU0sR0FBRyxFQUFFOztZQUNYLEtBQUssR0FBRyxLQUFLOztZQUNiLGNBQWMsR0FBRyxLQUFLOztZQUN0QixLQUFLLEdBQUcsQ0FBQzs7WUFDVCxRQUFRLEdBQUcsS0FBSztRQUNwQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMzRCxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEU7UUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JELFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUU7O2NBQ0ssVUFBVSxHQUFhLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzVELElBQUksY0FBYyxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkcsY0FBYyxHQUFHLGlCQUFpQixDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLEVBQUU7Z0JBQzVGLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztzQkFDeEMsU0FBUyxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO2dCQUMzRCxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbkU7WUFDRCxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7c0JBQy9GLElBQUksR0FBVyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekUsVUFBVSxHQUFHLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUMzRjtZQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDL0IsTUFBTSxHQUFHLFVBQVUsQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN6RDtTQUNGO2FBQU0sSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2pELElBQ0UsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Z0JBQzdCLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUMzQixVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsVUFBVSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQztnQkFDM0QsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFDakM7Z0JBQ0EsVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDL0M7WUFFRCxVQUFVO2dCQUNSLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxhQUFhO29CQUNwRixDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzs7OztrQkFLWCw0QkFBNEIsR0FBVyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDOztrQkFDM0Ysb0JBQW9CLEdBQVcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7O2tCQUMvRSxZQUFZLEdBQVcsdUNBQXVDO2lCQUNqRSxPQUFPLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxDQUFDO2lCQUN6QyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDOztrQkFFOUIsaUJBQWlCLEdBQVcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUM7WUFFdEUsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ3ZDLFVBQVUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdEOztrQkFFSyxTQUFTLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUM7WUFDM0QsVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7a0JBQzNFLFNBQVMsR0FBVyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvRixNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQzs7a0JBRWhHLFVBQVUsR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztrQkFDbEUsU0FBUyxHQUFXLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU07WUFFM0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQzdDLGNBQWMsR0FBRyxJQUFJLENBQUM7O29CQUNsQixNQUFNLEdBQUcsQ0FBQztnQkFDZCxHQUFHO29CQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQztvQkFDbkMsTUFBTSxFQUFFLENBQUM7aUJBQ1YsUUFBUSxNQUFNLEdBQUcsU0FBUyxFQUFFO2FBQzlCO2lCQUFNLElBQ0wsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDeEYsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFDdEU7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDbEIsUUFBUSxJQUFJLFNBQVMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQjtTQUNGO2FBQU07WUFDTDtZQUNFLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsV0FBVyxHQUFXLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFDdEQsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQ3JCLENBQUMsRUFBRSxFQUFHLFdBQVcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQ2pDO2dCQUNBLElBQUksTUFBTSxLQUFLLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BDLE1BQU07aUJBQ1A7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUNwRyxNQUFNLElBQUksV0FBVyxDQUFDO29CQUN0QixNQUFNLElBQUksQ0FBQyxDQUFDO2lCQUNiO3FCQUFNLElBQ0wsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUNsQyxLQUFLO29CQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUM5RDtvQkFDQSxNQUFNLElBQUksV0FBVyxDQUFDO29CQUN0QixNQUFNLElBQUksQ0FBQyxDQUFDO29CQUNaLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ2Y7cUJBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUMzRyxNQUFNLElBQUksV0FBVyxDQUFDO29CQUN0QixLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNkO3FCQUFNLElBQ0wsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDOUQ7b0JBQ0EsTUFBTSxJQUFJLFdBQVcsQ0FBQztvQkFDdEIsTUFBTSxJQUFJLENBQUMsQ0FBQztpQkFDYjtxQkFBTSxJQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMxRCxDQUFDLElBQUksQ0FBQyxXQUFXO3dCQUNmLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLEVBQzVFO29CQUNBLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDbEMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUMzQixNQUFNLElBQUksQ0FBQyxDQUFDOztrQ0FDTixTQUFTLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNOzRCQUNwRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JELENBQUMsRUFBRSxDQUFDOzRCQUNKLFNBQVM7eUJBQ1Y7cUJBQ0Y7b0JBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUNsQyxJQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDN0MsTUFBTSxJQUFJLENBQUMsQ0FBQzs0QkFDWixDQUFDLEVBQUUsQ0FBQzs0QkFDSixTQUFTO3lCQUNWO3FCQUNGO29CQUNELElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDbEMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUMzQixNQUFNLElBQUksQ0FBQyxDQUFDOztrQ0FDTixTQUFTLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNOzRCQUNwRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JELENBQUMsRUFBRSxDQUFDOzRCQUNKLFNBQVM7eUJBQ1Y7cUJBQ0Y7b0JBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUNsQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQzNCLE1BQU0sSUFBSSxDQUFDLENBQUM7O2tDQUNOLFNBQVMsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07NEJBQ3BHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDckQsQ0FBQyxFQUFFLENBQUM7NEJBQ0osU0FBUzt5QkFDVjtxQkFDRjs7MEJBQ0ssU0FBUyxHQUFHLEVBQUU7b0JBQ3BCLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDbEMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFOzRCQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDOztrQ0FDTixTQUFTLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNOzRCQUNwRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JELENBQUMsRUFBRSxDQUFDOzRCQUNKLFNBQVM7eUJBQ1Y7cUJBQ0Y7b0JBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFOzs4QkFDNUIsV0FBVyxHQUFHLEVBQUU7Ozs4QkFFaEIsV0FBVyxHQUNmLE1BQU0sS0FBSyxDQUFDOzRCQUNaLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7Z0NBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXO2dDQUMxRCxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQzs7OzhCQUU3QixjQUFjLEdBQ2xCLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzs0QkFDdEQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRztnQ0FDOUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0NBQy9GLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHO2dDQUMxQixDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHO29DQUM5QixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztvQ0FDL0YsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzs7OzhCQUVoQyxjQUFjLEdBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUzs0QkFDN0QsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7NEJBQ3ZELFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRzs0QkFDOUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDOzs7OEJBRTFGLGNBQWMsR0FDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTOzRCQUM1RCxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzs0QkFDdkQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dDQUNsRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDOzs7OEJBRXpELGNBQWMsR0FDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTOzRCQUM3RCxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzs0QkFDdkQsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHOzRCQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVc7d0JBRWhFLElBQUksV0FBVyxJQUFJLGNBQWMsSUFBSSxjQUFjLElBQUksY0FBYyxJQUFJLGNBQWMsRUFBRTs0QkFDdkYsTUFBTSxJQUFJLENBQUMsQ0FBQzs7a0NBQ04sU0FBUyxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTs0QkFDcEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNyRCxDQUFDLEVBQUUsQ0FBQzs0QkFDSixTQUFTO3lCQUNWO3FCQUNGO29CQUNELE1BQU0sSUFBSSxXQUFXLENBQUM7b0JBQ3RCLE1BQU0sRUFBRSxDQUFDO2lCQUNWO3FCQUFNLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDNUUsTUFBTSxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakMsTUFBTSxFQUFFLENBQUM7OzBCQUNILFNBQVMsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07b0JBQ3BHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxFQUFFLENBQUM7aUJBQ0w7cUJBQU0sSUFDTCxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFDM0Q7b0JBQ0EsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsS0FBSyxpQkFBaUIsRUFBRTt3QkFDaEUsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDOUI7b0JBQ0QsTUFBTSxFQUFFLENBQUM7b0JBQ1QsQ0FBQyxFQUFFLENBQUM7aUJBQ0w7cUJBQU0sSUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ3RFLEtBQUssRUFDTDtvQkFDQSxNQUFNLElBQUksQ0FBQyxDQUFDO29CQUNaLE1BQU0sSUFBSSxXQUFXLENBQUM7aUJBQ3ZCO3FCQUFNLElBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRztvQkFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUN0RSxLQUFLLEVBQ0w7b0JBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQztvQkFDWixNQUFNLElBQUksV0FBVyxDQUFDO2lCQUN2QjtxQkFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtvQkFDakksUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDakI7YUFDRjtTQUNGO1FBQ0QsSUFDRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxjQUFjLENBQUMsTUFBTTtZQUMzQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3BGO1lBQ0EsTUFBTSxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JEOztZQUVHLFdBQVcsR0FBVyxRQUFRLEdBQUcsQ0FBQztRQUV0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ25DLEtBQUssRUFBRSxDQUFDO1lBQ1IsV0FBVyxFQUFFLENBQUM7U0FDZjs7WUFFRyxXQUFXLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLFFBQVEsRUFBRTtZQUNaLFdBQVcsRUFBRSxDQUFDO1NBQ2Y7UUFFRCxFQUFFLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDckI7O1lBQ0csR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNqRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7U0FDakM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7O0lBQ00sZ0JBQWdCLENBQUMsV0FBbUI7UUFDekMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSTs7OztRQUFDLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssV0FBVyxFQUFDLENBQUM7SUFDL0UsQ0FBQzs7Ozs7OztJQUVTLGdCQUFnQixDQUFDLFdBQW1CLEVBQUUsVUFBa0I7UUFDaEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUNsRyxPQUFPLENBQ0wsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztZQUN0QyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTztZQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDakUsQ0FBQztJQUNKLENBQUM7Ozs7OztJQThETyxlQUFlLENBQUMsR0FBVztRQUNqQyxPQUFPLEdBQUc7YUFDUCxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQ1QsTUFBTTs7Ozs7UUFBQyxDQUFDLENBQVMsRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakYsQ0FBQyxFQUFDO2FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBRU8sdUJBQXVCLENBQUMsSUFBWTs7Y0FDcEMsYUFBYSxHQUFHLGNBQWM7UUFDcEMsT0FBTyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEYsQ0FBQzs7O1lBcGFGLFVBQVU7Ozs7NENBeUJXLE1BQU0sU0FBQyxNQUFNOzs7O0lBdkJqQyxtREFBK0Q7O0lBQy9ELHlDQUEyQzs7SUFDM0MsMENBQThDOztJQUM5Qyw2Q0FBb0Q7O0lBQ3BELDRDQUFtQzs7SUFDbkMseUNBQWdDOztJQUNoQyxpREFBd0M7O0lBQ3hDLG1EQUE0RDs7SUFDNUQsbURBQW1EOztJQUNuRCxvQ0FBa0M7O0lBQ2xDLG9DQUFrQzs7SUFDbEMsK0NBQXdEOztJQUN4RCwyQ0FBZ0Q7O0lBQ2hELDJDQUEyQzs7SUFDM0MscUNBQXlCOztJQUN6QiwyQ0FBZ0Q7O0lBQ2hELGtEQUE4RDs7SUFDOUQsd0NBQXlDOztJQUN6Qyw0Q0FBaUQ7O0lBQ2pELGtEQUE2RDs7Ozs7SUFFN0Qsb0NBQTZCOzs7OztJQXFVN0IsbURBMkJFOzs7OztJQUVGLHdDQUVFOzs7OztJQUVGLDBDQU9FOzs7OztJQUVGLGlEQWdCRTs7Ozs7SUE3WGlCLHFDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgY29uZmlnLCBJQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTWFza0FwcGxpZXJTZXJ2aWNlIHtcclxuICBwdWJsaWMgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydkcm9wU3BlY2lhbENoYXJhY3RlcnMnXTtcclxuICBwdWJsaWMgaGlkZGVuSW5wdXQ6IElDb25maWdbJ2hpZGRlbklucHV0J107XHJcbiAgcHVibGljIHNob3dUZW1wbGF0ZSE6IElDb25maWdbJ3Nob3dUZW1wbGF0ZSddO1xyXG4gIHB1YmxpYyBjbGVhcklmTm90TWF0Y2ghOiBJQ29uZmlnWydjbGVhcklmTm90TWF0Y2gnXTtcclxuICBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xyXG4gIHB1YmxpYyBhY3R1YWxWYWx1ZTogc3RyaW5nID0gJyc7XHJcbiAgcHVibGljIHNob3duTWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xyXG4gIHB1YmxpYyBtYXNrU3BlY2lhbENoYXJhY3RlcnMhOiBJQ29uZmlnWydzcGVjaWFsQ2hhcmFjdGVycyddO1xyXG4gIHB1YmxpYyBtYXNrQXZhaWxhYmxlUGF0dGVybnMhOiBJQ29uZmlnWydwYXR0ZXJucyddO1xyXG4gIHB1YmxpYyBwcmVmaXghOiBJQ29uZmlnWydwcmVmaXgnXTtcclxuICBwdWJsaWMgc3VmZml4ITogSUNvbmZpZ1snc3VmZml4J107XHJcbiAgcHVibGljIHRob3VzYW5kU2VwYXJhdG9yITogSUNvbmZpZ1sndGhvdXNhbmRTZXBhcmF0b3InXTtcclxuICBwdWJsaWMgZGVjaW1hbE1hcmtlciE6IElDb25maWdbJ2RlY2ltYWxNYXJrZXInXTtcclxuICBwdWJsaWMgY3VzdG9tUGF0dGVybiE6IElDb25maWdbJ3BhdHRlcm5zJ107XHJcbiAgcHVibGljIGlwRXJyb3I/OiBib29sZWFuO1xyXG4gIHB1YmxpYyBzaG93TWFza1R5cGVkITogSUNvbmZpZ1snc2hvd01hc2tUeXBlZCddO1xyXG4gIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3RlciE6IElDb25maWdbJ3BsYWNlSG9sZGVyQ2hhcmFjdGVyJ107XHJcbiAgcHVibGljIHZhbGlkYXRpb246IElDb25maWdbJ3ZhbGlkYXRpb24nXTtcclxuICBwdWJsaWMgc2VwYXJhdG9yTGltaXQ6IElDb25maWdbJ3NlcGFyYXRvckxpbWl0J107XHJcbiAgcHVibGljIGFsbG93TmVnYXRpdmVOdW1iZXJzOiBJQ29uZmlnWydhbGxvd05lZ2F0aXZlTnVtYmVycyddO1xyXG5cclxuICBwcml2YXRlIF9zaGlmdCE6IFNldDxudW1iZXI+O1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnKSB7XHJcbiAgICB0aGlzLl9zaGlmdCA9IG5ldyBTZXQoKTtcclxuICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoID0gdGhpcy5fY29uZmlnLmNsZWFySWZOb3RNYXRjaDtcclxuICAgIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5fY29uZmlnLmRyb3BTcGVjaWFsQ2hhcmFjdGVycztcclxuICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5fY29uZmlnLnNwZWNpYWxDaGFyYWN0ZXJzO1xyXG4gICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSB0aGlzLl9jb25maWcucGF0dGVybnM7XHJcbiAgICB0aGlzLnByZWZpeCA9IHRoaXMuX2NvbmZpZy5wcmVmaXg7XHJcbiAgICB0aGlzLnN1ZmZpeCA9IHRoaXMuX2NvbmZpZy5zdWZmaXg7XHJcbiAgICB0aGlzLnRob3VzYW5kU2VwYXJhdG9yID0gdGhpcy5fY29uZmlnLnRob3VzYW5kU2VwYXJhdG9yO1xyXG4gICAgdGhpcy5kZWNpbWFsTWFya2VyID0gdGhpcy5fY29uZmlnLmRlY2ltYWxNYXJrZXI7XHJcbiAgICB0aGlzLmhpZGRlbklucHV0ID0gdGhpcy5fY29uZmlnLmhpZGRlbklucHV0O1xyXG4gICAgdGhpcy5zaG93TWFza1R5cGVkID0gdGhpcy5fY29uZmlnLnNob3dNYXNrVHlwZWQ7XHJcbiAgICB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyID0gdGhpcy5fY29uZmlnLnBsYWNlSG9sZGVyQ2hhcmFjdGVyO1xyXG4gICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy5fY29uZmlnLnZhbGlkYXRpb247XHJcbiAgICB0aGlzLnNlcGFyYXRvckxpbWl0ID0gdGhpcy5fY29uZmlnLnNlcGFyYXRvckxpbWl0O1xyXG4gICAgdGhpcy5hbGxvd05lZ2F0aXZlTnVtYmVycyA9IHRoaXMuX2NvbmZpZy5hbGxvd05lZ2F0aXZlTnVtYmVycztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhcHBseU1hc2tXaXRoUGF0dGVybihpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tBbmRQYXR0ZXJuOiBbc3RyaW5nLCBJQ29uZmlnWydwYXR0ZXJucyddXSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBbbWFzaywgY3VzdG9tUGF0dGVybl0gPSBtYXNrQW5kUGF0dGVybjtcclxuICAgIHRoaXMuY3VzdG9tUGF0dGVybiA9IGN1c3RvbVBhdHRlcm47XHJcbiAgICByZXR1cm4gdGhpcy5hcHBseU1hc2soaW5wdXRWYWx1ZSwgbWFzayk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhcHBseU1hc2soaW5wdXRWYWx1ZTogc3RyaW5nLCBtYXNrRXhwcmVzc2lvbjogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyID0gMCwgY2I6IEZ1bmN0aW9uID0gKCkgPT4geyB9KTogc3RyaW5nIHtcclxuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQgfHwgaW5wdXRWYWx1ZSA9PT0gbnVsbCB8fCBtYXNrRXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGlucHV0VmFsdWUpO1xyXG4gICAgbGV0IGN1cnNvciA9IDA7XHJcbiAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICBsZXQgbXVsdGkgPSBmYWxzZTtcclxuICAgIGxldCBiYWNrc3BhY2VTaGlmdCA9IGZhbHNlO1xyXG4gICAgbGV0IHNoaWZ0ID0gMTtcclxuICAgIGxldCBzdGVwQmFjayA9IGZhbHNlO1xyXG4gICAgaWYgKGlucHV0VmFsdWUuc2xpY2UoMCwgdGhpcy5wcmVmaXgubGVuZ3RoKSA9PT0gdGhpcy5wcmVmaXgpIHtcclxuICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc2xpY2UodGhpcy5wcmVmaXgubGVuZ3RoLCBpbnB1dFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICBpZiAoISF0aGlzLnN1ZmZpeCAmJiBpbnB1dFZhbHVlLmVuZHNXaXRoKHRoaXMuc3VmZml4KSkge1xyXG4gICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnB1dEFycmF5OiBzdHJpbmdbXSA9IGlucHV0VmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XHJcbiAgICBpZiAobWFza0V4cHJlc3Npb24gPT09ICdJUCcpIHtcclxuICAgICAgdGhpcy5pcEVycm9yID0gISEoaW5wdXRBcnJheS5maWx0ZXIoKGk6IHN0cmluZykgPT4gaSA9PT0gJy4nKS5sZW5ndGggPCAzICYmIGlucHV0QXJyYXkubGVuZ3RoIDwgNyk7XHJcbiAgICAgIG1hc2tFeHByZXNzaW9uID0gJzA5OS4wOTkuMDk5LjA5OSc7XHJcbiAgICB9XHJcbiAgICBpZiAobWFza0V4cHJlc3Npb24uc3RhcnRzV2l0aCgncGVyY2VudCcpKSB7XHJcbiAgICAgIGlmIChpbnB1dFZhbHVlLm1hdGNoKCdbYS16XXxbQS1aXScpIHx8IGlucHV0VmFsdWUubWF0Y2goL1stISQlXiYqKClfK3x+PWB7fVxcW1xcXTpcIjsnPD4/LFxcL10vKSkge1xyXG4gICAgICAgIGlucHV0VmFsdWUgPSB0aGlzLl9zdHJpcFRvRGVjaW1hbChpbnB1dFZhbHVlKTtcclxuICAgICAgICBjb25zdCBwcmVjaXNpb246IG51bWJlciA9IHRoaXMuZ2V0UHJlY2lzaW9uKG1hc2tFeHByZXNzaW9uKTtcclxuICAgICAgICBpbnB1dFZhbHVlID0gdGhpcy5jaGVja0lucHV0UHJlY2lzaW9uKGlucHV0VmFsdWUsIHByZWNpc2lvbiwgJy4nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaW5wdXRWYWx1ZS5pbmRleE9mKCcuJykgPiAwICYmICF0aGlzLnBlcmNlbnRhZ2UoaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5pbmRleE9mKCcuJykpKSkge1xyXG4gICAgICAgIGNvbnN0IGJhc2U6IHN0cmluZyA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUuaW5kZXhPZignLicpIC0gMSk7XHJcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGAke2Jhc2V9JHtpbnB1dFZhbHVlLnN1YnN0cmluZyhpbnB1dFZhbHVlLmluZGV4T2YoJy4nKSwgaW5wdXRWYWx1ZS5sZW5ndGgpfWA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucGVyY2VudGFnZShpbnB1dFZhbHVlKSkge1xyXG4gICAgICAgIHJlc3VsdCA9IGlucHV0VmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0ID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChtYXNrRXhwcmVzc2lvbi5zdGFydHNXaXRoKCdzZXBhcmF0b3InKSkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW3fQsC3Rj9CQLdCvXScpIHx8XHJcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW9CB0ZHQkC3Rj10nKSB8fFxyXG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2goJ1thLXpdfFtBLVpdJykgfHxcclxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKC9bLUAjISQlXFxcXF4mKigpX8KjwqwnK3x+PWB7fVxcW1xcXTpcIjs8Pi4/XFwvXS8pIHx8XHJcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW15BLVphLXowLTksXScpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlucHV0VmFsdWUgPSB0aGlzLl9zdHJpcFRvRGVjaW1hbChpbnB1dFZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaW5wdXRWYWx1ZSA9XHJcbiAgICAgICAgaW5wdXRWYWx1ZS5sZW5ndGggPiAxICYmIGlucHV0VmFsdWVbMF0gPT09ICcwJyAmJiBpbnB1dFZhbHVlWzFdICE9PSB0aGlzLmRlY2ltYWxNYXJrZXJcclxuICAgICAgICAgID8gaW5wdXRWYWx1ZS5zbGljZSgxLCBpbnB1dFZhbHVlLmxlbmd0aClcclxuICAgICAgICAgIDogaW5wdXRWYWx1ZTtcclxuXHJcbiAgICAgIC8vIFRPRE86IHdlIGhhZCBkaWZmZXJlbnQgcmV4ZXhwcyBoZXJlIGZvciB0aGUgZGlmZmVyZW50IGNhc2VzLi4uIGJ1dCB0ZXN0cyBkb250IHNlYW0gdG8gYm90aGVyIC0gY2hlY2sgdGhpc1xyXG4gICAgICAvLyAgc2VwYXJhdG9yOiBubyBDT01NQSwgZG90LXNlcDogbm8gU1BBQ0UsIENPTU1BIE9LLCBjb21tYS1zZXA6IG5vIFNQQUNFLCBDT01NQSBPS1xyXG5cclxuICAgICAgY29uc3QgdGhvdXNhbmRTZXBlcmF0b3JDaGFyRXNjYXBlZDogc3RyaW5nID0gdGhpcy5fY2hhclRvUmVnRXhwRXhwcmVzc2lvbih0aGlzLnRob3VzYW5kU2VwYXJhdG9yKTtcclxuICAgICAgY29uc3QgZGVjaW1hbE1hcmtlckVzY2FwZWQ6IHN0cmluZyA9IHRoaXMuX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24odGhpcy5kZWNpbWFsTWFya2VyKTtcclxuICAgICAgY29uc3QgaW52YWxpZENoYXJzOiBzdHJpbmcgPSAnQCMhJCVeJiooKV8rfH49YHt9XFxcXFtcXFxcXTpcXFxccyxcIjs8Pj9cXFxcLydcclxuICAgICAgICAucmVwbGFjZSh0aG91c2FuZFNlcGVyYXRvckNoYXJFc2NhcGVkLCAnJylcclxuICAgICAgICAucmVwbGFjZShkZWNpbWFsTWFya2VyRXNjYXBlZCwgJycpO1xyXG5cclxuICAgICAgY29uc3QgaW52YWxpZENoYXJSZWdleHA6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ1snICsgaW52YWxpZENoYXJzICsgJ10nKTtcclxuXHJcbiAgICAgIGlmIChpbnB1dFZhbHVlLm1hdGNoKGludmFsaWRDaGFyUmVnZXhwKSkge1xyXG4gICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcmVjaXNpb246IG51bWJlciA9IHRoaXMuZ2V0UHJlY2lzaW9uKG1hc2tFeHByZXNzaW9uKTtcclxuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY2hlY2tJbnB1dFByZWNpc2lvbihpbnB1dFZhbHVlLCBwcmVjaXNpb24sIHRoaXMuZGVjaW1hbE1hcmtlcik7XHJcbiAgICAgIGNvbnN0IHN0ckZvclNlcDogc3RyaW5nID0gaW5wdXRWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhvdXNhbmRTZXBlcmF0b3JDaGFyRXNjYXBlZCwgJ2cnKSwgJycpO1xyXG4gICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRXaXRoU2VwYXJhdG9ycyhzdHJGb3JTZXAsIHRoaXMudGhvdXNhbmRTZXBhcmF0b3IsIHRoaXMuZGVjaW1hbE1hcmtlciwgcHJlY2lzaW9uKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbW1hU2hpZnQ6IG51bWJlciA9IHJlc3VsdC5pbmRleE9mKCcsJykgLSBpbnB1dFZhbHVlLmluZGV4T2YoJywnKTtcclxuICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSByZXN1bHQubGVuZ3RoIC0gaW5wdXRWYWx1ZS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAoc2hpZnRTdGVwID4gMCAmJiByZXN1bHRbcG9zaXRpb25dICE9PSAnLCcpIHtcclxuICAgICAgICBiYWNrc3BhY2VTaGlmdCA9IHRydWU7XHJcbiAgICAgICAgbGV0IF9zaGlmdCA9IDA7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHBvc2l0aW9uICsgX3NoaWZ0KTtcclxuICAgICAgICAgIF9zaGlmdCsrO1xyXG4gICAgICAgIH0gd2hpbGUgKF9zaGlmdCA8IHNoaWZ0U3RlcCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgKGNvbW1hU2hpZnQgIT09IDAgJiYgcG9zaXRpb24gPiAwICYmICEocmVzdWx0LmluZGV4T2YoJywnKSA+PSBwb3NpdGlvbiAmJiBwb3NpdGlvbiA+IDMpKSB8fFxyXG4gICAgICAgICghKHJlc3VsdC5pbmRleE9mKCcuJykgPj0gcG9zaXRpb24gJiYgcG9zaXRpb24gPiAzKSAmJiBzaGlmdFN0ZXAgPD0gMClcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5fc2hpZnQuY2xlYXIoKTtcclxuICAgICAgICBiYWNrc3BhY2VTaGlmdCA9IHRydWU7XHJcbiAgICAgICAgc2hpZnQgPSBzaGlmdFN0ZXA7XHJcbiAgICAgICAgcG9zaXRpb24gKz0gc2hpZnRTdGVwO1xyXG4gICAgICAgIHRoaXMuX3NoaWZ0LmFkZChwb3NpdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fc2hpZnQuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICBsZXQgaTogbnVtYmVyID0gMCwgaW5wdXRTeW1ib2w6IHN0cmluZyA9IGlucHV0QXJyYXlbMF07XHJcbiAgICAgICAgaSA8IGlucHV0QXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIGkrKyAsIGlucHV0U3ltYm9sID0gaW5wdXRBcnJheVtpXVxyXG4gICAgICApIHtcclxuICAgICAgICBpZiAoY3Vyc29yID09PSBtYXNrRXhwcmVzc2lvbi5sZW5ndGgpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSAmJiBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nKSB7XHJcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XHJcbiAgICAgICAgICBjdXJzb3IgKz0gMjtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJyAmJlxyXG4gICAgICAgICAgbXVsdGkgJiZcclxuICAgICAgICAgIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XHJcbiAgICAgICAgICBjdXJzb3IgKz0gMztcclxuICAgICAgICAgIG11bHRpID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pICYmIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnKicpIHtcclxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcclxuICAgICAgICAgIG11bHRpID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/JyAmJlxyXG4gICAgICAgICAgdGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcclxuICAgICAgICAgIGN1cnNvciArPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICB0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pIHx8XHJcbiAgICAgICAgICAodGhpcy5oaWRkZW5JbnB1dCAmJlxyXG4gICAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXSAmJlxyXG4gICAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXS5zeW1ib2wgPT09IGlucHV0U3ltYm9sKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdIJykge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDIpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcclxuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XHJcbiAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ2gnKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09ICcyJyAmJiBOdW1iZXIoaW5wdXRTeW1ib2wpID4gMykge1xyXG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xyXG4gICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdtJykge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDUpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcclxuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XHJcbiAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ3MnKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gNSkge1xyXG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcclxuICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGRheXNDb3VudCA9IDMxO1xyXG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdkJykge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yLCBjdXJzb3IgKyAyKSkgPiBkYXlzQ291bnQgfHwgaW5wdXRWYWx1ZVtjdXJzb3IgKyAxXSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcclxuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xyXG4gICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdNJykge1xyXG4gICAgICAgICAgICBjb25zdCBtb250aHNDb3VudCA9IDEyO1xyXG4gICAgICAgICAgICAvLyBtYXNrIHdpdGhvdXQgZGF5XHJcbiAgICAgICAgICAgIGNvbnN0IHdpdGhvdXREYXlzOiBib29sZWFuID1cclxuICAgICAgICAgICAgICBjdXJzb3IgPT09IDAgJiZcclxuICAgICAgICAgICAgICAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDIgfHxcclxuICAgICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciwgY3Vyc29yICsgMikpID4gbW9udGhzQ291bnQgfHxcclxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yICsgMV0gPT09ICcvJyk7XHJcbiAgICAgICAgICAgIC8vIGRheTwxMCAmJiBtb250aDwxMiBmb3IgaW5wdXRcclxuICAgICAgICAgICAgY29uc3QgZGF5MW1vbnRoSW5wdXQ6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICAgIGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkuaW5jbHVkZXMoJy8nKSAmJlxyXG4gICAgICAgICAgICAgICgoaW5wdXRWYWx1ZVtjdXJzb3IgLSAyXSA9PT0gJy8nICYmXHJcbiAgICAgICAgICAgICAgICAoTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMSwgY3Vyc29yICsgMSkpID4gbW9udGhzQ291bnQgJiYgaW5wdXRWYWx1ZVtjdXJzb3JdICE9PSAnLycpKSB8fFxyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3JdID09PSAnLycgfHxcclxuICAgICAgICAgICAgICAgICgoaW5wdXRWYWx1ZVtjdXJzb3IgLSAzXSA9PT0gJy8nICYmXHJcbiAgICAgICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAyLCBjdXJzb3IpKSA+IG1vbnRoc0NvdW50ICYmIGlucHV0VmFsdWVbY3Vyc29yIC0gMV0gIT09ICcvJykpIHx8XHJcbiAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yIC0gMV0gPT09ICcvJykpO1xyXG4gICAgICAgICAgICAvLyAxMDxkYXk8MzEgJiYgbW9udGg8MTIgZm9yIGlucHV0XHJcbiAgICAgICAgICAgIGNvbnN0IGRheTJtb250aElucHV0OiBib29sZWFuID1cclxuICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKSkgPD0gZGF5c0NvdW50ICYmXHJcbiAgICAgICAgICAgICAgIWlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkuaW5jbHVkZXMoJy8nKSAmJlxyXG4gICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yIC0gMV0gPT09ICcvJyAmJlxyXG4gICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IsIGN1cnNvciArIDIpKSA+IG1vbnRoc0NvdW50IHx8IGlucHV0VmFsdWVbY3Vyc29yICsgMV0gPT09ICcvJyk7XHJcbiAgICAgICAgICAgIC8vIGRheTwxMCAmJiBtb250aDwxMiBmb3IgcGFzdGUgd2hvbGUgZGF0YVxyXG4gICAgICAgICAgICBjb25zdCBkYXkxbW9udGhQYXN0ZTogYm9vbGVhbiA9XHJcbiAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkpID4gZGF5c0NvdW50ICYmXHJcbiAgICAgICAgICAgICAgIWlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkuaW5jbHVkZXMoJy8nKSAmJlxyXG4gICAgICAgICAgICAgICghaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAyLCBjdXJzb3IpLmluY2x1ZGVzKCcvJykgJiZcclxuICAgICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDIsIGN1cnNvcikpID4gbW9udGhzQ291bnQpO1xyXG4gICAgICAgICAgICAvLyAxMDxkYXk8MzEgJiYgbW9udGg8MTIgZm9yIHBhc3RlIHdob2xlIGRhdGFcclxuICAgICAgICAgICAgY29uc3QgZGF5Mm1vbnRoUGFzdGU6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpKSA8PSBkYXlzQ291bnQgJiZcclxuICAgICAgICAgICAgICAhaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXHJcbiAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSAhPT0gJy8nICYmXHJcbiAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMSwgY3Vyc29yICsgMSkpID4gbW9udGhzQ291bnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAod2l0aG91dERheXMgfHwgZGF5MW1vbnRoSW5wdXQgfHwgZGF5Mm1vbnRoSW5wdXQgfHwgZGF5MW1vbnRoUGFzdGUgfHwgZGF5Mm1vbnRoUGFzdGUpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcclxuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XHJcbiAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XHJcbiAgICAgICAgICBjdXJzb3IrKztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluZGV4T2YobWFza0V4cHJlc3Npb25bY3Vyc29yXSkgIT09IC0xKSB7XHJcbiAgICAgICAgICByZXN1bHQgKz0gbWFza0V4cHJlc3Npb25bY3Vyc29yXTtcclxuICAgICAgICAgIGN1cnNvcisrO1xyXG4gICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcclxuICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XHJcbiAgICAgICAgICBpLS07XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluZGV4T2YoaW5wdXRTeW1ib2wpID4gLTEgJiZcclxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dICYmXHJcbiAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXS5vcHRpb25hbFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgaWYgKCEhaW5wdXRBcnJheVtjdXJzb3JdICYmIG1hc2tFeHByZXNzaW9uICE9PSAnMDk5LjA5OS4wOTkuMDk5Jykge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gaW5wdXRBcnJheVtjdXJzb3JdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY3Vyc29yKys7XHJcbiAgICAgICAgICBpLS07XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJyAmJlxyXG4gICAgICAgICAgdGhpcy5fZmluZFNwZWNpYWxDaGFyKHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pICYmXHJcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2wpID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdICYmXHJcbiAgICAgICAgICBtdWx0aVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY3Vyc29yICs9IDM7XHJcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/JyAmJlxyXG4gICAgICAgICAgdGhpcy5fZmluZFNwZWNpYWxDaGFyKHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pICYmXHJcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2wpID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdICYmXHJcbiAgICAgICAgICBtdWx0aVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY3Vyc29yICs9IDM7XHJcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNob3dNYXNrVHlwZWQgJiYgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihpbnB1dFN5bWJvbCkgPCAwICYmIGlucHV0U3ltYm9sICE9PSB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICBzdGVwQmFjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHJlc3VsdC5sZW5ndGggKyAxID09PSBtYXNrRXhwcmVzc2lvbi5sZW5ndGggJiZcclxuICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihtYXNrRXhwcmVzc2lvblttYXNrRXhwcmVzc2lvbi5sZW5ndGggLSAxXSkgIT09IC0xXHJcbiAgICApIHtcclxuICAgICAgcmVzdWx0ICs9IG1hc2tFeHByZXNzaW9uW21hc2tFeHByZXNzaW9uLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuZXdQb3NpdGlvbjogbnVtYmVyID0gcG9zaXRpb24gKyAxO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLl9zaGlmdC5oYXMobmV3UG9zaXRpb24pKSB7XHJcbiAgICAgIHNoaWZ0Kys7XHJcbiAgICAgIG5ld1Bvc2l0aW9uKys7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFjdHVhbFNoaWZ0OiBudW1iZXIgPSB0aGlzLl9zaGlmdC5oYXMocG9zaXRpb24pID8gc2hpZnQgOiAwO1xyXG4gICAgaWYgKHN0ZXBCYWNrKSB7XHJcbiAgICAgIGFjdHVhbFNoaWZ0LS07XHJcbiAgICB9XHJcblxyXG4gICAgY2IoYWN0dWFsU2hpZnQsIGJhY2tzcGFjZVNoaWZ0KTtcclxuICAgIGlmIChzaGlmdCA8IDApIHtcclxuICAgICAgdGhpcy5fc2hpZnQuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIGxldCByZXMgPSBgJHt0aGlzLnByZWZpeH0ke3Jlc3VsdH0ke3RoaXMuc3VmZml4fWA7XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXMgPSBgJHt0aGlzLnByZWZpeH0ke3Jlc3VsdH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcbiAgcHVibGljIF9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2w6IHN0cmluZyk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmluZCgodmFsOiBzdHJpbmcpID0+IHZhbCA9PT0gaW5wdXRTeW1ib2wpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2w6IHN0cmluZywgbWFza1N5bWJvbDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHRoaXMuY3VzdG9tUGF0dGVybiA/IHRoaXMuY3VzdG9tUGF0dGVybiA6IHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF0gJiZcclxuICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF0ucGF0dGVybiAmJlxyXG4gICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXS5wYXR0ZXJuLnRlc3QoaW5wdXRTeW1ib2wpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZm9ybWF0V2l0aFNlcGFyYXRvcnMgPSAoXHJcbiAgICBzdHI6IHN0cmluZyxcclxuICAgIHRob3VzYW5kU2VwYXJhdG9yQ2hhcjogc3RyaW5nLFxyXG4gICAgZGVjaW1hbENoYXI6IHN0cmluZyxcclxuICAgIHByZWNpc2lvbjogbnVtYmVyXHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB4OiBzdHJpbmdbXSA9IHN0ci5zcGxpdChkZWNpbWFsQ2hhcik7XHJcbiAgICBjb25zdCBkZWNpbWFsczogc3RyaW5nID0geC5sZW5ndGggPiAxID8gYCR7ZGVjaW1hbENoYXJ9JHt4WzFdfWAgOiAnJztcclxuICAgIGxldCByZXM6IHN0cmluZyA9IHhbMF07XHJcbiAgICBjb25zdCBzZXBhcmF0b3JMaW1pdDogc3RyaW5nID0gdGhpcy5zZXBhcmF0b3JMaW1pdC5yZXBsYWNlKC9cXHMvZywgJycpO1xyXG4gICAgaWYgKHNlcGFyYXRvckxpbWl0ICYmICtzZXBhcmF0b3JMaW1pdCkge1xyXG4gICAgICBpZiAocmVzWzBdID09PSAnLScpIHtcclxuICAgICAgICAgIHJlcyA9IGAtJHtyZXMuc2xpY2UoMSwgcmVzLmxlbmd0aCkuc2xpY2UoMCwgc2VwYXJhdG9yTGltaXQubGVuZ3RoKX1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzID0gcmVzLnNsaWNlKDAsIHNlcGFyYXRvckxpbWl0Lmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHJneDogUmVnRXhwID0gLyhcXGQrKShcXGR7M30pLztcclxuICAgIHdoaWxlIChyZ3gudGVzdChyZXMpKSB7XHJcbiAgICAgIHJlcyA9IHJlcy5yZXBsYWNlKHJneCwgJyQxJyArIHRob3VzYW5kU2VwYXJhdG9yQ2hhciArICckMicpO1xyXG4gICAgfVxyXG4gICAgaWYgKHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiByZXMgKyBkZWNpbWFscztcclxuICAgIH0gZWxzZSBpZiAocHJlY2lzaW9uID09PSAwKSB7XHJcbiAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzICsgZGVjaW1hbHMuc3Vic3RyKDAsIHByZWNpc2lvbiArIDEpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgcGVyY2VudGFnZSA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuIE51bWJlcihzdHIpID49IDAgJiYgTnVtYmVyKHN0cikgPD0gMTAwO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgZ2V0UHJlY2lzaW9uID0gKG1hc2tFeHByZXNzaW9uOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xyXG4gICAgY29uc3QgeDogc3RyaW5nW10gPSBtYXNrRXhwcmVzc2lvbi5zcGxpdCgnLicpO1xyXG4gICAgaWYgKHgubGVuZ3RoID4gMSkge1xyXG4gICAgICByZXR1cm4gTnVtYmVyKHhbeC5sZW5ndGggLSAxXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEluZmluaXR5O1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgY2hlY2tJbnB1dFByZWNpc2lvbiA9IChcclxuICAgIGlucHV0VmFsdWU6IHN0cmluZyxcclxuICAgIHByZWNpc2lvbjogbnVtYmVyLFxyXG4gICAgZGVjaW1hbE1hcmtlcjogSUNvbmZpZ1snZGVjaW1hbE1hcmtlciddXHJcbiAgKTogc3RyaW5nID0+IHtcclxuICAgIGlmIChwcmVjaXNpb24gPCBJbmZpbml0eSkge1xyXG4gICAgICBjb25zdCBwcmVjaXNpb25SZWdFeDogUmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLl9jaGFyVG9SZWdFeHBFeHByZXNzaW9uKGRlY2ltYWxNYXJrZXIpICsgYFxcXFxkeyR7cHJlY2lzaW9ufX0uKiRgKTtcclxuXHJcbiAgICAgIGNvbnN0IHByZWNpc2lvbk1hdGNoOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IGlucHV0VmFsdWUubWF0Y2gocHJlY2lzaW9uUmVnRXgpO1xyXG4gICAgICBpZiAocHJlY2lzaW9uTWF0Y2ggJiYgcHJlY2lzaW9uTWF0Y2hbMF0ubGVuZ3RoIC0gMSA+IHByZWNpc2lvbikge1xyXG4gICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9IGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gMCAmJiBpbnB1dFZhbHVlLmVuZHNXaXRoKGRlY2ltYWxNYXJrZXIpKSB7XHJcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBpbnB1dFZhbHVlO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgX3N0cmlwVG9EZWNpbWFsKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHJcclxuICAgICAgLnNwbGl0KCcnKVxyXG4gICAgICAuZmlsdGVyKChpOiBzdHJpbmcsIGlkeDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGkubWF0Y2goJ14tP1xcXFxkJykgfHwgaSA9PT0gJy4nIHx8IGkgPT09ICcsJyB8fCAoaSA9PT0gJy0nICYmIGlkeCA9PT0gMCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24oY2hhcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGNoYXJzVG9Fc2NhcGUgPSAnW1xcXFxeJC58PyorKCknO1xyXG4gICAgcmV0dXJuIGNoYXIgPT09ICcgJyA/ICdcXFxccycgOiBjaGFyc1RvRXNjYXBlLmluZGV4T2YoY2hhcikgPj0gMCA/ICdcXFxcJyArIGNoYXIgOiBjaGFyO1xyXG4gIH1cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWZpbGUtbGluZS1jb3VudFxyXG59XHJcbiJdfQ==