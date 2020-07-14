/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config } from './config';
import { MaskApplierService } from './mask-applier.service';
var MaskService = /** @class */ (function (_super) {
    tslib_1.__extends(MaskService, _super);
    function MaskService(document, _config, _elementRef, _renderer) {
        var _this = _super.call(this, _config) || this;
        _this.document = document;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        _this.maskExpression = '';
        _this.isNumberValue = false;
        _this.placeHolderCharacter = '_';
        _this.maskIsShown = '';
        _this.selStart = null;
        _this.selEnd = null;
        _this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        _this._formElement = _this._elementRef.nativeElement;
        return _this;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyMask = 
    // tslint:disable-next-line:cyclomatic-complexity
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        var _this = this;
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
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
        var getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
        /** @type {?} */
        var newInputValue = '';
        if (this.hiddenInput !== undefined) {
            /** @type {?} */
            var actualResult = this.actualValue.split('');
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
        var result = _super.prototype.applyMask.call(this, newInputValue, maskExpression, position, cb);
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
            function (item) { return item !== _this.decimalMarker; }));
        }
        this.formControlResult(result);
        if (!this.showMaskTyped) {
            if (this.hiddenInput) {
                return result && result.length ? this.hideInput(result, this.maskExpression) : result;
            }
            return result;
        }
        /** @type {?} */
        var resLen = result.length;
        /** @type {?} */
        var prefNmask = this.prefix + this.maskIsShown;
        return result + (this.maskExpression === 'IP' ? prefNmask : prefNmask.slice(resLen));
    };
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyValueChanges = /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        this._formElement.value = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    };
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    MaskService.prototype.hideInput = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @return {?}
     */
    function (inputValue, maskExpression) {
        var _this = this;
        return inputValue
            .split('')
            .map((/**
         * @param {?} curr
         * @param {?} index
         * @return {?}
         */
        function (curr, index) {
            if (_this.maskAvailablePatterns &&
                _this.maskAvailablePatterns[maskExpression[index]] &&
                _this.maskAvailablePatterns[maskExpression[index]].symbol) {
                return _this.maskAvailablePatterns[maskExpression[index]].symbol;
            }
            return curr;
        }))
            .join('');
    };
    // this function is not necessary, it checks result against maskExpression
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    MaskService.prototype.getActualValue = 
    // this function is not necessary, it checks result against maskExpression
    /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        /** @type {?} */
        var compare = res
            .split('')
            .filter((/**
         * @param {?} symbol
         * @param {?} i
         * @return {?}
         */
        function (symbol, i) {
            return _this._checkSymbolMask(symbol, _this.maskExpression[i]) ||
                (_this.maskSpecialCharacters.includes(_this.maskExpression[i]) && symbol === _this.maskExpression[i]);
        }));
        if (compare.join('') === res) {
            return compare.join('');
        }
        return res;
    };
    /**
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.shiftTypedSymbols = /**
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        var _this = this;
        /** @type {?} */
        var symbolToReplace = '';
        /** @type {?} */
        var newInputValue = (inputValue &&
            inputValue.split('').map((/**
             * @param {?} currSymbol
             * @param {?} index
             * @return {?}
             */
            function (currSymbol, index) {
                if (_this.maskSpecialCharacters.includes(inputValue[index + 1]) &&
                    inputValue[index + 1] !== _this.maskExpression[index + 1]) {
                    symbolToReplace = currSymbol;
                    return inputValue[index + 1];
                }
                if (symbolToReplace.length) {
                    /** @type {?} */
                    var replaceSymbol = symbolToReplace;
                    symbolToReplace = '';
                    return replaceSymbol;
                }
                return currSymbol;
            }))) ||
            [];
        return newInputValue.join('');
    };
    /**
     * @param {?=} inputVal
     * @return {?}
     */
    MaskService.prototype.showMaskInInput = /**
     * @param {?=} inputVal
     * @return {?}
     */
    function (inputVal) {
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
    };
    /**
     * @return {?}
     */
    MaskService.prototype.clearIfNotMatchFn = /**
     * @return {?}
     */
    function () {
        if (this.clearIfNotMatch &&
            this.prefix.length + this.maskExpression.length + this.suffix.length !==
                this._formElement.value.replace(/_/g, '').length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    };
    Object.defineProperty(MaskService.prototype, "formElementProperty", {
        set: /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), name = _b[0], value = _b[1];
            this._renderer.setProperty(this._formElement, name, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} mask
     * @return {?}
     */
    MaskService.prototype.checkSpecialCharAmount = /**
     * @param {?} mask
     * @return {?}
     */
    function (mask) {
        var _this = this;
        /** @type {?} */
        var chars = mask.split('').filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this._findSpecialChar(item); }));
        return chars.length;
    };
    /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    MaskService.prototype._checkForIp = /**
     * @private
     * @param {?} inputVal
     * @return {?}
     */
    function (inputVal) {
        if (inputVal === '#') {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        /** @type {?} */
        var arr = [];
        for (var i = 0; i < inputVal.length; i++) {
            if (inputVal[i].match('\\d')) {
                arr.push(inputVal[i]);
            }
        }
        if (arr.length <= 3) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 3 && arr.length <= 6) {
            return this.placeHolderCharacter + "." + this.placeHolderCharacter;
        }
        if (arr.length > 6 && arr.length <= 9) {
            return this.placeHolderCharacter;
        }
        if (arr.length > 9 && arr.length <= 12) {
            return '';
        }
        return '';
    };
    /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    MaskService.prototype.formControlResult = /**
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        if (Array.isArray(this.dropSpecialCharacters)) {
            this.onChange(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters));
        }
        else if (this.dropSpecialCharacters) {
            this.onChange(this._checkSymbols(inputValue));
        }
        else {
            this.onChange(this._removeSuffix(this._removePrefix(inputValue)));
        }
    };
    /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._removeMask = /**
     * @private
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (value, specialCharactersForRemove) {
        return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removePrefix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removeSuffix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.suffix) {
            return value;
        }
        return value ? value.replace(this.suffix, '') : value;
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorValue = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    };
    /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._regExpForRemove = /**
     * @private
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return "\\" + item; })).join('|'), 'gi');
    };
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    MaskService.prototype._checkSymbols = /**
     * @private
     * @param {?} result
     * @return {?}
     */
    function (result) {
        if (result === '') {
            return result;
        }
        /** @type {?} */
        var separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
        /** @type {?} */
        var separatorValue = this._retrieveSeparatorValue(result);
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
    };
    // TODO should think about helpers or separting decimal precision to own property
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    MaskService.prototype._retrieveSeparatorPrecision = 
    // TODO should think about helpers or separting decimal precision to own property
    /**
     * @private
     * @param {?} maskExpretion
     * @return {?}
     */
    function (maskExpretion) {
        /** @type {?} */
        var matcher = maskExpretion.match(new RegExp("^separator\\.([^d]*)"));
        return matcher ? Number(matcher[1]) : null;
    };
    /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    MaskService.prototype._checkPrecision = /**
     * @private
     * @param {?} separatorExpression
     * @param {?} separatorValue
     * @return {?}
     */
    function (separatorExpression, separatorValue) {
        if (separatorExpression.indexOf('2') > 0) {
            return Number(separatorValue).toFixed(2);
        }
        return Number(separatorValue);
    };
    MaskService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MaskService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MaskService;
}(MaskApplierService));
export { MaskService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQUNpQyx1Q0FBa0I7SUFXakQscUJBQzRCLFFBQWEsRUFDYixPQUFnQixFQUNsQyxXQUF1QixFQUN2QixTQUFvQjtRQUo5QixZQU1FLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1FBUDJCLGNBQVEsR0FBUixRQUFRLENBQUs7UUFDYixhQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2xDLGlCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFkdkIsb0JBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsMEJBQW9CLEdBQVcsR0FBRyxDQUFDO1FBQ25DLGlCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGNBQVEsR0FBa0IsSUFBSSxDQUFDO1FBQy9CLFlBQU0sR0FBa0IsSUFBSSxDQUFDO1FBRzdCLGNBQVE7Ozs7UUFBRyxVQUFDLENBQU0sSUFBTSxDQUFDLEVBQUM7UUFTL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7SUFDckQsQ0FBQztJQUVELGlEQUFpRDs7Ozs7Ozs7O0lBQzFDLCtCQUFTOzs7Ozs7Ozs7SUFBaEIsVUFBaUIsVUFBa0IsRUFBRSxjQUFzQixFQUFFLFFBQW9CLEVBQUUsRUFB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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdDLENBQUM7Ozs7Ozs7SUFFTyxxQ0FBZTs7Ozs7O0lBQXZCLFVBQXdCLG1CQUEyQixFQUFFLGNBQXNCO1FBQ3pFLElBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoQyxDQUFDOztnQkFyUkYsVUFBVTs7OztnREFhTixNQUFNLFNBQUMsUUFBUTtnREFDZixNQUFNLFNBQUMsTUFBTTtnQkFwQlQsVUFBVTtnQkFBc0IsU0FBUzs7SUE0UmxELGtCQUFDO0NBQUEsQUF0UkQsQ0FDaUMsa0JBQWtCLEdBcVJsRDtTQXJSWSxXQUFXOzs7SUFDdEIscUNBQW1DOztJQUNuQyxvQ0FBc0M7O0lBQ3RDLDJDQUEwQzs7SUFDMUMsa0NBQWdDOztJQUNoQywrQkFBc0M7O0lBQ3RDLDZCQUFvQzs7Ozs7SUFDcEMsbUNBQXlDOztJQUV6QywrQkFBaUM7Ozs7O0lBRy9CLCtCQUF1Qzs7Ozs7SUFDdkMsOEJBQTBDOzs7OztJQUMxQyxrQ0FBK0I7Ozs7O0lBQy9CLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNYXNrU2VydmljZSBleHRlbmRzIE1hc2tBcHBsaWVyU2VydmljZSB7XHJcbiAgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcclxuICBwdWJsaWMgaXNOdW1iZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3Rlcjogc3RyaW5nID0gJ18nO1xyXG4gIHB1YmxpYyBtYXNrSXNTaG93bjogc3RyaW5nID0gJyc7XHJcbiAgcHVibGljIHNlbFN0YXJ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgc2VsRW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX2Zvcm1FbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHtcclxuICAgIHN1cGVyKF9jb25maWcpO1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y3ljbG9tYXRpYy1jb21wbGV4aXR5XHJcbiAgcHVibGljIGFwcGx5TWFzayhpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwLCBjYjogRnVuY3Rpb24gPSAoKSA9PiB7fSk6IHN0cmluZyB7XHJcbiAgICBpZiAoIW1hc2tFeHByZXNzaW9uKSB7XHJcbiAgICAgIHJldHVybiBpbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tYXNrSXNTaG93biA9IHRoaXMuc2hvd01hc2tUeXBlZCA/IHRoaXMuc2hvd01hc2tJbklucHV0KCkgOiAnJztcclxuICAgIGlmICh0aGlzLm1hc2tFeHByZXNzaW9uID09PSAnSVAnICYmIHRoaXMuc2hvd01hc2tUeXBlZCkge1xyXG4gICAgICB0aGlzLm1hc2tJc1Nob3duID0gdGhpcy5zaG93TWFza0luSW5wdXQoaW5wdXRWYWx1ZSB8fCAnIycpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbnB1dFZhbHVlICYmIHRoaXMuc2hvd01hc2tUeXBlZCkge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sUmVzdWx0KHRoaXMucHJlZml4KTtcclxuICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcclxuICAgIH1cclxuICAgIGNvbnN0IGdldFN5bWJvbDogc3RyaW5nID0gISFpbnB1dFZhbHVlICYmIHR5cGVvZiB0aGlzLnNlbFN0YXJ0ID09PSAnbnVtYmVyJyA/IGlucHV0VmFsdWVbdGhpcy5zZWxTdGFydF0gOiAnJztcclxuICAgIGxldCBuZXdJbnB1dFZhbHVlID0gJyc7XHJcbiAgICBpZiAodGhpcy5oaWRkZW5JbnB1dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCBhY3R1YWxSZXN1bHQ6IHN0cmluZ1tdID0gdGhpcy5hY3R1YWxWYWx1ZS5zcGxpdCgnJyk7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgIGlucHV0VmFsdWUgIT09ICcnICYmIGFjdHVhbFJlc3VsdC5sZW5ndGhcclxuICAgICAgICA/IHR5cGVvZiB0aGlzLnNlbFN0YXJ0ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdGhpcy5zZWxFbmQgPT09ICdudW1iZXInXHJcbiAgICAgICAgICA/IGlucHV0VmFsdWUubGVuZ3RoID4gYWN0dWFsUmVzdWx0Lmxlbmd0aFxyXG4gICAgICAgICAgICA/IGFjdHVhbFJlc3VsdC5zcGxpY2UodGhpcy5zZWxTdGFydCwgMCwgZ2V0U3ltYm9sKVxyXG4gICAgICAgICAgICA6IGlucHV0VmFsdWUubGVuZ3RoIDwgYWN0dWFsUmVzdWx0Lmxlbmd0aFxyXG4gICAgICAgICAgICA/IGFjdHVhbFJlc3VsdC5sZW5ndGggLSBpbnB1dFZhbHVlLmxlbmd0aCA9PT0gMVxyXG4gICAgICAgICAgICAgID8gYWN0dWFsUmVzdWx0LnNwbGljZSh0aGlzLnNlbFN0YXJ0IC0gMSwgMSlcclxuICAgICAgICAgICAgICA6IGFjdHVhbFJlc3VsdC5zcGxpY2UodGhpcy5zZWxTdGFydCwgdGhpcy5zZWxFbmQgLSB0aGlzLnNlbFN0YXJ0KVxyXG4gICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgIDogKGFjdHVhbFJlc3VsdCA9IFtdKTtcclxuICAgICAgLy8gdHNsaW50OmVuYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICBuZXdJbnB1dFZhbHVlID0gdGhpcy5hY3R1YWxWYWx1ZS5sZW5ndGggPyB0aGlzLnNoaWZ0VHlwZWRTeW1ib2xzKGFjdHVhbFJlc3VsdC5qb2luKCcnKSkgOiBpbnB1dFZhbHVlO1xyXG4gICAgfVxyXG4gICAgbmV3SW5wdXRWYWx1ZSA9IEJvb2xlYW4obmV3SW5wdXRWYWx1ZSkgJiYgbmV3SW5wdXRWYWx1ZS5sZW5ndGggPyBuZXdJbnB1dFZhbHVlIDogaW5wdXRWYWx1ZTtcclxuICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nID0gc3VwZXIuYXBwbHlNYXNrKG5ld0lucHV0VmFsdWUsIG1hc2tFeHByZXNzaW9uLCBwb3NpdGlvbiwgY2IpO1xyXG4gICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHRoaXMuZ2V0QWN0dWFsVmFsdWUocmVzdWx0KTtcclxuXHJcbiAgICAvLyBoYW5kbGUgc29tZSBzZXBhcmF0b3IgaW1wbGljYXRpb25zOlxyXG4gICAgLy8gYS4pIGFkanVzdCBkZWNpbWFsTWFya2VyIGRlZmF1bHQgKC4gLT4gLCkgaWYgdGhvdXNhbmRTZXBhcmF0b3IgaXMgYSBkb3RcclxuICAgIGlmICh0aGlzLnRob3VzYW5kU2VwYXJhdG9yID09PSAnLicgJiYgdGhpcy5kZWNpbWFsTWFya2VyID09PSAnLicpIHtcclxuICAgICAgdGhpcy5kZWNpbWFsTWFya2VyID0gJywnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGIpIHJlbW92ZSBkZWNpbWFsIG1hcmtlciBmcm9tIGxpc3Qgb2Ygc3BlY2lhbCBjaGFyYWN0ZXJzIHRvIG1hc2tcclxuICAgIGlmICh0aGlzLm1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ3NlcGFyYXRvcicpICYmIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmlsdGVyKChpdGVtOiBzdHJpbmcpID0+IGl0ZW0gIT09IHRoaXMuZGVjaW1hbE1hcmtlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mb3JtQ29udHJvbFJlc3VsdChyZXN1bHQpO1xyXG5cclxuICAgIGlmICghdGhpcy5zaG93TWFza1R5cGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLmhpZGRlbklucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID8gdGhpcy5oaWRlSW5wdXQocmVzdWx0LCB0aGlzLm1hc2tFeHByZXNzaW9uKSA6IHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzTGVuOiBudW1iZXIgPSByZXN1bHQubGVuZ3RoO1xyXG4gICAgY29uc3QgcHJlZk5tYXNrOiBzdHJpbmcgPSB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XHJcbiAgICByZXR1cm4gcmVzdWx0ICsgKHRoaXMubWFza0V4cHJlc3Npb24gPT09ICdJUCcgPyBwcmVmTm1hc2sgOiBwcmVmTm1hc2suc2xpY2UocmVzTGVuKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlWYWx1ZUNoYW5nZXMocG9zaXRpb246IG51bWJlciA9IDAsIGNiOiBGdW5jdGlvbiA9ICgpID0+IHt9KTogdm9pZCB7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudC52YWx1ZSA9IHRoaXMuYXBwbHlNYXNrKHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLCB0aGlzLm1hc2tFeHByZXNzaW9uLCBwb3NpdGlvbiwgY2IpO1xyXG4gICAgaWYgKHRoaXMuX2Zvcm1FbGVtZW50ID09PSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2hGbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpZGVJbnB1dChpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGlucHV0VmFsdWVcclxuICAgICAgLnNwbGl0KCcnKVxyXG4gICAgICAubWFwKChjdXJyOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyAmJlxyXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25baW5kZXhdXSAmJlxyXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25baW5kZXhdXS5zeW1ib2xcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltpbmRleF1dLnN5bWJvbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnI7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIC8vIHRoaXMgZnVuY3Rpb24gaXMgbm90IG5lY2Vzc2FyeSwgaXQgY2hlY2tzIHJlc3VsdCBhZ2FpbnN0IG1hc2tFeHByZXNzaW9uXHJcbiAgcHVibGljIGdldEFjdHVhbFZhbHVlKHJlczogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGNvbXBhcmU6IHN0cmluZ1tdID0gcmVzXHJcbiAgICAgIC5zcGxpdCgnJylcclxuICAgICAgLmZpbHRlcihcclxuICAgICAgICAoc3ltYm9sOiBzdHJpbmcsIGk6IG51bWJlcikgPT5cclxuICAgICAgICAgIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhzeW1ib2wsIHRoaXMubWFza0V4cHJlc3Npb25baV0pIHx8XHJcbiAgICAgICAgICAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXModGhpcy5tYXNrRXhwcmVzc2lvbltpXSkgJiYgc3ltYm9sID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2ldKVxyXG4gICAgICApO1xyXG4gICAgaWYgKGNvbXBhcmUuam9pbignJykgPT09IHJlcykge1xyXG4gICAgICByZXR1cm4gY29tcGFyZS5qb2luKCcnKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hpZnRUeXBlZFN5bWJvbHMoaW5wdXRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBzeW1ib2xUb1JlcGxhY2UgPSAnJztcclxuICAgIGNvbnN0IG5ld0lucHV0VmFsdWU6IHN0cmluZ1tdID1cclxuICAgICAgKGlucHV0VmFsdWUgJiZcclxuICAgICAgICBpbnB1dFZhbHVlLnNwbGl0KCcnKS5tYXAoKGN1cnJTeW1ib2w6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyhpbnB1dFZhbHVlW2luZGV4ICsgMV0pICYmXHJcbiAgICAgICAgICAgIGlucHV0VmFsdWVbaW5kZXggKyAxXSAhPT0gdGhpcy5tYXNrRXhwcmVzc2lvbltpbmRleCArIDFdXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgc3ltYm9sVG9SZXBsYWNlID0gY3VyclN5bWJvbDtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0VmFsdWVbaW5kZXggKyAxXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzeW1ib2xUb1JlcGxhY2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VTeW1ib2w6IHN0cmluZyA9IHN5bWJvbFRvUmVwbGFjZTtcclxuICAgICAgICAgICAgc3ltYm9sVG9SZXBsYWNlID0gJyc7XHJcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlU3ltYm9sO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGN1cnJTeW1ib2w7XHJcbiAgICAgICAgfSkpIHx8XHJcbiAgICAgIFtdO1xyXG4gICAgcmV0dXJuIG5ld0lucHV0VmFsdWUuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd01hc2tJbklucHV0KGlucHV0VmFsPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLnNob3dNYXNrVHlwZWQgJiYgISF0aGlzLnNob3duTWFza0V4cHJlc3Npb24pIHtcclxuICAgICAgaWYgKHRoaXMubWFza0V4cHJlc3Npb24ubGVuZ3RoICE9PSB0aGlzLnNob3duTWFza0V4cHJlc3Npb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXNrIGV4cHJlc3Npb24gbXVzdCBtYXRjaCBtYXNrIHBsYWNlaG9sZGVyIGxlbmd0aCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNob3duTWFza0V4cHJlc3Npb247XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zaG93TWFza1R5cGVkKSB7XHJcbiAgICAgIGlmIChpbnB1dFZhbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja0ZvcklwKGlucHV0VmFsKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5tYXNrRXhwcmVzc2lvbi5yZXBsYWNlKC9cXHcvZywgdGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoRm4oKTogdm9pZCB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoICYmXHJcbiAgICAgIHRoaXMucHJlZml4Lmxlbmd0aCArIHRoaXMubWFza0V4cHJlc3Npb24ubGVuZ3RoICsgdGhpcy5zdWZmaXgubGVuZ3RoICE9PVxyXG4gICAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLnJlcGxhY2UoL18vZywgJycpLmxlbmd0aFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCAnJ107XHJcbiAgICAgIHRoaXMuYXBwbHlNYXNrKHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLCB0aGlzLm1hc2tFeHByZXNzaW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgZm9ybUVsZW1lbnRQcm9wZXJ0eShbbmFtZSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmcgfCBib29sZWFuXSkge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZm9ybUVsZW1lbnQsIG5hbWUsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVja1NwZWNpYWxDaGFyQW1vdW50KG1hc2s6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICBjb25zdCBjaGFyczogc3RyaW5nW10gPSBtYXNrLnNwbGl0KCcnKS5maWx0ZXIoKGl0ZW06IHN0cmluZykgPT4gdGhpcy5fZmluZFNwZWNpYWxDaGFyKGl0ZW0pKTtcclxuICAgIHJldHVybiBjaGFycy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jaGVja0ZvcklwKGlucHV0VmFsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGlucHV0VmFsID09PSAnIycpIHtcclxuICAgICAgcmV0dXJuIGAke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9YDtcclxuICAgIH1cclxuICAgIGNvbnN0IGFycjogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRWYWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGlucHV0VmFsW2ldLm1hdGNoKCdcXFxcZCcpKSB7XHJcbiAgICAgICAgYXJyLnB1c2goaW5wdXRWYWxbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA8PSAzKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfS4ke3RoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXJ9LiR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn1gO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyci5sZW5ndGggPiAzICYmIGFyci5sZW5ndGggPD0gNikge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcn0uJHt0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyfWA7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA+IDYgJiYgYXJyLmxlbmd0aCA8PSA5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyci5sZW5ndGggPiA5ICYmIGFyci5sZW5ndGggPD0gMTIpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtQ29udHJvbFJlc3VsdChpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSkge1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmZml4KHRoaXMuX3JlbW92ZVByZWZpeChpbnB1dFZhbHVlKSksIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fY2hlY2tTeW1ib2xzKGlucHV0VmFsdWUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fcmVtb3ZlU3VmZml4KHRoaXMuX3JlbW92ZVByZWZpeChpbnB1dFZhbHVlKSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlTWFzayh2YWx1ZTogc3RyaW5nLCBzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZTogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZSh0aGlzLl9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmUpLCAnJykgOiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZVByZWZpeCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghdGhpcy5wcmVmaXgpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZSh0aGlzLnByZWZpeCwgJycpIDogdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZW1vdmVTdWZmaXgodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXRoaXMuc3VmZml4KSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UodGhpcy5zdWZmaXgsICcnKSA6IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmV0cmlldmVTZXBhcmF0b3JWYWx1ZShyZXN1bHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVtb3ZlTWFzayh0aGlzLl9yZW1vdmVTdWZmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpLCB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmU6IHN0cmluZ1tdKTogUmVnRXhwIHtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlLm1hcCgoaXRlbTogc3RyaW5nKSA9PiBgXFxcXCR7aXRlbX1gKS5qb2luKCd8JyksICdnaScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hlY2tTeW1ib2xzKHJlc3VsdDogc3RyaW5nKTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbCB7XHJcbiAgICBpZiAocmVzdWx0ID09PSAnJykge1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlcGFyYXRvclByZWNpc2lvbjogbnVtYmVyIHwgbnVsbCA9IHRoaXMuX3JldHJpZXZlU2VwYXJhdG9yUHJlY2lzaW9uKHRoaXMubWFza0V4cHJlc3Npb24pO1xyXG4gICAgbGV0IHNlcGFyYXRvclZhbHVlOiBzdHJpbmcgPSB0aGlzLl9yZXRyaWV2ZVNlcGFyYXRvclZhbHVlKHJlc3VsdCk7XHJcbiAgICBpZiAodGhpcy5kZWNpbWFsTWFya2VyICE9PSAnLicpIHtcclxuICAgICAgc2VwYXJhdG9yVmFsdWUgPSBzZXBhcmF0b3JWYWx1ZS5yZXBsYWNlKHRoaXMuZGVjaW1hbE1hcmtlciwgJy4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc051bWJlclZhbHVlKSB7XHJcbiAgICAgIGlmIChzZXBhcmF0b3JQcmVjaXNpb24pIHtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSB0aGlzLmRlY2ltYWxNYXJrZXIpIHtcclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tQcmVjaXNpb24odGhpcy5tYXNrRXhwcmVzc2lvbiwgc2VwYXJhdG9yVmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIoc2VwYXJhdG9yVmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gc2VwYXJhdG9yVmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPIHNob3VsZCB0aGluayBhYm91dCBoZWxwZXJzIG9yIHNlcGFydGluZyBkZWNpbWFsIHByZWNpc2lvbiB0byBvd24gcHJvcGVydHlcclxuICBwcml2YXRlIF9yZXRyaWV2ZVNlcGFyYXRvclByZWNpc2lvbihtYXNrRXhwcmV0aW9uOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcclxuICAgIGNvbnN0IG1hdGNoZXI6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gbWFza0V4cHJldGlvbi5tYXRjaChuZXcgUmVnRXhwKGBec2VwYXJhdG9yXFxcXC4oW15kXSopYCkpO1xyXG4gICAgcmV0dXJuIG1hdGNoZXIgPyBOdW1iZXIobWF0Y2hlclsxXSkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hlY2tQcmVjaXNpb24oc2VwYXJhdG9yRXhwcmVzc2lvbjogc3RyaW5nLCBzZXBhcmF0b3JWYWx1ZTogc3RyaW5nKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgIGlmIChzZXBhcmF0b3JFeHByZXNzaW9uLmluZGV4T2YoJzInKSA+IDApIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihzZXBhcmF0b3JWYWx1ZSkudG9GaXhlZCgyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIoc2VwYXJhdG9yVmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=