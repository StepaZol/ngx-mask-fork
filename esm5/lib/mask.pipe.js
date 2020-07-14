/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { MaskApplierService } from './mask-applier.service';
var MaskPipe = /** @class */ (function () {
    function MaskPipe(_maskService) {
        this._maskService = _maskService;
    }
    /**
     * @param {?} value
     * @param {?} mask
     * @param {?=} thousandSeparator
     * @return {?}
     */
    MaskPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} mask
     * @param {?=} thousandSeparator
     * @return {?}
     */
    function (value, mask, thousandSeparator) {
        if (thousandSeparator === void 0) { thousandSeparator = null; }
        if (!value && typeof value !== 'number') {
            return '';
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator;
        }
        if (typeof mask === 'string') {
            return this._maskService.applyMask("" + value, mask);
        }
        return this._maskService.applyMaskWithPattern("" + value, mask);
    };
    MaskPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'mask',
                    pure: true,
                },] }
    ];
    /** @nocollapse */
    MaskPipe.ctorParameters = function () { return [
        { type: MaskApplierService }
    ]; };
    return MaskPipe;
}());
export { MaskPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MaskPipe.prototype._maskService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUc1RDtJQUtFLGtCQUEyQixZQUFnQztRQUFoQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7SUFBRyxDQUFDOzs7Ozs7O0lBRXhELDRCQUFTOzs7Ozs7SUFBaEIsVUFDRSxLQUFzQixFQUN0QixJQUE0QyxFQUM1QyxpQkFBdUM7UUFBdkMsa0NBQUEsRUFBQSx3QkFBdUM7UUFFdkMsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDdkMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELElBQUksaUJBQWlCLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztTQUN6RDtRQUNELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBRyxLQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsS0FBRyxLQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Z0JBdEJGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSTtpQkFDWDs7OztnQkFOUSxrQkFBa0I7O0lBMEIzQixlQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0FuQlksUUFBUTs7Ozs7O0lBQ0EsZ0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ21hc2snLFxyXG4gIHB1cmU6IHRydWUsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXNrUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXNrU2VydmljZTogTWFza0FwcGxpZXJTZXJ2aWNlKSB7fVxyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKFxyXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcixcclxuICAgIG1hc2s6IHN0cmluZyB8IFtzdHJpbmcsIElDb25maWdbJ3BhdHRlcm5zJ11dLFxyXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IHN0cmluZyB8IG51bGwgPSBudWxsXHJcbiAgKTogc3RyaW5nIHtcclxuICAgIGlmICghdmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodGhvdXNhbmRTZXBhcmF0b3IpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudGhvdXNhbmRTZXBhcmF0b3IgPSB0aG91c2FuZFNlcGFyYXRvcjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbWFzayA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhgJHt2YWx1ZX1gLCBtYXNrKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2tXaXRoUGF0dGVybihgJHt2YWx1ZX1gLCBtYXNrKTtcclxuICB9XHJcbn1cclxuIl19