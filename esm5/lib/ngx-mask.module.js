/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialConfig, NEW_CONFIG } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';
var NgxMaskModule = /** @class */ (function () {
    function NgxMaskModule() {
    }
    /**
     * @param {?=} configValue
     * @return {?}
     */
    NgxMaskModule.forRoot = /**
     * @param {?=} configValue
     * @return {?}
     */
    function (configValue) {
        return {
            ngModule: NgxMaskModule,
            providers: [
                {
                    provide: NEW_CONFIG,
                    useValue: configValue,
                },
                {
                    provide: INITIAL_CONFIG,
                    useValue: initialConfig,
                },
                {
                    provide: config,
                    useFactory: _configFactory,
                    deps: [INITIAL_CONFIG, NEW_CONFIG],
                },
                MaskApplierService,
            ],
        };
    };
    /**
     * @param {?=} _configValue
     * @return {?}
     */
    NgxMaskModule.forChild = /**
     * @param {?=} _configValue
     * @return {?}
     */
    function (_configValue) {
        return {
            ngModule: NgxMaskModule,
        };
    };
    NgxMaskModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MaskDirective, MaskPipe],
                    declarations: [MaskDirective, MaskPipe],
                },] }
    ];
    return NgxMaskModule;
}());
export { NgxMaskModule };
/**
 * \@internal
 * @param {?} initConfig
 * @param {?} configValue
 * @return {?}
 */
export function _configFactory(initConfig, configValue) {
    return configValue instanceof Function ? tslib_1.__assign({}, initConfig, configValue()) : tslib_1.__assign({}, initConfig, configValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbmd4LW1hc2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBaUIsTUFBTSxVQUFVLENBQUM7QUFDNUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkM7SUFBQTtJQStCQSxDQUFDOzs7OztJQTFCZSxxQkFBTzs7OztJQUFyQixVQUFzQixXQUFtRDtRQUN2RSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxhQUFhO2lCQUN4QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsTUFBTTtvQkFDZixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQztpQkFDbkM7Z0JBQ0Qsa0JBQWtCO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7O0lBQ2Esc0JBQVE7Ozs7SUFBdEIsVUFBdUIsWUFBNEI7UUFDakQsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUM7SUFDSixDQUFDOztnQkE5QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDOztJQTRCRCxvQkFBQztDQUFBLEFBL0JELElBK0JDO1NBM0JZLGFBQWE7Ozs7Ozs7QUFnQzFCLE1BQU0sVUFBVSxjQUFjLENBQzVCLFVBQXlCLEVBQ3pCLFdBQWtEO0lBRWxELE9BQU8sV0FBVyxZQUFZLFFBQVEsQ0FBQyxDQUFDLHNCQUFNLFVBQVUsRUFBSyxXQUFXLEVBQUUsRUFBRyxDQUFDLHNCQUFNLFVBQVUsRUFBSyxXQUFXLENBQUUsQ0FBQztBQUNuSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGNvbmZpZywgSU5JVElBTF9DT05GSUcsIGluaXRpYWxDb25maWcsIE5FV19DT05GSUcsIG9wdGlvbnNDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7IE1hc2tBcHBsaWVyU2VydmljZSB9IGZyb20gJy4vbWFzay1hcHBsaWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXNrRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXNrLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE1hc2tQaXBlIH0gZnJvbSAnLi9tYXNrLnBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBleHBvcnRzOiBbTWFza0RpcmVjdGl2ZSwgTWFza1BpcGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW01hc2tEaXJlY3RpdmUsIE1hc2tQaXBlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hc2tNb2R1bGUge1xyXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWdWYWx1ZT86IG9wdGlvbnNDb25maWcgfCAoKCkgPT4gb3B0aW9uc0NvbmZpZykpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hNYXNrTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBORVdfQ09ORklHLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1ZhbHVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9DT05GSUcsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogaW5pdGlhbENvbmZpZyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IGNvbmZpZyxcclxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jb25maWdGYWN0b3J5LFxyXG4gICAgICAgICAgZGVwczogW0lOSVRJQUxfQ09ORklHLCBORVdfQ09ORklHXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1hc2tBcHBsaWVyU2VydmljZSxcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoX2NvbmZpZ1ZhbHVlPzogb3B0aW9uc0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5neE1hc2tNb2R1bGUsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9jb25maWdGYWN0b3J5KFxyXG4gIGluaXRDb25maWc6IG9wdGlvbnNDb25maWcsXHJcbiAgY29uZmlnVmFsdWU6IG9wdGlvbnNDb25maWcgfCAoKCkgPT4gb3B0aW9uc0NvbmZpZylcclxuKTogb3B0aW9uc0NvbmZpZyB7XHJcbiAgcmV0dXJuIGNvbmZpZ1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24gPyB7IC4uLmluaXRDb25maWcsIC4uLmNvbmZpZ1ZhbHVlKCkgfSA6IHsgLi4uaW5pdENvbmZpZywgLi4uY29uZmlnVmFsdWUgfTtcclxufVxyXG4iXX0=