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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1hcHBsaWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLWFwcGxpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLFVBQVUsQ0FBQztBQUczQyxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBd0I3QixZQUE2QyxPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBbkJ0RCxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFtVmhDLDBCQUFxQjs7Ozs7OztRQUFHLENBQzlCLEdBQVcsRUFDWCxxQkFBNkIsRUFDN0IsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsRUFBRTs7a0JBQ0ksQ0FBQyxHQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDOztrQkFDcEMsUUFBUSxHQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Z0JBQ2hFLEdBQUcsR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDaEIsY0FBYyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDckUsSUFBSSxjQUFjLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDaEIsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxD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QyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RGLENBQUM7OztZQW5hRixVQUFVOzs7OzRDQXlCVyxNQUFNLFNBQUMsTUFBTTs7OztJQXZCakMsbURBQStEOztJQUMvRCx5Q0FBMkM7O0lBQzNDLDBDQUE4Qzs7SUFDOUMsNkNBQW9EOztJQUNwRCw0Q0FBbUM7O0lBQ25DLHlDQUFnQzs7SUFDaEMsaURBQXdDOztJQUN4QyxtREFBNEQ7O0lBQzVELG1EQUFtRDs7SUFDbkQsb0NBQWtDOztJQUNsQyxvQ0FBa0M7O0lBQ2xDLCtDQUF3RDs7SUFDeEQsMkNBQWdEOztJQUNoRCwyQ0FBMkM7O0lBQzNDLHFDQUF5Qjs7SUFDekIsMkNBQWdEOztJQUNoRCxrREFBOEQ7O0lBQzlELHdDQUF5Qzs7SUFDekMsNENBQWlEOztJQUNqRCxrREFBNkQ7Ozs7O0lBRTdELG9DQUE2Qjs7Ozs7SUFvVTdCLG1EQTJCRTs7Ozs7SUFFRix3Q0FFRTs7Ozs7SUFFRiwwQ0FPRTs7Ozs7SUFFRixpREFnQkU7Ozs7O0lBNVhpQixxQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1hc2tBcHBsaWVyU2VydmljZSB7XHJcbiAgcHVibGljIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogSUNvbmZpZ1snZHJvcFNwZWNpYWxDaGFyYWN0ZXJzJ107XHJcbiAgcHVibGljIGhpZGRlbklucHV0OiBJQ29uZmlnWydoaWRkZW5JbnB1dCddO1xyXG4gIHB1YmxpYyBzaG93VGVtcGxhdGUhOiBJQ29uZmlnWydzaG93VGVtcGxhdGUnXTtcclxuICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoITogSUNvbmZpZ1snY2xlYXJJZk5vdE1hdGNoJ107XHJcbiAgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcclxuICBwdWJsaWMgYWN0dWFsVmFsdWU6IHN0cmluZyA9ICcnO1xyXG4gIHB1YmxpYyBzaG93bk1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcclxuICBwdWJsaWMgbWFza1NwZWNpYWxDaGFyYWN0ZXJzITogSUNvbmZpZ1snc3BlY2lhbENoYXJhY3RlcnMnXTtcclxuICBwdWJsaWMgbWFza0F2YWlsYWJsZVBhdHRlcm5zITogSUNvbmZpZ1sncGF0dGVybnMnXTtcclxuICBwdWJsaWMgcHJlZml4ITogSUNvbmZpZ1sncHJlZml4J107XHJcbiAgcHVibGljIHN1ZmZpeCE6IElDb25maWdbJ3N1ZmZpeCddO1xyXG4gIHB1YmxpYyB0aG91c2FuZFNlcGFyYXRvciE6IElDb25maWdbJ3Rob3VzYW5kU2VwYXJhdG9yJ107XHJcbiAgcHVibGljIGRlY2ltYWxNYXJrZXIhOiBJQ29uZmlnWydkZWNpbWFsTWFya2VyJ107XHJcbiAgcHVibGljIGN1c3RvbVBhdHRlcm4hOiBJQ29uZmlnWydwYXR0ZXJucyddO1xyXG4gIHB1YmxpYyBpcEVycm9yPzogYm9vbGVhbjtcclxuICBwdWJsaWMgc2hvd01hc2tUeXBlZCE6IElDb25maWdbJ3Nob3dNYXNrVHlwZWQnXTtcclxuICBwdWJsaWMgcGxhY2VIb2xkZXJDaGFyYWN0ZXIhOiBJQ29uZmlnWydwbGFjZUhvbGRlckNoYXJhY3RlciddO1xyXG4gIHB1YmxpYyB2YWxpZGF0aW9uOiBJQ29uZmlnWyd2YWxpZGF0aW9uJ107XHJcbiAgcHVibGljIHNlcGFyYXRvckxpbWl0OiBJQ29uZmlnWydzZXBhcmF0b3JMaW1pdCddO1xyXG4gIHB1YmxpYyBhbGxvd05lZ2F0aXZlTnVtYmVyczogSUNvbmZpZ1snYWxsb3dOZWdhdGl2ZU51bWJlcnMnXTtcclxuXHJcbiAgcHJpdmF0ZSBfc2hpZnQhOiBTZXQ8bnVtYmVyPjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKEBJbmplY3QoY29uZmlnKSBwcm90ZWN0ZWQgX2NvbmZpZzogSUNvbmZpZykge1xyXG4gICAgdGhpcy5fc2hpZnQgPSBuZXcgU2V0KCk7XHJcbiAgICB0aGlzLmNsZWFySWZOb3RNYXRjaCA9IHRoaXMuX2NvbmZpZy5jbGVhcklmTm90TWF0Y2g7XHJcbiAgICB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZy5kcm9wU3BlY2lhbENoYXJhY3RlcnM7XHJcbiAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZy5zcGVjaWFsQ2hhcmFjdGVycztcclxuICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gdGhpcy5fY29uZmlnLnBhdHRlcm5zO1xyXG4gICAgdGhpcy5wcmVmaXggPSB0aGlzLl9jb25maWcucHJlZml4O1xyXG4gICAgdGhpcy5zdWZmaXggPSB0aGlzLl9jb25maWcuc3VmZml4O1xyXG4gICAgdGhpcy50aG91c2FuZFNlcGFyYXRvciA9IHRoaXMuX2NvbmZpZy50aG91c2FuZFNlcGFyYXRvcjtcclxuICAgIHRoaXMuZGVjaW1hbE1hcmtlciA9IHRoaXMuX2NvbmZpZy5kZWNpbWFsTWFya2VyO1xyXG4gICAgdGhpcy5oaWRkZW5JbnB1dCA9IHRoaXMuX2NvbmZpZy5oaWRkZW5JbnB1dDtcclxuICAgIHRoaXMuc2hvd01hc2tUeXBlZCA9IHRoaXMuX2NvbmZpZy5zaG93TWFza1R5cGVkO1xyXG4gICAgdGhpcy5wbGFjZUhvbGRlckNoYXJhY3RlciA9IHRoaXMuX2NvbmZpZy5wbGFjZUhvbGRlckNoYXJhY3RlcjtcclxuICAgIHRoaXMudmFsaWRhdGlvbiA9IHRoaXMuX2NvbmZpZy52YWxpZGF0aW9uO1xyXG4gICAgdGhpcy5zZXBhcmF0b3JMaW1pdCA9IHRoaXMuX2NvbmZpZy5zZXBhcmF0b3JMaW1pdDtcclxuICAgIHRoaXMuYWxsb3dOZWdhdGl2ZU51bWJlcnMgPSB0aGlzLl9jb25maWcuYWxsb3dOZWdhdGl2ZU51bWJlcnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlNYXNrV2l0aFBhdHRlcm4oaW5wdXRWYWx1ZTogc3RyaW5nLCBtYXNrQW5kUGF0dGVybjogW3N0cmluZywgSUNvbmZpZ1sncGF0dGVybnMnXV0pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgW21hc2ssIGN1c3RvbVBhdHRlcm5dID0gbWFza0FuZFBhdHRlcm47XHJcbiAgICB0aGlzLmN1c3RvbVBhdHRlcm4gPSBjdXN0b21QYXR0ZXJuO1xyXG4gICAgcmV0dXJuIHRoaXMuYXBwbHlNYXNrKGlucHV0VmFsdWUsIG1hc2spO1xyXG4gIH1cclxuICBwdWJsaWMgYXBwbHlNYXNrKGlucHV0VmFsdWU6IHN0cmluZywgbWFza0V4cHJlc3Npb246IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDAsIGNiOiBGdW5jdGlvbiA9ICgpID0+IHsgfSk6IHN0cmluZyB7XHJcbiAgICBpZiAoaW5wdXRWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGlucHV0VmFsdWUgPT09IG51bGwgfHwgbWFza0V4cHJlc3Npb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBsZXQgY3Vyc29yID0gMDtcclxuICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgIGxldCBtdWx0aSA9IGZhbHNlO1xyXG4gICAgbGV0IGJhY2tzcGFjZVNoaWZ0ID0gZmFsc2U7XHJcbiAgICBsZXQgc2hpZnQgPSAxO1xyXG4gICAgbGV0IHN0ZXBCYWNrID0gZmFsc2U7XHJcbiAgICBpZiAoaW5wdXRWYWx1ZS5zbGljZSgwLCB0aGlzLnByZWZpeC5sZW5ndGgpID09PSB0aGlzLnByZWZpeCkge1xyXG4gICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zbGljZSh0aGlzLnByZWZpeC5sZW5ndGgsIGlucHV0VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIGlmICghIXRoaXMuc3VmZml4ICYmIGlucHV0VmFsdWUuZW5kc1dpdGgodGhpcy5zdWZmaXgpKSB7XHJcbiAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlucHV0QXJyYXk6IHN0cmluZ1tdID0gaW5wdXRWYWx1ZS50b1N0cmluZygpLnNwbGl0KCcnKTtcclxuICAgIGlmIChtYXNrRXhwcmVzc2lvbiA9PT0gJ0lQJykge1xyXG4gICAgICB0aGlzLmlwRXJyb3IgPSAhIShpbnB1dEFycmF5LmZpbHRlcigoaTogc3RyaW5nKSA9PiBpID09PSAnLicpLmxlbmd0aCA8IDMgJiYgaW5wdXRBcnJheS5sZW5ndGggPCA3KTtcclxuICAgICAgbWFza0V4cHJlc3Npb24gPSAnMDk5LjA5OS4wOTkuMDk5JztcclxuICAgIH1cclxuICAgIGlmIChtYXNrRXhwcmVzc2lvbi5zdGFydHNXaXRoKCdwZXJjZW50JykpIHtcclxuICAgICAgaWYgKGlucHV0VmFsdWUubWF0Y2goJ1thLXpdfFtBLVpdJykgfHwgaW5wdXRWYWx1ZS5tYXRjaCgvWy0hJCVeJiooKV8rfH49YHt9XFxbXFxdOlwiOyc8Pj8sXFwvXS8pKSB7XHJcbiAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuX3N0cmlwVG9EZWNpbWFsKGlucHV0VmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5nZXRQcmVjaXNpb24obWFza0V4cHJlc3Npb24pO1xyXG4gICAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmNoZWNrSW5wdXRQcmVjaXNpb24oaW5wdXRWYWx1ZSwgcHJlY2lzaW9uLCAnLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpbnB1dFZhbHVlLmluZGV4T2YoJy4nKSA+IDAgJiYgIXRoaXMucGVyY2VudGFnZShpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmluZGV4T2YoJy4nKSkpKSB7XHJcbiAgICAgICAgY29uc3QgYmFzZTogc3RyaW5nID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5pbmRleE9mKCcuJykgLSAxKTtcclxuICAgICAgICBpbnB1dFZhbHVlID0gYCR7YmFzZX0ke2lucHV0VmFsdWUuc3Vic3RyaW5nKGlucHV0VmFsdWUuaW5kZXhPZignLicpLCBpbnB1dFZhbHVlLmxlbmd0aCl9YDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wZXJjZW50YWdlKGlucHV0VmFsdWUpKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gaW5wdXRWYWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ3NlcGFyYXRvcicpKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKCdbd9CwLdGP0JAt0K9dJykgfHxcclxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKCdb0IHRkdCQLdGPXScpIHx8XHJcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW2Etel18W0EtWl0nKSB8fFxyXG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2goL1stQCMhJCVcXFxcXiYqKClfwqPCrCcrfH49YHt9XFxbXFxdOlwiOzw+Lj9cXC9dLykgfHxcclxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKCdbXkEtWmEtejAtOSxdJylcclxuICAgICAgKSB7XHJcbiAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuX3N0cmlwVG9EZWNpbWFsKGlucHV0VmFsdWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbnB1dFZhbHVlID1cclxuICAgICAgICBpbnB1dFZhbHVlLmxlbmd0aCA+IDEgJiYgaW5wdXRWYWx1ZVswXSA9PT0gJzAnICYmIGlucHV0VmFsdWVbMV0gIT09IHRoaXMuZGVjaW1hbE1hcmtlclxyXG4gICAgICAgICAgPyBpbnB1dFZhbHVlLnNsaWNlKDEsIGlucHV0VmFsdWUubGVuZ3RoKVxyXG4gICAgICAgICAgOiBpbnB1dFZhbHVlO1xyXG5cclxuICAgICAgLy8gVE9ETzogd2UgaGFkIGRpZmZlcmVudCByZXhleHBzIGhlcmUgZm9yIHRoZSBkaWZmZXJlbnQgY2FzZXMuLi4gYnV0IHRlc3RzIGRvbnQgc2VhbSB0byBib3RoZXIgLSBjaGVjayB0aGlzXHJcbiAgICAgIC8vICBzZXBhcmF0b3I6IG5vIENPTU1BLCBkb3Qtc2VwOiBubyBTUEFDRSwgQ09NTUEgT0ssIGNvbW1hLXNlcDogbm8gU1BBQ0UsIENPTU1BIE9LXHJcblxyXG4gICAgICBjb25zdCB0aG91c2FuZFNlcGVyYXRvckNoYXJFc2NhcGVkOiBzdHJpbmcgPSB0aGlzLl9jaGFyVG9SZWdFeHBFeHByZXNzaW9uKHRoaXMudGhvdXNhbmRTZXBhcmF0b3IpO1xyXG4gICAgICBjb25zdCBkZWNpbWFsTWFya2VyRXNjYXBlZDogc3RyaW5nID0gdGhpcy5fY2hhclRvUmVnRXhwRXhwcmVzc2lvbih0aGlzLmRlY2ltYWxNYXJrZXIpO1xyXG4gICAgICBjb25zdCBpbnZhbGlkQ2hhcnM6IHN0cmluZyA9ICdAIyEkJV4mKigpXyt8fj1ge31cXFxcW1xcXFxdOlxcXFxzLFwiOzw+P1xcXFwvJ1xyXG4gICAgICAgIC5yZXBsYWNlKHRob3VzYW5kU2VwZXJhdG9yQ2hhckVzY2FwZWQsICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKGRlY2ltYWxNYXJrZXJFc2NhcGVkLCAnJyk7XHJcblxyXG4gICAgICBjb25zdCBpbnZhbGlkQ2hhclJlZ2V4cDogUmVnRXhwID0gbmV3IFJlZ0V4cCgnWycgKyBpbnZhbGlkQ2hhcnMgKyAnXScpO1xyXG5cclxuICAgICAgaWYgKGlucHV0VmFsdWUubWF0Y2goaW52YWxpZENoYXJSZWdleHApKSB7XHJcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5nZXRQcmVjaXNpb24obWFza0V4cHJlc3Npb24pO1xyXG4gICAgICBpbnB1dFZhbHVlID0gdGhpcy5jaGVja0lucHV0UHJlY2lzaW9uKGlucHV0VmFsdWUsIHByZWNpc2lvbiwgdGhpcy5kZWNpbWFsTWFya2VyKTtcclxuICAgICAgY29uc3Qgc3RyRm9yU2VwOiBzdHJpbmcgPSBpbnB1dFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cCh0aG91c2FuZFNlcGVyYXRvckNoYXJFc2NhcGVkLCAnZycpLCAnJyk7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2Zvcm1hdFdpdGhTZXBhcmF0b3JzKHN0ckZvclNlcCwgdGhpcy50aG91c2FuZFNlcGFyYXRvciwgdGhpcy5kZWNpbWFsTWFya2VyLCBwcmVjaXNpb24pO1xyXG5cclxuICAgICAgY29uc3QgY29tbWFTaGlmdDogbnVtYmVyID0gcmVzdWx0LmluZGV4T2YoJywnKSAtIGlucHV0VmFsdWUuaW5kZXhPZignLCcpO1xyXG4gICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IHJlc3VsdC5sZW5ndGggLSBpbnB1dFZhbHVlLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChzaGlmdFN0ZXAgPiAwICYmIHJlc3VsdFtwb3NpdGlvbl0gIT09ICcsJykge1xyXG4gICAgICAgIGJhY2tzcGFjZVNoaWZ0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgX3NoaWZ0ID0gMDtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQocG9zaXRpb24gKyBfc2hpZnQpO1xyXG4gICAgICAgICAgX3NoaWZ0Kys7XHJcbiAgICAgICAgfSB3aGlsZSAoX3NoaWZ0IDwgc2hpZnRTdGVwKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAoY29tbWFTaGlmdCAhPT0gMCAmJiBwb3NpdGlvbiA+IDAgJiYgIShyZXN1bHQuaW5kZXhPZignLCcpID49IHBvc2l0aW9uICYmIHBvc2l0aW9uID4gMykpIHx8XHJcbiAgICAgICAgKCEocmVzdWx0LmluZGV4T2YoJy4nKSA+PSBwb3NpdGlvbiAmJiBwb3NpdGlvbiA+IDMpICYmIHNoaWZ0U3RlcCA8PSAwKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLl9zaGlmdC5jbGVhcigpO1xyXG4gICAgICAgIGJhY2tzcGFjZVNoaWZ0ID0gdHJ1ZTtcclxuICAgICAgICBzaGlmdCA9IHNoaWZ0U3RlcDtcclxuICAgICAgICBwb3NpdGlvbiArPSBzaGlmdFN0ZXA7XHJcbiAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHBvc2l0aW9uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9zaGlmdC5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKFxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSAwLCBpbnB1dFN5bWJvbDogc3RyaW5nID0gaW5wdXRBcnJheVswXTtcclxuICAgICAgICBpIDwgaW5wdXRBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgaSsrICwgaW5wdXRTeW1ib2wgPSBpbnB1dEFycmF5W2ldXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChjdXJzb3IgPT09IG1hc2tFeHByZXNzaW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pICYmIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnPycpIHtcclxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcclxuICAgICAgICAgIGN1cnNvciArPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJyonICYmXHJcbiAgICAgICAgICBtdWx0aSAmJlxyXG4gICAgICAgICAgdGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcclxuICAgICAgICAgIGN1cnNvciArPSAzO1xyXG4gICAgICAgICAgbXVsdGkgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkgJiYgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJykge1xyXG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xyXG4gICAgICAgICAgbXVsdGkgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nICYmXHJcbiAgICAgICAgICB0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xyXG4gICAgICAgICAgY3Vyc29yICs9IDM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkgfHxcclxuICAgICAgICAgICh0aGlzLmhpZGRlbklucHV0ICYmXHJcbiAgICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dICYmXHJcbiAgICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dLnN5bWJvbCA9PT0gaW5wdXRTeW1ib2wpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ0gnKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gMikge1xyXG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcclxuICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnaCcpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJzInICYmIE51bWJlcihpbnB1dFN5bWJvbCkgPiAzKSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XHJcbiAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ20nKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gNSkge1xyXG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcclxuICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAncycpIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiA1KSB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcclxuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xyXG4gICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgZGF5c0NvdW50ID0gMzE7XHJcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ2QnKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IsIGN1cnNvciArIDIpKSA+IGRheXNDb3VudCB8fCBpbnB1dFZhbHVlW2N1cnNvciArIDFdID09PSAnLycpIHtcclxuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcclxuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XHJcbiAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ00nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoc0NvdW50ID0gMTI7XHJcbiAgICAgICAgICAgIC8vIG1hc2sgd2l0aG91dCBkYXlcclxuICAgICAgICAgICAgY29uc3Qgd2l0aG91dERheXM6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICAgIGN1cnNvciA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gMiB8fFxyXG4gICAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yLCBjdXJzb3IgKyAyKSkgPiBtb250aHNDb3VudCB8fFxyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgKyAxXSA9PT0gJy8nKTtcclxuICAgICAgICAgICAgLy8gZGF5PDEwICYmIG1vbnRoPDEyIGZvciBpbnB1dFxyXG4gICAgICAgICAgICBjb25zdCBkYXkxbW9udGhJbnB1dDogYm9vbGVhbiA9XHJcbiAgICAgICAgICAgICAgaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXHJcbiAgICAgICAgICAgICAgKChpbnB1dFZhbHVlW2N1cnNvciAtIDJdID09PSAnLycgJiZcclxuICAgICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IgKyAxKSkgPiBtb250aHNDb3VudCAmJiBpbnB1dFZhbHVlW2N1cnNvcl0gIT09ICcvJykpIHx8XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlW2N1cnNvcl0gPT09ICcvJyB8fFxyXG4gICAgICAgICAgICAgICAgKChpbnB1dFZhbHVlW2N1cnNvciAtIDNdID09PSAnLycgJiZcclxuICAgICAgICAgICAgICAgICAgKE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDIsIGN1cnNvcikpID4gbW9udGhzQ291bnQgJiYgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSAhPT0gJy8nKSkgfHxcclxuICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSA9PT0gJy8nKSk7XHJcbiAgICAgICAgICAgIC8vIDEwPGRheTwzMSAmJiBtb250aDwxMiBmb3IgaW5wdXRcclxuICAgICAgICAgICAgY29uc3QgZGF5Mm1vbnRoSW5wdXQ6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpKSA8PSBkYXlzQ291bnQgJiZcclxuICAgICAgICAgICAgICAhaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXHJcbiAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSA9PT0gJy8nICYmXHJcbiAgICAgICAgICAgICAgKE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciwgY3Vyc29yICsgMikpID4gbW9udGhzQ291bnQgfHwgaW5wdXRWYWx1ZVtjdXJzb3IgKyAxXSA9PT0gJy8nKTtcclxuICAgICAgICAgICAgLy8gZGF5PDEwICYmIG1vbnRoPDEyIGZvciBwYXN0ZSB3aG9sZSBkYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IGRheTFtb250aFBhc3RlOiBib29sZWFuID1cclxuICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKSkgPiBkYXlzQ291bnQgJiZcclxuICAgICAgICAgICAgICAhaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXHJcbiAgICAgICAgICAgICAgKCFpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDIsIGN1cnNvcikuaW5jbHVkZXMoJy8nKSAmJlxyXG4gICAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMiwgY3Vyc29yKSkgPiBtb250aHNDb3VudCk7XHJcbiAgICAgICAgICAgIC8vIDEwPGRheTwzMSAmJiBtb250aDwxMiBmb3IgcGFzdGUgd2hvbGUgZGF0YVxyXG4gICAgICAgICAgICBjb25zdCBkYXkybW9udGhQYXN0ZTogYm9vbGVhbiA9XHJcbiAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkpIDw9IGRheXNDb3VudCAmJlxyXG4gICAgICAgICAgICAgICFpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpLmluY2x1ZGVzKCcvJykgJiZcclxuICAgICAgICAgICAgICBpbnB1dFZhbHVlW2N1cnNvciAtIDFdICE9PSAnLycgJiZcclxuICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IgKyAxKSkgPiBtb250aHNDb3VudDtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aXRob3V0RGF5cyB8fCBkYXkxbW9udGhJbnB1dCB8fCBkYXkybW9udGhJbnB1dCB8fCBkYXkxbW9udGhQYXN0ZSB8fCBkYXkybW9udGhQYXN0ZSkge1xyXG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcclxuICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcclxuICAgICAgICAgIGN1cnNvcisrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSAhPT0gLTEpIHtcclxuICAgICAgICAgIHJlc3VsdCArPSBtYXNrRXhwcmVzc2lvbltjdXJzb3JdO1xyXG4gICAgICAgICAgY3Vyc29yKys7XHJcbiAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xyXG4gICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcclxuICAgICAgICAgIGktLTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihpbnB1dFN5bWJvbCkgPiAtMSAmJlxyXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25bY3Vyc29yXV0gJiZcclxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dLm9wdGlvbmFsXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBpZiAoISFpbnB1dEFycmF5W2N1cnNvcl0gJiYgbWFza0V4cHJlc3Npb24gIT09ICcwOTkuMDk5LjA5OS4wOTknKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dEFycmF5W2N1cnNvcl07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjdXJzb3IrKztcclxuICAgICAgICAgIGktLTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJyonICYmXHJcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIodGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSkgJiZcclxuICAgICAgICAgIHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcihpbnB1dFN5bWJvbCkgPT09IHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0gJiZcclxuICAgICAgICAgIG11bHRpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjdXJzb3IgKz0gMztcclxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nICYmXHJcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIodGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSkgJiZcclxuICAgICAgICAgIHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcihpbnB1dFN5bWJvbCkgPT09IHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0gJiZcclxuICAgICAgICAgIG11bHRpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjdXJzb3IgKz0gMztcclxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd01hc2tUeXBlZCAmJiB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKGlucHV0U3ltYm9sKSA8IDAgJiYgaW5wdXRTeW1ib2wgIT09IHRoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgIHN0ZXBCYWNrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgcmVzdWx0Lmxlbmd0aCArIDEgPT09IG1hc2tFeHByZXNzaW9uLmxlbmd0aCAmJlxyXG4gICAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKG1hc2tFeHByZXNzaW9uW21hc2tFeHByZXNzaW9uLmxlbmd0aCAtIDFdKSAhPT0gLTFcclxuICAgICkge1xyXG4gICAgICByZXN1bHQgKz0gbWFza0V4cHJlc3Npb25bbWFza0V4cHJlc3Npb24ubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5ld1Bvc2l0aW9uOiBudW1iZXIgPSBwb3NpdGlvbiArIDE7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMuX3NoaWZ0LmhhcyhuZXdQb3NpdGlvbikpIHtcclxuICAgICAgc2hpZnQrKztcclxuICAgICAgbmV3UG9zaXRpb24rKztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWN0dWFsU2hpZnQ6IG51bWJlciA9IHRoaXMuX3NoaWZ0Lmhhcyhwb3NpdGlvbikgPyBzaGlmdCA6IDA7XHJcbiAgICBpZiAoc3RlcEJhY2spIHtcclxuICAgICAgYWN0dWFsU2hpZnQtLTtcclxuICAgIH1cclxuXHJcbiAgICBjYihhY3R1YWxTaGlmdCwgYmFja3NwYWNlU2hpZnQpO1xyXG4gICAgaWYgKHNoaWZ0IDwgMCkge1xyXG4gICAgICB0aGlzLl9zaGlmdC5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlcyA9IGAke3RoaXMucHJlZml4fSR7cmVzdWx0fSR7dGhpcy5zdWZmaXh9YDtcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJlcyA9IGAke3RoaXMucHJlZml4fSR7cmVzdWx0fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuICBwdWJsaWMgX2ZpbmRTcGVjaWFsQ2hhcihpbnB1dFN5bWJvbDogc3RyaW5nKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5maW5kKCh2YWw6IHN0cmluZykgPT4gdmFsID09PSBpbnB1dFN5bWJvbCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbDogc3RyaW5nLCBtYXNrU3ltYm9sOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gdGhpcy5jdXN0b21QYXR0ZXJuID8gdGhpcy5jdXN0b21QYXR0ZXJuIDogdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXSAmJlxyXG4gICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXS5wYXR0ZXJuICYmXHJcbiAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tTeW1ib2xdLnBhdHRlcm4udGVzdChpbnB1dFN5bWJvbClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9mb3JtYXRXaXRoU2VwYXJhdG9ycyA9IChcclxuICAgIHN0cjogc3RyaW5nLFxyXG4gICAgdGhvdXNhbmRTZXBhcmF0b3JDaGFyOiBzdHJpbmcsXHJcbiAgICBkZWNpbWFsQ2hhcjogc3RyaW5nLFxyXG4gICAgcHJlY2lzaW9uOiBudW1iZXJcclxuICApID0+IHtcclxuICAgIGNvbnN0IHg6IHN0cmluZ1tdID0gc3RyLnNwbGl0KGRlY2ltYWxDaGFyKTtcclxuICAgIGNvbnN0IGRlY2ltYWxzOiBzdHJpbmcgPSB4Lmxlbmd0aCA+IDEgPyBgJHtkZWNpbWFsQ2hhcn0ke3hbMV19YCA6ICcnO1xyXG4gICAgbGV0IHJlczogc3RyaW5nID0geFswXTtcclxuICAgIGNvbnN0IHNlcGFyYXRvckxpbWl0OiBzdHJpbmcgPSB0aGlzLnNlcGFyYXRvckxpbWl0LnJlcGxhY2UoL1xccy9nLCAnJyk7XHJcbiAgICBpZiAoc2VwYXJhdG9yTGltaXQgJiYgK3NlcGFyYXRvckxpbWl0KSB7XHJcbiAgICAgIGlmIChyZXNbMF0gPT09ICctJykge1xyXG4gICAgICAgICAgcmVzID0gYC0ke3Jlcy5zbGljZSgxLCByZXMubGVuZ3RoKS5zbGljZSgwLCBzZXBhcmF0b3JMaW1pdC5sZW5ndGgpfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXMgPSByZXMuc2xpY2UoMCwgc2VwYXJhdG9yTGltaXQubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgcmd4OiBSZWdFeHAgPSAvKFxcZCspKFxcZHszfSkvO1xyXG4gICAgd2hpbGUgKHJneC50ZXN0KHJlcykpIHtcclxuICAgICAgcmVzID0gcmVzLnJlcGxhY2Uocmd4LCAnJDEnICsgdGhvdXNhbmRTZXBhcmF0b3JDaGFyICsgJyQyJyk7XHJcbiAgICB9XHJcbiAgICBpZiAocHJlY2lzaW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHJlcyArIGRlY2ltYWxzO1xyXG4gICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDApIHtcclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICAgIHJldHVybiByZXMgKyBkZWNpbWFscy5zdWJzdHIoMCwgcHJlY2lzaW9uICsgMSk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBwZXJjZW50YWdlID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gTnVtYmVyKHN0cikgPj0gMCAmJiBOdW1iZXIoc3RyKSA8PSAxMDA7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBnZXRQcmVjaXNpb24gPSAobWFza0V4cHJlc3Npb246IHN0cmluZyk6IG51bWJlciA9PiB7XHJcbiAgICBjb25zdCB4OiBzdHJpbmdbXSA9IG1hc2tFeHByZXNzaW9uLnNwbGl0KCcuJyk7XHJcbiAgICBpZiAoeC5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoeFt4Lmxlbmd0aCAtIDFdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gSW5maW5pdHk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBjaGVja0lucHV0UHJlY2lzaW9uID0gKFxyXG4gICAgaW5wdXRWYWx1ZTogc3RyaW5nLFxyXG4gICAgcHJlY2lzaW9uOiBudW1iZXIsXHJcbiAgICBkZWNpbWFsTWFya2VyOiBJQ29uZmlnWydkZWNpbWFsTWFya2VyJ11cclxuICApOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHByZWNpc2lvbiA8IEluZmluaXR5KSB7XHJcbiAgICAgIGNvbnN0IHByZWNpc2lvblJlZ0V4OiBSZWdFeHAgPSBuZXcgUmVnRXhwKHRoaXMuX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24oZGVjaW1hbE1hcmtlcikgKyBgXFxcXGR7JHtwcmVjaXNpb259fS4qJGApO1xyXG5cclxuICAgICAgY29uc3QgcHJlY2lzaW9uTWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gaW5wdXRWYWx1ZS5tYXRjaChwcmVjaXNpb25SZWdFeCk7XHJcbiAgICAgIGlmIChwcmVjaXNpb25NYXRjaCAmJiBwcmVjaXNpb25NYXRjaFswXS5sZW5ndGggLSAxID4gcHJlY2lzaW9uKSB7XHJcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH0gZWxzZSBpZiAocHJlY2lzaW9uID09PSAwICYmIGlucHV0VmFsdWUuZW5kc1dpdGgoZGVjaW1hbE1hcmtlcikpIHtcclxuICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlucHV0VmFsdWU7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBfc3RyaXBUb0RlY2ltYWwoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0clxyXG4gICAgICAuc3BsaXQoJycpXHJcbiAgICAgIC5maWx0ZXIoKGk6IHN0cmluZywgaWR4OiBudW1iZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gaS5tYXRjaCgnXi0/XFxcXGQnKSB8fCBpID09PSAnLicgfHwgaSA9PT0gJywnIHx8IChpID09PSAnLScgJiYgaWR4ID09PSAwKTtcclxuICAgICAgfSlcclxuICAgICAgLmpvaW4oJycpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hhclRvUmVnRXhwRXhwcmVzc2lvbihjaGFyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgY2hhcnNUb0VzY2FwZSA9ICdbXFxcXF4kLnw/KisoKSc7XHJcbiAgICByZXR1cm4gY2hhciA9PT0gJyAnID8gJ1xcXFxzJyA6IGNoYXJzVG9Fc2NhcGUuaW5kZXhPZihjaGFyKSA+PSAwID8gJ1xcXFwnICsgY2hhciA6IGNoYXI7XHJcbiAgfVxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtZmlsZS1saW5lLWNvdW50XHJcbn1cclxuIl19