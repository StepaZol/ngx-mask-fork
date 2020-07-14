/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialConfig, NEW_CONFIG } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';
export class NgxMaskModule {
    /**
     * @param {?=} configValue
     * @return {?}
     */
    static forRoot(configValue) {
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
    }
    /**
     * @param {?=} _configValue
     * @return {?}
     */
    static forChild(_configValue) {
        return {
            ngModule: NgxMaskModule,
        };
    }
}
NgxMaskModule.decorators = [
    { type: NgModule, args: [{
                exports: [MaskDirective, MaskPipe],
                declarations: [MaskDirective, MaskPipe],
            },] }
];
/**
 * \@internal
 * @param {?} initConfig
 * @param {?} configValue
 * @return {?}
 */
export function _configFactory(initConfig, configValue) {
    return configValue instanceof Function ? Object.assign({}, initConfig, configValue()) : Object.assign({}, initConfig, configValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbmd4LW1hc2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUM1RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU12QyxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFtRDtRQUN2RSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxhQUFhO2lCQUN4QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsTUFBTTtvQkFDZixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQztpQkFDbkM7Z0JBQ0Qsa0JBQWtCO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7O0lBQ00sTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUE0QjtRQUNqRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQztJQUNKLENBQUM7OztZQTlCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztnQkFDbEMsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQzthQUN4Qzs7Ozs7Ozs7QUFpQ0QsTUFBTSxVQUFVLGNBQWMsQ0FDNUIsVUFBeUIsRUFDekIsV0FBa0Q7SUFFbEQsT0FBTyxXQUFXLFlBQVksUUFBUSxDQUFDLENBQUMsbUJBQU0sVUFBVSxFQUFLLFdBQVcsRUFBRSxFQUFHLENBQUMsbUJBQU0sVUFBVSxFQUFLLFdBQVcsQ0FBRSxDQUFDO0FBQ25ILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgY29uZmlnLCBJTklUSUFMX0NPTkZJRywgaW5pdGlhbENvbmZpZywgTkVXX0NPTkZJRywgb3B0aW9uc0NvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hc2tEaXJlY3RpdmUgfSBmcm9tICcuL21hc2suZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTWFza1BpcGUgfSBmcm9tICcuL21hc2sucGlwZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGV4cG9ydHM6IFtNYXNrRGlyZWN0aXZlLCBNYXNrUGlwZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTWFza0RpcmVjdGl2ZSwgTWFza1BpcGVdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWFza01vZHVsZSB7XHJcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZ1ZhbHVlPzogb3B0aW9uc0NvbmZpZyB8ICgoKSA9PiBvcHRpb25zQ29uZmlnKSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5neE1hc2tNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IE5FV19DT05GSUcsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnVmFsdWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX0NPTkZJRyxcclxuICAgICAgICAgIHVzZVZhbHVlOiBpbml0aWFsQ29uZmlnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogY29uZmlnLFxyXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmZpZ0ZhY3RvcnksXHJcbiAgICAgICAgICBkZXBzOiBbSU5JVElBTF9DT05GSUcsIE5FV19DT05GSUddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTWFza0FwcGxpZXJTZXJ2aWNlLFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZChfY29uZmlnVmFsdWU/OiBvcHRpb25zQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTmd4TWFza01vZHVsZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX2NvbmZpZ0ZhY3RvcnkoXHJcbiAgaW5pdENvbmZpZzogb3B0aW9uc0NvbmZpZyxcclxuICBjb25maWdWYWx1ZTogb3B0aW9uc0NvbmZpZyB8ICgoKSA9PiBvcHRpb25zQ29uZmlnKVxyXG4pOiBvcHRpb25zQ29uZmlnIHtcclxuICByZXR1cm4gY29uZmlnVmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHsgLi4uaW5pdENvbmZpZywgLi4uY29uZmlnVmFsdWUoKSB9IDogeyAuLi5pbml0Q29uZmlnLCAuLi5jb25maWdWYWx1ZSB9O1xyXG59XHJcbiJdfQ==