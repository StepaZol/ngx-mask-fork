/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * @record
 */
export function IConfig() { }
if (false) {
    /** @type {?} */
    IConfig.prototype.suffix;
    /** @type {?} */
    IConfig.prototype.prefix;
    /** @type {?} */
    IConfig.prototype.thousandSeparator;
    /** @type {?} */
    IConfig.prototype.decimalMarker;
    /** @type {?} */
    IConfig.prototype.clearIfNotMatch;
    /** @type {?} */
    IConfig.prototype.showTemplate;
    /** @type {?} */
    IConfig.prototype.showMaskTyped;
    /** @type {?} */
    IConfig.prototype.placeHolderCharacter;
    /** @type {?} */
    IConfig.prototype.shownMaskExpression;
    /** @type {?} */
    IConfig.prototype.dropSpecialCharacters;
    /** @type {?} */
    IConfig.prototype.specialCharacters;
    /** @type {?} */
    IConfig.prototype.hiddenInput;
    /** @type {?} */
    IConfig.prototype.validation;
    /** @type {?} */
    IConfig.prototype.separatorLimit;
    /** @type {?} */
    IConfig.prototype.allowNegativeNumbers;
    /** @type {?} */
    IConfig.prototype.patterns;
}
/** @type {?} */
export const config = new InjectionToken('config');
/** @type {?} */
export const NEW_CONFIG = new InjectionToken('NEW_CONFIG');
/** @type {?} */
export const INITIAL_CONFIG = new InjectionToken('INITIAL_CONFIG');
/** @type {?} */
export const initialConfig = {
    suffix: '',
    prefix: '',
    thousandSeparator: ' ',
    decimalMarker: '.',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    placeHolderCharacter: '_',
    dropSpecialCharacters: true,
    hiddenInput: undefined,
    shownMaskExpression: '',
    separatorLimit: '',
    allowNegativeNumbers: false,
    validation: true,
    // tslint:disable-next-line: quotemark
    specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true,
        },
        X: {
            pattern: new RegExp('\\d'),
            symbol: '*',
        },
        A: {
            pattern: new RegExp('[a-zA-Z0-9]'),
        },
        S: {
            pattern: new RegExp('[a-zA-Z]'),
        },
        d: {
            pattern: new RegExp('\\d'),
        },
        m: {
            pattern: new RegExp('\\d'),
        },
        M: {
            pattern: new RegExp('\\d'),
        },
        H: {
            pattern: new RegExp('\\d'),
        },
        h: {
            pattern: new RegExp('\\d'),
        },
        s: {
            pattern: new RegExp('\\d'),
        },
    },
};
/** @type {?} */
export const timeMasks = ['Hh:m0:s0', 'Hh:m0', 'm0:s0'];
/** @type {?} */
export const withoutValidation = [
    'percent',
    'Hh',
    's0',
    'm0',
    'separator',
    'd0/M0/0000',
    'd0/M0',
    'd0',
    'M0',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9DLDZCQXVCQzs7O0lBdEJDLHlCQUFlOztJQUNmLHlCQUFlOztJQUNmLG9DQUEwQjs7SUFDMUIsZ0NBQXlCOztJQUN6QixrQ0FBeUI7O0lBQ3pCLCtCQUFzQjs7SUFDdEIsZ0NBQXVCOztJQUN2Qix1Q0FBNkI7O0lBQzdCLHNDQUE0Qjs7SUFDNUIsd0NBQTBDOztJQUMxQyxvQ0FBNEI7O0lBQzVCLDhCQUFpQzs7SUFDakMsNkJBQW9COztJQUNwQixpQ0FBdUI7O0lBQ3ZCLHVDQUE4Qjs7SUFDOUIsMkJBTUU7OztBQUlKLE1BQU0sT0FBTyxNQUFNLEdBQTRCLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQzs7QUFDM0UsTUFBTSxPQUFPLFVBQVUsR0FBNEIsSUFBSSxjQUFjLENBQUMsWUFBWSxDQUFDOztBQUNuRixNQUFNLE9BQU8sY0FBYyxHQUE0QixJQUFJLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFM0YsTUFBTSxPQUFPLGFBQWEsR0FBWTtJQUNwQyxNQUFNLEVBQUUsRUFBRTtJQUNWLE1BQU0sRUFBRSxFQUFFO0lBQ1YsaUJBQWlCLEVBQUUsR0FBRztJQUN0QixhQUFhLEVBQUUsR0FBRztJQUNsQixlQUFlLEVBQUUsS0FBSztJQUN0QixZQUFZLEVBQUUsS0FBSztJQUNuQixhQUFhLEVBQUUsS0FBSztJQUNwQixvQkFBb0IsRUFBRSxHQUFHO0lBQ3pCLHFCQUFxQixFQUFFLElBQUk7SUFDM0IsV0FBVyxFQUFFLFNBQVM7SUFDdEIsbUJBQW1CLEVBQUUsRUFBRTtJQUN2QixjQUFjLEVBQUUsRUFBRTtJQUNsQixvQkFBb0IsRUFBRSxLQUFLO0lBQzNCLFVBQVUsRUFBRSxJQUFJOztJQUVoQixpQkFBaUIsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDekYsUUFBUSxFQUFFO1FBQ1IsR0FBRyxFQUFFO1lBQ0gsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELEdBQUcsRUFBRTtZQUNILE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUIsTUFBTSxFQUFFLEdBQUc7U0FDWjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDbkM7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ2hDO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzNCO0tBQ0Y7Q0FDRjs7QUFFRCxNQUFNLE9BQU8sU0FBUyxHQUFhLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7O0FBRWpFLE1BQU0sT0FBTyxpQkFBaUIsR0FBYTtJQUN6QyxTQUFTO0lBQ1QsSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osV0FBVztJQUNYLFlBQVk7SUFDWixPQUFPO0lBQ1AsSUFBSTtJQUNKLElBQUk7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xyXG4gIHN1ZmZpeDogc3RyaW5nO1xyXG4gIHByZWZpeDogc3RyaW5nO1xyXG4gIHRob3VzYW5kU2VwYXJhdG9yOiBzdHJpbmc7XHJcbiAgZGVjaW1hbE1hcmtlcjogJy4nIHwgJywnO1xyXG4gIGNsZWFySWZOb3RNYXRjaDogYm9vbGVhbjtcclxuICBzaG93VGVtcGxhdGU6IGJvb2xlYW47XHJcbiAgc2hvd01hc2tUeXBlZDogYm9vbGVhbjtcclxuICBwbGFjZUhvbGRlckNoYXJhY3Rlcjogc3RyaW5nO1xyXG4gIHNob3duTWFza0V4cHJlc3Npb246IHN0cmluZztcclxuICBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IGJvb2xlYW4gfCBzdHJpbmdbXTtcclxuICBzcGVjaWFsQ2hhcmFjdGVyczogc3RyaW5nW107XHJcbiAgaGlkZGVuSW5wdXQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcbiAgdmFsaWRhdGlvbjogYm9vbGVhbjtcclxuICBzZXBhcmF0b3JMaW1pdDogc3RyaW5nO1xyXG4gIGFsbG93TmVnYXRpdmVOdW1iZXJzOiBib29sZWFuO1xyXG4gIHBhdHRlcm5zOiB7XHJcbiAgICBbY2hhcmFjdGVyOiBzdHJpbmddOiB7XHJcbiAgICAgIHBhdHRlcm46IFJlZ0V4cDtcclxuICAgICAgb3B0aW9uYWw/OiBib29sZWFuO1xyXG4gICAgICBzeW1ib2w/OiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIG9wdGlvbnNDb25maWcgPSBQYXJ0aWFsPElDb25maWc+O1xyXG5leHBvcnQgY29uc3QgY29uZmlnOiBJbmplY3Rpb25Ub2tlbjxJQ29uZmlnPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignY29uZmlnJyk7XHJcbmV4cG9ydCBjb25zdCBORVdfQ09ORklHOiBJbmplY3Rpb25Ub2tlbjxJQ29uZmlnPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignTkVXX0NPTkZJRycpO1xyXG5leHBvcnQgY29uc3QgSU5JVElBTF9DT05GSUc6IEluamVjdGlvblRva2VuPElDb25maWc+ID0gbmV3IEluamVjdGlvblRva2VuKCdJTklUSUFMX0NPTkZJRycpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxDb25maWc6IElDb25maWcgPSB7XHJcbiAgc3VmZml4OiAnJyxcclxuICBwcmVmaXg6ICcnLFxyXG4gIHRob3VzYW5kU2VwYXJhdG9yOiAnICcsXHJcbiAgZGVjaW1hbE1hcmtlcjogJy4nLFxyXG4gIGNsZWFySWZOb3RNYXRjaDogZmFsc2UsXHJcbiAgc2hvd1RlbXBsYXRlOiBmYWxzZSxcclxuICBzaG93TWFza1R5cGVkOiBmYWxzZSxcclxuICBwbGFjZUhvbGRlckNoYXJhY3RlcjogJ18nLFxyXG4gIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogdHJ1ZSxcclxuICBoaWRkZW5JbnB1dDogdW5kZWZpbmVkLFxyXG4gIHNob3duTWFza0V4cHJlc3Npb246ICcnLFxyXG4gIHNlcGFyYXRvckxpbWl0OiAnJyxcclxuICBhbGxvd05lZ2F0aXZlTnVtYmVyczogZmFsc2UsXHJcbiAgdmFsaWRhdGlvbjogdHJ1ZSxcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHF1b3RlbWFya1xyXG4gIHNwZWNpYWxDaGFyYWN0ZXJzOiBbJy0nLCAnLycsICcoJywgJyknLCAnLicsICc6JywgJyAnLCAnKycsICcsJywgJ0AnLCAnWycsICddJywgJ1wiJywgXCInXCJdLFxyXG4gIHBhdHRlcm5zOiB7XHJcbiAgICAnMCc6IHtcclxuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcclxuICAgIH0sXHJcbiAgICAnOSc6IHtcclxuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcclxuICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgWDoge1xyXG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxyXG4gICAgICBzeW1ib2w6ICcqJyxcclxuICAgIH0sXHJcbiAgICBBOiB7XHJcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1thLXpBLVowLTldJyksXHJcbiAgICB9LFxyXG4gICAgUzoge1xyXG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdbYS16QS1aXScpLFxyXG4gICAgfSxcclxuICAgIGQ6IHtcclxuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcclxuICAgIH0sXHJcbiAgICBtOiB7XHJcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXHJcbiAgICB9LFxyXG4gICAgTToge1xyXG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxyXG4gICAgfSxcclxuICAgIEg6IHtcclxuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcclxuICAgIH0sXHJcbiAgICBoOiB7XHJcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXHJcbiAgICB9LFxyXG4gICAgczoge1xyXG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVNYXNrczogc3RyaW5nW10gPSBbJ0hoOm0wOnMwJywgJ0hoOm0wJywgJ20wOnMwJ107XHJcblxyXG5leHBvcnQgY29uc3Qgd2l0aG91dFZhbGlkYXRpb246IHN0cmluZ1tdID0gW1xyXG4gICdwZXJjZW50JyxcclxuICAnSGgnLFxyXG4gICdzMCcsXHJcbiAgJ20wJyxcclxuICAnc2VwYXJhdG9yJyxcclxuICAnZDAvTTAvMDAwMCcsXHJcbiAgJ2QwL00wJyxcclxuICAnZDAnLFxyXG4gICdNMCcsXHJcbl07XHJcbiJdfQ==