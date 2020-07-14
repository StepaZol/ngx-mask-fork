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
var MaskDirective = /** @class */ (function () {
    function MaskDirective(document, _maskService, _config) {
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
        function (_) { });
        this.onTouch = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaskDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var maskExpression = changes.maskExpression, specialCharacters = changes.specialCharacters, patterns = changes.patterns, prefix = changes.prefix, suffix = changes.suffix, thousandSeparator = changes.thousandSeparator, decimalMarker = changes.decimalMarker, dropSpecialCharacters = changes.dropSpecialCharacters, hiddenInput = changes.hiddenInput, showMaskTyped = changes.showMaskTyped, placeHolderCharacter = changes.placeHolderCharacter, shownMaskExpression = changes.shownMaskExpression, showTemplate = changes.showTemplate, clearIfNotMatch = changes.clearIfNotMatch, validation = changes.validation, separatorLimit = changes.separatorLimit, allowNegativeNumbers = changes.allowNegativeNumbers;
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
            function (c) { return c !== '-'; }));
        }
        this._applyMask();
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    MaskDirective.prototype.validate = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a.value;
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
            var counterOfOpt = 0;
            var _loop_1 = function (key) {
                if (this_1._maskService.maskAvailablePatterns[key].optional &&
                    this_1._maskService.maskAvailablePatterns[key].optional === true) {
                    if (this_1._maskValue.indexOf(key) !== this_1._maskValue.lastIndexOf(key)) {
                        /** @type {?} */
                        var opt = this_1._maskValue
                            .split('')
                            .filter((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i === key; }))
                            .join('');
                        counterOfOpt += opt.length;
                    }
                    else if (this_1._maskValue.indexOf(key) !== -1) {
                        counterOfOpt++;
                    }
                    if (this_1._maskValue.indexOf(key) !== -1 && value.toString().length >= this_1._maskValue.indexOf(key)) {
                        return { value: null };
                    }
                    if (counterOfOpt === this_1._maskValue.length) {
                        return { value: null };
                    }
                }
            };
            var this_1 = this;
            for (var key in this._maskService.maskAvailablePatterns) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
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
                var length_1 = this._maskService.dropSpecialCharacters
                    ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
                    : this._maskValue.length - counterOfOpt;
                if (value.toString().length < length_1) {
                    return this._createValidationError(value);
                }
            }
        }
        return null;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        var position = el.selectionStart === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : ((/** @type {?} */ (el.selectionStart)));
        /** @type {?} */
        var caretShift = 0;
        /** @type {?} */
        var backspaceShift = false;
        this._maskService.applyValueChanges(position, (/**
         * @param {?} shift
         * @param {?} _backspaceShift
         * @return {?}
         */
        function (shift, _backspaceShift) {
            caretShift = shift;
            backspaceShift = _backspaceShift;
        }));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        /** @type {?} */
        var positionToApply = this._position
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
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        /** @type {?} */
        var posStart = 0;
        /** @type {?} */
        var posEnd = 0;
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
        var nextValue = !el.value || el.value === this._maskService.prefix
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
    };
    // tslint:disable-next-line: cyclomatic-complexity
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onKeyDown = 
    // tslint:disable-next-line: cyclomatic-complexity
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._code = e.code ? e.code : e.key;
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
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
            var cursorStart = el.selectionStart;
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
    };
    /** It writes the value in the input */
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    MaskDirective.prototype.suffixCheckOnPressDelete = /**
     * @param {?} keyCode
     * @param {?} el
     * @return {?}
     */
    function (keyCode, el) {
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
    };
    /** It disables the input element */
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onModelChange = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!e) {
            this._maskService.actualValue = '';
        }
    };
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    MaskDirective.prototype._repeatPatternSymbols = /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    function (maskExp) {
        var _this = this;
        return ((maskExp.match(/{[0-9]+}/) &&
            maskExp.split('').reduce((/**
             * @param {?} accum
             * @param {?} currval
             * @param {?} index
             * @return {?}
             */
            function (accum, currval, index) {
                _this._start = currval === '{' ? index : _this._start;
                if (currval !== '}') {
                    return _this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                _this._end = index;
                /** @type {?} */
                var repeatNumber = Number(maskExp.slice(_this._start + 1, _this._end));
                /** @type {?} */
                var repaceWith = new Array(repeatNumber + 1).join(maskExp[_this._start - 1]);
                return accum + repaceWith;
            }), '')) ||
            maskExp);
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._applyMask = 
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @return {?}
     */
    function () {
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
        ];
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MaskDirective.prototype._validateTime = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rowMaskLen = this._maskValue.split('').filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s !== ':'; })).length;
        if (value === null || value.length === 0) {
            return null; // Don't validate empty values to allow for optional form control
        }
        if ((+value[value.length - 1] === 0 && value.length < rowMaskLen) || value.length <= rowMaskLen - 2) {
            return this._createValidationError(value);
        }
        return null;
    };
    /**
     * @private
     * @return {?}
     */
    MaskDirective.prototype._getActualInputLength = /**
     * @private
     * @return {?}
     */
    function () {
        return (this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length);
    };
    /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    MaskDirective.prototype._createValidationError = /**
     * @private
     * @param {?} actualValue
     * @return {?}
     */
    function (actualValue) {
        return {
            mask: {
                requiredMask: this._maskValue,
                actualValue: actualValue,
            },
        };
    };
    MaskDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MaskDirective; })),
                            multi: true,
                        },
                        MaskService,
                    ],
                },] }
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: MaskService },
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
    ]; };
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
    return MaskDirective;
}());
export { MaskDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBcUMsYUFBYSxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBVyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUc3QztJQXlDRSx1QkFDNEIsUUFBYSxFQUMvQixZQUF5QixFQUNQLE9BQWdCO1FBRmhCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDUCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBM0J0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO1FBQ3JELGFBQVEsR0FBd0IsRUFBRSxDQUFDO1FBQ25DLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLFdBQU0sR0FBc0IsRUFBRSxDQUFDO1FBQy9CLHNCQUFpQixHQUFpQyxHQUFHLENBQUM7UUFDdEQsa0JBQWEsR0FBNkIsR0FBRyxDQUFDO1FBQzlDLDBCQUFxQixHQUE0QyxJQUFJLENBQUM7UUFDdEUsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2xELGtCQUFhLEdBQW9DLElBQUksQ0FBQztRQUN0RCx5QkFBb0IsR0FBMkMsSUFBSSxDQUFDO1FBQ3BFLHdCQUFtQixHQUEwQyxJQUFJLENBQUM7UUFDbEUsaUJBQVksR0FB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QyxZQUFZLFNBQUMsTUFBTTswQkFNbkIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFtRGhDLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBc0hsQyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQTZEM0Msb0JBQUM7Q0FBQSxBQXhkRCxJQXdkQztTQXhjWSxhQUFhOzs7SUFDeEIsdUNBQWtEOztJQUNsRCwwQ0FBcUU7O0lBQ3JFLGlDQUFtRDs7SUFDbkQsK0JBQStDOztJQUMvQywrQkFBK0M7O0lBQy9DLDBDQUFzRTs7SUFDdEUsc0NBQThEOztJQUM5RCw4Q0FBc0Y7O0lBQ3RGLG9DQUFrRTs7SUFDbEUsc0NBQXNFOztJQUN0RSw2Q0FBb0Y7O0lBQ3BGLDRDQUFrRjs7SUFDbEYscUNBQW9FOztJQUNwRSx3Q0FBMEU7O0lBQzFFLG1DQUFnRTs7SUFDaEUsdUNBQXdFOztJQUN4RSw2Q0FBb0Y7Ozs7O0lBQ3BGLG1DQUFnQzs7Ozs7SUFDaEMsb0NBQTZCOzs7OztJQUM3QixrQ0FBd0M7Ozs7O0lBQ3hDLCtCQUF3Qjs7Ozs7SUFDeEIsNkJBQXNCOzs7OztJQUN0Qiw4QkFBdUI7O0lBUXZCLGlDQUFpQzs7SUFDakMsZ0NBQTBCOzs7OztJQU54QixpQ0FBdUM7Ozs7O0lBQ3ZDLHFDQUFpQzs7Ozs7SUFDakMsZ0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBDdXN0b21LZXlib2FyZEV2ZW50IH0gZnJvbSAnLi9jdXN0b20ta2V5Ym9hcmQtZXZlbnQnO1xyXG5pbXBvcnQgeyBjb25maWcsIElDb25maWcsIHRpbWVNYXNrcywgd2l0aG91dFZhbGlkYXRpb24gfSBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7IE1hc2tTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLnNlcnZpY2UnO1xyXG5cclxuLy8gdHNsaW50OmRpc2FibGUgZGVwcmVjYXRpb25cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWFza10nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWFza0RpcmVjdGl2ZSksXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWFza0RpcmVjdGl2ZSksXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1hc2tTZXJ2aWNlLFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXNrRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCdtYXNrJykgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSBwdWJsaWMgc3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ3NwZWNpYWxDaGFyYWN0ZXJzJ10gPSBbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgcGF0dGVybnM6IElDb25maWdbJ3BhdHRlcm5zJ10gPSB7fTtcclxuICBASW5wdXQoKSBwdWJsaWMgcHJlZml4OiBJQ29uZmlnWydwcmVmaXgnXSA9ICcnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzdWZmaXg6IElDb25maWdbJ3N1ZmZpeCddID0gJyc7XHJcbiAgQElucHV0KCkgcHVibGljIHRob3VzYW5kU2VwYXJhdG9yOiBJQ29uZmlnWyd0aG91c2FuZFNlcGFyYXRvciddID0gJyAnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkZWNpbWFsTWFya2VyOiBJQ29uZmlnWydkZWNpbWFsTWFya2VyJ10gPSAnLic7XHJcbiAgQElucHV0KCkgcHVibGljIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogSUNvbmZpZ1snZHJvcFNwZWNpYWxDaGFyYWN0ZXJzJ10gfCBudWxsID0gbnVsbDtcclxuICBASW5wdXQoKSBwdWJsaWMgaGlkZGVuSW5wdXQ6IElDb25maWdbJ2hpZGRlbklucHV0J10gfCBudWxsID0gbnVsbDtcclxuICBASW5wdXQoKSBwdWJsaWMgc2hvd01hc2tUeXBlZDogSUNvbmZpZ1snc2hvd01hc2tUeXBlZCddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIHBsYWNlSG9sZGVyQ2hhcmFjdGVyOiBJQ29uZmlnWydwbGFjZUhvbGRlckNoYXJhY3RlciddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIHNob3duTWFza0V4cHJlc3Npb246IElDb25maWdbJ3Nob3duTWFza0V4cHJlc3Npb24nXSB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93VGVtcGxhdGU6IElDb25maWdbJ3Nob3dUZW1wbGF0ZSddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIGNsZWFySWZOb3RNYXRjaDogSUNvbmZpZ1snY2xlYXJJZk5vdE1hdGNoJ10gfCBudWxsID0gbnVsbDtcclxuICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdGlvbjogSUNvbmZpZ1sndmFsaWRhdGlvbiddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvckxpbWl0OiBJQ29uZmlnWydzZXBhcmF0b3JMaW1pdCddIHwgbnVsbCA9IG51bGw7XHJcbiAgQElucHV0KCkgcHVibGljIGFsbG93TmVnYXRpdmVOdW1iZXJzOiBJQ29uZmlnWydhbGxvd05lZ2F0aXZlTnVtYmVycyddIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfbWFza1ZhbHVlOiBzdHJpbmcgPSAnJztcclxuICBwcml2YXRlIF9pbnB1dFZhbHVlITogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF9zdGFydCE6IG51bWJlcjtcclxuICBwcml2YXRlIF9lbmQhOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfY29kZSE6IHN0cmluZztcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgcHJpdmF0ZSBfbWFza1NlcnZpY2U6IE1hc2tTZXJ2aWNlLFxyXG4gICAgQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnXHJcbiAgKSB7fVxyXG5cclxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHt9O1xyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBtYXNrRXhwcmVzc2lvbixcclxuICAgICAgc3BlY2lhbENoYXJhY3RlcnMsXHJcbiAgICAgIHBhdHRlcm5zLFxyXG4gICAgICBwcmVmaXgsXHJcbiAgICAgIHN1ZmZpeCxcclxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXHJcbiAgICAgIGRlY2ltYWxNYXJrZXIsXHJcbiAgICAgIGRyb3BTcGVjaWFsQ2hhcmFjdGVycyxcclxuICAgICAgaGlkZGVuSW5wdXQsXHJcbiAgICAgIHNob3dNYXNrVHlwZWQsXHJcbiAgICAgIHBsYWNlSG9sZGVyQ2hhcmFjdGVyLFxyXG4gICAgICBzaG93bk1hc2tFeHByZXNzaW9uLFxyXG4gICAgICBzaG93VGVtcGxhdGUsXHJcbiAgICAgIGNsZWFySWZOb3RNYXRjaCxcclxuICAgICAgdmFsaWRhdGlvbixcclxuICAgICAgc2VwYXJhdG9yTGltaXQsXHJcbiAgICAgIGFsbG93TmVnYXRpdmVOdW1iZXJzLFxyXG4gICAgfSA9IGNoYW5nZXM7XHJcbiAgICBpZiAobWFza0V4cHJlc3Npb24pIHtcclxuICAgICAgdGhpcy5fbWFza1ZhbHVlID0gY2hhbmdlcy5tYXNrRXhwcmVzc2lvbi5jdXJyZW50VmFsdWUgfHwgJyc7XHJcbiAgICB9XHJcbiAgICBpZiAoc3BlY2lhbENoYXJhY3RlcnMpIHtcclxuICAgICAgaWYgKCFzcGVjaWFsQ2hhcmFjdGVycy5jdXJyZW50VmFsdWUgfHwgIUFycmF5LmlzQXJyYXkoc3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSBjaGFuZ2VzLnNwZWNpYWxDaGFyYWN0ZXJzLmN1cnJlbnRWYWx1ZSB8fCBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gT25seSBvdmVyd3JpdGUgdGhlIG1hc2sgYXZhaWxhYmxlIHBhdHRlcm5zIGlmIGEgcGF0dGVybiBoYXMgYWN0dWFsbHkgYmVlbiBwYXNzZWQgaW5cclxuICAgIGlmIChwYXR0ZXJucyAmJiBwYXR0ZXJucy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gcGF0dGVybnMuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHByZWZpeCkge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggPSBwcmVmaXguY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHN1ZmZpeCkge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zdWZmaXggPSBzdWZmaXguY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRob3VzYW5kU2VwYXJhdG9yKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnRob3VzYW5kU2VwYXJhdG9yID0gdGhvdXNhbmRTZXBhcmF0b3IuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlY2ltYWxNYXJrZXIpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuZGVjaW1hbE1hcmtlciA9IGRlY2ltYWxNYXJrZXIuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRyb3BTcGVjaWFsQ2hhcmFjdGVycykge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPSBkcm9wU3BlY2lhbENoYXJhY3RlcnMuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGhpZGRlbklucHV0KSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmhpZGRlbklucHV0ID0gaGlkZGVuSW5wdXQuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHNob3dNYXNrVHlwZWQpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCA9IHNob3dNYXNrVHlwZWQuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHBsYWNlSG9sZGVyQ2hhcmFjdGVyKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnBsYWNlSG9sZGVyQ2hhcmFjdGVyID0gcGxhY2VIb2xkZXJDaGFyYWN0ZXIuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHNob3duTWFza0V4cHJlc3Npb24pIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd25NYXNrRXhwcmVzc2lvbiA9IHNob3duTWFza0V4cHJlc3Npb24uY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHNob3dUZW1wbGF0ZSkge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93VGVtcGxhdGUgPSBzaG93VGVtcGxhdGUuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGNsZWFySWZOb3RNYXRjaCkge1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2ggPSBjbGVhcklmTm90TWF0Y2guY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbGlkYXRpb24pIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudmFsaWRhdGlvbiA9IHZhbGlkYXRpb24uY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlcGFyYXRvckxpbWl0KSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlcGFyYXRvckxpbWl0ID0gc2VwYXJhdG9yTGltaXQuY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFsbG93TmVnYXRpdmVOdW1iZXJzKSB7XHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5maWx0ZXIoKGM6IHN0cmluZykgPT4gYyAhPT0gJy0nKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2FwcGx5TWFzaygpO1xyXG4gIH1cclxuXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHlcclxuICBwdWJsaWMgdmFsaWRhdGUoeyB2YWx1ZSB9OiBGb3JtQ29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcclxuICAgIGlmICghdGhpcy5fbWFza1NlcnZpY2UudmFsaWRhdGlvbikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9tYXNrU2VydmljZS5pcEVycm9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVWYWxpZGF0aW9uRXJyb3IodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5zdGFydHNXaXRoKCdzZXBhcmF0b3InKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh3aXRob3V0VmFsaWRhdGlvbi5pbmNsdWRlcyh0aGlzLl9tYXNrVmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0aW1lTWFza3MuaW5jbHVkZXModGhpcy5fbWFza1ZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVUaW1lKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgIGxldCBjb3VudGVyT2ZPcHQgPSAwO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnMpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnNba2V5XS5vcHRpb25hbCAmJlxyXG4gICAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zW2tleV0ub3B0aW9uYWwgPT09IHRydWVcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSB0aGlzLl9tYXNrVmFsdWUubGFzdEluZGV4T2Yoa2V5KSkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHQ6IHN0cmluZyA9IHRoaXMuX21hc2tWYWx1ZVxyXG4gICAgICAgICAgICAgIC5zcGxpdCgnJylcclxuICAgICAgICAgICAgICAuZmlsdGVyKChpOiBzdHJpbmcpID0+IGkgPT09IGtleSlcclxuICAgICAgICAgICAgICAuam9pbignJyk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJPZk9wdCArPSBvcHQubGVuZ3RoO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb3VudGVyT2ZPcHQrKztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpICE9PSAtMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZihrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNvdW50ZXJPZk9wdCA9PT0gdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCd7JykgPT09IDEgJiZcclxuICAgICAgICB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA9PT0gdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCArIE51bWJlcih0aGlzLl9tYXNrVmFsdWUuc3BsaXQoJ3snKVsxXS5zcGxpdCgnfScpWzBdKSAtIDRcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykgPT09IDEgfHwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID4gMSAmJiB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCcqJykpIHx8XHJcbiAgICAgICAgKHRoaXMuX21hc2tWYWx1ZS5pbmRleE9mKCc/JykgPiAxICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgdGhpcy5fbWFza1ZhbHVlLmluZGV4T2YoJz8nKSkgfHxcclxuICAgICAgICB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZigneycpID09PSAxXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVWYWxpZGF0aW9uRXJyb3IodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignKicpID09PSAtMSB8fCB0aGlzLl9tYXNrVmFsdWUuaW5kZXhPZignPycpID09PSAtMSkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5fbWFza1NlcnZpY2UuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzXHJcbiAgICAgICAgICA/IHRoaXMuX21hc2tWYWx1ZS5sZW5ndGggLSB0aGlzLl9tYXNrU2VydmljZS5jaGVja1NwZWNpYWxDaGFyQW1vdW50KHRoaXMuX21hc2tWYWx1ZSkgLSBjb3VudGVyT2ZPcHRcclxuICAgICAgICAgIDogdGhpcy5fbWFza1ZhbHVlLmxlbmd0aCAtIGNvdW50ZXJPZk9wdDtcclxuICAgICAgICBpZiAodmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVWYWxpZGF0aW9uRXJyb3IodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uSW5wdXQoZTogQ3VzdG9tS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xyXG4gICAgaWYgKCF0aGlzLl9tYXNrVmFsdWUpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZShlbC52YWx1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBvc2l0aW9uOiBudW1iZXIgPVxyXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9PT0gMVxyXG4gICAgICAgID8gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgKyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXHJcbiAgICAgICAgOiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKTtcclxuICAgIGxldCBjYXJldFNoaWZ0ID0gMDtcclxuICAgIGxldCBiYWNrc3BhY2VTaGlmdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlWYWx1ZUNoYW5nZXMocG9zaXRpb24sIChzaGlmdDogbnVtYmVyLCBfYmFja3NwYWNlU2hpZnQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgY2FyZXRTaGlmdCA9IHNoaWZ0O1xyXG4gICAgICBiYWNrc3BhY2VTaGlmdCA9IF9iYWNrc3BhY2VTaGlmdDtcclxuICAgIH0pO1xyXG4gICAgLy8gb25seSBzZXQgdGhlIHNlbGVjdGlvbiBpZiB0aGUgZWxlbWVudCBpcyBhY3RpdmVcclxuICAgIGlmICh0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fcG9zaXRpb24gPT09IDEgJiYgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggPT09IDEgPyBudWxsIDogdGhpcy5fcG9zaXRpb247XHJcbiAgICBsZXQgcG9zaXRpb25Ub0FwcGx5OiBudW1iZXIgPSB0aGlzLl9wb3NpdGlvblxyXG4gICAgICA/IHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoICsgcG9zaXRpb24gKyBjYXJldFNoaWZ0XHJcbiAgICAgIDogcG9zaXRpb24gKyAodGhpcy5fY29kZSA9PT0gJ0JhY2tzcGFjZScgJiYgIWJhY2tzcGFjZVNoaWZ0ID8gMCA6IGNhcmV0U2hpZnQpO1xyXG4gICAgaWYgKHBvc2l0aW9uVG9BcHBseSA+IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCkpIHtcclxuICAgICAgcG9zaXRpb25Ub0FwcGx5ID0gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKTtcclxuICAgIH1cclxuICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHBvc2l0aW9uVG9BcHBseSwgcG9zaXRpb25Ub0FwcGx5KTtcclxuICAgIGlmICgodGhpcy5tYXNrRXhwcmVzc2lvbi5pbmNsdWRlcygnSCcpIHx8IHRoaXMubWFza0V4cHJlc3Npb24uaW5jbHVkZXMoJ00nKSkgJiYgY2FyZXRTaGlmdCA9PT0gMCkge1xyXG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIDEsIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgMSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJylcclxuICBwdWJsaWMgb25CbHVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoRm4oKTtcclxuICAgIHRoaXMub25Ub3VjaCgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkZvY3VzKGU6IE1vdXNlRXZlbnQgfCBDdXN0b21LZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjb25zdCBwb3NTdGFydCA9IDA7XHJcbiAgICBjb25zdCBwb3NFbmQgPSAwO1xyXG4gICAgaWYgKFxyXG4gICAgICBlbCAhPT0gbnVsbCAmJlxyXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCAhPT0gbnVsbCAmJlxyXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9PT0gZWwuc2VsZWN0aW9uRW5kICYmXHJcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgKGUgYXMgYW55KS5rZXlDb2RlICE9PSAzOFxyXG4gICAgKVxyXG4gICAgICBpZiAodGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCkge1xyXG4gICAgICAgIC8vIFdlIGFyZSBzaG93aW5nIHRoZSBtYXNrIGluIHRoZSBpbnB1dFxyXG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duID0gdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tJbklucHV0KCk7XHJcbiAgICAgICAgaWYgKGVsLnNldFNlbGVjdGlvblJhbmdlICYmIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCArIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duID09PSBlbC52YWx1ZSkge1xyXG4gICAgICAgICAgLy8gdGhlIGlucHV0IE9OTFkgY29udGFpbnMgdGhlIG1hc2ssIHNvIHBvc2l0aW9uIHRoZSBjdXJzb3IgYXQgdGhlIHN0YXJ0XHJcbiAgICAgICAgICBlbC5mb2N1cygpO1xyXG4gICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UocG9zU3RhcnQsIHBvc0VuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRoZSBpbnB1dCBjb250YWlucyBzb21lIGNoYXJhY3RlcnMgYWxyZWFkeVxyXG4gICAgICAgICAgaWYgKGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSB1c2VyIGNsaWNrZWQgYmV5b25kIG91ciB2YWx1ZSdzIGxlbmd0aCwgcG9zaXRpb24gdGhlIGN1cnNvciBhdCB0aGUgZW5kIG9mIG91ciB2YWx1ZVxyXG4gICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGgsIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBjb25zdCBuZXh0VmFsdWU6IHN0cmluZyB8IG51bGwgPVxyXG4gICAgICAhZWwudmFsdWUgfHwgZWwudmFsdWUgPT09IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeFxyXG4gICAgICAgID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ICsgdGhpcy5fbWFza1NlcnZpY2UubWFza0lzU2hvd25cclxuICAgICAgICA6IGVsLnZhbHVlO1xyXG5cclxuICAgIC8qKiBGaXggb2YgY3Vyc29yIHBvc2l0aW9uIGp1bXBpbmcgdG8gZW5kIGluIG1vc3QgYnJvd3NlcnMgbm8gbWF0dGVyIHdoZXJlIGN1cnNvciBpcyBpbnNlcnRlZCBvbkZvY3VzICovXHJcbiAgICBpZiAoZWwudmFsdWUgIT09IG5leHRWYWx1ZSkge1xyXG4gICAgICBlbC52YWx1ZSA9IG5leHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogZml4IG9mIGN1cnNvciBwb3NpdGlvbiB3aXRoIHByZWZpeCB3aGVuIG1vdXNlIGNsaWNrIG9jY3VyICovXHJcbiAgICBpZiAoKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIHx8IChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSkgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCkge1xyXG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGg7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogc2VsZWN0IG9ubHkgaW5zZXJ0ZWQgdGV4dCAqL1xyXG4gICAgaWYgKChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA+IHRoaXMuX2dldEFjdHVhbElucHV0TGVuZ3RoKCkpIHtcclxuICAgICAgZWwuc2VsZWN0aW9uRW5kID0gdGhpcy5fZ2V0QWN0dWFsSW5wdXRMZW5ndGgoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3ljbG9tYXRpYy1jb21wbGV4aXR5XHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uS2V5RG93bihlOiBDdXN0b21LZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9jb2RlID0gZS5jb2RlID8gZS5jb2RlIDogZS5rZXk7XHJcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gZWwudmFsdWU7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDggfHwgZS5rZXlDb2RlID09PSA0Nikge1xyXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4ICYmIGVsLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gZWwuc2VsZWN0aW9uRW5kO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDggJiYgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgIT09IDApIHtcclxuICAgICAgICAvLyBJZiBzcGVjaWFsQ2hhcnMgaXMgZmFsc2UsIChzaG91bGRuJ3QgZXZlciBoYXBwZW4pIHRoZW4gc2V0IHRvIHRoZSBkZWZhdWx0c1xyXG4gICAgICAgIHRoaXMuc3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLnNwZWNpYWxDaGFyYWN0ZXJzIHx8IHRoaXMuX2NvbmZpZy5zcGVjaWFsQ2hhcmFjdGVycztcclxuICAgICAgICBpZiAodGhpcy5wcmVmaXgubGVuZ3RoID4gMSAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLnByZWZpeC5sZW5ndGgpIHtcclxuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMucHJlZml4Lmxlbmd0aCwgdGhpcy5wcmVmaXgubGVuZ3RoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoICE9PSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAmJiAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB3aGlsZSAoXHJcbiAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyh0aGlzLl9pbnB1dFZhbHVlWyhlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMV0udG9TdHJpbmcoKSkgJiZcclxuICAgICAgICAgICAgICAoKHRoaXMucHJlZml4Lmxlbmd0aCA+PSAxICYmIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpID4gdGhpcy5wcmVmaXgubGVuZ3RoKSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmaXgubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSAtIDEsIChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc3VmZml4Q2hlY2tPblByZXNzRGVsZXRlKGUua2V5Q29kZSwgZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShlLmtleUNvZGUsIGVsKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggJiZcclxuICAgICAgICAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXHJcbiAgICAgICAgKGVsLnNlbGVjdGlvbkVuZCBhcyBudW1iZXIpIDw9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGhcclxuICAgICAgKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGN1cnNvclN0YXJ0OiBudW1iZXIgfCBudWxsID0gZWwuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgIC8vIHRoaXMub25Gb2N1cyhlKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGUua2V5Q29kZSA9PT0gOCAmJlxyXG4gICAgICAgICFlbC5yZWFkT25seSAmJlxyXG4gICAgICAgIGN1cnNvclN0YXJ0ID09PSAwICYmXHJcbiAgICAgICAgZWwuc2VsZWN0aW9uRW5kID09PSBlbC52YWx1ZS5sZW5ndGggJiZcclxuICAgICAgICBlbC52YWx1ZS5sZW5ndGggIT09IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggPyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoIDogMDtcclxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2sodGhpcy5fbWFza1NlcnZpY2UucHJlZml4LCB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiwgdGhpcy5fcG9zaXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICEhdGhpcy5zdWZmaXggJiZcclxuICAgICAgdGhpcy5zdWZmaXgubGVuZ3RoID4gMSAmJlxyXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpXHJcbiAgICApIHtcclxuICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIChlLmtleUNvZGUgPT09IDY1ICYmIGUuY3RybEtleSA9PT0gdHJ1ZSkgfHwgLy8gQ3RybCsgQVxyXG4gICAgICAoZS5rZXlDb2RlID09PSA2NSAmJiBlLm1ldGFLZXkgPT09IHRydWUpIC8vIENtZCArIEEgKE1hYylcclxuICAgICkge1xyXG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLl9nZXRBY3R1YWxJbnB1dExlbmd0aCgpKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc2VsU3RhcnQgPSBlbC5zZWxlY3Rpb25TdGFydDtcclxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNlbEVuZCA9IGVsLnNlbGVjdGlvbkVuZDtcclxuICB9XHJcblxyXG4gIC8qKiBJdCB3cml0ZXMgdGhlIHZhbHVlIGluIHRoZSBpbnB1dCAqL1xyXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKGlucHV0VmFsdWU6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpbnB1dFZhbHVlID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0VmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGlucHV0VmFsdWUgPSBTdHJpbmcoaW5wdXRWYWx1ZSk7XHJcbiAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmRlY2ltYWxNYXJrZXIgIT09ICcuJyA/IGlucHV0VmFsdWUucmVwbGFjZSgnLicsIHRoaXMuZGVjaW1hbE1hcmtlcikgOiBpbnB1dFZhbHVlO1xyXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5pc051bWJlclZhbHVlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIChpbnB1dFZhbHVlICYmIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSB8fFxyXG4gICAgKHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uICYmICh0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggfHwgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCkpXHJcbiAgICAgID8gKHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbXHJcbiAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKGlucHV0VmFsdWUsIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSxcclxuICAgICAgICBdKVxyXG4gICAgICA6ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gWyd2YWx1ZScsIGlucHV0VmFsdWVdKTtcclxuICAgIHRoaXMuX2lucHV0VmFsdWUgPSBpbnB1dFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgdGhpcy5fbWFza1NlcnZpY2Uub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN1ZmZpeENoZWNrT25QcmVzc0RlbGV0ZShrZXlDb2RlOiBudW1iZXIsIGVsOiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XHJcbiAgICBpZiAoa2V5Q29kZSA9PT0gNDYgJiYgdGhpcy5zdWZmaXgubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGggPD0gKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikpIHtcclxuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCwgdGhpcy5faW5wdXRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5Q29kZSA9PT0gOCkge1xyXG4gICAgICBpZiAodGhpcy5zdWZmaXgubGVuZ3RoID4gMSAmJiB0aGlzLl9pbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCA8IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpKSB7XHJcbiAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggLSB0aGlzLnN1ZmZpeC5sZW5ndGgsIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zdWZmaXgubGVuZ3RoID09PSAxICYmIHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoID09PSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSkge1xyXG4gICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpIC0gMSwgKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgLSAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEl0IGRpc2FibGVzIHRoZSBpbnB1dCBlbGVtZW50ICovXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsnZGlzYWJsZWQnLCBpc0Rpc2FibGVkXTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ25nTW9kZWxDaGFuZ2UnLCBbJyRldmVudCddKVxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55XHJcbiAgcHVibGljIG9uTW9kZWxDaGFuZ2UoZTogYW55KTogdm9pZCB7XHJcbiAgICBpZiAoIWUpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYWN0dWFsVmFsdWUgPSAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlcGVhdFBhdHRlcm5TeW1ib2xzKG1hc2tFeHA6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAobWFza0V4cC5tYXRjaCgve1swLTldK30vKSAmJlxyXG4gICAgICAgIG1hc2tFeHAuc3BsaXQoJycpLnJlZHVjZSgoYWNjdW06IHN0cmluZywgY3VycnZhbDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gY3VycnZhbCA9PT0gJ3snID8gaW5kZXggOiB0aGlzLl9zdGFydDtcclxuXHJcbiAgICAgICAgICBpZiAoY3VycnZhbCAhPT0gJ30nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXNrU2VydmljZS5fZmluZFNwZWNpYWxDaGFyKGN1cnJ2YWwpID8gYWNjdW0gKyBjdXJydmFsIDogYWNjdW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLl9lbmQgPSBpbmRleDtcclxuICAgICAgICAgIGNvbnN0IHJlcGVhdE51bWJlcjogbnVtYmVyID0gTnVtYmVyKG1hc2tFeHAuc2xpY2UodGhpcy5fc3RhcnQgKyAxLCB0aGlzLl9lbmQpKTtcclxuICAgICAgICAgIGNvbnN0IHJlcGFjZVdpdGg6IHN0cmluZyA9IG5ldyBBcnJheShyZXBlYXROdW1iZXIgKyAxKS5qb2luKG1hc2tFeHBbdGhpcy5fc3RhcnQgLSAxXSk7XHJcbiAgICAgICAgICByZXR1cm4gYWNjdW0gKyByZXBhY2VXaXRoO1xyXG4gICAgICAgIH0sICcnKSkgfHxcclxuICAgICAgbWFza0V4cFxyXG4gICAgKTtcclxuICB9XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gIHByaXZhdGUgX2FwcGx5TWFzaygpOiBhbnkge1xyXG4gICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24gPSB0aGlzLl9yZXBlYXRQYXR0ZXJuU3ltYm9scyh0aGlzLl9tYXNrVmFsdWUgfHwgJycpO1xyXG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFtcclxuICAgICAgJ3ZhbHVlJyxcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKHRoaXMuX2lucHV0VmFsdWUsIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uKSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF92YWxpZGF0ZVRpbWUodmFsdWU6IHN0cmluZyk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcclxuICAgIGNvbnN0IHJvd01hc2tMZW46IG51bWJlciA9IHRoaXMuX21hc2tWYWx1ZS5zcGxpdCgnJykuZmlsdGVyKChzOiBzdHJpbmcpID0+IHMgIT09ICc6JykubGVuZ3RoO1xyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gbnVsbDsgLy8gRG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IGZvciBvcHRpb25hbCBmb3JtIGNvbnRyb2xcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKCt2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXSA9PT0gMCAmJiB2YWx1ZS5sZW5ndGggPCByb3dNYXNrTGVuKSB8fCB2YWx1ZS5sZW5ndGggPD0gcm93TWFza0xlbiAtIDIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVZhbGlkYXRpb25FcnJvcih2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRBY3R1YWxJbnB1dExlbmd0aCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFjdHVhbFZhbHVlLmxlbmd0aCB8fCB0aGlzLl9tYXNrU2VydmljZS5hY3R1YWxWYWx1ZS5sZW5ndGggKyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlVmFsaWRhdGlvbkVycm9yKGFjdHVhbFZhbHVlOiBzdHJpbmcpOiBWYWxpZGF0aW9uRXJyb3JzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1hc2s6IHtcclxuICAgICAgICByZXF1aXJlZE1hc2s6IHRoaXMuX21hc2tWYWx1ZSxcclxuICAgICAgICBhY3R1YWxWYWx1ZSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==