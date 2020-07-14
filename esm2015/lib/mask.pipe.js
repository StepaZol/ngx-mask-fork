/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { MaskApplierService } from './mask-applier.service';
export class MaskPipe {
    /**
     * @param {?} _maskService
     */
    constructor(_maskService) {
        this._maskService = _maskService;
    }
    /**
     * @param {?} value
     * @param {?} mask
     * @param {?=} thousandSeparator
     * @return {?}
     */
    transform(value, mask, thousandSeparator = null) {
        if (!value && typeof value !== 'number') {
            return '';
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator;
        }
        if (typeof mask === 'string') {
            return this._maskService.applyMask(`${value}`, mask);
        }
        return this._maskService.applyMaskWithPattern(`${value}`, mask);
    }
}
MaskPipe.decorators = [
    { type: Pipe, args: [{
                name: 'mask',
                pure: true,
            },] }
];
/** @nocollapse */
MaskPipe.ctorParameters = () => [
    { type: MaskApplierService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MaskPipe.prototype._maskService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU81RCxNQUFNLE9BQU8sUUFBUTs7OztJQUNuQixZQUEyQixZQUFnQztRQUFoQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7SUFBRyxDQUFDOzs7Ozs7O0lBRXhELFNBQVMsQ0FDZCxLQUFzQixFQUN0QixJQUE0QyxFQUM1QyxvQkFBbUMsSUFBSTtRQUV2QyxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7O1lBdEJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsSUFBSTthQUNYOzs7O1lBTlEsa0JBQWtCOzs7Ozs7O0lBUU4sZ0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ21hc2snLFxyXG4gIHB1cmU6IHRydWUsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXNrUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXNrU2VydmljZTogTWFza0FwcGxpZXJTZXJ2aWNlKSB7fVxyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKFxyXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcixcclxuICAgIG1hc2s6IHN0cmluZyB8IFtzdHJpbmcsIElDb25maWdbJ3BhdHRlcm5zJ11dLFxyXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IHN0cmluZyB8IG51bGwgPSBudWxsXHJcbiAgKTogc3RyaW5nIHtcclxuICAgIGlmICghdmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodGhvdXNhbmRTZXBhcmF0b3IpIHtcclxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudGhvdXNhbmRTZXBhcmF0b3IgPSB0aG91c2FuZFNlcGFyYXRvcjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbWFzayA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhgJHt2YWx1ZX1gLCBtYXNrKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2tXaXRoUGF0dGVybihgJHt2YWx1ZX1gLCBtYXNrKTtcclxuICB9XHJcbn1cclxuIl19