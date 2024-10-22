'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tb-products documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' :
                                            'id="xs-controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' :
                                        'id="xs-injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"' :
                                            'id="xs-controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductPersistenceModule.html" data-type="entity-link" >ProductPersistenceModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProductPersistenceModule.html" data-type="entity-link" >ProductPersistenceModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProductPricingModule.html" data-type="entity-link" >ProductPricingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' : 'data-bs-target="#xs-controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' :
                                            'id="xs-controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' }>
                                            <li class="link">
                                                <a href="controllers/ProductPricingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductPricingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' : 'data-bs-target="#xs-injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' :
                                        'id="xs-injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' }>
                                        <li class="link">
                                            <a href="injectables/ProductPricingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductPricingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' :
                                            'id="xs-controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' :
                                        'id="xs-injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController-1.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductPricingController.html" data-type="entity-link" >ProductPricingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/ProductEntity.html" data-type="entity-link" >ProductEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductPricingEntity.html" data-type="entity-link" >ProductPricingEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiResponseDto.html" data-type="entity-link" >ApiResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductCommand.html" data-type="entity-link" >CreateProductCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductCommandHandler.html" data-type="entity-link" >CreateProductCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductPricingCommand.html" data-type="entity-link" >CreateProductPricingCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductPricingCommandHandler.html" data-type="entity-link" >CreateProductPricingCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductPricingDto.html" data-type="entity-link" >CreateProductPricingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductCommand.html" data-type="entity-link" >DeleteProductCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductCommandHandler.html" data-type="entity-link" >DeleteProductCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductPricingCommand.html" data-type="entity-link" >DeleteProductPricingCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductPricingCommandHandler.html" data-type="entity-link" >DeleteProductPricingCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductPricingByIdQuery.html" data-type="entity-link" >GetProductPricingByIdQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductPricingByIdQueryHandler.html" data-type="entity-link" >GetProductPricingByIdQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductPricingQuery.html" data-type="entity-link" >GetProductPricingQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductPricingsQueryHandler.html" data-type="entity-link" >GetProductPricingsQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsByIdQuery.html" data-type="entity-link" >GetProductsByIdQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsByIdQueryHandler.html" data-type="entity-link" >GetProductsByIdQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsQuery.html" data-type="entity-link" >GetProductsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsQueryHandler.html" data-type="entity-link" >GetProductsQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/IProductPricingRepository.html" data-type="entity-link" >IProductPricingRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/IProductRepository.html" data-type="entity-link" >IProductRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductFactory.html" data-type="entity-link" >ProductFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductMapper.html" data-type="entity-link" >ProductMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductPricing.html" data-type="entity-link" >ProductPricing</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductPricingFactory.html" data-type="entity-link" >ProductPricingFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductPricingMapper.html" data-type="entity-link" >ProductPricingMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductCommand.html" data-type="entity-link" >UpdateProductCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductCommandHandler.html" data-type="entity-link" >UpdateProductCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductPricingCommand.html" data-type="entity-link" >UpdateProductPricingCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductPricingCommandHandler.html" data-type="entity-link" >UpdateProductPricingCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductPricingDto.html" data-type="entity-link" >UpdateProductPricingDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductPricingRepository.html" data-type="entity-link" >ProductPricingRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductPricingService.html" data-type="entity-link" >ProductPricingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductRepository.html" data-type="entity-link" >ProductRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseService.html" data-type="entity-link" >ResponseService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApplicationBootstrapOptions.html" data-type="entity-link" >ApplicationBootstrapOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});