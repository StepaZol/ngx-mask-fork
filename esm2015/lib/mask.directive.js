/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { config, timeMasks, withoutValidation } from './config';
import { MaskService } from './mask.service';
// tslint:disable deprecation
export class MaskDirective {
    /**
     * @param {?} document
     * @param {?} _maskService
     * @param {?} _config
     */
    constructor(document, _maskService, _config) {
        this.document = document;
        this._maskService = _maskService;
        this._config = _config;
        this.maskExpression = '';
        this.specialCharacters = [];
        this.patterns = {};
        this.prefix = '';
        this.suffix = '';
        this.thousandSeparator = ' ';
        this.decimalMarker = '.';
        this.dropSpecialCharacters = null;
        this.hiddenInput = null;
        this.showMaskTyped = null;
        this.placeHolderCharacter = null;
        this.shownMaskExpression = null;
        this.showTemplate = null;
        this.clearIfNotMatch = null;
        this.validation = null;
        this.separatorLimit = null;
        this.allowNegativeNumbers = null;
        this._maskValue = '';
        this._position = null;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouch = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { maskExpression, specialCharacters, patterns, prefix, suffix, thousandSeparator, decimalMarker, dropSpecialCharacters, hiddenInput, showMaskTyped, placeHolderCharacter, shownMaskExpression, showTemplate, clearIfNotMatch, validation, separatorLimit, allowNegativeNumbers, } = changes;
        if (maskExpression) {
            this._maskValue = changes.maskExpression.currentValue || '';
        }
        if (specialCharacters) {
            if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
                return;
            }
            else {
                this._maskService.maskSpecialCharacters = changes.specialCharacters.currentValue || [];
            }
        }
        // Only overwrite the mask available patterns if a pattern has actually been passed in
        if (patterns && patterns.currentValue) {
            this._maskService.maskAvailablePatterns = patterns.currentValue;
        }
        if (prefix) {
            this._maskService.prefix = prefix.currentValue;
        }
        if (suffix) {
            this._maskService.suffix = suffix.currentValue;
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator.currentValue;
        }
        if (decimalMarker) {
            this._maskService.decimalMarker = decimalMarker.currentValue;
        }
        if (dropSpecialCharacters) {
            this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
        }
        if (hiddenInput) {
            this._maskService.hiddenInput = hiddenInput.currentValue;
        }
        if (showMaskTyped) {
            this._maskService.showMaskTyped = showMaskTyped.currentValue;
        }
        if (placeHolderCharacter) {
            this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
        }
        if (shownMaskExpression) {
            this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
        }
        if (showTemplate) {
            this._maskService.showTemplate = showTemplate.currentValue;
        }
        if (clearIfNotMatch) {
            this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
        }
        if (validation) {
            this._maskService.validation = validation.currentValue;
        }
        if (separatorLimit) {
            this._maskService.separatorLimit = separatorLimit.currentValue;
        }
        if (allowNegativeNumbers) {
            this._maskService.maskSpecialCharacters = this._maskService.maskSpecialCharacters.filter((/**
             * @param {?} c
             * @return {?}
             */
            (c) => c !== '-'));
        }
        this._applyMask();
    }
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    validate({ value }) {
        if (!this._maskService.validation) {
            return null;
        }
        if (this._maskService.ipError) {
            return this._createValidationError(value);
        }
        if (this._maskValue.startsWith('separator')) {
            return null;
        }
        if (withoutValidation.includes(this._maskValue)) {
            return null;
        }
        if (this._maskService.clearIfNotMatch) {
            return null;
        }
        if (timeMasks.includes(this._maskValue)) {
            return this._validateTime(value);
        }
        if (value && value.toString().length >= 1) {
            /** @type {?} */
            let counterOfOpt = 0;
            for (const key in this._maskService.maskAvailablePatterns) {
                if (this._maskService.maskAvailablePatterns[key].optional &&
                    this._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this._maskValue.indexOf(key) !== this._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        const opt = this._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        (i) => i === key))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this._maskValue.indexOf(key) !== -1 && value.toString().length >= this._maskValue.indexOf(key)) {
                        return null;
                    }
                    if (counterOfOpt === this._maskValue.length) {
                        return null;
                    }
                }
            }
            if (this._maskValue.indexOf('{') === 1 &&
                value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4) {
                return null;
            }
            if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
                return null;
            }
            else if ((this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*')) ||
                (this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?')) ||
                this._maskValue.indexOf('{') === 1) {
                return this._createValidationError(value);
            }
            if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
                /** @type {?} */
                const length = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length) {
                    return this._createValidationError(value);
                }
            }
        }
        return null;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        const position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        let caretShift = 0;
        /** @type {?} */
        let backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        (shift, _backspaceShift) => {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        let positionToApply = this._position
            ? this._inputValue.length + position + caretShift
            : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
        if (positionToApply > this._getActualInputLength()) {
            positionToApply = this._getActualInputLength();
        }
        el.setSelectionRange(positionToApply, positionToApply);
        if ((this.maskExpression.includes('H') || this.maskExpression.includes('M')) && caretShift === 0) {
            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) + 1, ((/** @type {?} */ (el.selectionStart))) + 1);
        }
        this._position = null;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFocus(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        /** @type {?} */
        const posStart = 0;
        /** @type {?} */
        const posEnd = 0;
        if (el !== null &&
            el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            ((/** @type {?} */ (e))).keyCode !== 38)
            if (this._maskService.showMaskTyped) {
                // We are showing the mask in the input
                this._maskService.maskIsShown = this._maskService.showMaskInInput();
                if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
                    // the input ONLY contains the mask, so position the cursor at the start
                    el.focus();
                    el.setSelectionRange(posStart, posEnd);
                }
                else {
                    // the input contains some characters already
                    if (el.selectionStart > this._maskService.actualValue.length) {
                        // if the user clicked beyond our value's length, position the cursor at the end of our value
                        el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
                    }
                }
            }
        /** @type {?} */
        const nextValue = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
        if (el.value !== nextValue) {
            el.value = nextValue;
        }
        /** fix of cursor position with prefix when mouse click occur */
        if ((((/** @type {?} */ (el.selectionStart))) || ((/** @type {?} */ (el.selectionEnd)))) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
        /** select only inserted text */
        if (((/** @type {?} */ (el.selectionEnd))) > this._getActualInputLength()) {
            el.selectionEnd = this._getActualInputLength();
        }
    }
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 46) {
            if (e.keyCode === 8 && el.value.length === 0) {
                el.selectionStart = el.selectionEnd;
            }
            if (e.keyCode === 8 && ((/** @type {?} */ (el.selectionStart))) !== 0) {
                // If specialChars is false, (shouldn't ever happen) then set to the defaults
                this.specialCharacters = this.specialCharacters || this._config.specialCharacters;
                if (this.prefix.length > 1 && ((/** @type {?} */ (el.selectionStart))) <= this.prefix.length) {
                    el.setSelectionRange(this.prefix.length, this.prefix.length);
                }
                else {
                    if (this._inputValue.length !== ((/** @type {?} */ (el.selectionStart))) && ((/** @type {?} */ (el.selectionStart))) !== 1) {
                        while (this.specialCharacters.includes(this._inputValue[((/** @type {?} */ (el.selectionStart))) - 1].toString()) &&
                            ((this.prefix.length >= 1 && ((/** @type {?} */ (el.selectionStart))) > this.prefix.length) ||
                                this.prefix.length === 0)) {
                            el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
                        }
                    }
                    this.suffixCheckOnPressDelete(e.keyCode, el);
                }
            }
            this.suffixCheckOnPressDelete(e.keyCode, el);
            if (this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionStart))) <= this._maskService.prefix.length &&
                ((/** @type {?} */ (el.selectionEnd))) <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            /** @type {?} */
            const cursorStart = el.selectionStart;
            // this.onFocus(e);
            if (e.keyCode === 8 &&
                !el.readOnly &&
                cursorStart === 0 &&
                el.selectionEnd === el.value.length &&
                el.value.length !== 0) {
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
                this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
            }
        }
        if (!!this.suffix &&
            this.suffix.length > 1 &&
            this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
            el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
        else if ((e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+ A
            (e.keyCode === 65 && e.metaKey === true) // Cmd + A (Mac)
        ) {
            el.setSelectionRange(0, this._getActualInputLength());
            e.preventDefault();
        }
        this._maskService.selStart = el.selectionStart;
        this._maskService.selEnd = el.selectionEnd;
    }
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    writeValue(inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, /** @this {!MaskDirective} */ function* () {
            if (inputValue === undefined) {
                inputValue = '';
            }
            if (typeof inputValue === 'number') {
                inputValue = String(inputValue);
                inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
                this._maskService.isNumberValue = true;
            }
            (inputValue && this._maskService.maskExpression) ||
                (this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped))
                ? (this._maskService.formElementProperty = [
                    'value',
                    this._maskService.applyMask(inputValue, this._maskService.maskExpression),
                ])
                : (this._maskService.formElementProperty = ['value', inputValue]);
            this._inputValue = inputValue;
        });
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    suffixCheckOnPressDelete(keyCode, el) {
        if (keyCode === 46 && this.suffix.length > 0) {
            if (this._inputValue.length - this.suffix.length <= ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
        }
        if (keyCode === 8) {
            if (this.suffix.length > 1 && this._inputValue.length - this.suffix.length < ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
            }
            if (this.suffix.length === 1 && this._inputValue.length === ((/** @type {?} */ (el.selectionStart)))) {
                el.setSelectionRange(((/** @type {?} */ (el.selectionStart))) - 1, ((/** @type {?} */ (el.selectionStart))) - 1);
            }
        }
    }
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onModelChange(e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    }
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    _repeatPatternSymbols(maskExp) {
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            (accum, currval, index) => {
                this._start = currval === '{' ? index : this._start;
                if (currval !== '}') {
                    return this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                this._end = index;
                /** @type {?} */
                const repeatNumber = Number(maskExp.slice(this._start + 1, this._end));
                /** @type {?} */
                const repaceWith = new Array(repeatNumber + 1).join(maskExp[this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    }
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    _applyMask() {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _validateTime(value) {
        /** @type {?} */
        const rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        (s) => s !== ':')).length;
        if (value === null || value.length === 0) {
            return null; // Don't validate empty values to allow for optional form control
        }
        if ((+value[value.length - 1] === 0 && value.length < rowMaskLen) || value.length <= rowMaskLen - 2) {
            return this._createValidationError(value);
        }
        return null;
    }
    /**
     * @private
     * @return {?}
     */
    _getActualInputLength() {
        return (this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length);
    }
    /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    _createValidationError(actualValue) {
        return {
            mask: {
                requiredMask: this._maskValue,
                actualValue,
            },
        };
    }
}
MaskDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mask]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MaskDirective)),
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MaskDirective)),
                        multi: true,
                    },
                    MaskService,
                ],
            },] }
];
/** @nocollapse */
MaskDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: MaskService },
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
];
MaskDirective.propDecorators = {
    maskExpression: [{ type: Input, args: ['mask',] }],
    specialCharacters: [{ type: Input }],
    patterns: [{ type: Input }],
    prefix: [{ type: Input }],
    suffix: [{ type: Input }],
    thousandSeparator: [{ type: Input }],
    decimalMarker: [{ type: Input }],
    dropSpecialCharacters: [{ type: Input }],
    hiddenInput: [{ type: Input }],
    showMaskTyped: [{ type: Input }],
    placeHolderCharacter: [{ type: Input }],
    shownMaskExpression: [{ type: Input }],
    showTemplate: [{ type: Input }],
    clearIfNotMatch: [{ type: Input }],
    validation: [{ type: Input }],
    separatorLimit: [{ type: Input }],
    allowNegativeNumbers: [{ type: Input }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    onFocus: [{ type: HostListener, args: ['click', ['$event'],] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onModelChange: [{ type: HostListener, args: ['ngModelChange', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    MaskDirective.prototype.maskExpression;
    /** @type {?} */
    MaskDirective.prototype.specialCharacters;
    /** @type {?} */
    MaskDirective.prototype.patterns;
    /** @type {?} */
    MaskDirective.prototype.prefix;
    /** @type {?} */
    MaskDirective.prototype.suffix;
    /** @type {?} */
    MaskDirective.prototype.thousandSeparator;
    /** @type {?} */
    MaskDirective.prototype.decimalMarker;
    /** @type {?} */
    MaskDirective.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskDirective.prototype.hiddenInput;
    /** @type {?} */
    MaskDirective.prototype.showMaskTyped;
    /** @type {?} */
    MaskDirective.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskDirective.prototype.shownMaskExpression;
    /** @type {?} */
    MaskDirective.prototype.showTemplate;
    /** @type {?} */
    MaskDirective.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskDirective.prototype.validation;
    /** @type {?} */
    MaskDirective.prototype.separatorLimit;
    /** @type {?} */
    MaskDirective.prototype.allowNegativeNumbers;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._inputValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._position;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._start;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._end;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._code;
    /** @type {?} */
    MaskDirective.prototype.onChange;
    /** @type {?} */
    MaskDirective.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskService;
    /**
     * @type {?}
     * @protected
     */
    MaskDirective.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBcUMsYUFBYSxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQW1CN0MsTUFBTSxPQUFPLGFBQWE7Ozs7OztJQXlCeEIsWUFDNEIsUUFBYSxFQUMvQixZQUF5QixFQUNQLE9BQWdCO1FBRmhCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDUCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBM0J0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBd0IsRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFpQyxHQUFHLENBQUM7UUFDdEQsa0JBQWEsR0FBNkIsR0FBRyxDQUFDO1FBQzlDLDBCQUFxQixHQUE0QyxJQUFJLENBQUM7UUFDdEUsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RCx5QkFBb0IsR0FBMkMsSUFBSSxDQUFDO1FBQ3BFLHdCQUFtQixHQUEwQyxJQUFJ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Q0FBbUQ7O0lBQ25ELCtCQUErQzs7SUFDL0MsK0JBQStDOztJQUMvQywwQ0FBc0U7O0lBQ3RFLHNDQUE4RDs7SUFDOUQsOENBQXNGOztJQUN0RixvQ0FBa0U7O0lBQ2xFLHNDQUFzRTs7SUFDdEUsNkNBQW9GOztJQUNwRiw0Q0FBa0Y7O0lBQ2xGLHFDQUFvRTs7SUFDcEUsd0NBQTBFOztJQUMxRSxtQ0FBZ0U7O0lBQ2hFLHVDQUF3RTs7SUFDeEUsNkNBQW9GOzs7OztJQUNwRixtQ0FBZ0M7Ozs7O0lBQ2hDLG9DQUE2Qjs7Ozs7SUFDN0Isa0NBQXdDOzs7OztJQUN4QywrQkFBd0I7Ozs7O0lBQ3hCLDZCQUFzQjs7Ozs7SUFDdEIsOEJBQXVCOztJQVF2QixpQ0FBaUM7O0lBQ2pDLGdDQUEwQjs7Ozs7SUFOeEIsaUNBQXVDOzs7OztJQUN2QyxxQ0FBaUM7Ozs7O0lBQ2pDLGdDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQ3VzdG9tS2V5Ym9hcmRFdmVudCB9IGZyb20gJy4vY3VzdG9tLWtleWJvYXJkLWV2ZW50JztcclxuaW1wb3J0IHsgY29uZmlnLCBJQ29uZmlnLCB0aW1lTWFza3MsIHdpdGhvdXRWYWxpZGF0aW9uIH0gZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQgeyBNYXNrU2VydmljZSB9IGZyb20gJy4vbWFzay5zZXJ2aWNlJztcclxuXHJcbi8vIHRzbGludDpkaXNhYmxlIGRlcHJlY2F0aW9uXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21hc2tdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hc2tEaXJlY3RpdmUpLFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hc2tEaXJlY3RpdmUpLFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBNYXNrU2VydmljZSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFza0RpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgnbWFzaycpIHB1YmxpYyBtYXNrRXhwcmVzc2lvbjogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgcHVibGljIHNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydzcGVjaWFsQ2hhcmFjdGVycyddID0gW107XHJcbiAgQElucHV0KCkgcHVibGljIHBhdHRlcm5zOiBJQ29uZmlnWydwYXR0ZXJucyddID0ge307XHJcbiAgQElucHV0KCkgcHVibGljIHByZWZpeDogSUNvbmZpZ1sncHJlZml4J10gPSAnJztcclxuICBASW5wdXQoKSBwdWJsaWMgc3VmZml4OiBJQ29uZmlnWydzdWZmaXgnXSA9ICcnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB0aG91c2FuZFNlcGFyYXRvcjogSUNvbmZpZ1sndGhvdXNhbmRTZXBhcmF0b3InXSA9ICcgJztcclxuICBASW5wdXQoKSBwdWJsaWMgZGVjaW1hbE1hcmtlcjogSUNvbmZpZ1snZGVjaW1hbE1hcmtlciddID0gJy4nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ2Ryb3BTcGVjaWFsQ2hhcmFjdGVycyddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIGhpZGRlbklucHV0OiBJQ29uZmlnWydoaWRkZW5JbnB1dCddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIHNob3dNYXNrVHlwZWQ6IElDb25maWdbJ3Nob3dNYXNrVHlwZWQnXSB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3RlcjogSUNvbmZpZ1sncGxhY2VIb2xkZXJDaGFyYWN0ZXInXSB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93bk1hc2tFeHByZXNzaW9uOiBJQ29uZmlnWydzaG93bk1hc2tFeHByZXNzaW9uJ10gfCBudWxsID0gbnVsbDtcclxuICBASW5wdXQoKSBwdWJsaWMgc2hvd1RlbXBsYXRlOiBJQ29uZmlnWydzaG93VGVtcGxhdGUnXSB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBjbGVhcklmTm90TWF0Y2g6IElDb25maWdbJ2NsZWFySWZOb3RNYXRjaCddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIHZhbGlkYXRpb246IElDb25maWdbJ3ZhbGlkYXRpb24nXSB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXBhcmF0b3JMaW1pdDogSUNvbmZpZ1snc2VwYXJhdG9yTGltaXQnXSB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd05lZ2F0aXZlTnVtYmVyczogSUNvbmZpZ1snYWxsb3dOZWdhdGl2ZU51bWJlcnMnXSB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX21hc2tWYWx1ZTogc3RyaW5nID0gJyc7XHJcbiAgcHJpdmF0ZSBfaW5wdXRWYWx1ZSE6IHN0cmluZztcclxuICBwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfc3RhcnQhOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfZW5kITogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2NvZGUhOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIHByaXZhdGUgX21hc2tTZXJ2aWNlOiBNYXNrU2VydmljZSxcclxuICAgIEBJbmplY3QoY29uZmlnKSBwcm90ZWN0ZWQgX2NvbmZpZzogSUNvbmZpZ1xyXG4gICkge31cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7fTtcclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgbWFza0V4cHJlc3Npb24sXHJcbiAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzLFxyXG4gICAgICBwYXR0ZXJucyxcclxuICAgICAgcHJlZml4LFxyXG4gICAgICBzdWZmaXgsXHJcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxyXG4gICAgICBkZWNpbWFsTWFya2VyLFxyXG4gICAgICBkcm9wU3BlY2lhbENoYXJhY3RlcnMsXHJcbiAgICAgIGhpZGRlbklucHV0LFxyXG4gICAgICBzaG93TWFza1R5cGVkLFxyXG4gICAgICBwbGFjZUhvbGRlckNoYXJhY3RlcixcclxuICAgICAgc2hvd25NYXNrRXhwcmVzc2lvbixcclxuICAgICAgc2hvd1RlbXBsYXRlLFxyXG4gICAgICBjbGVhcklmTm90TWF0Y2gsXHJcbiAgICAgIHZhbGlkYXRpb24sXHJcbiAgICAgIHNlcGFyYXRvckxpbWl0LFxyXG4gICAgICBhbGxvd05lZ2F0aXZlTnVtYmVycyxcclxuICAgIH0gPSBjaGFuZ2VzO1xyXG4gICAgaWYgKG1hc2tFeHByZXNzaW9uKSB7XHJcbiAgICAgIHRoaXMuX21hc2tWYWx1ZSA9IGNoYW5nZXMubWFza0V4cHJlc3Npb24uY3VycmVudFZhbHVlIHx8ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKHNwZWNpYWxDaGFyYWN0ZXJzKSB7XHJcbiAgICAgIGlmICghc3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlIHx8ICFBcnJheS5pc0FycmF5KHNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gY2hhbmdlcy5zcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWUgfHwgW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIE9ubHkgb3ZlcndyaXRlIHRoZSBtYXNrIGF2YWlsYWJsZSBwYXR0ZXJucyBpZiBhIHBhdHRlcm4gaGFzIGFjdHVhbGx5IGJlZW4gcGFzc2VkIGluXHJcbiAgICBpZiAocGF0dGVybnMgJiYgcGF0dGVybnMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHBhdHRlcm5zLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ID0gcHJlZml4LmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChzdWZmaXgpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc3VmZml4ID0gc3VmZml4LmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aG91c2FuZFNlcGFyYXRvcikge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS50aG91c2FuZFNlcGFyYXRvciA9IHRob3VzYW5kU2VwYXJhdG9yLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChkZWNpbWFsTWFya2VyKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmRlY2ltYWxNYXJrZXIgPSBkZWNpbWFsTWFya2VyLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChkcm9wU3BlY2lhbENoYXJhY3RlcnMpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID0gZHJvcFNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChoaWRkZW5JbnB1dCkge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5oaWRkZW5JbnB1dCA9IGhpZGRlbklucHV0LmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChzaG93TWFza1R5cGVkKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQgPSBzaG93TWFza1R5cGVkLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChwbGFjZUhvbGRlckNoYXJhY3Rlcikge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5wbGFjZUhvbGRlckNoYXJhY3RlciA9IHBsYWNlSG9sZGVyQ2hhcmFjdGVyLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChzaG93bk1hc2tFeHByZXNzaW9uKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3duTWFza0V4cHJlc3Npb24gPSBzaG93bk1hc2tFeHByZXNzaW9uLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChzaG93VGVtcGxhdGUpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd1RlbXBsYXRlID0gc2hvd1RlbXBsYXRlLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChjbGVhcklmTm90TWF0Y2gpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoID0gY2xlYXJJZk5vdE1hdGNoLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmICh2YWxpZGF0aW9uKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChzZXBhcmF0b3JMaW1pdCkge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zZXBhcmF0b3JMaW1pdCA9IHNlcGFyYXRvckxpbWl0LmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChhbGxvd05lZ2F0aXZlTnVtYmVycykge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmlsdGVyKChjOiBzdHJpbmcpID0+IGMgIT09ICctJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hcHBseU1hc2soKTtcclxuICB9XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3ljbG9tYXRpYy1jb21wbGV4aXR5XHJcbiAgcHVibGljIHZhbGlkYXRlKHsgdmFsdWUgfTogRm9ybUNvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XHJcbiAgICBpZiAoIXRoaXMuX21hc2tTZXJ2aWNlLnZhbGlkYXRpb24pIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fbWFza1NlcnZpY2UuaXBFcnJvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlVmFsaWRhdGlvbkVycm9yKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuc3RhcnRzV2l0aCgnc2VwYXJhdG9yJykpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAod2l0aG91dFZhbGlkYXRpb24uaW5jbHVkZXModGhpcy5fbWFza1ZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2gpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGltZU1hc2tzLmluY2x1ZGVzKHRoaXMuX21hc2tWYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlVGltZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gMSkge1xyXG4gICAgICBsZXQgY291bnRlck9mT3B0ID0gMDtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zW2tleV0ub3B0aW9uYWwgJiZcclxuICAgICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1trZXldLm9wdGlvbmFsID09PSB0cnVlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gdGhpcy5fbWFza1ZhbHVlLmxhc3RJbmRleE9mKGtleSkpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0OiBzdHJpbmcgPSB0aGlzLl9tYXNrVmFsdWVcclxuICAgICAgICAgICAgICAuc3BsaXQoJycpXHJcbiAgICAgICAgICAgICAgLmZpbHRlcigoaTogc3RyaW5nKSA9PiBpID09PSBrZXkpXHJcbiAgICAgICAgICAgICAgLmpvaW4oJycpO1xyXG4gICAgICAgICAgICBjb3VudGVyT2ZPcHQgKz0gb3B0Lmxlbmd0aDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY291bnRlck9mT3B0Kys7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSAhPT0gLTEgJiYgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gdGhpcy5fbWFza1ZhbHVlLmluZGV4T2Yoa2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjb3VudGVyT2ZPcHQgPT09IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZigneycpID09PSAxICYmXHJcbiAgICAgICAgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPT09IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGggKyBOdW1iZXIodGhpcy5fbWFza1ZhbHVlLnNwbGl0KCd7JylbMV0uc3BsaXQoJ30nKVswXSkgLSA0XHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID09PSAxIHx8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJyonKSA+IDEgJiYgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPCB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpKSB8fFxyXG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykpIHx8XHJcbiAgICAgICAgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJ3snKSA9PT0gMVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlVmFsaWRhdGlvbkVycm9yKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJyonKSA9PT0gLTEgfHwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSA9PT0gLTEpIHtcclxuICAgICAgICBjb25zdCBsZW5ndGg6IG51bWJlciA9IHRoaXMuX21hc2tTZXJ2aWNlLmRyb3BTcGVjaWFsQ2hhcmFjdGVyc1xyXG4gICAgICAgICAgPyB0aGlzLl9tYXNrVmFsdWUubGVuZ3RoIC0gdGhpcy5fbWFza1NlcnZpY2UuY2hlY2tTcGVjaWFsQ2hhckFtb3VudCh0aGlzLl9tYXNrVmFsdWUpIC0gY291bnRlck9mT3B0XHJcbiAgICAgICAgICA6IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGggLSBjb3VudGVyT2ZPcHQ7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlVmFsaWRhdGlvbkVycm9yKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbklucHV0KGU6IEN1c3RvbUtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuX2lucHV0VmFsdWUgPSBlbC52YWx1ZTtcclxuICAgIGlmICghdGhpcy5fbWFza1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UoZWwudmFsdWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID1cclxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPT09IDFcclxuICAgICAgICA/IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxyXG4gICAgICAgIDogKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcik7XHJcbiAgICBsZXQgY2FyZXRTaGlmdCA9IDA7XHJcbiAgICBsZXQgYmFja3NwYWNlU2hpZnQgPSBmYWxzZTtcclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5VmFsdWVDaGFuZ2VzKHBvc2l0aW9uLCAoc2hpZnQ6IG51bWJlciwgX2JhY2tzcGFjZVNoaWZ0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgIGNhcmV0U2hpZnQgPSBzaGlmdDtcclxuICAgICAgYmFja3NwYWNlU2hpZnQgPSBfYmFja3NwYWNlU2hpZnQ7XHJcbiAgICB9KTtcclxuICAgIC8vIG9ubHkgc2V0IHRoZSBzZWxlY3Rpb24gaWYgdGhlIGVsZW1lbnQgaXMgYWN0aXZlXHJcbiAgICBpZiAodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uID09PSAxICYmIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoID09PSAxID8gbnVsbCA6IHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgbGV0IHBvc2l0aW9uVG9BcHBseTogbnVtYmVyID0gdGhpcy5fcG9zaXRpb25cclxuICAgICAgPyB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCArIHBvc2l0aW9uICsgY2FyZXRTaGlmdFxyXG4gICAgICA6IHBvc2l0aW9uICsgKHRoaXMuX2NvZGUgPT09ICdCYWNrc3BhY2UnICYmICFiYWNrc3BhY2VTaGlmdCA/IDAgOiBjYXJldFNoaWZ0KTtcclxuICAgIGlmIChwb3NpdGlvblRvQXBwbHkgPiB0aGlzLl9nZXRBY3R1YWxJbnB1dExlbmd0aCgpKSB7XHJcbiAgICAgIHBvc2l0aW9uVG9BcHBseSA9IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCk7XHJcbiAgICB9XHJcbiAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShwb3NpdGlvblRvQXBwbHksIHBvc2l0aW9uVG9BcHBseSk7XHJcbiAgICBpZiAoKHRoaXMubWFza0V4cHJlc3Npb24uaW5jbHVkZXMoJ0gnKSB8fCB0aGlzLm1hc2tFeHByZXNzaW9uLmluY2x1ZGVzKCdNJykpICYmIGNhcmV0U2hpZnQgPT09IDApIHtcclxuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIDEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXHJcbiAgcHVibGljIG9uQmx1cigpOiB2b2lkIHtcclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaEZuKCk7XHJcbiAgICB0aGlzLm9uVG91Y2goKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Gb2N1cyhlOiBNb3VzZUV2ZW50IHwgQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY29uc3QgcG9zU3RhcnQgPSAwO1xyXG4gICAgY29uc3QgcG9zRW5kID0gMDtcclxuICAgIGlmIChcclxuICAgICAgZWwgIT09IG51bGwgJiZcclxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgIT09IG51bGwgJiZcclxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPT09IGVsLnNlbGVjdGlvbkVuZCAmJlxyXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA+IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggJiZcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgIChlIGFzIGFueSkua2V5Q29kZSAhPT0gMzhcclxuICAgIClcclxuICAgICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpIHtcclxuICAgICAgICAvLyBXZSBhcmUgc2hvd2luZyB0aGUgbWFzayBpbiB0aGUgaW5wdXRcclxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93biA9IHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrSW5JbnB1dCgpO1xyXG4gICAgICAgIGlmIChlbC5zZXRTZWxlY3Rpb25SYW5nZSAmJiB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggKyB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93biA9PT0gZWwudmFsdWUpIHtcclxuICAgICAgICAgIC8vIHRoZSBpbnB1dCBPTkxZIGNvbnRhaW5zIHRoZSBtYXNrLCBzbyBwb3NpdGlvbiB0aGUgY3Vyc29yIGF0IHRoZSBzdGFydFxyXG4gICAgICAgICAgZWwuZm9jdXMoKTtcclxuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHBvc1N0YXJ0LCBwb3NFbmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB0aGUgaW5wdXQgY29udGFpbnMgc29tZSBjaGFyYWN0ZXJzIGFscmVhZHlcclxuICAgICAgICAgIGlmIChlbC5zZWxlY3Rpb25TdGFydCA+IHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBpZiB0aGUgdXNlciBjbGlja2VkIGJleW9uZCBvdXIgdmFsdWUncyBsZW5ndGgsIHBvc2l0aW9uIHRoZSBjdXJzb3IgYXQgdGhlIGVuZCBvZiBvdXIgdmFsdWVcclxuICAgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoLCB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgY29uc3QgbmV4dFZhbHVlOiBzdHJpbmcgfCBudWxsID1cclxuICAgICAgIWVsLnZhbHVlIHx8IGVsLnZhbHVlID09PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXhcclxuICAgICAgICA/IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCArIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duXHJcbiAgICAgICAgOiBlbC52YWx1ZTtcclxuXHJcbiAgICAvKiogRml4IG9mIGN1cnNvciBwb3NpdGlvbiBqdW1waW5nIHRvIGVuZCBpbiBtb3N0IGJyb3dzZXJzIG5vIG1hdHRlciB3aGVyZSBjdXJzb3IgaXMgaW5zZXJ0ZWQgb25Gb2N1cyAqL1xyXG4gICAgaWYgKGVsLnZhbHVlICE9PSBuZXh0VmFsdWUpIHtcclxuICAgICAgZWwudmFsdWUgPSBuZXh0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGZpeCBvZiBjdXJzb3IgcG9zaXRpb24gd2l0aCBwcmVmaXggd2hlbiBtb3VzZSBjbGljayBvY2N1ciAqL1xyXG4gICAgaWYgKCgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSB8fCAoZWwuc2VsZWN0aW9uRW5kIGFzIG51bWJlcikpIDw9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGgpIHtcclxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHNlbGVjdCBvbmx5IGluc2VydGVkIHRleHQgKi9cclxuICAgIGlmICgoZWwuc2VsZWN0aW9uRW5kIGFzIG51bWJlcikgPiB0aGlzLl9nZXRBY3R1YWxJbnB1dExlbmd0aCgpKSB7XHJcbiAgICAgIGVsLnNlbGVjdGlvbkVuZCA9IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN5Y2xvbWF0aWMtY29tcGxleGl0eVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbktleURvd24oZTogQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fY29kZSA9IGUuY29kZSA/IGUuY29kZSA6IGUua2V5O1xyXG4gICAgY29uc3QgZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gNDYpIHtcclxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOCAmJiBlbC52YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4ICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICE9PSAwKSB7XHJcbiAgICAgICAgLy8gSWYgc3BlY2lhbENoYXJzIGlzIGZhbHNlLCAoc2hvdWxkbid0IGV2ZXIgaGFwcGVuKSB0aGVuIHNldCB0byB0aGUgZGVmYXVsdHNcclxuICAgICAgICB0aGlzLnNwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5zcGVjaWFsQ2hhcmFjdGVycyB8fCB0aGlzLl9jb25maWcuc3BlY2lhbENoYXJhY3RlcnM7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlZml4Lmxlbmd0aCA+IDEgJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgPD0gdGhpcy5wcmVmaXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLnByZWZpeC5sZW5ndGgsIHRoaXMucHJlZml4Lmxlbmd0aCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAhPT0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgIT09IDEpIHtcclxuICAgICAgICAgICAgd2hpbGUgKFxyXG4gICAgICAgICAgICAgIHRoaXMuc3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXModGhpcy5faW5wdXRWYWx1ZVsoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDFdLnRvU3RyaW5nKCkpICYmXHJcbiAgICAgICAgICAgICAgKCh0aGlzLnByZWZpeC5sZW5ndGggPj0gMSAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA+IHRoaXMucHJlZml4Lmxlbmd0aCkgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZml4Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxLCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShlLmtleUNvZGUsIGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdWZmaXhDaGVja09uUHJlc3NEZWxldGUoZS5rZXlDb2RlLCBlbCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXHJcbiAgICAgICAgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxyXG4gICAgICAgIChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXHJcbiAgICAgICkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjdXJzb3JTdGFydDogbnVtYmVyIHwgbnVsbCA9IGVsLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAvLyB0aGlzLm9uRm9jdXMoZSk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBlLmtleUNvZGUgPT09IDggJiZcclxuICAgICAgICAhZWwucmVhZE9ubHkgJiZcclxuICAgICAgICBjdXJzb3JTdGFydCA9PT0gMCAmJlxyXG4gICAgICAgIGVsLnNlbGVjdGlvbkVuZCA9PT0gZWwudmFsdWUubGVuZ3RoICYmXHJcbiAgICAgICAgZWwudmFsdWUubGVuZ3RoICE9PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCA6IDA7XHJcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCwgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24sIHRoaXMuX3Bvc2l0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICAhIXRoaXMuc3VmZml4ICYmXHJcbiAgICAgIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDEgJiZcclxuICAgICAgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKVxyXG4gICAgKSB7XHJcbiAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoLCB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAoZS5rZXlDb2RlID09PSA2NSAmJiBlLmN0cmxLZXkgPT09IHRydWUpIHx8IC8vIEN0cmwrIEFcclxuICAgICAgKGUua2V5Q29kZSA9PT0gNjUgJiYgZS5tZXRhS2V5ID09PSB0cnVlKSAvLyBDbWQgKyBBIChNYWMpXHJcbiAgICApIHtcclxuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlbFN0YXJ0ID0gZWwuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICB0aGlzLl9tYXNrU2VydmljZS5zZWxFbmQgPSBlbC5zZWxlY3Rpb25FbmQ7XHJcbiAgfVxyXG5cclxuICAvKiogSXQgd3JpdGVzIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgKi9cclxuICBwdWJsaWMgYXN5bmMgd3JpdGVWYWx1ZShpbnB1dFZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgaW5wdXRWYWx1ZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dFZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICBpbnB1dFZhbHVlID0gU3RyaW5nKGlucHV0VmFsdWUpO1xyXG4gICAgICBpbnB1dFZhbHVlID0gdGhpcy5kZWNpbWFsTWFya2VyICE9PSAnLicgPyBpbnB1dFZhbHVlLnJlcGxhY2UoJy4nLCB0aGlzLmRlY2ltYWxNYXJrZXIpIDogaW5wdXRWYWx1ZTtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuaXNOdW1iZXJWYWx1ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAoaW5wdXRWYWx1ZSAmJiB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbikgfHxcclxuICAgICh0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiAmJiAodGhpcy5fbWFza1NlcnZpY2UucHJlZml4IHx8IHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpKVxyXG4gICAgICA/ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xyXG4gICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhpbnB1dFZhbHVlLCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiksXHJcbiAgICAgICAgXSlcclxuICAgICAgOiAodGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCBpbnB1dFZhbHVlXSk7XHJcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gaW5wdXRWYWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdWZmaXhDaGVja09uUHJlc3NEZWxldGUoa2V5Q29kZTogbnVtYmVyLCBlbDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xyXG4gICAgaWYgKGtleUNvZGUgPT09IDQ2ICYmIHRoaXMuc3VmZml4Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoIDw9IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpKSB7XHJcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGtleUNvZGUgPT09IDgpIHtcclxuICAgICAgaWYgKHRoaXMuc3VmZml4Lmxlbmd0aCA+IDEgJiYgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPCAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSkge1xyXG4gICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoLCB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc3VmZml4Lmxlbmd0aCA9PT0gMSAmJiB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCA9PT0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpIHtcclxuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEsIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBJdCBkaXNhYmxlcyB0aGUgaW5wdXQgZWxlbWVudCAqL1xyXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbJ2Rpc2FibGVkJywgaXNEaXNhYmxlZF07XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCduZ01vZGVsQ2hhbmdlJywgWyckZXZlbnQnXSlcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueVxyXG4gIHB1YmxpYyBvbk1vZGVsQ2hhbmdlKGU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKCFlKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZXBlYXRQYXR0ZXJuU3ltYm9scyhtYXNrRXhwOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgKG1hc2tFeHAubWF0Y2goL3tbMC05XSt9LykgJiZcclxuICAgICAgICBtYXNrRXhwLnNwbGl0KCcnKS5yZWR1Y2UoKGFjY3VtOiBzdHJpbmcsIGN1cnJ2YWw6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9zdGFydCA9IGN1cnJ2YWwgPT09ICd7JyA/IGluZGV4IDogdGhpcy5fc3RhcnQ7XHJcblxyXG4gICAgICAgICAgaWYgKGN1cnJ2YWwgIT09ICd9Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFza1NlcnZpY2UuX2ZpbmRTcGVjaWFsQ2hhcihjdXJydmFsKSA/IGFjY3VtICsgY3VycnZhbCA6IGFjY3VtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5fZW5kID0gaW5kZXg7XHJcbiAgICAgICAgICBjb25zdCByZXBlYXROdW1iZXI6IG51bWJlciA9IE51bWJlcihtYXNrRXhwLnNsaWNlKHRoaXMuX3N0YXJ0ICsgMSwgdGhpcy5fZW5kKSk7XHJcbiAgICAgICAgICBjb25zdCByZXBhY2VXaXRoOiBzdHJpbmcgPSBuZXcgQXJyYXkocmVwZWF0TnVtYmVyICsgMSkuam9pbihtYXNrRXhwW3RoaXMuX3N0YXJ0IC0gMV0pO1xyXG4gICAgICAgICAgcmV0dXJuIGFjY3VtICsgcmVwYWNlV2l0aDtcclxuICAgICAgICB9LCAnJykpIHx8XHJcbiAgICAgIG1hc2tFeHBcclxuICAgICk7XHJcbiAgfVxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcclxuICBwcml2YXRlIF9hcHBseU1hc2soKTogYW55IHtcclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uID0gdGhpcy5fcmVwZWF0UGF0dGVyblN5bWJvbHModGhpcy5fbWFza1ZhbHVlIHx8ICcnKTtcclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbXHJcbiAgICAgICd2YWx1ZScsXHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayh0aGlzLl9pbnB1dFZhbHVlLCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiksXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdmFsaWRhdGVUaW1lKHZhbHVlOiBzdHJpbmcpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XHJcbiAgICBjb25zdCByb3dNYXNrTGVuOiBudW1iZXIgPSB0aGlzLl9tYXNrVmFsdWUuc3BsaXQoJycpLmZpbHRlcigoczogc3RyaW5nKSA9PiBzICE9PSAnOicpLmxlbmd0aDtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIG51bGw7IC8vIERvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBmb3Igb3B0aW9uYWwgZm9ybSBjb250cm9sXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCgrdmFsdWVbdmFsdWUubGVuZ3RoIC0gMV0gPT09IDAgJiYgdmFsdWUubGVuZ3RoIDwgcm93TWFza0xlbikgfHwgdmFsdWUubGVuZ3RoIDw9IHJvd01hc2tMZW4gLSAyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVWYWxpZGF0aW9uRXJyb3IodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGggfHwgdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZVZhbGlkYXRpb25FcnJvcihhY3R1YWxWYWx1ZTogc3RyaW5nKTogVmFsaWRhdGlvbkVycm9ycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtYXNrOiB7XHJcbiAgICAgICAgcmVxdWlyZWRNYXNrOiB0aGlzLl9tYXNrVmFsdWUsXHJcbiAgICAgICAgYWN0dWFsVmFsdWUsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=