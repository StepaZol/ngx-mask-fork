/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config } from './config';
import { MaskApplierService } from './mask-applier.service';
export class MaskService extends MaskApplierService {
    /**
     * @param {?} document
     * @param {?} _config
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(document, _config, _elementRef, _renderer) {
        super(_config);
        this.document = document;
        this._config = _config;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.maskExpression = '';
        this.isNumberValue = false;
        this.placeHolderCharacter = '_';
        this.maskIsShown = '';
        this.selStart = null;
        this.selEnd = null;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._formElement = this._elementRef.nativeElement;
    }
    // tslint:disable-next-line:cyclomatic-complexity
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
        if (!maskExpression) {
            return inputValue;
        }
        this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
        if (this.maskExpression === 'IP' && this.showMaskTyped) {
            this.maskIsShown = this.showMaskInInput(inputValue || '#');
        }
        if (!inputValue && this.showMaskTyped) {
            this.formControlResult(this.prefix);
            return this.prefix + this.maskIsShown;
        }
        /** @type {?} */
        const getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
        /** @type {?} */
        let newInputValue = '';
        if (this.hiddenInput !== undefined) {
            /** @type {?} */
            let actualResult = this.actualValue.split('');
            // tslint:disable no-unused-expression
            inputValue !== '' && actualResult.length
                ? typeof this.selStart === 'number' && typeof this.selEnd === 'number'
                    ? inputValue.length > actualResult.length
                        ? actualResult.splice(this.selStart, 0, getSymbol)
                        : inputValue.length < actualResult.length
                            ? actualResult.length - inputValue.length === 1
                                ? actualResult.splice(this.selStart - 1, 1)
                                : actualResult.splice(this.selStart, this.selEnd - this.selStart)
                            : null
                    : null
                : (actualResult = []);
            // tslint:enable no-unused-expression
            newInputValue = this.actualValue.length ? this.shiftTypedSymbols(actualResult.join('')) : inputValue;
        }
        newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;
        /** @type {?} */
        const result = super.applyMask(newInputValue, maskExpression, position, cb);
        this.actualValue = this.getActualValue(result);
        // handle some separator implications:
        // a.) adjust decimalMarker default (. -> ,) if thousandSeparator is a dot
        if (this.thousandSeparator === '.' && this.decimalMarker === '.') {
            this.decimalMarker = ',';
        }
        // b) remove decimal marker from list of special characters to mask
        if (this.maskExpression.startsWith('separator') && this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((/**
             * @param {?} item
             * @return {?}
             */
            (item) => item !== this.decimalMarker));
        }
        this.formControlResult(result);
        if (!this.showMaskTyped) {
            if (this.hiddenInput) {
                return result && result.length ? this.hideInput(result, this.maskExpression) : result;
            }
            return result;
        }
        /** @type {?} */
        const resLen = result.length;
        /** @type {?} */
        const prefNmask = this.prefix + this.maskIsShown;
        return result + (this.maskExpression === 'IP' ? prefNmask : prefNmask.slice(resLen));
    }
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    applyValueChanges(position = 0, cb = (/**
     * @return {?}
     */
    () => { })) {
        this._formElement.value = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    hideInput(inputValue, maskExpression) {
        return inputValue
            .split('')
            .map((/**
         * @param {?} curr
         * @param {?} index
         * @return {?}
         */
        (curr, index) => {
            if (this.maskAvailablePatterns &&
                this.maskAvailablePatterns[maskExpression[index]] &&
                this.maskAvailablePatterns[maskExpression[index]].symbol) {
                return this.maskAvailablePatterns[maskExpression[index]].symbol;
            }
            return curr;
        }))
            .join('');
    }
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    getActualValue(res) {
        /** @type {?} */
        const compare = res
            .split('')
            .filter((/**
         * @param {?} symbol
         * @param {?} i
         * @return {?}
         */
        (symbol, i) => this._checkSymbolMask(symbol, this.maskExpression[i]) ||
            (this.maskSpecialCharacters.includes(this.maskExpression[i]) && symbol === this.maskExpression[i])));
        if (compare.join('') === res) {
            return compare.join('');
        }
        return res;
    }
    /**
     * @param {?} inputValue
     * @return {?}
     */
    shiftTypedSymbols(inputValue) {
        /** @type {?} */
        let symbolToReplace = '';
        /** @type {?} */
        const newInputValue = (inputValue &&
            inputValue.split('').map((/**
             * @param {?} currSymbol
             * @param {?} index
             * @return {?}
             */
            (currSymbol, index) => {
                if (this.maskSpecialCharacters.includes(inputValue[index + 1]) &&
                    inputValue[index + 1] !== this.maskExpression[index + 1]) {
                    symbolToReplace = currSymbol;
                    return inputValue[index + 1];
                }
                if (symbolToReplace.length) {
                    /** @type {?} */
                    const replaceSymbol = symbolToReplace;
                    symbolToReplace = '';
                    return replaceSymbol;
                }
                return currSymbol;
            }))) ||
            [];
        return newInputValue.join('');
    }
    /**
     * @param {?=} inputVal
     * @return {?}
     */
    showMaskInInput(inputVal) {
        if (this.showMaskTyped && !!this.shownMaskExpression) {
            if (this.maskExpression.length !== this.shownMaskExpression.length) {
                throw new Error('Mask expression must match mask placeholder length');
            }
            else {
                return this.shownMaskExpression;
            }
        }
        else if (this.showMaskTyped) {
            if (inputVal) {
                return this._checkForIp(inputVal);
            }
            return this.maskExpression.replace(/\w/g, this.placeHolderCharacter);
        }
        return '';
    }
    /**
     * @return {?}
     */
    clearIfNotMatchFn() {
        if (this.clearIfNotMatch &&
            this.prefix.length + this.maskExpression.length + this.suffix.length !==
                this._formElement.value.replace(/_/g, '').length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    set formElementProperty([name, value]) {
        this._renderer.setProperty(this._formElement, name, value);
    }
    /**
     * @param {?} mask
     * @return {?}
     */
    checkSpecialCharAmount(mask) {
        /** @type {?} */
        const chars = mask.split('').filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._findSpecialChar(item)));
        return chars.length;
    }
    /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    _checkForIp(inputVal) {
        if (inputVal === '#') {
            return `${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
        }
        /** @type {?} */
        const arr = [];
        for (let i = 0; i < inputVal.length; i++) {
            if (inputVal[i].match('\\d')) {
                arr.push(inputVal[i]);
            }
        }
        if (arr.length <= 3) {
            return `${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
        }
        if (arr.length > 3 && arr.length <= 6) {
            return `${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
        }
        if (arr.length > 6 && arr.length <= 9) {
            return this.placeHolderCharacter;
        }
        if (arr.length > 9 && arr.length <= 12) {
            return '';
        }
        return '';
    }
    /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    formControlResult(inputValue) {
        if (Array.isArray(this.dropSpecialCharacters)) {
            this.onChange(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters));
        }
        else if (this.dropSpecialCharacters) {
            this.onChange(this._checkSymbols(inputValue));
        }
        else {
            this.onChange(this._removeSuffix(this._removePrefix(inputValue)));
        }
    }
    /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    _removeMask(value, specialCharactersForRemove) {
        return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _removePrefix(value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _removeSuffix(value) {
        if (!this.suffix) {
            return value;
        }
        return value ? value.replace(this.suffix, '') : value;
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    _retrieveSeparatorValue(result) {
        return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    }
    /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    _regExpForRemove(specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => `\\${item}`)).join('|'), 'gi');
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    _checkSymbols(result) {
        if (result === '') {
            return result;
        }
        /** @type {?} */
        const separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
        /** @type {?} */
        let separatorValue = this._retrieveSeparatorValue(result);
        if (this.decimalMarker !== '.') {
            separatorValue = separatorValue.replace(this.decimalMarker, '.');
        }
        if (this.isNumberValue) {
            if (separatorPrecision) {
                if (result === this.decimalMarker) {
                    return null;
                }
                return this._checkPrecision(this.maskExpression, separatorValue);
            }
            else {
                return Number(separatorValue);
            }
        }
        else {
            return separatorValue;
        }
    }
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    _retrieveSeparatorPrecision(maskExpretion) {
        /** @type {?} */
        const matcher = maskExpretion.match(new RegExp(`^separator\\.([^d]*)`));
        return matcher ? Number(matcher[1]) : null;
    }
    /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    _checkPrecision(separatorExpression, separatorValue) {
        if (separatorExpression.indexOf('2') > 0) {
            return Number(separatorValue).toFixed(2);
        }
        return Number(separatorValue);
    }
}
MaskService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MaskService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    MaskService.prototype.maskExpression;
    /** @type {?} */
    MaskService.prototype.isNumberValue;
    /** @type {?} */
    MaskService.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskService.prototype.maskIsShown;
    /** @type {?} */
    MaskService.prototype.selStart;
    /** @type {?} */
    MaskService.prototype.selEnd;
    /**
     * @type {?}
     * @protected
     */
    MaskService.prototype._formElement;
    /** @type {?} */
    MaskService.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype.document;
    /**
     * @type {?}
     * @protected
     */
    MaskService.prototype._config;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MaskService.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFXLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVELE1BQU0sT0FBTyxXQUFZLFNBQVEsa0JBQWtCOzs7Ozs7O0lBV2pELFlBQzRCLFFBQWEsRUFDYixPQUFnQixFQUNsQyxXQUF1QixFQUN2QixTQUFvQjtRQUU1QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFMVyxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBZHZCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHlCQUFvQixHQUFXLEdBQUcsQ0FBQztRQUNuQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixhQUFRLEdBQWtCLElBQUksQ0FBQztRQUMvQixXQUFNLEdBQWtCLElBQUksQ0FBQztRQUc3QixhQUFROzs7O1FBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsRUFBQztRQVMvQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7OztJQUdNLFNBQVMsQ0FBQyxVQUFrQixFQUFFLGNBQXNCLEVBQUUsV0FBbUIsQ0FBQyxFQUFFOzs7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VCxVQUFVO1lBQXNCLFNBQVM7Ozs7SUFRaEQscUNBQW1DOztJQUNuQyxvQ0FBc0M7O0lBQ3RDLDJDQUEwQzs7SUFDMUMsa0NBQWdDOztJQUNoQywrQkFBc0M7O0lBQ3RDLDZCQUFvQzs7Ozs7SUFDcEMsbUNBQXlDOztJQUV6QywrQkFBaUM7Ozs7O0lBRy9CLCtCQUF1Qzs7Ozs7SUFDdkMsOEJBQTBDOzs7OztJQUMxQyxrQ0FBK0I7Ozs7O0lBQy9CLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNYXNrU2VydmljZSBleHRlbmRzIE1hc2tBcHBsaWVyU2VydmljZSB7XHJcbiAgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcclxuICBwdWJsaWMgaXNOdW1iZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3Rlcjogc3RyaW5nID0gJ18nO1xyXG4gIHB1YmxpYyBtYXNrSXNTaG93bjogc3RyaW5nID0gJyc7XHJcbiAgcHVibGljIHNlbFN0YXJ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgc2VsRW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX2Zvcm1FbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHtcclxuICAgIHN1cGVyKF9jb25maWcpO1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y3ljbG9tYXRpYy1jb21wbGV4aXR5XHJcbiAgcHVibGljIGFwcGx5TWFzayhpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwLCBjYjogRnVuY3Rpb24gPSAoKSA9PiB7fSk6IHN0cmluZyB7XHJcbiAgICBpZiAoIW1hc2tFeHByZXNzaW9uKSB7XHJcbiAgICAgIHJldHVybiBpbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tYXNrSXNTaG93biA9IHRoaXMuc2hvd01hc2tUeXBlZCA/IHRoaXMuc2hvd01hc2tJbklucHV0KCkgOiAnJztcclxuICAgIGlmICh0aGlzLm1hc2tFeHByZXNzaW9uID09PSAnSVAnICYmIHRoaXMuc2hvd01hc2tUeXBlZCkge1xyXG4gICAgICB0aGlzLm1hc2tJc1Nob3duID0gdGhpcy5zaG93TWFza0luSW5wdXQoaW5wdXRWYWx1ZSB8fCAnIycpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbnB1dFZhbHVlICYmIHRoaXMuc2hvd01hc2tUeXBlZCkge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sUmVzdWx0KHRoaXMucHJlZml4KTtcclxuICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcclxuICAgIH1cclxuICAgIGNvbnN0IGdldFN5bWJvbDogc3RyaW5nID0gISFpbnB1dFZhbHVlICYmIHR5cGVvZiB0aGlzLnNlbFN0YXJ0ID09PSAnbnVtYmVyJyA/IGlucHV0VmFsdWVbdGhpcy5zZWxTdGFydF0gOiAnJztcclxuICAgIGxldCBuZXdJbnB1dFZhbHVlID0gJyc7XHJcbiAgICBpZiAodGhpcy5oaWRkZW5JbnB1dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCBhY3R1YWxSZXN1bHQ6IHN0cmluZ1tdID0gdGhpcy5hY3R1YWxWYWx1ZS5zcGxpdCgnJyk7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgIGlucHV0VmFsdWUgIT09ICcnICYmIGFjdHVhbFJlc3VsdC5sZW5ndGhcclxuICAgICAgICA/IHR5cGVvZiB0aGlzLnNlbFN0YXJ0ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdGhpcy5zZWxFbmQgPT09ICdudW1iZXInXHJcbiAgICAgICAgICA/IGlucHV0VmFsdWUubGVuZ3RoID4gYWN0dWFsUmVzdWx0Lmxlbmd0aFxyXG4gICAgICAgICAgICA/IGFjdHVhbFJlc3VsdC5zcGxpY2UodGhpcy5zZWxTdGFydCwgMCwgZ2V0U3ltYm9sKVxyXG4gICAgICAgICAgICA6IGlucHV0VmFsdWUubGVuZ3RoIDwgYWN0dWFsUmVzdWx0Lmxlbmd0aFxyXG4gICAgICAgICAgICA/IGFjdHVhbFJlc3VsdC5sZW5ndGggLSBpbnB1dFZhbHVlLmxlbmd0aCA9PT0gMVxyXG4gICAgICAgICAgICAgID8gYWN0dWFsUmVzdWx0LnNwbGljZSh0aGlzLnNlbFN0YXJ0IC0gMSwgMSlcclxuICAgICAgICAgICAgICA6IGFjdHVhbFJlc3VsdC5zcGxpY2UodGhpcy5zZWxTdGFydCwgdGhpcy5zZWxFbmQgLSB0aGlzLnNlbFN0YXJ0KVxyXG4gICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgIDogKGFjdHVhbFJlc3VsdCA9IFtdKTtcclxuICAgICAgLy8gdHNsaW50OmVuYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICBuZXdJbnB1dFZhbHVlID0gdGhpcy5hY3R1YWxWYWx1ZS5sZW5ndGggPyB0aGlzLnNoaWZ0VHlwZWRTeW1ib2xzKGFjdHVhbFJlc3VsdC5qb2luKCcnKSkgOiBpbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgbmV3SW5wdXRWYWx1ZSA9IEJvb2xlYW4obmV3SW5wdXRWYWx1ZSkgJiYgbmV3SW5wdXRWYWx1ZS5sZW5ndGggPyBuZXdJbnB1dFZhbHVlIDogaW5wdXRWYWx1ZTtcclxuICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nID0gc3VwZXIuYXBwbHlNYXNrKG5ld0lucHV0VmFsdWUsIG1hc2tFeHByZXNzaW9uLCBwb3NpdGlvbiwgY2IpO1xyXG4gICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHRoaXMuZ2V0QWN0dWFsVmFsdWUocmVzdWx0KTtcclxuXHJcbiAgICAvLyBoYW5kbGUgc29tZSBzZXBhcmF0b3IgaW1wbGljYXRpb25zOlxyXG4gICAgLy8gYS4pIGFkanVzdCBkZWNpbWFsTWFya2VyIGRlZmF1bHQgKC4gLT4gLCkgaWYgdGhvdXNhbmRTZXBhcmF0b3IgaXMgYSBkb3RcclxuICAgIGlmICh0aGlzLnRob3VzYW5kU2VwYXJhdG9yID09PSAnLicgJiYgdGhpcy5kZWNpbWFsTWFya2VyID09PSAnLicpIHtcclxuICAgICAgdGhpcy5kZWNpbWFsTWFya2VyID0gJywnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGIpIHJlbW92ZSBkZWNpbWFsIG1hcmtlciBmcm9tIGxpc3Qgb2Ygc3BlY2lhbCBjaGFyYWN0ZXJzIHRvIG1hc2tcclxuICAgIGlmICh0aGlzLm1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ3NlcGFyYXRvcicpICYmIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmlsdGVyKChpdGVtOiBzdHJpbmcpID0+IGl0ZW0gIT09IHRoaXMuZGVjaW1hbE1hcmtlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mb3JtQ29udHJvbFJlc3VsdChyZXN1bHQpO1xyXG5cclxuICAgIGlmICghdGhpcy5zaG93TWFza1R5cGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLmhpZGRlbklucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID8gdGhpcy5oaWRlSW5wdXQocmVzdWx0LCB0aGlzLm1hc2tFeHByZXNzaW9uKSA6IHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzTGVuOiBudW1iZXIgPSByZXN1bHQubGVuZ3RoO1xyXG4gICAgY29uc3QgcHJlZk5tYXNrOiBzdHJpbmcgPSB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XHJcbiAgICByZXR1cm4gcmVzdWx0ICsgKHRoaXMubWFza0V4cHJlc3Npb24gPT09ICdJUCcgPyBwcmVmTm1hc2sgOiBwcmVmTm1hc2suc2xpY2UocmVzTGVuKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlWYWx1ZUNoYW5nZXMocG9zaXRpb246IG51bWJlciA9IDAsIGNiOiBGdW5jdGlvbiA9ICgpID0+IHt9KTogdm9pZCB7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudC52YWx1ZSA9IHRoaXMuYXBwbHlNYXNrKHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLCB0aGlzLm1hc2tFeHByZXNzaW9uLCBwb3NpdGlvbiwgY2IpO1xyXG4gICAgaWYgKHRoaXMuX2Zvcm1FbGVtZW50ID09PSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2hGbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpZGVJbnB1dChpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGlucHV0VmFsdWVcclxuICAgICAgLnNwbGl0KCcnKVxyXG4gICAgICAubWFwKChjdXJyOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyAmJlxyXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25baW5kZXhdXSAmJlxyXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25baW5kZXhdXS5zeW1ib2xcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltpbmRleF1dLnN5bWJvbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnI7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIC8vIHRoaXMgZnVuY3Rpb24gaXMgbm90IG5lY2Vzc2FyeSwgaXQgY2hlY2tzIHJlc3VsdCBhZ2FpbnN0IG1hc2tFeHByZXNzaW9uXHJcbiAgcHVibGljIGdldEFjdHVhbFZhbHVlKHJlczogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGNvbXBhcmU6IHN0cmluZ1tdID0gcmVzXHJcbiAgICAgIC5zcGxpdCgnJylcclxuICAgICAgLmZpbHRlcihcclxuICAgICAgICAoc3ltYm9sOiBzdHJpbmcsIGk6IG51bWJlcikgPT5cclxuICAgICAgICAgIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhzeW1ib2wsIHRoaXMubWFza0V4cHJlc3Npb25baV0pIHx8XHJcbiAgICAgICAgICAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXModGhpcy5tYXNrRXhwcmVzc2lvbltpXSkgJiYgc3ltYm9sID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2ldKVxyXG4gICAgICApO1xyXG4gICAgaWYgKGNvbXBhcmUuam9pbignJykgPT09IHJlcykge1xyXG4gICAgICByZXR1cm4gY29tcGFyZS5qb2luKCcnKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hpZnRUeXBlZFN5bWJvbHMoaW5wdXRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBzeW1ib2xUb1JlcGxhY2UgPSAnJztcclxuICAgIGNvbnN0IG5ld0lucHV0VmFsdWU6IHN0cmluZ1tdID1cclxuICAgICAgKGlucHV0VmFsdWUgJiZcclxuICAgICAgICBpbnB1dFZhbHVlLnNwbGl0KCcnKS5tYXAoKGN1cnJTeW1ib2w6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyhpbnB1dFZhbHVlW2luZGV4ICsgMV0pICYmXHJcbiAgICAgICAgICAgIGlucHV0VmFsdWVbaW5kZXggKyAxXSAhPT0gdGhpcy5tYXNrRXhwcmVzc2lvbltpbmRleCArIDFdXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgc3ltYm9sVG9SZXBsYWNlID0gY3VyclN5bWJvbDtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0VmFsdWVbaW5kZXggKyAxXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzeW1ib2xUb1JlcGxhY2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VTeW1ib2w6IHN0cmluZyA9IHN5bWJvbFRvUmVwbGFjZTtcclxuICAgICAgICAgICAgc3ltYm9sVG9SZXBsYWNlID0gJyc7XHJcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlU3ltYm9sO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGN1cnJTeW1ib2w7XHJcbiAgICAgICAgfSkpIHx8XHJcbiAgICAgIFtdO1xyXG4gICAgcmV0dXJuIG5ld0lucHV0VmFsdWUuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd01hc2tJbklucHV0KGlucHV0VmFsPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLnNob3dNYXNrVHlwZWQgJiYgISF0aGlzLnNob3duTWFza0V4cHJlc3Npb24pIHtcclxuICAgICAgaWYgKHRoaXMubWFza0V4cHJlc3Npb24ubGVuZ3RoICE9PSB0aGlzLnNob3duTWFza0V4cHJlc3Npb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXNrIGV4cHJlc3Npb24gbXVzdCBtYXRjaCBtYXNrIHBsYWNlaG9sZGVyIGxlbmd0aCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNob3duTWFza0V4cHJlc3Npb247XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zaG93TWFza1R5cGVkKSB7XHJcbiAgICAgIGlmIChpbnB1dFZhbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja0ZvcklwKGlucHV0VmFsKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5tYXNrRXhwcmVzc2lvbi5yZXBsYWNlKC9cXHcvZywgdGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoRm4oKTogdm9pZCB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoICYmXHJcbiAgICAgIHRoaXMucHJlZml4Lmxlbmd0aCArIHRoaXMubWFza0V4cHJlc3Npb24ubGVuZ3RoICsgdGhpcy5zdWZmaXgubGVuZ3RoICE9PVxyXG4gICAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLnJlcGxhY2UoL18vZywgJycpLmxlbmd0aFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCAnJ107XHJcbiAgICAgIHRoaXMuYXBwbHlNYXNrKHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLCB0aGlzLm1hc2tFeHByZXNzaW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgZm9ybUVsZW1lbnRQcm9wZXJ0eShbbmFtZSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmcgfCBib29sZWFuXSkge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZm9ybUVsZW1lbnQsIG5hbWUsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVja1NwZWNpYWxDaGFyQW1vdW50KG1hc2s6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICBjb25zdCBjaGFyczogc3RyaW5nW10gPSBtYXNrLnNwbGl0KCcnKS5maWx0ZXIoKGl0ZW06IHN0cmluZykgPT4gdGhpcy5fZmluZFNwZWNpYWxDaGFyKGl0ZW0pKTtcclxuICAgIHJldHVybiBjaGFycy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jaGVja0ZvcklwKGlucHV0VmFsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGlucHV0VmFsID09PSAnIycpIHtcclxuICAgICAgcmV0dXJuIGAke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9YDtcclxuICAgIH1cclxuICAgIGNvbnN0IGFycjogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRWYWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGlucHV0VmFsW2ldLm1hdGNoKCdcXFxcZCcpKSB7XHJcbiAgICAgICAgYXJyLnB1c2goaW5wdXRWYWxbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA8PSAzKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn1gO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyci5sZW5ndGggPiAzICYmIGFyci5sZW5ndGggPD0gNikge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfWA7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA+IDYgJiYgYXJyLmxlbmd0aCA8PSA5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyci5sZW5ndGggPiA5ICYmIGFyci5sZW5ndGggPD0gMTIpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtQ29udHJvbFJlc3VsdChpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSkge1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmZml4KHRoaXMuX3JlbW92ZVByZWZpeChpbnB1dFZhbHVlKSksIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fY2hlY2tTeW1ib2xzKGlucHV0VmFsdWUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fcmVtb3ZlU3VmZml4KHRoaXMuX3JlbW92ZVByZWZpeChpbnB1dFZhbHVlKSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlTWFzayh2YWx1ZTogc3RyaW5nLCBzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZTogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZSh0aGlzLl9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmUpLCAnJykgOiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZVByZWZpeCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghdGhpcy5wcmVmaXgpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZSh0aGlzLnByZWZpeCwgJycpIDogdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZW1vdmVTdWZmaXgodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXRoaXMuc3VmZml4KSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UodGhpcy5zdWZmaXgsICcnKSA6IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmV0cmlldmVTZXBhcmF0b3JWYWx1ZShyZXN1bHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVtb3ZlTWFzayh0aGlzLl9yZW1vdmVTdWZmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpLCB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmU6IHN0cmluZ1tdKTogUmVnRXhwIHtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlLm1hcCgoaXRlbTogc3RyaW5nKSA9PiBgXFxcXCR7aXRlbX1gKS5qb2luKCd8JyksICdnaScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hlY2tTeW1ib2xzKHJlc3VsdDogc3RyaW5nKTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbCB7XHJcbiAgICBpZiAocmVzdWx0ID09PSAnJykge1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlcGFyYXRvclByZWNpc2lvbjogbnVtYmVyIHwgbnVsbCA9IHRoaXMuX3JldHJpZXZlU2VwYXJhdG9yUHJlY2lzaW9uKHRoaXMubWFza0V4cHJlc3Npb24pO1xyXG4gICAgbGV0IHNlcGFyYXRvclZhbHVlOiBzdHJpbmcgPSB0aGlzLl9yZXRyaWV2ZVNlcGFyYXRvclZhbHVlKHJlc3VsdCk7XHJcbiAgICBpZiAodGhpcy5kZWNpbWFsTWFya2VyICE9PSAnLicpIHtcclxuICAgICAgc2VwYXJhdG9yVmFsdWUgPSBzZXBhcmF0b3JWYWx1ZS5yZXBsYWNlKHRoaXMuZGVjaW1hbE1hcmtlciwgJy4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc051bWJlclZhbHVlKSB7XHJcbiAgICAgIGlmIChzZXBhcmF0b3JQcmVjaXNpb24pIHtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSB0aGlzLmRlY2ltYWxNYXJrZXIpIHtcclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tQcmVjaXNpb24odGhpcy5tYXNrRXhwcmVzc2lvbiwgc2VwYXJhdG9yVmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIoc2VwYXJhdG9yVmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gc2VwYXJhdG9yVmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPIHNob3VsZCB0aGluayBhYm91dCBoZWxwZXJzIG9yIHNlcGFydGluZyBkZWNpbWFsIHByZWNpc2lvbiB0byBvd24gcHJvcGVydHlcclxuICBwcml2YXRlIF9yZXRyaWV2ZVNlcGFyYXRvclByZWNpc2lvbihtYXNrRXhwcmV0aW9uOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcclxuICAgIGNvbnN0IG1hdGNoZXI6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gbWFza0V4cHJldGlvbi5tYXRjaChuZXcgUmVnRXhwKGBec2VwYXJhdG9yXFxcXC4oW15kXSopYCkpO1xyXG4gICAgcmV0dXJuIG1hdGNoZXIgPyBOdW1iZXIobWF0Y2hlclsxXSkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hlY2tQcmVjaXNpb24oc2VwYXJhdG9yRXhwcmVzc2lvbjogc3RyaW5nLCBzZXBhcmF0b3JWYWx1ZTogc3RyaW5nKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgIGlmIChzZXBhcmF0b3JFeHByZXNzaW9uLmluZGV4T2YoJzInKSA+IDApIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihzZXBhcmF0b3JWYWx1ZSkudG9GaXhlZCgyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIoc2VwYXJhdG9yVmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=